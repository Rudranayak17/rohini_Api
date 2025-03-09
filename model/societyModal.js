// Society.js - Mongoose Society Schema and Model using ES6 imports/exports
import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Society Schema
const societySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Society name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Society address is required"],
      trim: true,
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          // Basic phone validation - can be customized according to your needs
          return /\d{10,}/.test(v.replace(/[^\d]/g, ""));
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);




const Society = mongoose.model("Society", societySchema);

export default Society;
