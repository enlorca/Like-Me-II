const express = require("express");

const {
  handleGetPosts,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
} = require("../controllers/controllers");

const router = express.Router();

router.get("/posts", handleGetPosts);
router.post("/posts", handleCreatePost);
router.put("/posts/:id", handleUpdatePost);
router.delete("/posts/:id", handleDeletePost);

module.exports = router;
