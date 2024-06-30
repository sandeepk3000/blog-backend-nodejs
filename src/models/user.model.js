import mongoose from "mongoose";
import bcript from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcript.hash(this.password, 10);
    next()
})

userSchema.methods.isVailidPassword = async function (password) {
    return await bcript.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        name: this.name
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generatRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET
        ,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export  const User = mongoose.model("User",userSchema)
