const { Schema, model } = require('mongoose')

const EditorDocumentSchema = new Schema({
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

const EditorDocument = model('editorDocument', EditorDocumentSchema)

module.exports = EditorDocument