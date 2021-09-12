const { Schema, model } = require('mongoose')

const TestEditorDocumentSchema = new Schema({
    documentHeading: {
        type: String,
        required: true,
    },
    documentText: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const TestEditorDocument = model('testeditorDocument', TestEditorDocumentSchema)

module.exports = TestEditorDocument