// ================================================================
// 🚀 STEP 6: Promise 정적 메서드 기초 (4문제)
// ================================================================

// 문제 6-1: Promise.all 기초
// 요구사항:
// - 3개의 Promise를 동시에 실행
// - 첫 번째: delay(1000) 후 "첫 번째"
// - 두 번째: delay(1500) 후 "두 번째"
// - 세 번째: delay(800) 후 "세 번째"
// - Promise.all로 모두 완료될 때까지 기다리기
// - 결과 배열을 출력 (순서가 보장되는지 확인)

function step6_1() {
  let promise1 = delay(1000).then(() => "첫 번째");
  let promise2 = delay(1500).then(() => "두 번째");
  let promise3 = delay(800).then(() => "세 번째");

  // promise 객체 자체를 배열에 담은 후에 then 처리
  //   let promises = [
  //     delay(1000).then(() => "첫 번째"),
  //     delay(1500).then(() => "두 번째"),
  //     delay(800).then(() => "세 번째"),
  //   ];

  // promise 객체를 직접 배열에 넣고 then 처리
  return Promise.all([promise1, promise2, promise3]).then((results) => {
    console.log("결과 배열:", results);
    return results; // 결과를 반환
  });
}

// 테스트 코드
// console.time("Promise.all 소요시간");
// step6_1().then((results) => {
//   console.log("결과:", results);
//   console.timeEnd("Promise.all 소요시간"); // 약 1.5초 소요되어야 함
// });

// ================================================================
// 문제 6-2: Promise.all 에러 처리
// 요구사항:
// - 3개의 Promise 중 하나는 실패하도록 설정
// - 첫 번째: delay(1000) 후 "성공1"
// - 두 번째: delay(500) 후 Error("중간에 실패!")
// - 세 번째: delay(2000) 후 "성공3" (실행되지만 결과는 못받음)
// - Promise.all이 즉시 실패하는 것을 확인

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("기다림 완료");
    }, ms);
  });
}

function step6_2() {
  let promises = [
    delay(1000).then(() => {
      return "성공1";
    }),
    delay(500).then(() => {
      throw new Error("중간에 실패");
    }),
    delay(2000).then((result) => {
      result = "성공 3";
      return result;
    }),
  ];

  return Promise.all(promises);
}

// 테스트 코드
// step6_2()
//     .then(results => console.log("성공:", results))
//     .catch(error => console.log("실패:", error.message));

// ================================================================
// 문제 6-3: Promise.race 기초
// 요구사항:
// - 3개의 Promise 중 가장 빠른 것만 결과로 받기
// - 첫 번째: delay(1000) 후 "느림"
// - 두 번째: delay(300) 후 "빠름"
// - 세 번째: delay(800) 후 "보통"
// - Promise.race로 가장 빠른 결과만 받기

function step6_3() {
  let promises = [
    delay(1000).then(() => {
      return "느림";
    }),
    delay(300).then(() => {
      return "빠름";
    }),
    delay(800).then(() => {
      return "보통";
    }),
  ];

  return Promise.race(promises);
}

// 테스트 코드
// step6_3().then(result => console.log("가장 빠른 결과:", result));

// ================================================================
// 문제 6-4: Promise.allSettled 기초 (모든 Promise 완료 대기)
// 요구사항:
// - 성공과 실패가 섞인 Promise들 처리
// - 첫 번째: delay(1000) 후 "성공1"
// - 두 번째: delay(500) 후 Error("실패!")
// - 세 번째: delay(800) 후 "성공3"
// - Promise.allSettled로 모든 결과 받기 (성공/실패 상관없이)

// allSettled는 모든 결과 받는 용도
function step6_4() {
  let promises = [
    delay(1000).then(() => {
      return "성공1";
    }),
    delay(500).then(() => {
      throw new Error("실패");
    }),
    delay(800).then(() => {
      return "성공3";
    }),
  ];

  return Promise.allSettled(promises);
}

// 테스트 코드
// step6_4().then(results => {
//     results.forEach((result, index) => {
//         if (result.status === 'fulfilled') {
//             console.log(`${index + 1}번째 성공:`, result.value);
//         } else {
//             console.log(`${index + 1}번째 실패:`, result.reason.message);
//         }
//     });
// });

// ================================================================
// 🔥 STEP 7: async/await 기초 (5문제)
// ================================================================

// 문제 7-1: 기본 async 함수
// 요구사항:
// - basicAsync() 함수를 async로 만드세요
// - 함수 안에서 "안녕하세요!" 반환
// - async 함수는 항상 Promise를 반환함을 확인

async function basicAsync() {
  return "안녕하세요";
}

// 테스트 코드
// console.log(basicAsync()); // Promise 객체가 출력됨
// basicAsync().then(result => console.log("결과:", result));

// ================================================================
// 문제 7-2: 기본 await 사용법
// 요구사항:
// - waitExample() async 함수를 만드세요
// - delay(2000) 함수를 await로 기다리기
// - 기다린 후 "2초 기다렸습니다!" 출력
// - 함수 실행 전후에 시간 출력해서 실제로 2초 걸리는지 확인

async function waitExample() {
  await delay(2000);
  console.log("2초 기다렸습니다.");
}

// 테스트 코드
// console.log("시작:", new Date().toLocaleTimeString());
// waitExample().then(() => {
//     console.log("끝:", new Date().toLocaleTimeString());
// });

// ================================================================
// 문제 7-3: 순차적 await
// 요구사항:
// - sequentialAsync() 함수를 만드세요
// - delay(1000) 기다린 후 "첫 번째 완료"
// - delay(1500) 기다린 후 "두 번째 완료"
// - delay(800) 기다린 후 "세 번째 완료"
// - 각 단계마다 완료 메시지 출력
// - 총 소요시간 확인 (약 3.3초)

async function sequentialAsync() {
  await delay(1000);
  console.log("첫 번째 완료");
  await delay(1500);
  console.log("두 번째 완료");
  await delay(800);
  console.log("세 번째 완료");
}

// 테스트 코드
// console.time("순차 실행");
// sequentialAsync().then(() => {
//   console.timeEnd("순차 실행");
// });

// ================================================================
// 문제 7-4: 병렬 await (Promise.all과 async/await 조합)
// 요구사항:
// - parallelAsync() 함수를 만드세요
// - 문제 7-3과 동일한 작업들을 병렬로 실행
// - Promise.all과 await를 함께 사용
// - 총 소요시간 확인 (약 1.5초)

async function parallelAsync() {
  let promise1 = delay(1000).then(() => {
    console.log("첫 번째 완료");
  });
  // console.log("첫 번째 완료");
  let promise2 = delay(1500).then(() => {
    console.log("두 번째 완료");
  });
  let promise3 = delay(800).then(() => {
    console.log("세 번째 완료");
  });

  return await Promise.all([promise1, promise2, promise3]);
}

// 테스트 코드
// console.time("병렬 실행");
// parallelAsync().then(() => {
//     console.timeEnd("병렬 실행");
// });

// ================================================================
// 문제 7-5: async/await에서 에러 처리
// 요구사항:
// - errorHandlingAsync() 함수를 만드세요
// - try-catch를 사용해서 에러 처리
// - delay(1000) 후 Math.random() < 0.5면 에러 발생
// - 성공시: "작업 성공!" 반환
// - 실패시: 에러를 catch하고 "에러 복구됨" 반환

async function errorHandlingAsync() {
  let result = "";
  let population = Math.random();
  try {
    await delay(1000);
    if (population < 0.5) {
      throw new Error("작업 실패");
    }
    return "작업 성공";
  } catch (error) {
    return "에러 복구됨";
  }
}

// 테스트 코드
// errorHandlingAsync().then((result) => console.log("최종 결과:", result));

// ================================================================
// 💪 STEP 8: 실전 응용 (5문제)
// ================================================================

// 문제 8-1: 사용자 데이터 가져오기 시뮬레이션
// 요구사항:
// - fetchUser(userId) async 함수를 만드세요
// - userId가 1~100 사이면 성공, 아니면 실패
// - 성공시: { id: userId, name: `User${userId}`, email: `user${userId}@example.com` }
// - 실패시: "유효하지 않은 사용자 ID" 에러
// - 1~2초 랜덤 지연

async function fetchUser(userId) {
  let second = Math.random() * 1000 + 1000; // 1000ms ~ 2000ms
  await delay(second);
  if (userId > 100 || userId < 1) {
    throw new Error("실패");
  }
  return userId;
}

// 테스트 코드
// fetchUser(50)
//   .then((user) => console.log("사용자:", user))
//   .catch((err) => console.log("에러:", err.message));
// fetchUser(150)
//   .then((user) => console.log("사용자:", user))
//   .catch((err) => console.log("에러:", err.message));

// ================================================================
// 문제 8-2: 여러 사용자 정보 동시 가져오기
// 요구사항:
// - fetchMultipleUsers(userIds) async 함수를 만드세요
// - 매개변수로 사용자 ID 배열을 받음
// - 모든 사용자 정보를 병렬로 가져오기
// - 하나라도 실패하면 전체 실패
// - Promise.all과 map 활용

async function fetchMultipleUsers(userIds) {
  return await Promise.all(
    userIds.map((userId) => {
      return fetchUser(userId);
    })
  );
}

// 테스트 코드
// fetchMultipleUsers([1, 2, 3, 4, 5])
//   .then((users) => console.log("모든 사용자:", users))
//   .catch((err) => console.log("에러:", err.message));

// ================================================================
// 문제 8-3: 재시도 로직 구현
// 요구사항:
// - retryOperation(operation, maxRetries) async 함수를 만드세요
// - operation은 async 함수 (70% 확률로 실패)
// - 최대 maxRetries번까지 재시도
// - 각 재시도마다 1초씩 대기
// - 성공하면 결과 반환, 모두 실패하면 "최대 재시도 횟수 초과" 에러

async function unreliableOperation() {
  await delay(500);
  if (Math.random() < 0.7) {
    throw new Error("작업 실패");
  }
  return "작업 성공!";
}

async function retryOperation(operation, maxRetries = 3) {
  let result = "";

  for (let i = 1; i <= maxRetries; i++) {
    try {
      result = await operation();
      return result;
    } catch (error) {
      console.log(`현재 ${i}번째 시도중입니다.`);
      if (i === maxRetries) {
        throw new Error("최대 재시도 횟수 초과");
      }
      await delay(1000);
    }
  }
}

// 테스트 코드
// retryOperation(unreliableOperation, 5)
//   .then((result) => console.log("최종 성공:", result))
//   .catch((err) => console.log("최종 실패:", err));

// ================================================================
// 문제 8-4: 타임아웃 기능 구현
// 요구사항:
// - withTimeout(promise, timeoutMs) async 함수를 만드세요
// - promise가 timeoutMs 시간 내에 완료되지 않으면 타임아웃 에러
// - Promise.race 활용
// - 타임아웃시 "작업 시간 초과" 에러 발생

async function withTimeout(promise, timeoutMs) {
  let newPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject("작업 시간 초과");
    }, timeoutMs);
  });

  return Promise.race([promise, newPromise]);
}

// 테스트 코드
// const slowTask = delay(1000).then(() => "느린 작업 완료");
// withTimeout(slowTask, 2000)
//   .then((result) => console.log("결과:", result))
//   .catch((err) => console.log("에러:", err));

// ================================================================
// 문제 8-5: 데이터 파이프라인
// 요구사항:
// - processDataPipeline(data) async 함수를 만드세요
// - 1단계: 데이터 검증 (validate) - 빈 문자열이면 에러
// - 2단계: 데이터 변환 (transform) - 대문자로 변환
// - 3단계: 데이터 저장 (save) - "저장 완료: [데이터]" 반환
// - 각 단계마다 0.5초 지연
// - 에러 발생시 어느 단계에서 실패했는지 출력

async function validate(data) {
  await delay(500);
  if (!data || data.trim() === "") {
    throw new Error("빈 데이터는 허용되지 않습니다");
  }
  console.log("검증 완료:", data);
  return data;
}

async function transform(data) {
  await delay(500);
  const transformed = data.toUpperCase();
  console.log("변환 완료:", transformed);
  return transformed;
}

async function save(data) {
  await delay(500);
  const result = `저장 완료: ${data}`;
  console.log(result);
  return result;
}

async function processDataPipeline(data) {
    try {
        // 1단계: 검증
        console.log("1단계: 검증 시작");
        const validatedData = await validate(data);
        
        // 2단계: 변환  
        console.log("2단계: 변환 시작");
        const transformedData = await transform(validatedData);
        
        // 3단계: 저장
        console.log("3단계: 저장 시작");
        const result = await save(transformedData);
        
        return result;
        
    } catch (error) {
        // 어느 단계에서 실패했는지 구분
        if (error.message === "빈 데이터는 허용되지 않습니다") {
            throw new Error("1단계(검증)에서 실패: " + error.message);
        }
    }
}

// 테스트 코드
processDataPipeline("hello world")
  .then((result) => console.log("1.파이프라인 성공:", result))
  .catch((err) => console.log("1.파이프라인 실패:", err));

processDataPipeline("")
  .then((result) => console.log("2.파이프라인 성공:", result))
  .catch((err) => console.log("2.파이프라인 실패:", err));
