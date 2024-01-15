const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', (request, response) => {
    User.find({}).then((users) => {
        response.json(users)
    })
})

usersRouter.post('/', async (request, response) => {
    const user = new User(request.body)

    user.save()
        .then((result) => {
            response.status(201).json(result)
        })
        .catch((error) => response.status(400).json(error))
})

module.exports = usersRouter