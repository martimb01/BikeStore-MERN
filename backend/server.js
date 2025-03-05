//Importing dependecies
const dotenv = require('dotenv');
const express = require ('express');
const connectToDB = require('./config/db.js')
const Product = require('./models/Product.js');
//Configuring env variables
dotenv.config();

// Declaring  express App
const app = express();

//Middleware to parse request as JSON
app.use(express.json());

// Declaring Port variable
const PORT = process.env.PORT || 5000;

//Route to get all products
app.get('/products', async (req,res) => {
   try {
    const products = await Product.find({});
    res.status(200).json({sucess: true, data: products})

   } catch (err) {
    console.log(err.message)
    res.status(500)
   }
})

//Route for creating a new product
app.post('/products', async (req,res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.price) {
        return res.status(400).json({sucess:false, message:'Please provide all fields'})
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save()
        res.status(201).json({sucess:true, data: newProduct})
    }catch (err) {
        console.log(err.message)
        return res.status(500).json({sucess:false, message:'Server error'})
    }

})

//Route do delete products
app.delete('/products/:id', async (req,res) => {
    const idToDelete = req.params.id;
    
    try{
        await Product.findByIdAndDelete(idToDelete)
        res.status(200).json({sucess:true, message:"Deleted"})
    }catch (err) {
        console.log(err.message)
        res.status(404).json({sucess:false, message:"Product does not exist"})
    }

})



//Listening to server
app.listen( PORT, () => {
    connectToDB();
    console.log(`Server listening on port: ${PORT}`)
})