const mongoose = require('mongoose') //libary for mongodb.
const EditorDocument = require('../models/EditorDocument')
const TestEditorDocument = require('../models/TestEditorDocument')
const configjs = require("./../config.js");
const config = require("./../config.json");
require('dotenv').config()
dblink = `mongodb+srv://${config.username}:${config.password}@cluster0.mc86y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

let db = process.env.DB_LINK || dblink;
let schema = EditorDocument;

if (process.env.NODE_ENV === 'test') {
    console.log("TESTING MODE")
    db = "mongodb://localhost:27017/test"
} 


module.exports = {
    DB: db,
    Schema: schema
}