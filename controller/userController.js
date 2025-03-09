import { compare } from "bcrypt";
import { TryCatch } from "../middleware/error.js";
import User from "../model/userModel.js";
import { generateOTP } from "../utils/userUtils.js";
import ErrorHandler from "../utils/utilit-class.js";
import sendToken from "../utils/sendToken.js";

export const register = TryCatch(async (req, res, next) => {
  const { username, email, password, phone, role, societyid } = req.body;
  console.log({ username, email, password, phone, role });
  if (!username || !email || !password | !phone) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }
  // Generate OTP and its expiry time
  const otp = generateOTP();
  const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);
  const newUser = await User.create({
    username: username,
    phone: phone,
    email,
    password,
    otp,
    otp_expiry,
    societyid,
  });
  await newUser.save();

  sendToken(newUser, 200, res, `Welcome back, ${newUser.username || "User"}`);
});

// Log in a user by checking credentials and storing the token in a cookie
export const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  console.log({ email, password });
  // Check if all required fields are present
  if (!email || !password) {
    return next(new ErrorHandler("Please fill in all the details", 400));
  }

  // Find user by email and include password for comparison
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }

  // Compare provided password with stored hashed password
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }
  // console.log(user);
  sendToken(user, 200, res, `Welcome back, ${user.username || "User"}`);
  // sendToken(res, user, 200, `Welcome back, ${user.name}`);
});

// Get the currently logged-in user's profile
export const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);
  // console.log(user);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
    message: "User profile retrieved successfully",
  });
});

export const updateProfile = TryCatch(async (req, res, next) => {
  const {
    username,
    phone,
    address,
    profile_URL,
    bio,
    instagram,
    twitter,
    facebook,
    linkedin,
    birthdate,
    anniversary
  } = req.body;

  const id = req.user._id;

  const updateData = {
    username,
    phone,
    address,
    profile_URL,
    bio,
    instagram,
    twitter,
    facebook,
    linkedin,
    birthdate: birthdate ? new Date(birthdate) : undefined,
    anniversary: anniversary ? new Date(anniversary) : undefined
  };

  const user = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      _id: user._id,
      username: user.username,
      phone: user.phone,
      address: user.address,
      profile_URL: user.profile_URL,
      bio: user.bio,
      instagram: user.instagram,
      twitter: user.twitter,
      facebook: user.facebook,
      linkedin: user.linkedin,
      birthdate: user.birthdate,
      anniversary: user.anniversary
    }
  });
});

// admin -- All User Detail
export const getAllUserDetails = TryCatch(async (req, res, next) => {
  const user = await User.find({}).sort({ createdAt: -1 });

  return res.status(200).json({
    message: "All user  found successfull",
    success: true,
    user,
  });
});
