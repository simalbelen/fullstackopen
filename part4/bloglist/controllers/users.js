const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
        id: 1,
    })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const user = new User(request.body)

    const saved_user = user.save()
    response.status(201).json(saved_user)
})

module.exports = usersRouter
