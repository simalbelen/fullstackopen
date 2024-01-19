const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const { before } = require('lodash')
const api = supertest(app)
const blogs = helper.initialBlogs
const users = helper.initialUsers
let login_info = null

beforeAll(async() => {
        await User.deleteMany({})
    
        for (let user of users) {
            let userObject = new User(user)
            await userObject.save()
        }
    
        login_info = await api.post('/api/login')
        .send({
            username: users[0].username.toString(),
            password: users[0].password.toString()
        });
    }
)





describe('blogs api', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    
        for (let blog of blogs) {
            let blogObject = new Blog(blog)
            await api.post('/api/blogs')
            .set('Authorization', "Bearer " + login_info.body.token)
            .send({title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes
            })
        }
    })

    test('Verify that the blog list application returns the correct amount of blog posts in the JSON format', async () => {
        const ddbb_blogs = await api
            .get('/api/blogs')
            .set('Authorization', "Bearer " + login_info.body.token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(ddbb_blogs.body.length).toEqual(blogs.length)
    })

    test('Verify that the unique identifier property of the blog posts is named id', async () => {
        const ddbb_blogs = await api
            .get('/api/blogs')
            .set('Authorization', "Bearer " + login_info.body.token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(ddbb_blogs.body[0].id).toBeDefined()
    })

    test('Verify that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
        const newBlog = {
            title: 'New Blog Entry!',
            author: 'Belén Simal',
            url: 'https://fullstackopen.com/',
            likes: 6,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', "Bearer " + login_info.body.token)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', "Bearer " + login_info.body.token)

        const titles = response.body.map((r) => r.title)

        expect(response.body).toHaveLength(blogs.length + 1)
        expect(titles).toContain('New Blog Entry!')
    })

    test('Verify that if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            title: 'New Blog Entry!',
            author: 'Belén Simal',
            url: 'https://fullstackopen.com/',
        }

        const bbdd_newBlog = await api
            .post('/api/blogs')
            .set('Authorization', "Bearer " + login_info.body.token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(bbdd_newBlog.body.likes).toBe(0)
    })

    test('Verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
        const newBlog_wo_title = {
            author: 'Belén Simal',
            url: 'https://fullstackopen.com/',
            likes: 2,
        }

        const newBlog_wo_url = {
            title: 'New Blog Entry!',
            author: 'Belén Simal',
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .set("Accept","application/json")
            .set('Authorization', "Bearer " + login_info.body.token)
            .send(newBlog_wo_title)
            .expect(400)

        await api
            .post('/api/blogs')
            .set('Authorization', "Bearer " + login_info.body.token)
            .send(newBlog_wo_url)
            .expect(400)
    }, 10000)

    test('Verify that a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', "Bearer " + login_info.body.token)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map((r) => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })

    test('Verify that a blog can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = 6

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', "Bearer " + login_info.body.token)
            .send(blogToUpdate)
            .expect(200)

        const blogAtEnd = await helper.blogInDb(blogsAtStart[0].id)

        expect(blogAtEnd.likes).toBe(blogToUpdate.likes)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
