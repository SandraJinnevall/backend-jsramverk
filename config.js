// const config = require("./config.json");

// process.env.MONGOLINK = `mongodb+srv://${config.username}:${config.password}@cluster0.mc86y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports = {
    PORT: process.env.PORT || 1337,
}