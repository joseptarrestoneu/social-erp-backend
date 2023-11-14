const mongoose = require('mongoose')
const { model, Schema } = mongoose

const professionalSchema = new Schema({
    professionalName: String,
    professionalFirstName: String,
    professionalLastName: String,
    professionalDNI: String,
    professionalRol: String,
    professionalEmail: String,
    professionalUser: String,
    professionalPassword: String,
    professionalDate: Date,
    professionalState: Boolean
}, { timestamps: true })

const Professional = model('Professional', professionalSchema)

module.exports = Professional