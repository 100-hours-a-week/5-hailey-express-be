import fs from "fs";
import path from "path";
const __dirname = path.resolve();
const postFilePath = path.join(__dirname, "data/posts.json");
const commentsFilePath = path.join(__dirname, "data/post_comments.json");

function writePost(newPost) {
  // 파일이 존재하지 않으면 빈 배열로 초기화
  if (!fs.existsSync(postFilePath)) {
    fs.writeFileSync(postFilePath, JSON.stringify({ posts: [] }));
  }

  // 파일 읽기
  const postData = fs.readFileSync(postFilePath);

  // JSON 파싱
  let postsData = JSON.parse(postData);

  if (!postsData.posts) {
    postsData.posts = [];
  }

  postsData.posts.push(newPost);

  // JSON 파일에 쓰기
  fs.writeFileSync(postFilePath, JSON.stringify(postsData));
}

function modifyPost(rePost) {
  const postData = fs.readFileSync(postFilePath, "utf8");

  let postsData = JSON.parse(postData);

  for (let i = 0; i < postsData.posts.length; i++) {
    if (rePost.post_id == postsData.posts[i].post_id) {
      postsData.posts[i].post_title = rePost.post_title;
      postsData.posts[i].post_content = rePost.post_content;
    }
  }

  fs.writeFileSync(postFilePath, JSON.stringify(postsData));
}

function writeComment(newComment) {
  // 파일 읽기
  const commentData = fs.readFileSync(commentsFilePath);

  // JSON 파싱
  let commentsData = JSON.parse(commentData);

  commentsData.comments.push(newComment);

  // JSON 파일에 쓰기
  fs.writeFileSync(commentsFilePath, JSON.stringify(commentsData));
}

function modifyComment(reComment) {
  const commentData = fs.readFileSync(commentsFilePath, "utf8");

  let commentsData = JSON.parse(commentData);

  for (let i = 0; i < commentsData.comments.length; i++) {
    if (reComment.comment_id == commentsData.comments[i].comment_id) {
      commentsData.comments[i].comment_content = reComment.comment_content;
    }
  }

  fs.writeFileSync(commentsFilePath, JSON.stringify(commentsData));
}

function removeComment(deleteComment) {
  const commentData = fs.readFileSync(commentsFilePath, "utf8");

  let commentsData = JSON.parse(commentData);

  for (let i = 0; i < commentsData.comments.length; i++) {
    if (deleteComment.comment_id == commentsData.comments[i].comment_id) {
      commentsData.comments[i].deleted_at = deleteComment.deleted_at;
    }
  }

  fs.writeFileSync(commentsFilePath, JSON.stringify(commentsData));
}

function removePost(deletePost) {
  const postData = fs.readFileSync(postFilePath, "utf8");

  let postsData = JSON.parse(postData);

  for (let i = 0; i < postsData.posts.length; i++) {
    if (deletePost.post_id == postsData.posts[i].post_id) {
      postsData.posts[i].deleted_at = deletePost.deleted_at;
    }
  }

  fs.writeFileSync(postFilePath, JSON.stringify(postsData));
}

export {
  writePost,
  modifyPost,
  writeComment,
  modifyComment,
  removeComment,
  removePost,
};
