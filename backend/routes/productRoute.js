const express = require('express');
const mongoose = require('mongoose')
const Product = require('../models/Product.js');

const router = express.Router();

//Route to get all products
router.get('/', async (req,res) => {
    try {
     const products = await Product.find({});
     res.status(200).json({sucess: true, data: products})
 
    } catch (err) {
     console.log(err.message)
     res.status(500)
    }
 })
 
 //Route for creating a new product
 router.post('/', async (req,res) => {
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
 
 //Route to update a product
 router.put('/:id', async (req,res) => {
     const idToUpdate = req.params.id;
     const product = req.body;
 
     if (!mongoose.Types.ObjectId.isValid(idToUpdate)) {
         return res.status(404).json({sucess:false, message:"Product does not exist"})
     }
     
     try{
         const updatedProduct = await Product.findByIdAndUpdate(idToUpdate, product,{new:true})
         res.status(200).json({sucess: true, data: updatedProduct});
     } catch (err) {
         console.log(err.message)
         res.status(500).json({sucess: false, message:"Server error"})
     }
 })
 
 //Route do delete products
 router.delete('/:id', async (req,res) => {
     const idToDelete = req.params.id;
     
     try{
         await Product.findByIdAndDelete(idToDelete)
         res.status(200).json({sucess:true, message:"Deleted"})
     }catch (err) {
         console.log(err.message)
         res.status(404).json({sucess:false, message:"Product does not exist"})
     }
 
 })

module.exports = router