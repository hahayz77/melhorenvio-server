require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/shipment', require('./routes/shipment'));

app.get('/', (req, res)=> res.json({response: "Api to access MelhorEnvio"}));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
});