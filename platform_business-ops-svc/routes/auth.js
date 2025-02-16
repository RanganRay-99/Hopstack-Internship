require('dotenv').config()
const express = require('express');
const router = express.Router();
const jsonweb = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const user = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD
};

router.post('/', (req, res) => {
    const { username, password } = req.body;
  
    if (username === user.username && password === user.password) {
      const jwt = jsonweb.sign({ username }, secretKey);
      res.json({ jwt });
    } else {
      res.status(200).json({ message: 'Invalid username or password' });
    }
  });

module.exports = router;