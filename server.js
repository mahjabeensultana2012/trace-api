const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'mahjabeensultana',
    password: '',
    database: 'face-recognition',
  },
});

//console.log(postgres.select('*').from.users);
const app = express();

app.use(bodyParser.json());
app.use(cors());
const database = {
  users: [
    {
      id: '1',
      name: 'nishi',
      email: 'nishi@gmail.com',
      password: '123',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '2',
      name: 'nameera',
      email: 'nameera@gmail.com',
      password: '123',
      entries: 0,
      joined: new Date(),
    },
  ],
};
app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  bcrypt.compare(
    '1234',
    '$2a$10$oJk5SfkVPHe4eC5CvMMi0u8mLw6o.1uXo4vfVLVTyD/iOUyFhQ.S6',
    function(err, res) {
      console.log('first guess: ', res);
    }
  );

  bcrypt.compare(
    'veggies',
    '$2a$10$oJk5SfkVPHe4eC5CvMMi0u8mLw6o.1uXo4vfVLVTyD/iOUyFhQ.S6',
    function(err, res) {
      console.log('Second guess: ', res);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    //res.json('success');
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // database.users.push({
  //   id: '3',
  //   name: name,
  //   email: email,

  //   entries: 0,
  //   joined: new Date(),
  // }),
  db('users')
    .insert({
      name: name,
      email: email,
      joined: new Date(),
    })
    .then(console.log);
  res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json('Not found such user');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json('not found');
  }
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});

/*
/ --> res= this is working
/signin --> POST = success/fail
/register -->POST =user
/profile/:userid -->GET =user
/image -->PUT -->user
*/
