import mongoose from "mongoose";

const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },description: {
        type: String,
        required: true,
    },image: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref : "User",
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
      },
      comments: [
        {
          text: String,
          user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
          createdAt: { type: Date, default: Date.now },
        },
      ],
});
export default mongoose.model("Blog",blogSchema);