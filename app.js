require('dotenv/config')
const express = require('express');
const bycrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json())

const database = {
  users: [
    {
      id: '1212',
      name: 'Mubarak',
      email: 'mubarak4show@yahoo.com',
      password: '12345',
      entries: 0,
      joined: new Date()
    },
    {
      id: '1555',
      name: 'Teslim',
      email: 'teslimshow@yahoo.com',
      password: '54321',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.json(database.users)
})

app.post('/signin', (req, res) => {
  const sumbittedEmail = req.body.email;
  const submittedPassword = req.body.password;
  const user = database.users.find(user => user['email'] === sumbittedEmail)
  if (user && user.password == submittedPassword) {
    res.status(200).json(user)
  } else {
    res.status(400).json('error signing in')
  }
})

var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  bycrypt.hash(password, null, null, (err, hash) => {
    // Store hash in password DB.
    console.log(hash)
  })
  database.users.push({
    id: ID(),
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length -1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user)
    }
  })
  if (!found) {
    res.status(404).json('No user found')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user)
    }
  })
  if (!found) {
    res.status(404).json('cannot add entries. user not found')
  }
})

app.get('/users', (req, res) => {
  res.json(database.users)
})


// bycrypt.hash('bacon', null, null, (err, hash) => {
//   // Store hash in password DB.
// })

// bycrypt.compare('bacon', hash, (err, res) => {
//   // res == true
// })

// bycrypt.compare('veggies',  hash, (err, res) => {
//   // res == false
// })









const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
