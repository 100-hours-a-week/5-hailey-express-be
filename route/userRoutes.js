import express from "express";
import * as userController from "../controller/userController.js";
import multer from "multer";
const router = express.Router();
const upload = multer();

function isAuthenticated(req, res, next) {
  if (req.session.user == undefined) {
    return res.json({ success: false });
  }
  next();
}

router.get("/userInfo", isAuthenticated, userController.getUser);

router.get("/email/check", userController.checkEmailDuplicate);

router.get("/nickname/check", userController.checkNicknameDuplicate);

router.post(
  "/signup",
  upload.single("profileImage"),
  userController.createUser
);

router.get("/logout", userController.logout);

router.post("/login", userController.login);

router.get("/:userId", isAuthenticated, userController.userList);

router.patch(
  "/:userId/update",
  upload.single("profileImage"),
  isAuthenticated,
  userController.userUpdate
);

export default router;
