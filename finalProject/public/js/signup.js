import utils from "./cm/utils.js";

const btn_signup = document.getElementById("btn_signup");
const ipt_name = document.getElementById("ipt_name");
const ipt_email = document.getElementById("ipt_email");
const ipt_pw = document.getElementById("ipt_pw");
const ipt_pwChk = document.getElementById("ipt_pwChk");
const ipt_fields = document.querySelectorAll(".ipt_field");
let isSubmitting = false;

// clickHandler 함수 정의
const clickHandler = async (e) => {
  isSubmitting = true;
  try {
    // 이름 필드 검증
    if (utils.isEmpty(ipt_name.value)) {
      ipt_name.focus();
      utils.createErroMsg(ipt_name, "필수 입력 항목입니다.");
      return;
    }

    // 아이디 필드 검증
    if (utils.isEmpty(ipt_email.value)) {
      ipt_email.focus();
      utils.createErroMsg(ipt_email, "필수 입력 항목입니다.");
      return;
    }

    // 비밀번호 필드 검증
    if (utils.isEmpty(ipt_pw.value)) {
      ipt_pw.focus();
      utils.createErroMsg(ipt_pw, "필수 입력 항목입니다.");
      return;
    }

    // 비밀번호 확인 필드 검증
    if (utils.isEmpty(ipt_pwChk.value)) {
      ipt_pwChk.focus();
      utils.createErroMsg(ipt_pwChk, "필수 입력 항목입니다.");
      return;
    }

    // 비밀번호 검증
    if (ipt_pw.value.trim() !== ipt_pwChk.value.trim()) {
      ipt_pwChk.focus();
      utils.createErroMsg(ipt_pwChk, "비밀번호가 일치하지 않습니다.");
      return;
    }

    isSubmitting = false;

    const result = await axios({
      method: "POST",
      url: "/auth/signup",
      data: {
        userName: ipt_name.value.trim(),
        userEmail: ipt_email.value.trim(),
        userPW: ipt_pw.value.trim(),
      },
    });

    const popupResult = {
      type: "SIGNUP_RESULT",
      success: result.data.success,
      message: result.data.message,
      redirectUrl: "http://localhost:1010/login",
    };

    utils.openPopup("http://localhost:1010/popup", popupResult);
  } catch (error) {
    console.error("에러 발생:", error);
    return { success: false, message: "회원가입 중에 에러가 발생하였습니다." };
  }
};


const blurHandler = (e) => {
  if (isSubmitting) return;

  const target = e.target;
  const parent = target.parentNode.parentNode;

  const msg = utils.checkInputField(target, target.value);

  if (msg) {
    utils.createErroMsg(target, msg);
    return;
  }
};


// 기존 이벤트 리스너 제거 후 새로 추가
btn_signup.removeEventListener("click", clickHandler);
btn_signup.addEventListener("click", clickHandler);
ipt_fields.forEach((ipt_field) => {
  ipt_field.addEventListener("blur", blurHandler);
});
