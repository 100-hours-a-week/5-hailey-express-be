import express from "express";
import * as postController from "../controller/postController.js";
const router = express.Router();

router.get("/posts", postController.postList);
router.get("/posts/:postNum", postController.postDetail);
router.get("/posts/:postNum/comments", postController.postComment);
router.post(
  "/post/new",
  postController.imageUpload.single("file"),
  postController.newPost
);
router.patch(
  "/posts/:postNum/update",
  postController.imageUpload.single("file"),
  postController.postUpdate
);
router.post(
  "/posts/:postNum/comments",
  postController.imageUpload.single("file"),
  postController.newComment
);
router.patch(
  "/posts/:postNum/comments/update",
  postController.imageUpload.single("file"),
  postController.commentUpdate
);

router.patch(
  "/posts/:postNum/comments/:commentId",
  postController.imageUpload.single("file"),
  postController.commentDelete
);

router.patch(
  "/posts/:postNum/delete",
  postController.imageUpload.single("file"),
  postController.postDelete
);

export default router;
