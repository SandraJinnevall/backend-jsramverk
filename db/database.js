const mongoose = require('mongoose') //libary for mongodb.
const EditorDocument = require('../models/EditorDocument')
const TestEditorDocument = require('../models/TestEditorDocument')
const config = require("./../config.json");
const db = `mongodb+srv://${config.username}:${config.password}@cluster0.mc86y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
let schema = EditorDocument;

if (process.env.NODE_ENV === 'test') {
    // We can even use MongoDB Atlas for testing
    console.log("TESTING MODE")
    schema = TestEditorDocument;
}

mongoose.connect(db,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });

module.exports = {
    DB: db,
    Schema: schema
}