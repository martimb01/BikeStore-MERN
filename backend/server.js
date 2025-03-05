//Importing dependecies
const express = require ('express');

// Declaring express App
const app = express();

// Declaring Port variable
const PORT = process.env.PORT || 5000;

//Listening to server
app.listen( PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})