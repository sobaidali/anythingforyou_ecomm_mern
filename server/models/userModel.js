const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamps: true
    }
)
//mongoose methods
userSchema.methods.matchPassword = async (enteredPass) => {
        return await bcrypt.compare(enteredPass, this.password)
}
userSchema.pre('save', async (next) => {
    if (!this.isModified('password')) {
        next()
    }
    const salt= await bcrypt.genSalt(10)
    this. password= await bcrypt.hash(this.password, salt)
})

module.exports= mongoose.model('User', userSchema)