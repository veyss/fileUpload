const express = require('express');
const fileUpload = require('express-fileupload');
const connectDatabase = require("./connectDatabase")
const { addNewProduct } = require("./controller/products")
const dotenv = require("dotenv");
const app = express();

// Environment Variables

dotenv.config({path : "./config/config.env"});

app.use(fileUpload());

// MongoDb Connection
connectDatabase();

// Upload Endpoint

app.post('/upload', addNewProduct)

app.listen(5000, () => console.log('Server Started...'));