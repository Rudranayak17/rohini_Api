import express from "express";
import {
  createImage,
  deleteImage,
  getAllImages,
  getImageById,
  updateImage,
} from "../controller/post.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, createImage)
  .get(isAuthenticated, getAllImages);

router
  .route("/:id")
  .get(isAuthenticated, getImageById)
  .put(isAuthenticated, updateImage)
  .delete(deleteImage);

export default router;
