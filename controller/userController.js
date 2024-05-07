import fs from "fs";
import path from "path";
import { isDuplicateEmail } from "../model/userModel.js";
import { isDuplicateNickname } from "../model/userModel.js";
import { addUser } from "../model/userModel.js";
import { checklogin } from "../model/userModel.js";
import { modifyUser } from "../model/userModel.js";
const __dirname = path.resolve();
const usersFilePath = path.join(__dirname, "data/users.json");

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

function getUserId() {
  const userData = fs.readFileSync(usersFilePath);
  const users = JSON.parse(userData).users;

  // 만약 데이터 배열이 비어 있다면 0을 반환
  if (users.length === 0) {
    return 1; // 데이터 배열이 비어있는 경우, 첫 번째 게시물의 user_id를 1로 설정
  }

  const lastUserId = users[users.length - 1].user_id;
  return lastUserId + 1;
}

function createUser(req, res) {
  const { email, password, nickname, profileImage } = req.body;
  const newUser = {
    user_id: getUserId(),
    email,
    password,
    nickname,
    profileImage,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
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

function userList(req, res) {
  const userId = req.params.userId;

  const userDetailData = fs.readFileSync(usersFilePath);

  const userDetails = JSON.parse(userDetailData).users;

  const getUserDetail = userDetails.find((user) => user.user_id == userId);

  res.json({ getUserDetail });
}

function userUpdate(req, res) {
  const userId = req.params.userId;

  const { nickname, profileImage } = req.body;
  const reUser = {
    user_id: userId,
    nickname,
    profileImage,
    updated_at: new Date().toISOString(),
  };

  modifyUser(reUser);

  res
    .status(200)
    .json({ message: "회원정보 수정이 성공적으로 완료되었습니다." });
}

export {
  checkEmailDuplicate,
  checkNicknameDuplicate,
  createUser,
  login,
  userUpdate,
  userList,
};
