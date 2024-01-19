const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)
const users = helper.initialUsers

 beforeEach(async () => {
    await User.deleteMany({})

    for (let user of users) {
        let userObject = new User(user)
        await userObject.save()
    }
})

describe('users api', () => {
    
    test('Verify that making an HTTP POST request to the /api/users URL successfully creates a new user', async () => {
        const newUser = {
            username: 'myusername',
            name: 'myname',
            password: '1234'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')

        const usernames = response.body.map((r) => r.username)

        expect(response.body).toHaveLength(users.length + 1)
        expect(usernames).toContain('myusername')
    })

    test('Verify that if the username or password properties are missing from the request data, or have a length of less than 3, the backend responds to the request with the status code 400 Bad Request', async () => {
        const newUser_repeated = {
            username: 'newusername',
            name: 'newname',
            password: '1234'
        }
        
        const newUser_wo_username = {
            name: 'myname',
            password: '1234'
        }

        const newUser_wo_password = {
            username: 'myusername',
            name: 'myname'
        }

        const newUser_w_short_username = {
            username: 'my',
            name: 'myname',
            password: '1234'
        }

        const newUser_w_short_password = {
            username: 'myusername',
            name: 'myname',
            password: '1'
        }

        await api.post('/api/users').send(newUser_repeated).expect(400)

        await api.post('/api/users').send(newUser_wo_username).expect(400)

        await api.post('/api/users').send(newUser_wo_password).expect(400)

        await api.post('/api/users').send(newUser_w_short_username).expect(400)

        await api.post('/api/users').send(newUser_w_short_password).expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
