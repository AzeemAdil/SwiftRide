import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"], 
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  vehicleModel: {
    type: String,
    required: true,
    trim: true,
  },
  licensePlate: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model("Driver", driverSchema);
