const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

postSchema.pre("save", function (next) {
  const post = this;
  const hasCapitalWords = /[A-Z]/.test(post.content);
  if (hasCapitalWords) {
    return next(new Error("Post content should not contain capital words"));
  }
  post.verified = true;
  next();
});

module.exports = mongoose.model("Post", postSchema);
