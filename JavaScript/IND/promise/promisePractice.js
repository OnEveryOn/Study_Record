const promise = new Promise((resolve, _) => {
  resolve("success");
});

promise.then((value) => {
  console.log(value);
});

const promiseResolve = Promise.resolve("성공");
const promiseReject = Promise.reject("실패");

promiseResolve
  .then((resolve) => {
    console.log(resolve);
    return promiseResolve;
  })
  .then((resolve) => {
    console.log(resolve);
    return promiseResolve;
  })
  .then((resolve) => {
    console.log(resolve);
  });

promiseReject
  .catch((reject) => {
    console.log(reject);
    return promiseReject;
  })
  .catch((reject) => {
    console.log(reject);
  });

function starbucks(coffee) {
  return new Promise((resolve, reject) => {
    coffee === "아메리카노"
      ? resolve("아메리카노 한 잔 나왔습니다.")
      : reject(`${coffee}라는 메뉴는 없습니다.`);
  });
}

async function americano() {
  // then,catch 체이닝처럼 사용 가능 > try ~ catch 사용
  try {
    const result = await starbucks("아메리카노");
    console.log(result);
  } catch (error) {
    console.log(error)
  } finally {
    console.log("감사합니다.")
  }
}

americano()
