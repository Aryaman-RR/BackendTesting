const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a post
router.post("/posts", auth, async (req, res) => {
  try {
    // const post = new Post(req.body);
    const post = new Post({
      ...req.body,
      authorId: req.user._id,
      author: req.user.username,
    });
    console.log(post);
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
