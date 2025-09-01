const btn_signup = document.getElementById("btn_signup");
const ipt_name = document.getElementById("ipt_name");
const ipt_id = document.getElementById("ipt_id");
const ipt_pw = document.getElementById("ipt_pw");
const ipt_pwChk = document.getElementById("ipt_pwChk");

let message;

btn_signup.addEventListener("click", function () {
  clickHandler = () => {
    // if(ipt_name.value === null || ipt_name.value === undefined || ipt_name.value === "") return;
    try {
      // 이름, 아이디 존재하고, 비밀번호 일치하면 회원가입
      if (ipt_pw.value === ipt_pwChk.value) {
        message = "회원가입이 정상적으로 완료되었습니다.";
      }
    } catch (error) {
        console.error("에러 발생 : ", error)
    }

  };
});

