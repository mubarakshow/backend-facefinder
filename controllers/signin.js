const handleSignin = (req, res, db, bycrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('fill your email and password')
  }
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
}

module.exports = {
  handleSignin: handleSignin
}