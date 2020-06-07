require('dotenv/config')
const express = require('express');
const bycrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const users = require('./controllers/getAllUsers');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
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
  users.getAllUsers(req, res, db)
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bycrypt)
})

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bycrypt) 
})

app.get('/profile/:id', (req, res) => {
  profile.getProfile(req, res, db)
})

app.put('/image', (req, res) => {
  image.addEntries(req, res, db)
})

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
})

const port = process.env.PORT;
app.listen(port || 3001, () => {
  console.log(`app listening on port ${port}`)
});
