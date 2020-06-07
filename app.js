require('dotenv/config')
const express = require('express');
const bycrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: process.env.PG_PASSWORD,
    database: 'smartbrain'
  }
});


const app = express()

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json())



app.get('/', (req, res) => {
  db.select('*').from('users')
    .then(data => res.json(data))
})

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bycrypt.compareSync(password, data[0]['hash']);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('error'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  const hash = bycrypt.hashSync(password)
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date(),
      })
        .then(user => {
          res.json(user[0]) 
        })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('cannnot register'))
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({
    id: id
  })
  .then(user => {
    if (user.length) {
      res.json(user[0])
    } else {
      res.status(404).json('user does not exist')
    }
  })
  .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'))
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
});
