import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide your Name"],
        minLength: [3, "Name must contain atleast 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Provide your Email"],
        validate: [validator.isEmail, "Please Provide a Valid Email Address"],
    },
    phone: {
        type: Number,
        required: [true, "Please Provide your Phone Number"],
    },
    role: {
        type: String,
        required: [true, "Please provide your Role"],
        enum: ["Job Seeker", "Employer"],
    },
    password: {
        type: String,
        required: [true, "Please Provide your Password"],
        minLength: [8, "Password must contain atleast 8 characters"],
        maxLength: [32, "Password cannot exceed 32 characters"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

//Hashing The Password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//Comparing Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate a JSON Web Token For Authorization
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);