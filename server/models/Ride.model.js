

import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    default: null, 
  },
  pickupLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point", 
      required: true
    },
    coordinates: {
      type: [Number], 
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  dropLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point", 
      required: true
    },
    coordinates: {
      type: [Number], 
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  rideStatus: {
    type: String,
    enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  fare: {
    type: Number,
    required: true,
  },
  distanceKm: {
    type: Number,
    required: true,
  },
  routePolyline: {
    type: String, 
  },
  shared: {
    type: Boolean,
  },
  rideMakerPhoneNumber: {
    type: String,
  },
  driverPhoneNumber:{
    type: String,
    default: null,
  }
}, { timestamps: true });


rideSchema.index({ "pickupLocation.coordinates": "2dsphere" });
rideSchema.index({ "dropLocation.coordinates": "2dsphere" });

export default mongoose.model("Ride", rideSchema);

