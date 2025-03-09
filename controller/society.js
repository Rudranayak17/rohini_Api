// societyController.js
import { TryCatch } from "../middleware/error.js";
import Society from "../model/societyModal.js";
import User from "../model/userModel.js";
// CREATE - Add a new society
export const createSociety = TryCatch(async (req, res) => {
  const { name, address, ownerName, phoneNumber } = req.body;

  const society = new Society({
    name,
    address,
    ownerName,
    phoneNumber,
  });

  const savedSociety = await society.save();

  res.status(201).json({
    success: true,
    data: savedSociety,
    message: "Society created successfully",
  });
});

// READ - Get all societies
export const getAllSocieties = TryCatch(async (req, res) => {
  const societies = await Society.find().sort({
    createdAt:-1
  });

  res.status(200).json({
    success: true,
    count: societies.length,
    data: societies,
  });
});

// READ - Get single society by ID
export const getSocietyById = TryCatch(async (req, res) => {
  const society = await Society.findById(req.params.id);

  if (!society) {
    return res.status(404).json({
      success: false,
      message: "Society not found",
    });
  }

  res.status(200).json({
    success: true,
    data: society,
  });
});

// UPDATE - Update society by ID
export const updateSociety = TryCatch(async (req, res) => {
  const { name, address, ownerName, phoneNumber } = req.body;

  const society = await Society.findById(req.params.id);

  if (!society) {
    return res.status(404).json({
      success: false,
      message: "Society not found",
    });
  }

  // Update fields if provided in request body
  if (name) society.name = name;
  if (address) society.address = address;
  if (ownerName) society.ownerName = ownerName;
  if (phoneNumber) society.phoneNumber = phoneNumber;

  const updatedSociety = await society.save();

  res.status(200).json({
    success: true,
    data: updatedSociety,
    message: "Society updated successfully",
  });
});

// DELETE - Delete society by ID
export const deleteSociety = TryCatch(async (req, res) => {
  const society = await Society.findById(req.params.id);

  if (!society) {
    return res.status(404).json({
      success: false,
      message: "Society not found",
    });
  }

  await society.remove();

  res.status(200).json({
    success: true,
    message: "Society deleted successfully",
  });
});


// UPDATE - Update user role by society ID and user ID
export const updateUserRole = TryCatch(async (req, res) => {
    const { societyId, userId, newRole } = req.body;
  
    // Validate inputs
    if (!societyId || !userId || !newRole) {
      return res.status(400).json({
        success: false,
        message: "Society ID, User ID, and new role are required",
      });
    }
  
    // Validate newRole is one of the allowed enum values
    const validRoles = ["user", "admin", "superAdmin"];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(", ")}`,
      });
    }
  
    // Check if society exists
    const society = await Society.findById(societyId);
    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }
  
    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
        societyid: societyId,
      },
      {
        role: newRole,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or doesn't belong to the specified society",
      });
    }
  
    res.status(200).json({
      success: true,
      data: {
        email: updatedUser.email,
        role: updatedUser.role,
        societyId: updatedUser.societyid,
      },
      message: "User role updated successfully",
    });
  });
  
  // Alternative: Update first user found in society to specified role
  export const updateAnyUserRoleBySociety = TryCatch(async (req, res) => {
    const { societyId, newRole } = req.body;
  
    // Validate inputs
    if (!societyId || !newRole) {
      return res.status(400).json({
        success: false,
        message: "Society ID and new role are required",
      });
    }
  
    // Validate newRole
    const validRoles = ["user", "admin", "superAdmin"];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(", ")}`,
      });
    }
  
    // Check if society exists
    const society = await Society.findById(societyId);
    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }
  
    // Find and update first matching user
    const updatedUser = await User.findOneAndUpdate(
      { societyid: societyId },
      { role: newRole },
      {
        new: true,
        runValidators: true,
      }
    );
  
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "No users found in this society",
      });
    }
  
    res.status(200).json({
      success: true,
      data: {
        email: updatedUser.email,
        role: updatedUser.role,
        societyId: updatedUser.societyid,
      },
      message: "User role updated successfully",
    });
  });



  export const getUsersBySocietyId = TryCatch(async (req, res) => {
    const { societyId } = req.params; // Assuming societyId comes from URL params
  
    // Validate societyId
    if (!societyId) {
      return res.status(400).json({
        success: false,
        message: "Society ID is required",
      });
    }
  
    // Check if society exists
    const society = await Society.findById(societyId);
    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }
  
    // Get all users associated with this society
    const users = await User.find({ societyid: societyId })
      .select("-password") // Exclude password field from results
      .populate("societyid", "name address"); // Optional: populate society details
  
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found for this society",
      });
    }
  
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
      society: {
        id: society._id,
        name: society.name,
      },
      message: "Users retrieved successfully",
    });
  });