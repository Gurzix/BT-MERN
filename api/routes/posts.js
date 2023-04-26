const router = require("express").Router();
const Post = require("../models/Post");

// create new post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json("Coś poszło nie tak!");
  }
});

router.get("/", async (req, res) => {
  const catName = req.query.cat;
  try {
    let posts;
    if (catName) {
      posts = await Post.find({ categories: $in[catName] });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json("Coś poszło nie tak!");
  }
});

module.exports = router;
