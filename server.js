const express = require('express');
const app = express();
const {PORT} = require('./config.js');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const editorDocumentRoutes = require('./routes/api/editorDocument');

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))


app.use('/api/editorDocument', editorDocumentRoutes)

const server = app.listen(PORT, () => {
    console.log('api listening on port ' + PORT);
});

module.exports = server;