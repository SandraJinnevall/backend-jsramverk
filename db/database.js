const mongoose = require('mongoose') //libary for mongodb.
const EditorDocument = require('../models/EditorDocument')
const TestEditorDocument = require('../models/TestEditorDocument')
const config = require("./../config.json");
const configjs = require("./../config.js");
require('dotenv').config()
let db = prosess.env.DB_LINK;
// let db = `mongodb+srv://${config.username}:${config.password}@cluster0.mc86y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
let schema = EditorDocument;

if (process.env.NODE_ENV === 'test') {
    console.log("TESTING MODE")
    schema = TestEditorDocument;
    console.log("schema!!", schema)
}

module.exports = {
    DB: db,
    connectdb: function connectDB() {
        mongoose.connect(db,
            err => {
                if(err) throw err;
                console.log('connected to MongoDB')
            }
        ); 
        return mongoose.connection
        .once('open', () => console.log('Connected!'))
        .on('error', (error) => {
            console.warn('Error : ',error);
        });
    },   
    closedb: function dbclose() {
        return mongoose.disconnect();
    },
    Schema: schema
}