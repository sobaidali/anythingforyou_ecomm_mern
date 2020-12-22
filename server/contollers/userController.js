const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
//User
const User = require('../models/userModel')
const { findOneAndUpdate } = require('../models/userModel')

//@desc Auth user and get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).exec()
        if(user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            return res.status(401).json({message: "Invalid email or password."})
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
})
//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body
    try {
        const userExists = await User.findOne({ email }).exec()

        if (userExists) {
            return res.status(400).json({ message: "User already exists." })
        }

        const user = await User.create({
            name, 
            email,
            password
        })
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            return res.status(400).json({ message: "Invalid user data." })
        }
    } catch (err) {
        return res.status(500).json({message: "Network error."})
    }
}) 
//@desc Get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    try {
        const users = await User.find({}).exec()
        return res.status(200).json({ users })
    } catch (err) {
        return res.status(200).json({ message: "Network error." })
    }
})
//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id
    try {
        const user = await User.findById(userId).exec()
        if (user) {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        }
    } catch (err) {
        return res.status(500).json({ message: "Network error." })
    }
})
//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body
    const { _id } = req.user
    try {
        const user = await User.findById(_id)
        if (user) {
            user.name= name || user.name
            user.email= email || user.email
            if (password) {
                user.password= password
            }
            const updatedUser= await user.save()
            return res.status(200).json({
                _id: updatedUser._id,    
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id)
            })
        } else {
            return res.status(400).json({ message: "User not found." })
        }
    } catch (err) {
        return res.status(500).json({ message: "Network err." })
    }
})

export {
    authUser,
    registerUser,
    getUsers,
    getUserProfile,
    updateUserProfile
}