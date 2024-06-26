const fs = require("fs");
const path = require("path");

// const __dirname = path.resolve();
const usersFilePath = path.join(__dirname, "data/users.json");

// const usersFilePath = new URL("../data/users.json", import.meta.url).pathname;

// function addUser(newUser) {
//   const userData = fs.readFileSync(__dirname + "/data/users.json");
//   let users = [];

//   users = JSON.parse(userData).users;

//   users.push(newUser);

//   fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users));
// }

function isDuplicateEmail(checkEmail) {
  const userData = fs.readFileSync(usersFilePath);
  const usersData = JSON.parse(userData).users;

  const userEmailFound = usersData.find((user) => user.email === checkEmail);

  if (userEmailFound) {
    return true;
  } else {
    return false;
  }
}

function isDuplicateNickname(checkNickname) {
  const userData = fs.readFileSync(usersFilePath);
  const usersData = JSON.parse(userData).users;

  const userNicknameFound = usersData.find(
    (user) => user.nickname === checkNickname
  );

  if (userNicknameFound) {
    return true;
  } else {
    return false;
  }
}

function addUser(newUser) {
  // 파일이 존재하지 않으면 빈 배열로 초기화
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify({ users: [] }));
  }

  // 파일 읽기
  const userData = fs.readFileSync(usersFilePath);

  // JSON 파싱
  let usersData = JSON.parse(userData);

  usersData.users.push(newUser);

  // JSON 파일에 쓰기
  fs.writeFileSync(usersFilePath, JSON.stringify(usersData));
}

function checklogin(email, password) {
  const userData = fs.readFileSync(usersFilePath);
  let usersData = JSON.parse(userData);

  const userFound = usersData.users.find(
    (user) => user.email == email && user.password == password
  );

  if (userFound) {
    return {
      userId: userFound.user_id,
      email: email,
      nickname: userFound.nickname,
      profileImage: userFound.profileImage,
    };
  } else {
    return false;
  }
}

function modifyUser(reUser) {
  const userData = fs.readFileSync(usersFilePath, "utf8");

  let usersData = JSON.parse(userData);

  for (let i = 0; i < usersData.users.length; i++) {
    if (reUser.user_id == usersData.users[i].user_id) {
      usersData.users[i].nickname = reUser.nickname;
      usersData.users[i].profileImage = reUser.profileImage;
      usersData.users[i].updated_at = reUser.updated_at;
    }
  }

  fs.writeFileSync(usersFilePath, JSON.stringify(usersData));
}

module.exports = {
  isDuplicateEmail,
  isDuplicateNickname,
  addUser,
  checklogin,
  modifyUser,
};
