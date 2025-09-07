// 배열 생성 방법
// 1. 배열 리터럴
const fruits = ["apple", "banana", "cherry"];
console.log("배열 리터럴 : ", fruits);

// 2. Array 생성자
const numbers = new Array(1, 3, 4, 5, 7);
console.log("Array 생성자 사용 : ", numbers);

// 3. Array.from()
// Array.from(유사배열, 함수)
const strings = Array.from("happy things");
console.log("Array.from() 사용 : ", strings);

console.log(
  "new 배열 : ",
  Array.from([1, 2, 3, 4, 5, 6], (num) => num * 2)
);

// 4. Array.of()
// 단일 인수 처리 가능
const arr1 = Array.of(3)
const arr2 = Array.of(3, 4, 5, "g")
console.log("Array.of 사용: ", arr1)
console.log("Array.of 사용: ", arr2)