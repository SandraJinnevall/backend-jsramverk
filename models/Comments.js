const { Schema, model } = require('mongoose')

const CommentsSchema = new Schema({
    color: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    markedText: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    documentID: {
        type: String,
        required: true,
    }
})

const Comments = model('Comments', CommentsSchema)

module.exports = Comments