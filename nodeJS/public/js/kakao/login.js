const kakaoLoginBtn = document.getElementById("kakaoLogin");

// 로그인을 동기적으로 처리하는 경우, 동시에 여러 사용자가 로그인을 시도하는 경우 마비가 올 것

// 카카오 로그인으로 리다이렉션
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

kakaoLoginBtn.addEventListener("click", kakaoLoginkHandler);
