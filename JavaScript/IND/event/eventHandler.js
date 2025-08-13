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
window.contents = [];

function saveDataFunc(content) {
  console.log(content);

  let savedData = {
    textValue: content,
    timestamp: Date.now(),
  };
  window.contents.push(savedData);
}

// keyup 이벤트 리스너 등록
textarea.addEventListener("input", function () {
  clearTimeout(timeout);

  // 사용자 입력 완료 후 3초 후에 저장
  timeout = setTimeout(() => {
    saveDataFunc(this.value);
  }, 300);
});

// focusout
textarea.addEventListener("focusout", () => {
  clearTimeout(timeout);
  saveDataFunc(textarea.value);
});
