const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Chat name is required"],
      trim: true,
      minlength: [2, "Chat name must be at least 2 characters long"],
      maxlength: [100, "Chat name cannot exceed 100 characters"],
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required: true,
      },
    ],
    isGroup: {
      type: Boolean,
      default: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
