const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const knex = require('knex')(require('../knexfile.js')['development']);

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Successful test!');
})

app.listen(port, () => {
  console.log(`Server is successfully listening on port ${port}...`)
});