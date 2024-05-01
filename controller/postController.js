import fs from "fs";
import path from "path";
import { writePost } from "../model/postModel.js";
import { modifyPost } from "../model/postModel.js";
import { writeComment } from "../model/postModel.js";
import { modifyComment } from "../model/postModel.js";
import { removeComment } from "../model/postModel.js";
import { removePost } from "../model/postModel.js";
const __dirname = path.resolve();
const postsFilePath = path.join(__dirname, "data/posts.json");
const commentsFilePath = path.join(__dirname, "data/post_comments.json");

function postList(req, res) {
  const postData = fs.readFileSync(postsFilePath);
  const posts = JSON.parse(postData).posts;

  const getPost = posts.filter((post) => post.deleted_at == null); //삭제 되지 않은 게시글들만 보여주기
  res.json({ posts: getPost });
}

function postDetail(req, res) {
  const postNum = req.params.postNum;

  const postDetailData = fs.readFileSync(postsFilePath);

  const postDetails = JSON.parse(postDetailData).posts;

  const getPostDetail = postDetails.find((post) => post.post_id == postNum);

  res.json({ getPostDetail });
}

function postComment(req, res) {
  const postNum = req.params.postNum;
  const commentData = fs.readFileSync(commentsFilePath);

  const postComments = JSON.parse(commentData).comments;

  const getComment = postComments.filter(
    (comment) => comment.post_id == postNum && comment.deleted_at == null //삭제 되지않은 댓글들만 보여주기
  );

  res.json({ getComment });
}

function getPostId() {
  const postData = fs.readFileSync(postsFilePath);
  const posts = JSON.parse(postData).posts;

  // 만약 데이터 배열이 비어 있다면 0을 반환
  if (posts.length === 0) {
    return 1; // 데이터 배열이 비어있는 경우, 첫 번째 게시물의 post_id를 1로 설정
  }

  const lastPostId = posts[posts.length - 1].post_id;
  return lastPostId + 1;
}

function newPost(req, res) {
  const postId = getPostId();
  const newPost = {
    post_id: postId,
    post_title: req.body.title,
    post_content: req.body.content,
    nickname: "임맹구",
    file_id: req.body.file,
    user_id: 1,
    created_at: new Date().toISOString(), // 현재 시간으로 설정
    updated_at: new Date().toISOString(),
    deleted_at: null,
    like: 0,
    comment_count: 0,
    hits: 0,
    profile_image_path: "/image/짱구.jpeg",
  };

  writePost(newPost);

  res.status(200).json({ message: "게시글 등록이 성공적으로 완료되었습니다." });
}

function postUpdate(req, res) {
  const postNum = req.params.postNum;

  const rePost = {
    post_id: postNum,
    post_title: req.body.title,
    post_content: req.body.content,
    file_id: req.body.file,
    updated_at: new Date().toISOString(),
  };

  modifyPost(rePost);

  res.status(200).json({ message: "게시글 수정이 성공적으로 완료되었습니다." });
}

function getCommentId() {
  const commentData = fs.readFileSync(commentsFilePath);
  const comments = JSON.parse(commentData).comments;

  const lastCommentId = comments[comments.length - 1].comment_id;
  return lastCommentId + 1;
}

function newComment(req, res) {
  const postNum = req.params.postNum;

  const newComment = {
    comment_id: getCommentId(),
    comment_content: req.body.comment,
    post_id: postNum,
    user_id: 1,
    nickname: "테스트",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    file_id: 1,
    profile_image_path: "/image/짱구.jpeg",
  };

  writeComment(newComment);

  res.status(200).json({ message: "댓글 등록이 성공적으로 완료되었습니다." });
}

function commentUpdate(req, res) {
  const reComment = {
    comment_id: req.body.comment_id,
    comment_content: req.body.content,
  };

  modifyComment(reComment);

  res.status(200).json({ message: "댓글 수정이 성공적으로 완료되었습니다." });
}

function commentDelete(req, res) {
  const deleteComment = {
    comment_id: req.body.comment_id,
    deleted_at: new Date().toISOString(),
  };

  removeComment(deleteComment);

  res.status(200).json({ message: "댓글 삭제가 성공적으로 완료되었습니다." });
}

function postDelete(req, res) {
  const deletePost = {
    post_id: req.body.post_id,
    deleted_at: new Date().toISOString(),
  };

  removePost(deletePost);

  res.status(200).json({ message: "게시글 삭제가 성공적으로 완료되었습니다." });
}

export {
  postList,
  postDetail,
  postComment,
  newPost,
  postUpdate,
  newComment,
  commentUpdate,
  commentDelete,
  postDelete,
};
