import mongoose from 'mongoose';

// Define the schema
const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
    match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please enter a valid URL']
  },
  title: {
    type: String,
    required: [true, 'Title iss required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true 
});

// Create the model
const Image = mongoose.model('Post', imageSchema);

// Export the model
export default Image;