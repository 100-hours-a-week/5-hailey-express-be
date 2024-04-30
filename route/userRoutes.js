import express from "express";
import * as userController from "../controller/userController.js";
const router = express.Router();

router.get("/email/check", userController.checkEmailDuplicate);

router.get("/nickname/check", userController.checkNicknameDuplicate);

router.post(
  "/signup",
  userController.imageUpload.single("profileImage"),
  userController.createUser
);

router.post("/login", userController.login);

export default router;
