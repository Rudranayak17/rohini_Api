const commentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: [true, 'User is required for commenting'],
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      required: [true, 'Image reference is required'],
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      minlength: [1, 'Comment must be at least 1 character long'],
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
    }
  }, {
    timestamps: true
  });