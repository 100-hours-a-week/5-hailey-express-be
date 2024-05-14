import express from "express";
import * as postController from "../controller/postController.js";
import multer from "multer";
const router = express.Router();
const upload = multer();

function isAuthenticated(req, res, next) {
  if (req.session.user == undefined) {
    return res.json({ success: false });
  }
  next();
}

router.get("/posts", isAuthenticated, postController.postList);

router.get("/posts/:postNum", isAuthenticated, postController.postDetail);

router.get(
  "/posts/:postNum/comments",
  isAuthenticated,
  postController.postComment
);

router.post(
  "/post/new",
  upload.single("file"),
  isAuthenticated,
  postController.newPost
);

router.patch(
  "/posts/:postNum/update",
  upload.single("file"),
  isAuthenticated,
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
