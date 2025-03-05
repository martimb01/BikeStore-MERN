//Importing dependecies
const dotenv = require('dotenv');
const express = require ('express');
const cors = require('cors');
const connectToDB = require('./config/db.js')
const productRouter = require('./routes/productRoute.js')
//Configuring env variables
dotenv.config();

// Declaring  express App
const app = express();


//Middleware to parse request as JSON
app.use(express.json());


//Allowing CORS
app.use(cors())
//Setting Product Router
app.use('/products', productRouter )

// Declaring Port variable
const PORT = process.env.PORT || 5000;

//Listening to server
app.listen( PORT, () => {
    connectToDB();
    console.log(`Server listening on port: ${PORT}`)
})