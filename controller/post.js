
import { TryCatch } from "../middleware/error.js";
import Image from "../model/imageModel.js";


// Create a new image post
export const createImage = TryCatch(async (req, res) => {
  const { imageUrl, title, description } = req.body;
console.log(req.user._id)
  const image = await Image.create({
    imageUrl,
    title,
    description,
    user:req.user?._id
  });

  res.status(201).json({
    success: true,
    message: "Image post created successfully",
    data: image,
  });
});

// Get all image posts
export const getAllImages = TryCatch(async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 }); // Sort by creation date descending

  res.status(200).json({
    success: true,
    count: images.length,
    data: images,
  });
});

// Get single image post by ID
export const getImageById = TryCatch(async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return res.status(404).json({
      success: false,
      message: "Image post not found",
    });
  }

  res.status(200).json({
    success: true,
    data: image,
  });
});

// Update image post
export const updateImage = TryCatch(async (req, res) => {
  const { imageUrl, title, description } = req.body;

  const image = await Image.findById(req.params.id);

  if (!image) {
    return res.status(404).json({
      success: false,
      message: "Image post not found",
    });
  }

  // Update only provided fields
  if (imageUrl) image.imageUrl = imageUrl;
  if (title) image.title = title;
  if (description !== undefined) image.description = description;

  const updatedImage = await image.save();

  res.status(200).json({
    success: true,
    message: "Image post updated successfully",
    data: updatedImage,
  });
});

// Delete image post
export const deleteImage = TryCatch(async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return res.status(404).json({
      success: false,
      message: "Image post not found",
    });
  }

  await image.remove();

  res.status(200).json({
    success: true,
    message: "Image post deleted successfully",
  });
});


