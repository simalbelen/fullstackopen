const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
        id: 1,
    })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({ ...request.body, user: user.id })

        const saved_blog = await blog.save()

        user.blogs = user.blogs.concat(saved_blog._id)
        await user.save()

        response.status(201).json(saved_blog)
    } catch (error) {
        next(error);
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try{
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
            
        const blog_to_delete = await Blog.findById(request.params.id)    
        if (blog_to_delete.user.toString() != decodedToken.id.toString()){
            return response.status(401).json({ error: 'A blog can be deleted only by the user who added it' })
        }

        const deleted_blog = await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error);
    }
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes,
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then((updatedBlog) => {
            response.json(updatedBlog)
        })
        .catch((error) => next(error))
})

module.exports = blogsRouter
