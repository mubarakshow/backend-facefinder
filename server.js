require('dotenv/config')
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.get('/', (req, res) => {
  console.log(req.headers)
  res.send("Hellooooo Mubarak!")
});

app.get('/profile', (req, res) => {
  res.send('getting profile')
});

app.post('/profile', (req, res) => {
  console.log(req.body)
  const user = {
    name: 'Mubarak',
    title: 'Tech Entreprenure'
  }
  res.send(user)
});





const port = process.env.PORT;
app.listen(port, () => console.log(`we running backend on port ${port}`))