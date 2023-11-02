const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()
const url = process.env.MONGODB_URI

console.log('Connecting to MongoDB...')

mongoose
    .connect(url)
    .then(console.log('Connected to MongoDB!'))
    .catch((error) => {
        console.log('ERROR connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                return /[0-9]{2,3}-[0-9]*/.test(v)
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        required: [true, 'User phone number required'],
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
