// ================================================================
// Promise 단계별 완전 정복 - 기초부터 심화까지
// ================================================================

// 문제 1-1: 가장 기본적인 Promise 만들기
// 요구사항:
// - 즉시 성공하는 Promise를 만드세요
// - resolve에 "안녕하세요!" 메시지를 전달
// - new Promise를 사용하지 말고 Promise.resolve() 사용

function step1_1() {
  return Promise.resolve("안녕하세요");
}

// 테스트 코드
// step1_1().then(message => console.log("결과:", message));

// ================================================================
// 문제 1-2: 즉시 실패하는 Promise 만들기
// 요구사항:
// - 즉시 실패하는 Promise를 만드세요
// - reject에 "에러가 발생했습니다!" 메시지를 전달
// - Promise.reject() 사용

function step1_2() {
  return new Promise((resolve, reject) => {
    try {
      resolve("성공하였습니다.");
    } catch (error) {
      reject("에러가 발생했습니다.");
    }
  });
}

// 테스트 코드
// step1_2()
//     .then(message => console.log("성공:", message))
//     .catch(error => console.log("에러:", error));

// ================================================================
// 문제 1-3: new Promise로 성공하는 Promise 만들기
// 요구사항:
// - new Promise 생성자를 사용해서 Promise 만들기
// - resolve 함수를 호출해서 "수동으로 성공!" 메시지 전달
// - setTimeout은 사용하지 않고 즉시 resolve 호출

function step1_3() {
  return new Promise((resolve, reject) => {
    resolve("수동으로 성공");
  });
}

// 테스트 코드
// step1_3().then((message) => console.log("결과:", message));

// ================================================================
// 문제 1-4: new Promise로 실패하는 Promise 만들기
// 요구사항:
// - new Promise 생성자를 사용해서 Promise 만들기
// - reject 함수를 호출해서 "수동으로 실패!" 에러 전달
// - new Error()를 사용해서 에러 객체 생성

function step1_4() {
  return new Promise((resolve, reject) => {
    try {
        resolve("수동으로 성공")
    } catch (error) {
      reject(new Error("수동으로 실패"));
    }
  });
}

// 테스트 코드
// step1_4()
//   .then((message) => console.log("성공:", message))
//   .catch((error) => console.log("에러:", error.message));
