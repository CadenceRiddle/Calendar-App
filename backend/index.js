const express = require('express');
const bodyParser = require('body-parser');


class Server{
  constructor(){
    this.app = express();
    this.PORT = 3000;

    this.setUpMiddleWare();

  }

  setUpMiddleWare(){
    this.app.use(bodyParser.json());
  }

  start(){
    this.app.listen(this.PORT, () => {
      console.log(`listening on port ${this.PORT}`)
    })
  }
}

const server = new Server()
server.start();
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Calendar is running')
// })

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`)
// })