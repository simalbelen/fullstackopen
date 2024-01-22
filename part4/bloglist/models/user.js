const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
})

// Antes de guardar, aplicar el hash a la contraseña
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
            next()
        } catch (error) {
            next(error)
        }
    } else {
        next()
    }
})

// Agregar validación personalizada para la longitud de la contraseña
userSchema.path('password').validate(
    function (value) {
        return value.length >= 3
    },
    (value) =>
        `Path \`password\` (\`${value.value}\`) is shorter than the minimum allowed length (3).`
)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the password should not be revealed
        delete returnedObject.password
    },
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User
