const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res)=> res.json({response: "Backend"}));


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
});