const kakaoLoginBtn = document.getElementById("kakaoLogin");
const ipt_id = document.getElementById("loginId")
const ipt_pw = document.getElementById("loginPassword")
const btn_login = document.getElementById("btn_login")


const kakaoLoginkHandler =  () => {
  const authURI = "http://localhost:9090/oauth";

  try {
    // 로그인 및 토큰 발급 요청
     Kakao.Auth.authorize({
      redirectUri: authURI,
      scope: "profile_nickname",
      prompt: "login" 
    });
  } catch (error) {
    console.log("error 발생: ", error);
  }
};

const loginHandler = async () => {
  try {
    const result = await axios({
      method : "POST",
      url : "/api/login",
      data : {
        id : ipt_id.value.trim(),
        pw : ipt_pw.value.trim()
      }
    })

   if(result.data.success){
     localStorage.setItem("userID", result.data.userID)
     localStorage.setItem("loginType", "regularLogin")
      window.location.href = "/main"
   }
  } catch (error) {
    console.log("로그인 실패 : ", error)
  }
}

btn_login.addEventListener("click", loginHandler)
kakaoLoginBtn.addEventListener("click", kakaoLoginkHandler);

