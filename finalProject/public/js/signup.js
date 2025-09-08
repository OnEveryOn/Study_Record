const btn_signup = document.getElementById("btn_signup");
const ipt_name = document.getElementById("ipt_name");
const ipt_id = document.getElementById("ipt_id");
const ipt_pw = document.getElementById("ipt_pw");
const ipt_pwChk = document.getElementById("ipt_pwChk");

let message;

// 공통 함수
const isEmpty = (value) => {
  if (
    value === "" ||
    value === "undefined" ||
    typeof value === "undefined" ||
    value === null ||
    value === undefined
  ) {
    return true;
  }
  return false; 
};

// clickHandler 함수 정의
const clickHandler = async () => {
  try {
    
    // 이름 필드 검증
    if (isEmpty(ipt_name.value.trim())) {
      ipt_name.focus();
      return { success: false, message: "이름을 입력하세요" };
    }

    // 아이디 필드 검증
    if (isEmpty(ipt_id.value.trim())) {
      ipt_id.focus();
      return { success: false, message: "아이디를 입력하세요" };
    }

    // 비밀번호 필드 검증
    if (isEmpty(ipt_pw.value.trim())) {
      ipt_pw.focus();
      return { success: false, message: "비밀번호를 입력해주세요." };
    }

    // 비밀번호 확인 필드 검증
    if (isEmpty(ipt_pwChk.value.trim())) {
      ipt_pwChk.focus();
      return { success: false, message: "비밀번호 확인을 입력해주세요." };
    }
    
    if (ipt_pw.value.trim() !== ipt_pwChk.value.trim()) {
      ipt_pwChk.focus();
      return { success: false, message: "비밀번호가 일치하지 않습니다." };
    }

    
    const result = await axios({
      method: "POST",
      url: "/api/signup",
      data: {
        userName: ipt_name.value.trim(),
        userID: ipt_id.value.trim(),
        userPW: ipt_pw.value.trim()
      }
    });
    
    if (result.data.success) {
      window.location.href="/login"
    } else {
      // 알림창 팝업으로 오픈
      confirm(result.data.message)
      return { success: false, message: result.data.message };
    }
    
  } catch (error) {
    console.error("에러 발생:", error);
    alert("회원가입 중에 에러가 발생하였습니다.");
    return { success: false, message: "회원가입 중에 에러가 발생하였습니다." };
  }
};

// 기존 이벤트 리스너 제거 후 새로 추가
btn_signup.removeEventListener("click", clickHandler);
btn_signup.addEventListener("click", clickHandler);