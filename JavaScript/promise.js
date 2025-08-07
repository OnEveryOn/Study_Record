// ================================================================
// 🕐 STEP 2: 시간 지연과 비동기 (4문제)
// ================================================================

// 문제 2-1: 1초 후에 성공하는 Promise
// 요구사항:
// - setTimeout을 사용해서 1초 후에 resolve 호출
// - "1초 기다렸습니다!" 메시지 전달

function step2_1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("1초 기다렸습니다.");
    }, 1000);
  });
}

// 테스트 코드
// console.log("시작");
// step2_1().then(message => console.log("결과:", message));
// console.log("끝"); // 이게 먼저 출력되어야 함

// ================================================================
// 문제 2-3: 지연 시간을 받는 함수 만들기
// 요구사항:
// - delay(ms) 함수를 만드세요
// - 주어진 밀리초만큼 기다린 후 "기다림 완료!" 메시지 반환
// - 매개변수로 받은 ms 시간만큼 setTimeout 사용

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("기다림 완료");
    }, ms);
  });
}

// 테스트 코드
// delay(1500).then((message) => console.log("1.5초 후:", message));

// ================================================================
// 문제 2-4: 랜덤 시간 지연
// 요구사항:
// - randomDelay() 함수를 만드세요
// - 1초~3초 사이의 랜덤한 시간 후에 성공
// - "X초 기다렸습니다!" 메시지 반환 (X는 실제 대기한 초)
// - Math.random() 사용

function randomDelay() {
  let randomTime = parseInt(Math.random() * 2000 + 1000); // 1초 ~ 3초
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${randomTime}초 기다렸습니다.`);
    }, randomTime);
  });
}

// 테스트 코드
// randomDelay().then((message) => console.log(message));

// ================================================================
// 🔗 STEP 3: then 체이닝 기초 (4문제)
// ================================================================

// 문제 3-1: 간단한 then 체이닝
// 요구사항:
// - Promise.resolve(5)로 시작
// - 첫 번째 then에서 숫자에 2를 곱하기
// - 두 번째 then에서 결과를 출력
// - 각 then에서 값을 return 해야 다음 then으로 전달됨

function step3_1() {
  let promise = new Promise((resolve, reject) => {
    try {
      resolve(5);
    } catch (error) {
      reject(error);
    }
  });

  promise
    .then((result) => {
      return (result *= 2);
    })
    .then((result) => console.log("결과 : " + result));
}

// 테스트 코드
// step3_1();

// ================================================================
// 문제 3-2: 문자열 변환 체이닝
// 요구사항:
// - Promise.resolve("hello")로 시작
// - 첫 번째 then: 대문자로 변환 (toUpperCase())
// - 두 번째 then: 끝에 "!" 추가
// - 세 번째 then: 결과 출력

function step3_2() {
  return new Promise((resolve, reject) => {
    try {
      resolve("hello");
    } catch (error) {
      reject("실패");
    }
  })
    .then((str) => {
      return (str = str.toUpperCase());
    })
    .then((str) => {
      let newArr = str.split("");
      newArr.push("!");
      return newArr.join("");
    })
    .then((str) => {
      console.log(str);
    });
}

// 테스트 코드
// step3_2(); // "HELLO!" 출력되어야 함

// ================================================================
// 문제 3-3: 비동기 체이닝
// 요구사항:
// - step2_3에서 만든 delay() 함수 사용
// - delay(1000)으로 시작
// - 첫 번째 then에서 "첫 번째 완료" 출력하고 delay(500) 반환
// - 두 번째 then에서 "두 번째 완료" 출력

function step3_3() {
  delay(1000)
    .then(() => {
      console.log("첫 번째 완료");
      return delay(500);
    })
    .then(() => console.log("두 번째 완료"));
}

// 테스트 코드
// step3_3();

// ================================================================
// 문제 3-4: 값 누적 체이닝
// 요구사항:
// - Promise.resolve(10)으로 시작
// - 첫 번째 then: +5
// - 두 번째 then: ×2
// - 세 번째 then: -3
// - 네 번째 then: 최종 결과 출력
// - 각 단계별로 "현재 값: X" 출력

function step3_4() {
  Promise.resolve(10)
    .then((result) => {
      return (result += 5);
    })
    .then((result) => {
      return (result *= 2);
    })
    .then((result) => {
      return (result -= 3);
    })
    .then((result) => {
      console.log("result : ", result);
    });
}

// 테스트 코드
// step3_4(); 최종 결과: 27이 나와야 함 (10+5=15, 15×2=30, 30-3=27)

// ================================================================
// ❌ STEP 4: catch와 에러 처리 (4문제)
// ================================================================

// 문제 4-1: 기본 catch 사용법
// 요구사항:
// - Promise.reject("뭔가 잘못됨")으로 시작
// - catch에서 에러를 받아서 "에러 처리: [에러메시지]" 형태로 출력
// - then도 함께 사용해보지만 실행되지 않는 것을 확인

function step4_1() {
  Promise.reject("뭔가 잘못됨").catch((error) => {
    console.log("에러 처리 : ", error);
  });
}

// 테스트 코드
// step4_1();

// ================================================================
// 문제 4-2: 체이닝 중간에 에러 처리
// 요구사항:
// - Promise.resolve(10)으로 시작
// - 첫 번째 then: 0으로 나누기 (의도적으로 에러 발생시키기 - throw new Error 사용)
// - 두 번째 then: 실행되면 안됨
// - catch: 에러 처리하고 기본값 999 반환
// - 마지막 then: 최종 결과 출력

function step4_2() {
  Promise.resolve(10)
    .then((result) => {
      result /= 0;
      throw new Error("의도적 에러 발생");
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
      return 999;
    })
    .then((result) => {
      console.log(result);
    });
}

// 테스트 코드
// step4_2();

// ================================================================
// 문제 4-3: catch 후 체이닝 계속
// 요구사항:
// - Promise.reject("초기 에러")로 시작
// - catch에서 에러를 처리하고 "복구된 값" 반환
// - 그 다음 then에서 "복구 성공: [값]" 출력
// - catch 후에도 체이닝이 계속될 수 있음을 확인

function step4_3() {
  Promise.reject("초기 에러")
    .catch((error) => {
      console.log(error);
      return "복구된 값";
    })
    .then((result) => {
      console.log(`복수 성공 : ${result}`);
    });
}

// 테스트 코드
// step4_3();

// ================================================================
// 문제 4-4: 조건부 에러 발생
// 요구사항:
// - checkNumber(num) 함수를 만드세요
// - 매개변수가 0보다 크면 "양수입니다!" 반환
// - 0이면 "0입니다!" 반환
// - 음수면 throw new Error("음수는 허용되지 않습니다!")
// - Promise.resolve()로 감싸서 Promise 반환

function checkNumber(num) {
  return Promise.resolve(num).then((num) => {
    if (num > 0) {
      return "양수입니다.";
    } else if (num < 0) {
      throw new Error("음수는 허용되지 않습니다!");
    } else {
      return "0입니다";
    }
  });
}

// 테스트 코드
// checkNumber(5)
//   .then(console.log)
//   .catch((err) => console.log("에러:", err.message));
// checkNumber(0)
//   .then(console.log)
//   .catch((err) => console.log("에러:", err.message));
// checkNumber(-3)
//   .then(console.log)
//   .catch((err) => console.log("에러:", err.message));

// ================================================================
// 🎯 STEP 5: finally와 완료 처리 (3문제)
// ================================================================

// 문제 5-1: 기본 finally 사용법
// 요구사항:
// - successOrFail() 함수를 만드세요
// - 50% 확률로 성공("성공!") 또는 실패(Error("실패!"))
// - then에서 성공 메시지 출력
// - catch에서 에러 메시지 출력
// - finally에서 "작업 완료" 출력 (성공/실패 관계없이)

function successOrFail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      // 50% 확률
      resolve("성공!");
    } else {
      reject(new Error("실패!"));
    }
  })
    .then((msg) => console.log(msg))
    .catch((error) => console.log("에러:", error.message))
    .finally(() => console.log("작업 완료"));
}

// 테스트 코드
// successOrFail()

// ================================================================
// 문제 5-2: 리소스 정리 시뮬레이션
// 요구사항:
// - processData() 함수를 만드세요
// - "데이터 처리 시작" 출력
// - 2초 후 70% 확률로 성공, 30% 확률로 실패
// - 성공시: "데이터 처리 성공"
// - 실패시: "데이터 처리 실패" 에러
// - finally에서 "리소스 정리 완료" 출력

function processData() {
  let probabilty = Math.random();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (probabilty > 0.3) {
        resolve("데이터 처리 성공");
      } else {
        reject("데이터 처리 실패");
      }
    }, 2000);
  }).finally(() => {
    console.log("리소스 정리 완료");
  });
}

// 테스트 코드
processData()
  .then((result) => console.log(result))
  .catch((error) => console.log("에러:", error))
  .finally(() => console.log("리소스 정리 완료"));

// ================================================================
// 문제 5-3: finally의 특성 이해
// 요구사항:
// - finallyTest() 함수를 만드세요
// - Promise.resolve("원래 값")으로 시작
// - then에서 값을 "변경된 값"으로 수정
// - finally에서 "정리 작업" 출력하고 "finally 값" 반환 (하지만 이 값은 무시됨)
// - 마지막 then에서 최종 값 출력
// - finally는 값을 변경하지 않음을 확인

function finallyTest() {
  Promise.resolve("원래 값")
    .then((result) => {
      result = "변경된 값";
      return result;
    })
    .finally(() => {
      console.log("정리 작업");
      return "finally 값";
    })
    .then((finalResult) => {
      console.log(finalResult);
    });
}

// 테스트 코드
// finallyTest(); // "변경된 값"이 출력되어야 함 (finally의 반환값이 아님)
