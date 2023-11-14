const mongoose = require('mongoose')
const { model, Schema } = mongoose

const userSchema = new Schema({
    userName: String,
    userFirstName: String,
    userLastName: String,
    userDateBirth: Date,
    userDNI: String,
    userGender: String,
    userAddress: String,
    userCP: String,
    userTypeAddress: String,
    userAddressNumber: Number,
    userAddressStair: String,
    userEmail: String,
    userTelephon: String,
    userDate: Date,
    userState: Boolean,
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User
