const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)
const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0,
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('blogs api', () => {
    test('Verify that the blog list application returns the correct amount of blog posts in the JSON format', async () => {
        const ddbb_blogs = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(ddbb_blogs.body.length).toEqual(blogs.length)
    })

    test('Verify that the unique identifier property of the blog posts is named id', async () => {
        const ddbb_blogs = await api
            .get('/api/blogs')
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
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map((r) => r.title)

        expect(response.body).toHaveLength(blogs.length + 1)
        expect(titles).toContain('New Blog Entry!')
    })

    test('Verify that if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            title: 'New Blog Entry!',
            author: 'Belén Simal',
            url: 'https://fullstackopen.com/'
        }

        const bbdd_newBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(bbdd_newBlog.body.likes).toBe(0)
    })

    test('Verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
        const newBlog_wo_title = {
            author: 'Belén Simal',
            url: 'https://fullstackopen.com/',
            likes: 2
        }

        const newBlog_wo_url = {
            title: 'New Blog Entry!',
            author: 'Belén Simal',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog_wo_title)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(newBlog_wo_url)
            .expect(400)
    })
    
})

afterAll(async () => {
    await mongoose.connection.close()
})
