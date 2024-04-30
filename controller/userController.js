import { isDuplicateEmail } from "../model/userModel.js";
import { isDuplicateNickname } from "../model/userModel.js";
import { addUser } from "../model/userModel.js";
import { checklogin } from "../model/userModel.js";
import multer from "multer";

function checkEmailDuplicate(req, res) {
  const checkEmail = req.query.email;

  const checkInputEmail = isDuplicateEmail(checkEmail);
  res.json({ isDuplicate: checkInputEmail });
}

function checkNicknameDuplicate(req, res) {
  const checkNickname = req.query.nickname;

  const checkInputNickname = isDuplicateNickname(checkNickname);
  res.json({ isDuplicate: checkInputNickname });
}

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "image/"); // 이미지를 저장할 디렉토리를 지정
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // 파일명을 변경하지 않고 그대로 유지
    },
  }),
});

function createUser(req, res) {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
    profileImage: req.file.path,
  };

  addUser(newUser);

  res.status(200).json({ message: "회원가입이 성공적으로 완료되었습니다." });
}

function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const success = checklogin(email, password);

  if (success) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
}

export {
  checkEmailDuplicate,
  checkNicknameDuplicate,
  createUser,
  imageUpload,
  login,
};
