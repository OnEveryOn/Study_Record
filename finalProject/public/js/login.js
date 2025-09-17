import utils from "./cm/utils.js";

const btn_kakaoLogin = document.getElementById("kakaoLogin");
const ipt_email = document.getElementById("loginEmail");
const ipt_pw = document.getElementById("loginPassword");
const btn_login = document.getElementById("btn_login");

const kakaoLoginkHandler = () => {
  const authURI = "http://localhost:1010/auth/oauth";

  try {
    // 로그인 및 토큰 발급 요청
    Kakao.Auth.authorize({
      redirectUri: authURI,
      scope: "profile_nickname, account_email",
      prompt: "login",
    });

    console.log(result)
  } catch (error) {
    console.log("error 발생: ", error);
  }
};

const loginHandler = async () => {
  try {
    const result = await axios({
      method: "POST",
      url: "/auth/login",
      data: {
        email: ipt_email.value.trim(),
        pw: ipt_pw.value.trim(),
      },
    });

    if (result.data.success) {
      localStorage.setItem("userEmail", result.data.userEmail);
      localStorage.setItem("userName", result.data.userName);
      localStorage.setItem("loginType", result.data.loginType);
      
      const popupResult = {
        type : "LOGIN_RESULT",
        message : result.data.message,
        success : result.data.success,
        redirectUrl : "http://localhost:1010/sale/store"
      }
      utils.openPopup("http://localhost:1010/popup", popupResult)
    }
  } catch (error) {
    console.log("로그인 실패 : ", error);
  }
};

btn_login.addEventListener("click", loginHandler);
btn_kakaoLogin.addEventListener("click", kakaoLoginkHandler);
