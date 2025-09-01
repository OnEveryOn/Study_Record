import express from "express";
import { configDotenv } from "dotenv";
import axios from "axios";
import querystring from "querystring";
import cookieParser from "cookie-parser";

const app = express();
const port = 9090;

configDotenv();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

const kakaoConfig = {
  KAKAO_JSKEY: process.env.KAKAO_JAVASCRIPT_KEY,
  KAKAO_REDIRECTURI: process.env.KAKAO_REDIRECT_URI,
  KAKAO_CLIENT_ID: process.env.KAKAO_REST_API_KEY,
};

// 일반 사용자
const users = [];

app.get("/signup", (req, res) => {
  res.render("signup");
});

// 회원가입
app.post("/api/signup", (req, res) => {
  const { userName, userID, userPW } = req.body;
  let isExisting = users.find((user) => user.id === userID);
  if (isExisting) {
    return res.json({ success: false, message: "이미 존재하는 아이디입니다." });
  }
  // 회원 추가
  users.push({ id: userID, pw: userPW });
  console.log(users)
  return res.json({
    success: true,
    message: "회원가입이 정상적으로 완료되었습니다.",
    userID: userID,
    userPW: userPW,
  });
});

// 로그인 페이지
app.get("/login", (req, res) => {
  res.render("login", {
    kakaoJSkey: kakaoConfig.KAKAO_JSKEY,
  });
});

// 로그인 api 호출
app.post("/api/login", (req, res) => {
  const {id, pw} = req.body
  const islogined = users.find(user => user.id === id && user.pw === pw)
  if (islogined) {
    res.json({
      success: true,
      message: "로그인에 성공하였습니다.",
      userID: islogined.id
    });
  } else {
    res.json({
      success: false,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }
})

app.get("/main", (req, res) => {
  res.render("eventControl", {
    kakaoJSkey: kakaoConfig.KAKAO_JSKEY,
  });
});

app.get("/oauth", async (req, res) => {
  //  코드 발급 후 콜백 처리
  console.log("==== 인가 코드 정상 발급 ====");
  const authCode = req.query.code;
  try {
    const result = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: querystring.stringify({
        grant_type: "authorization_code",
        client_id: kakaoConfig.KAKAO_CLIENT_ID,
        redirect_uri: kakaoConfig.KAKAO_REDIRECTURI,
        code: authCode,
      }),
    });

    // 토큰 httponly 쿠키로 저장
    const userInfo = result.data;

    // access token
    res.cookie("access_token", userInfo.access_token, {
      httpOnly: true,
      maxAge: userInfo.expires_in * 1000,
    });

    // // refresh token
    res.cookie("refresh_token", userInfo.refresh_token, {
      httpOnly: true,
      maxAge: userInfo.refresh_token_expires_in * 1000,
    });

    // 메인 화면으로 리다이렉션
    res.redirect("/main");
  } catch (error) {
    console.log("인가 코드 발급 중 에러 발생 : ", error);
  }
});

// 사용자 정보 추출
app.post("/profile", async (req, res) => {
  try {
    const user = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${req.cookies.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const userInfo = user.data;
    const kakao_account = userInfo.kakao_account.profile;
    res.json({
      success : true,
      userID: user.data.id,
      userNickname: kakao_account.nickname,
    });
    console.log("사용자 정보 조회 성공 : ", user.data.id);
  } catch (error) {
    console.log("사용자 정보 조회 실패: ", error);
  }
});

app.post("/kakaoLogout", async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return;
    const result = await axios({
      method: "POST",
      url: "https://kapi.kakao.com/v1/user/logout",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false,
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: false,
    });

    res.send({ success: true });
  } catch (error) {
    console.log("로그아웃 중 에러 발생 :", error);
  }
});

app.listen(port, () => {
  console.log(`${port}에서 듣고 있습니다.`);
});
