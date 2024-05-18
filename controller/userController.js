const fs = require("fs");
const path = require("path");
const {
  isDuplicateEmail,
  isDuplicateNickname,
  addUser,
  checklogin,
  modifyUser,
} = require("../model/userModel.js");

// const __dirname = path.resolve();
const usersFilePath = path.join(__dirname, "../model/data/users.json");

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getUser(req, res) {
  const userId = req.session.user.userId;
  const profileImage = req.session.user.profileImage;

  res.json({ userId, profileImage });
}

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
    created_at: formatDate(new Date()),
    updated_at: formatDate(new Date()),
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
    req.session.user = {
      userId: success.userId,
      email: email,
      nickname: success.nickname,
      profileImage: success.profileImage,
    };
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
    updated_at: formatDate(new Date()),
  };

  modifyUser(reUser);

  res
    .status(200)
    .json({ message: "회원정보 수정이 성공적으로 완료되었습니다." });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("세션 삭제 중 에러 발생:", err);
      res.status(500).json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
}

module.exports = {
  getUser,
  checkEmailDuplicate,
  checkNicknameDuplicate,
  createUser,
  login,
  userUpdate,
  userList,
  logout,
};
