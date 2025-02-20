import mongoose, { Schema, model } from "mongoose";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

//  Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    role: {
      type: String,
      enum: ["jobProvider", "jobSeeker","admin","superAdmin"],
  
      required: true,
    },
    username: {
      type: String,
    
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profile: {
      type: String,
    },

    emailVerified: {
      type: Boolean,
      default: true,
    },
    otp: {
      type: Number,
    },
    otp_expiry: {
      type: Date,
    },
    resetPasswordOTP: {
      type: String,
    },
    resetPasswordOTPExpiry: {
      type: Date,
    },
    phone: {
      type: String,
      required: true,
      // validate: {
      //   validator: function (value) {
      //     // Basic phone number validation (allows numbers with optional '+' and digits 10-15)
      //     return /^\+?\d{10,15}$/.test(value);
      //   },
      //   message: (props) => `${props.value} is not a valid phone number!`,
      // },
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 10);
  next();
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
};

// userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.model("User", userSchema);

export default User;
