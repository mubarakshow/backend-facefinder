const Clarifai = require('clarifai');
require('dotenv').config()

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
})

const handleApiCall = (req, res) => {
  const { input } = req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('error working with API'))
}

const addEntries = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'))
}

// add other image related APIs here

module.exports = {
  addEntries: addEntries,
  handleApiCall: handleApiCall
}