/*
    [ Info ]
    이벤트리스너 제거할 필요가 없는 상황 > 페이지 로드 시에 한 번 등록되기 때문
    let으로 변수 선언해도 window에 선언된다고 생각하였으나, let은 블록 스코프라서 불가, var는 가능
    settimeout의 type은 number
    Date 객체의 getMonth()를 하는 경우, 원래의 month보다 -1되어서 나오기 때문에 +1을 해줘야 함
    ※ 추가 작업 필요
     - 구축한 서버로 연동할 것
     - ES6 문법 사용
*/

// textArea에서 입력된 값 가져오기
let textarea = document.getElementById("contentsArea");
let logoutButton = document.getElementById("btn_logout");

let timeout;
let inputHandler;
let lastContent = "";

window.contents = {};
let userNickname;

window.onload = async () => {
  try {
    // 기본값으로 localStorage 사용
    userNickname = localStorage.getItem("userID");
    if(userNickname) return

    const result = await axios({
      method: "POST",
      url: "/profile",
      withCredentials: true,
    });

    if (result.data.success && result.data.userNickname) {
      userNickname = result.data.userNickname;
    }
  } catch (error) {
    console.log("사용자 정보 조회 실패 : ", error);
  }
};

// timestamp
function getTimeStamp() {
  let now = new Date();
  let timestamp = "";

  let year = now.getFullYear().toString();
  let month = "0" + (now.getMonth() + 1).toString();
  let date = now.getDate().toString();
  let time = now.getTime().toString();

  timestamp = year + month + date + time;
  return timestamp;
}

// 데이터 저장 함수
function saveDataFunc(content) {
  // 빈 값 또는 중복 데이터인 경우 저장 방지
  if (!content || content.trim() === "" || lastContent === content) return;

  console.log("입력한 내용: ", content);

  let savedData = {
    textValue: content,
    timestamp: getTimeStamp(),
  };

  // 사용자 여부에 따라 저장 여부
  if (!window.contents[userNickname]) {
    window.contents[userNickname] = [];
  }

  window.contents[userNickname].push(savedData);
  lastContent = content;
}

// focus
textarea.addEventListener("focus", () => {
  inputHandler = function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      saveDataFunc(this.value);
    }, 300);
  };
  textarea.addEventListener("input", inputHandler);
});

// focusout
textarea.addEventListener("blur", () => {
  textarea.removeEventListener("input", inputHandler);
  clearTimeout(timeout);
  let updatedValue = "focusedData_" + textarea.value;
  saveDataFunc(updatedValue);
});

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
      "/kakaoLogout",
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
