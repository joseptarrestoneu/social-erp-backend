const mongoose = require('mongoose')
const { model, Schema } = mongoose

const logsSchema = new Schema({
    logDate: Date,
    professionalId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Professional' 
    },
    logAction: String
}, { timestamps: true })

const Logs = model('Logs', logsSchema)

module.exports = Logs