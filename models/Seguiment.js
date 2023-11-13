const mongoose = require('mongoose')
const { model, Schema } = mongoose

const noteSchema = new Schema({
    userId: String,
    professionalId: String,
    noteBody: String,
    noteType: String,
    noteStatus: String,
    noteInitialDate: Date,
    noteFinalDate: Date
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = model('Note', noteSchema)

module.exports = Note