import express from "express";
import { configDotenv } from "dotenv";
import axios from "axios";
import querystring from "querystring";
import fs, { access } from "fs";
import jwt from 'jsonwebtoken';

configDotenv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();

const kakaoConfig = {
  KAKAO_JSKEY: process.env.KAKAO_JAVASCRIPT_KEY,
  KAKAO_REDIRECTURI: process.env.KAKAO_REDIRECT_URI,
  KAKAO_CLIENT_ID: process.env.KAKAO_REST_API_KEY,
};

const userInfoFile = "public/data/userInfo.json";

// 카카오 사용자 정보 조회 api 호출 함수
const getKakaoUserInfo = async (accessToken) => {
  try {
    const user = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    return user.data;
  } catch (error) {
    throw error;
  }
};

/* 일반 회원가입 */
router.post("/signup", (req, res) => {
  const { userName, userEmail, userPW } = req.body;

  fs.readFile(userInfoFile, "utf8", (err, data) => {
    if (err) throw err;

    const jsonData = JSON.parse(data);
    const isExisting = jsonData.users.find((user) => user.email === userEmail);

    if (isExisting) {
      return res.json({
        success: false,
        message: "이미 존재하는 사용자입니다.",
      });
    }

    // 회원 추가
    const userData = {
      id: jsonData.users.length + 1,
      loginType: "regular",
      name: userName,
      email: userEmail,
      password: userPW,
    };

    jsonData.users.push(userData);

    fs.writeFile(userInfoFile, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) throw err;

      return res.json({
        success: true,
        message: "회원가입이 정상적으로 완료되었습니다.",
      });
    });
  });
});

/* 일반 로그인 */
router.post("/login", async (req, res) => {
  try {
    const { email, pw } = req.body;

    const data = await fs.promises.readFile(userInfoFile, "utf-8");
    const jsonData = JSON.parse(data);
    const islogined = jsonData.users.find(
      (user) =>
        user.loginType === "regular" &&
        user.email === email &&
        user.password === pw
    );

    if (islogined) {
      // Access Token 발급
      const access_token = jwt.sign({
        userEmail : islogined.email,
        loginType: islogined.loginType
      }, process.env.JWT_ACCESS_KEY, { expiresIn: '1h' })

      // Refresh Token 발급
      const refresh_token = jwt.sign({
         userEmail : islogined.email,
      }, process.env.JWT_REFRESH_KEY,{ expiresIn: '7d' })

      islogined.refresh_token = refresh_token;
      islogined.refresh_token_maxAge = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7일 후


      await fs.promises.writeFile(userInfoFile, JSON.stringify(jsonData, null, 2));
      
      // 로그인 응답 데이터
      res.json({
        loginType: islogined.loginType,
        success: true,
        message: "로그인에 성공하였습니다.",
        jwt_token : access_token
      });

    } else {
      res.json({
        success: false,
        message: "아이디 또는 비밀번호가 일치하지 않습니다.",
      });
    }
  } catch (error) {
    res.json({ success: false, message: "서버 오류" });
  }
});

/* 
  refresh 토큰 저장 함수
*/
const saveRefreshToken = (token, maxAge) => {

}

/* 일반 로그인 사용자 조회 */
// router.post("/getUserInfo", async (req, res) => {
//   console.log("사용자 정보 조회");
//   const data = req.data
//   const usersInfo = await fs.promises.readFile(userInfoFile, "utf-8");
//   usersInfo.users.find(user => user.data.)
// });

/* 
  토큰 저장 방식
    - Access Token : 브라우저 세션 스토리지에 저장 (사용자 정보 조회)
    - Refresh Token : JSON 파일에 저장(데이터베이스)
*/

/* 카카오 로그인 */
router.get("/oauth", async (req, res) => {
  const authCode = req.query.code;
  try {
    // 1. 카카오에서 토큰 받기
    const response = await axios({
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

    const userInfo = response.data;
    
    // 2. Access Token을 HttpOnly 쿠키에 저장
    res.cookie("access_token", userInfo.access_token, {
      httpOnly: true,
      maxAge: userInfo.expires_in * 1000,
      secure: false
    });

    // 3. 카카오 사용자 정보 조회
    const result = getKakaoUserInfo(userInfo.access_token);
    
    result
      .then((user) => {
        fs.readFile(userInfoFile, "utf8", (err, data) => {
          if (err) throw err;

          const jsonData = JSON.parse(data);
          const kakaoUser = user.kakao_account;

          // 4. 기존 사용자 체크
          if (jsonData.users.find((existingUser) => existingUser.email === kakaoUser.email)) {
            return res.redirect("/sale/store?loginType=kakao");
          }

          // 5. 신규 사용자 가입
          const userData = {
            id: jsonData.users.length + 1,
            loginType: "kakao",
            name: kakaoUser.profile.nickname,
            email: kakaoUser.email,
            refresh_token: userInfo.refresh_token,
            refresh_token_maxAge: userInfo.refresh_token_expires_in * 1000,
          };

          jsonData.users.push(userData);

          // 6. JSON 파일에 저장 후 응답
          fs.writeFile(userInfoFile, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) throw err;
            res.redirect("/sale/store?loginType=kakao");;
          });
        });
      })
      .catch((err) => {
        console.log("사용자 정보 조회 오류:", err);
        res.status(500).json({ success: false, message: '서버 오류' });
      });
      
  } catch (error) {
    console.log("인가 코드 발급 중 에러 발생:", error);
    res.status(500).json({ success: false, message: '로그인 실패' });
  }
});


/* 카카오 사용자 조회 */
router.post("/profile", async (req, res) => {
  try {
    const response = getKakaoUserInfo(req.cookies.access_token);
    response
      .then((userInfo) => {
        const kakaoData = userInfo.kakao_account;
        res.json({
          success: true,
          message: "사용자 정보 조회에 성공하였습니다.",
          userName: kakaoData.profile.nickname,
          userEmail: kakaoData.email,
        });
      })
      .catch((err) => console.log(err));

    console.log("사용자 정보 조회 성공");
  } catch (error) {
    console.log("사용자 정보 조회 실패: ", error);
  }
});

/* 통합 로그아웃 */
router.post("/logout", async (req, res) => {
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

export default router;
