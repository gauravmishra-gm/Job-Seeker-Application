import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Your Name!"],
    minLength: [3, "Name Must Contain atleast 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 characters!"],
  },
  email: {
    type: String,
    validator: [validator.isEmail, "Please Provide a Valid Email"],
    required: [true, "Please Provide your Email!"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide your Cover Letter!"],
  },
  phone: {
    type: Number,
    required: [true, "Please Provide your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please Provide your Address!"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
