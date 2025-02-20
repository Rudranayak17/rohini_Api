import { Router } from "express";
import {
  
  getMyProfile,

  login,
  register,

  updateProfile,

} from "../controller/userController.js";
import {  isAuthenticated } from "../middleware/auth.js";

const userRouter = Router();


// created signin  route
userRouter.post("/login", login);
// step by step for register
userRouter.post("/register", register);


//authenticated  user route

userRouter
  .get("/profile", isAuthenticated, getMyProfile)
  .put("/profile", isAuthenticated, updateProfile);




export default userRouter;