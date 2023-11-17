const mongoose = require('mongoose')
const { model, Schema } = mongoose

const noteSchema = new Schema({
    userId:  { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    professionalId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Professional' 
    },
    noteBody: String,
    noteType: { 
        type: Schema.Types.ObjectId, 
        ref: "Seguiment" 
    },
    noteStatus: String,
    noteInitialDate: Date,
    noteFinalDate: Date
}, { timestamps: true })

const Note = model('Note', noteSchema)

module.exports = Note