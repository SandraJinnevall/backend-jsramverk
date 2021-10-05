const express = require('express');
const app = express();
const {PORT} = require('./config.js');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const editorDocumentRoutes = require('./routes/api/editorDocument');
const registerLoginUser = require('./routes/api/registerLoginUser');
const http = require("http").Server(app);

const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const visual = true;
const RootQueryType = require("./routes/graphql/root.js");

const socketio = require("socket.io")(http, {
        cors: {
        origin: ["http://www.student.bth.se", "http://localhost:8080", "http://www.student.bth.se/~saji19/editor/#/home"],
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

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

app.use('/', editorDocumentRoutes)
app.use('/api/editorDocument', editorDocumentRoutes)
app.use('/user', registerLoginUser)


const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual //glöm inte sätta till false vid produktion!!
}));

const server = http.listen(PORT, () => {
    console.log('api listening on port ' + PORT);
});



module.exports = server;