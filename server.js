const express = require('express');
const app = express();
const {PORT} = require('./config.js');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const editorDocumentRoutes = require('./routes/api/editorDocument');
const http = require("http").Server(app);

const socketio = require("socket.io")(http, {
        cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))



socketio.sockets.on("connection", socket => {
    socket.on('create', room => {
        if (!room) {
            room = socket.id;
        }
        socket.join(room);
    });
    socket.on("text", docData => {
        if (!docData["_id"]) {
            docData["_id"] = socket.id;
        }
        console.log("backend data", docData);
        socket.to(docData["_id"]).emit("text", docData);
    });
});

app.use('/api/editorDocument', editorDocumentRoutes)

const server = http.listen(PORT, () => {
    console.log('api listening on port ' + PORT);
});



module.exports = server;