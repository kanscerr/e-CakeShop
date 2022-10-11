//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const custModel = require('./server/schema/customerSchema');
const prodModel = require('./server/schema/productSchema');
const prodUpload = require('./server/routes/prodUpload');
const customer = require('./server/routes/customer');
const display = require('./server/routes/mainPage');

const app = express();
const PORT = 8080;

//connecting with mongodb compass locally
mongoose.connect('mongodb://localhost/cakeshop', {useNewUrlParser : true}, () => console.log('connected with database!'));

//middleware
app.use(bodyParser.json());
app.use(express.json());

//API from routes

//for product collection
app.use("/products", prodUpload);

//for customer collection
app.use("/customer", customer);

//for main page
app.use("/main", display);


//server
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));