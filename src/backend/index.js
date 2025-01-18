// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { DB } = require('./db.js');
const bcrypt = require('bcrypt');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.PORT = 3000;
        this.setUpMiddleWare();
        this.database = new DB();
        this.setUpRoutes()
    }

    setUpMiddleWare() {
        this.app.use(bodyParser.json());
        this.app.use(cors())
    }

    setUpRoutes() {
        this.app.post('/login', async (req, res) =>{
            const {username, password } = req.body;

            try{
                const user = await this.database.User.findOne({where: {username}})

                if(!user){
                    return res.status(401).json({message: "Invalid Email or Password"});
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if(!isPasswordValid){
                    return res.status(401).json({message: "Invalid Email or Password"});
                }

                res.status(202).json({message: "Login Successful"});
            }
            catch{
                console.error(err);
                res.status(500).json({message: "Server Error"})
            }
        })
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