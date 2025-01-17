// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { DB } = require('./db.js');

class Server {
    constructor() {
        this.app = express();
        this.PORT = 3000;
        this.setUpMiddleWare();
        this.database = new DB();
    }

    setUpMiddleWare() {
        this.app.use(bodyParser.json());
    }

    start() {
        this.app.listen(this.PORT, () => {
            console.log(`Listening on port ${this.PORT}`);
        });
        this.database.run();
    }

}

const server = new Server();
server.start();

module.exports = { Server }