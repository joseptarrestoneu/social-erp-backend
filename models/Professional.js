const mongoose = require('mongoose')
const { model, Schema } = mongoose

const professionalSchema = new Schema({
    professionalName: String,
    professionalFirstName: String,
    professionalLastName: String,
    professionalDNI: String,
    professionalEmail: String,
    professionalUser: String,
    professionalPassword: String,
    professionalDate: Date,
    professionalState: Boolean
})

professionalSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Professional = model('Professional', professionalSchema)

module.exports = Professional