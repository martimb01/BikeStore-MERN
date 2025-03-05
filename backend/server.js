//Importing dependecies
const dotenv = require('dotenv');
const express = require ('express');
const mongoose = require('mongoose');
const connectToDB = require('./config/db.js')

//Configuring env variables
dotenv.config();

// Declaring express App
const app = express();

// Declaring Port variable
const PORT = process.env.PORT || 5000;

//Declaring a route for testing
app.get('/products', (req,res) => {
    res.send('All products')
})



//Listening to server
app.listen( PORT, () => {
    connectToDB();
    console.log(`Server listening on port: ${PORT}`)
})