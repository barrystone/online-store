import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  //// Test to show error
  // throw new Error('Not authorized')
  res.json(products)
})

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProduct, getProductById }
