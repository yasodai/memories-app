const express = require("express");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

const postController = require("../controllers/postController");

router.get("/search", postController.getPostsBySearch);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);

router.post("/", requireAuth, postController.createPosts);
router.patch("/:id", requireAuth, postController.updatePost);
router.delete("/:id", requireAuth, postController.deletePost);
router.patch("/:id/likePost", requireAuth, postController.likePost);
router.patch("/:id/commentPost", requireAuth, postController.commentPost);

module.exports = router;
