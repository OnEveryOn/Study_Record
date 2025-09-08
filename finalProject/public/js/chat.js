let logoutButton = document.getElementById("logout-btn")

const logoutHandler =  async () => {
  try {

    if(!confirm("로그아웃하시겠습니까?")){
      return;
    }
    // loginType에 따른 로그아웃 처리
    const loginType = localStorage.getItem("loginType")

    // 일반 로그아웃
    if(loginType === "regularLogin"){
      // 로컬 스토리지 삭제
      localStorage.clear();
      window.location.href = "/login";
    }
    
    // 카카오 토큰 삭제
    const result = await axios.post(
      "/logout",
      {},
      { withCredentials: true }
    );

    if (result.data.success) {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
}

logoutButton.addEventListener("click", logoutHandler);