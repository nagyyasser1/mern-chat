import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

conversationSchema.pre("find", function (next) {
  this.populate({
    path: "participants",
    select: { password: 0, createdAt: 0, updatedAt: 0, gender: 0, fullName: 0 },
  });
  this.sort({ updatedAt: -1 }); // Sort by latest update (assuming timestamps represent message updates)
  this.populate({
    path: "messages",
    options: { sort: { updatedAt: -1 }, limit: 1 }, // Populate only the last message
  });
  next();
});

// conversationSchema.pre("findOne", function (next) {
//   this.populate("participants");
//   this.sort({ updatedAt: -1 }); // Sort by latest update (assuming timestamps represent message updates)
//   this.populate({
//     path: "messages",
//     options: { sort: { updatedAt: -1 }, limit: 1 }, // Populate only the last message
//   });
//   next();
// });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
