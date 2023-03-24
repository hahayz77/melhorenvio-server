require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');
const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));

app.get('/', (req, res)=> res.json({response: "Backend"}));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
});