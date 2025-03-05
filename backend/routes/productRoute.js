const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controller/productController.js')

const router = express.Router();

//Route to get all products
router.get('/', getProducts )
 
 //Route for creating a new product
 router.post('/', createProduct )
 
 //Route to update a product
 router.put('/:id', updateProduct )
 
 //Route do delete products
 router.delete('/:id', deleteProduct )

module.exports = router