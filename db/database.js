const mongoose = require('mongoose') //libary for mongodb.
const EditorDocument = require('../models/EditorDocument')
const TestEditorDocument = require('../models/TestEditorDocument')
const configjs = require("./../config.js");
require('dotenv').config()
let db = process.env.DB_LINK;
let schema = EditorDocument;

console.log("länk:", db);

if (process.env.NODE_ENV === 'test') {
    console.log("TESTING MODE")
    schema = TestEditorDocument;
}

module.exports = {
    DB: db,
    connectdb: function connectDB() {
        mongoose.connect(db,
            err => {
                if(err) throw err;
                console.log('connectdb!')
            }
        ); 
        return mongoose.connection
        .once('open', () => console.log('Connected!'))
        .on('error', (error) => {
            console.warn('Error : ',error);
        });
    },   
    closedb: function dbclose() {
        console.log("closedb")
        return mongoose.disconnect();
    },
    Schema: schema
}