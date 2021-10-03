const mongoose = require('mongoose') //libary for mongodb.
const EditorDocument = require('../models/EditorDocument')
const TestEditorDocument = require('../models/TestEditorDocument')
const configjs = require("./../config.js");
require('dotenv').config()
let db = process.env.DB_LINK;
let schema = EditorDocument;

if (process.env.NODE_ENV === 'test') {
    console.log("TESTING MODE")
    db = "mongodb://localhost:27017/test"
} 

module.exports = {
    DB: db,
    Schema: schema
}