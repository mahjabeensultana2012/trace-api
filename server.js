const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

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
  res.send('This is working');
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(400).json('error logging in');
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
