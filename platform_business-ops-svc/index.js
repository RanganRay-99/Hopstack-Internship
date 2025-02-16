const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/login', require('./routes/auth'));

app.use('/codes', require('./routes/codes'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started!');
});