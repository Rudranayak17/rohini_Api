const likeSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: [true, 'User is required for liking'],
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      required: [true, 'Image reference is required'],
    }
  }, {
    timestamps: true,
    // Prevent duplicate likes from same user on same image
    unique: true,
    indexes: [
      { key: { user: 1, image: 1 }, unique: true }
    ]
  });

  const Like = mongoose.model('Like', likeSchema);

  export default Like;