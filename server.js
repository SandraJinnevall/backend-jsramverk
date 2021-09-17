const express = require('express')
const app = express()
const mongoose = require('mongoose') //libary for mongodb.
const {PORT} = require('./config.js')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const editorDocumentRoutes = require('./routes/api/editorDocument')
const path = require('path')
const database = require('./db/database')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))


app.use('/api/editorDocument', editorDocumentRoutes)

const server = app.listen(PORT, () => {
    console.log('api listening on port ' + PORT);
});

module.exports = server;