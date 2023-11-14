const mongoose = require('mongoose')
const { model, Schema } = mongoose

const seguimentTypeSchema = new Schema({
    seguimentId: String,
    seguimentName: String,
    seguimentPrice: Number,
    seguimentDate: Date,
    seguimentState: Boolean,
}, { timestamps: true })

const seguimentType = model('Seguiment', seguimentTypeSchema)

module.exports = seguimentType