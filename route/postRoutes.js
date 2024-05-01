import express from "express";
import * as postController from "../controller/postController.js";
import multer from "multer";
const router = express.Router();
const upload = multer();

router.get("/posts", postController.postList);

router.get("/posts/:postNum", postController.postDetail);

router.get("/posts/:postNum/comments", postController.postComment);

router.post("/post/new", upload.single("file"), postController.newPost);

router.patch(
  "/posts/:postNum/update",
  upload.single("file"),
  postController.postUpdate
);

router.post(
  "/posts/:postNum/comments",
  upload.single("file"),
  postController.newComment
);

router.patch(
  "/posts/:postNum/comments/update",
  upload.single("file"),
  postController.commentUpdate
);

router.patch(
  "/posts/:postNum/comments/:commentId",
  upload.single("file"),
  postController.commentDelete
);

router.patch(
  "/posts/:postNum/delete",
  upload.single("file"),
  postController.postDelete
);

export default router;
