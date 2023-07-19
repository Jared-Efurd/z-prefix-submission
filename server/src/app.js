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
    .where('password', password)
    .then(users => {
      if (users.length > 0) {
        const user = users[0];

        delete user.password;
        res.status(200).send(JSON.stringify(user));
      } else {
        res.status(404).send(JSON.stringify({message:`Incorrect username or password!`}));
      }
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({message:`Incorrect username or password!`}));
      console.log(err);
      });
})

app.post('/users', (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  knex('user')
    .select('*')
    .where('username', username)
    .then(users => {
      if (users.length > 0) {
        res.status(409).send(JSON.stringify({message:`Username is already in use!`}));
      } else {
        const newUser = req.body;
        knex('user')
          .insert(newUser, ['id', 'first_name', 'last_name', 'username'])
          .then(users => {
            const user = users[0];
            res.status(201).send(JSON.stringify(user));
            console.log(`Successfully added new user`);
          })
          .catch(err => {
            console.log(err);
            res.status(400).send(JSON.stringify({message:`Error adding new user!`}));
          })
      }
    })
})

app.get('/users/:userId/items', (req, res) => {
  const userId = req.params.userId;

  knex('item')
    .select('*')
    .where('user_id', userId)
    .then(data => {
      res.status(200).send(JSON.stringify(data));
    })
    .catch(err => {
      console.log(err);
    })
})

app.delete('/users/:userId/items/:itemId/delete', (req, res) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;

  knex('item')
    .where('id', itemId)
    .where('user_id', userId)
    .del()
    .then(affectedRowsCount => {
      knex('item')
        .select('*')
        .where('user_id', userId)
        .then(data => {
          res.status(200).send(JSON.stringify(data));
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      res.status(400).send(JSON.stringify({message:`Failed to delete item!`}));
      console.log(err);
    })
})

app.put('/users/:userId/items/:itemId/update', (req, res) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;
  const { id, user_id, name, description, quantity } = req.body;

  if (id && user_id && name && description && quantity) {
    knex('item')
      .where('id', itemId)
      .where('user_id', userId)
      .update({
        id: id,
        user_id: user_id,
        name: name,
        quantity: quantity,
        description: description
      }, ['id', 'user_id', 'name', 'quantity', 'description'])
      .then(items => {
        const item = items[0];
        res.status(200).send(JSON.stringify(item));
      })
      .catch(err => {
        res.status(400).send(JSON.stringify({message:`Failed to update item!`}));
        console.log(err);
      })
  }
})

app.post('/items', (req, res) => {
  const { user_id, name, description, quantity } = req.body;

  if (user_id && name && description && quantity) {
    knex('item')
      .select('*')
      .where('user_id', user_id)
      .where('name', name)
      .then(items => {
        if (items.length > 0) {
          res.status(409).send(JSON.stringify({message:`Item already exists!`}));
        } else {
          const item = {
            user_id: user_id,
            name: name, 
            description: description,
            quantity: quantity
          };
          knex('item')
            .insert(item, ['id', 'user_id', 'name', 'description', 'quantity'])
            .then(items => {
              const newItem = items[0];
              res.status(201).send(JSON.stringify(newItem));
              console.log(`Successfully added new item`);
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
  } else {
    res.status(401).send(JSON.stringify({message:`Invalid info provided!`}));
  }
})

app.get('/items', (req, res) => {
  knex('item')
    .select('*')
    .then(items => {
      if (items.length > 0) {
        res.status(200).send(JSON.stringify(items));
      } else {
        res.status(404).send(JSON.stringify({message:`Items not found!`}));
      }
    })
})

app.get('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;

  knex('item')
    .select('*')
    .where('id', itemId)
    .then(items => {
      const item = items[0];
      res.status(200).send(JSON.stringify(item));
    })
    .catch(err => {
      res.status(404).send(JSON.stringify({message:`Item not found!`}));
    })
})

app.listen(port, () => {
  console.log(`Server is successfully listening on port ${port}...`)
});