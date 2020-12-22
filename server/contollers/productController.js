import asyncHandler from 'express-async-handler'
import Product from '../models/productModel'

//@desc fetch all products
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async(req, res) => {
    const { pageNumber, keyword } = req.query

    const pageSize = 10
    const page = Number(pageNumber) || 1

    const query = keyword 
    ? {
        name: {
            $regex: keyword,
            $options: 'i'
        },
    }
    : {}

    try {
        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword }) 
            .limit(pageSize)
            .skip(pageSize*(page-1))
        return res.status(200).json({ products, page, pages: Math.ceil(count/pageSize)})   
    } catch (err) {
        return res.this.status(500).json({ message: "Network error." })
    }
})

//@desc fetch single product
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async(req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            return res.status(200).json({ product })
        } else {
            return res.status(404).json({ message: "Product not found." })
        }
    } catch (err) {
        return res.status(500).json({ message: "Product not found." })
    }
}) 

//@desc Delete product
//@route DELETE /api/product/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async(req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findByIdAndRemove(id)
        if (product) {
            return res.status(200).json({ message: "Product removed." })
        } else {
            return res.status(404).json({ message: "Product not found." })
        }
    } catch (err) {
        return res.status(500).json({ message: "Network error." })
    }
})

//@desc Create a Product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async(req, res) => {
    
})