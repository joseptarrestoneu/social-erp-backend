const mongoose = require('mongoose')
const { model, Schema } = mongoose

const userSchema = new Schema({
    userName: String,
    userFirstName: String,
    userLastName: String,
    userDNI: String,
    userEmail: String,
    userDate: Date,
    userState: Boolean
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = model('User', userSchema)

module.exports = User
