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

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  knex('user')
    .select('*')
    .where('username', username)
    .then(data => {
      const user = data[0];
      if (user.password === password) {
        const response = {...user};
        delete response.password;
        res.status(200).send(JSON.stringify(response));
      } else {
        res.status(401).send('Invalid username or password');
        throw new Error('Invalid password');
      }
    })
    .catch(err => {
      console.log(err);
    });
})

app.post('/sign-up', (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  knex('user')
    .select('*')
    .where('username', username)
    .then(data => {
      if (data.length > 0) {
        res.status(409).send('Username is already in use');
      } else {
        const user = req.body;
        knex('user')
          .insert(user, ['id', 'first_name', 'last_name', 'username'])
          .then(data => {
            const newUser = data[0];
            res.status(201).send(JSON.stringify(newUser));
          })
          .catch(err => {
            console.log(err);
          })
      }
    })
})

app.listen(port, () => {
  console.log(`Server is successfully listening on port ${port}...`)
});