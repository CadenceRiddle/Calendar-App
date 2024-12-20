const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Calendar is running')
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})