import express from "express";
import { configDotenv } from "dotenv";

const router = express.Router();

configDotenv();

const kakaoConfig = {
  KAKAO_JSKEY: process.env.KAKAO_JAVASCRIPT_KEY,
  KAKAO_REDIRECTURI: process.env.KAKAO_REDIRECT_URI,
  KAKAO_CLIENT_ID: process.env.KAKAO_REST_API_KEY,
};

// 메인 페이지
router.get("/main", (req, res) => {
  res.render("main", {
    kakaoJSkey: kakaoConfig.KAKAO_JSKEY,
  });
});

// 회원가입 페이지
router.get("/signup", (req, res) => {
  res.render("signup");
});

// 로그인 페이지
router.get("/login", (req, res) => {
  res.render("login", {
    kakaoJSkey: kakaoConfig.KAKAO_JSKEY,
  });
});

// 채팅 페이지
router.get("/chat", (req, res) => {
  res.render("chat");
});

// 알림 페이지
router.get("/popup", (req, res) => {
  res.render("popup");
});

// 메인 페이지
router.get("/", (req, res) => {
  res.render("login", {
    kakaoJSkey: kakaoConfig.KAKAO_JSKEY,
  });
});


export default router;