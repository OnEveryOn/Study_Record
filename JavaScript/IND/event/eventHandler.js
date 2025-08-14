/*
    [ Info ]
    이벤트리스너 제거할 필요가 없는 상황 > 페이지 로드 시에 한 번 등록되기 때문
    let으로 변수 선언해도 window에 선언된다고 생각하였으나, let은 블록 스코프라서 불가, var는 가능
    settimeout의 type은 number
    중복된 코드는 별도의 함수를 구현
*/

// textArea에서 입력된 값 가져오기
let textarea = document.getElementById("contentsArea");

let timeout;
let inputHandler;
let lastContent = "";

window.contents = {};

const currentUser = "lee33@example.com";

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
  if (!content || content.trim() === "") return;

  console.log("입력한 내용: ", content);

  if (lastContent === content) {
    return;
  }

  let savedData = {
    textValue: content,
    timestamp: getTimeStamp(),
  };

  // 사용자 여부에 따라 저장 여부
  if (!window.contents[currentUser]) {
    window.contents[currentUser] = [];
  }

  window.contents[currentUser].push(savedData);
  lastContent = content; 
}

// focus
textarea.addEventListener("focus", () => {
  inputHandler = function () {
    clearTimeout(timeout);

    // 사용자 입력 완료 후 3초 후에 저장
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
