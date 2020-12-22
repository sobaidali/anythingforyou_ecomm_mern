const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
//User
const User = require('../models/userModel')
const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token= req.headers.authorization.split(' ')[1]
            const decoded= jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (err) {
            return res.status(401).json({ message: "Not authorized, token failed."})
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token."})
    }
})
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        return res.status(401).json({ message: "Not authorized as admin." })
    }
}

export { protect, admin }