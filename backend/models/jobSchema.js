import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please Provide Job Title"],
        minLength: [3, "Job Title must contain atleast 3 Characters!"],
        maxLength: [50, "Job Title cannot exceed 50 Charcters!"],
    },
    description: {
        type: String,
        required: [true, "Please Provide Job Description"],
        minLength: [50, "Job Description must contain atleast 50 Characters!"],
        maxLength: [350, "Job Description cannot exceed 350 Characters!"],
    },
    category: {
        type: String,
        required: [true, "Job Category is Required!"],
    },
    country: {
        type: String,
        required: [true, "Country is Required!"],
    },
    city: {
        type: String,
        required: [true, "City is Required!"],
    },
    location: {
        type: String,
        required: [true, "Please Provide Exact Location"],
        minLength: [10, "Job Location must contain atleast 10 Characters!"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Salary must contain alteast 4 digits!"],
        maxLength: [9, "Salary cannot exceed 9 digits!"]
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Salary must contain alteast 4 digits!"],
        maxLength: [9, "Salary cannot exceed 9 digits!"]
    },
    salaryTo: {
        type: Number,
        minLength: [4, "Salary must contain alteast 4 digits!"],
        maxLength: [9, "Salary cannot exceed 9 digits!"]
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("Job",jobSchema);