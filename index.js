//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const custModel = require('./server/schema/customer');
const prodModel = require('./server/schema/product');
const prodUpload = require('./server/routes/prodUpload');

const app = express();
const PORT = 8080;

//connecting with mongodb compass locally
mongoose.connect('mongodb://localhost/cakeshop', {useNewUrlParser : true}, () => console.log('connected with database!'));

//middleware
app.use(bodyParser.json());
app.use(express.json());

//API from routes
app.use("/products", prodUpload);

//server
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));