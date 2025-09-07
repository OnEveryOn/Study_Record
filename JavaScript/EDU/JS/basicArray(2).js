// JavaScript 배열 연습문제

// ===========================================
// 🟢 기초 단계 (Level 1)
// ===========================================

// 문제 1: 배열 기본 조작
const arr = [3, 1, 4, 1, 5, 9, 2, 6];

// 1. 최댓값과 최솟값 찾기
let max = arr[0];
let min = arr[0];
arr.forEach((num) => {
  if (num > max) max = num;
  if (num < min) min = num;
});
console.log("최댓값: ", max, "최솟값: ", min);

// 2. 평균값 계산하기
const avg =
  arr.reduce((acc, num) => {
    return (acc += num);
  }, 0) / arr.length;

console.log("평균 값: ", avg);

// 3. 짝수만 필터링하기
const evenArr = arr.filter((num) => num % 2 === 0);
console.log(evenArr);

// 4. 모든 요소를 2배로 만들기
const doubleArr = arr.map((num) => (num *= 2));
console.log("2배가 된 배열: ", doubleArr);

console.log("-----------------------------------");

// 문제 2: 배열 검색
const fruits = ["apple", "banana", "orange", "grape", "apple"];

// 1. 'apple'의 모든 인덱스 찾기
// fruits.indexOf("apple")
const apple = [];
fruits.forEach((fruit, index) => {
  if (fruit === "apple") return apple.push(index);
});
console.log("apple 인덱스 배열 :", apple);

// 2. 'kiwi'가 있는지 확인하기
const hasKiwi = fruits.includes("kiwi");
console.log("키위 존재 : ", hasKiwi);

// 3. 문자열 길이가 6 이상인 과일만 찾기
const longFruit = fruits.filter((fruit) => fruit.length >= 6);
console.log("문자열 길이가 6 이상인 배열 : ", longFruit);

console.log("===========================================");

// ===========================================
// 🟡 중급 단계 (Level 2)
// ===========================================

// 문제 3: 중복 제거와 정렬
const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];

// 1. 중복 제거하기 (Set 사용)
const newNum = new Array(...new Set(numbers));
console.log("중복 제거(set 사용) : ", newNum);

// 1-2. 중복 제거하기 (filter 사용)
const filterdArr = numbers.filter(
  (number, index) => numbers.indexOf(number) === index
);
console.log("중복 제거(filter 사용) : ", filterdArr);

// 2. 오름차순 정렬
console.log(
  "오름차순 정렬 : ",
  numbers.sort((a, b) => a - b)
);

// 3. 내림차순 정렬
console.log(
  "내림차순 정렬 : ",
  numbers.sort((a, b) => b - a)
);

console.log("-----------------------------------");

// 문제 4: 배열 변환
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 },
  { name: "Diana", score: 96 },
];

// 1. 점수가 80점 이상인 학생들만 필터링
const gresatStudents = students
  .filter((student) => student.score >= 80)
  .map((student) => student.name);
console.log("80점 이상인 학생들: ", gresatStudents);

// 2. 모든 학생의 이름만 추출해서 배열로 만들기
const name = students.map((student) => student.name);
console.log("모든 학생의 이름 : ", name);

// 3. 점수 평균 계산하기
const scoreAvg =
  students.reduce((sum, studuent) => (sum += studuent.score), 0) /
  students.length;
console.log("점수 평균 : ", scoreAvg);

// 4. 점수 순으로 정렬하기 (내림차순)
const sortedArr = students
  .map((student) => student.score)
  .sort((a, b) => b - a);
console.log("내림차순으로 점수 정렬 : ", sortedArr);
console.log("-----------------------------------");

// 문제 5: 배열 그룹핑
const words = [
  "apple",
  "banana",
  "apricot",
  "blueberry",
  "avocado",
  "blackberry",
];

// 첫 글자별로 그룹핑해서 객체로 반환하기
// 예상 결과: { a: ['apple', 'apricot', 'avocado'], b: ['banana', 'blueberry', 'blackberry'] }

const groupingWord = {};

words.forEach((word) => {
  const firstLetter = word[0];
  if (!groupingWord[firstLetter]) {
    groupingWord[firstLetter] = [];
  }
  groupingWord[firstLetter].push(word);
});

console.log(groupingWord);

console.log("===========================================");

// ===========================================
// 🔴 고급 단계 (Level 3)
// ===========================================

// 문제 6: 2차원 배열 다루기
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// 1. 모든 요소의 합 구하기
let result = 0;
matrix.forEach((num) => {
  num.map((deepNum) => {
    result += deepNum;
  });
});

console.log("모든 요소의 합 :", result);

// 2. 대각선 요소들의 합 구하기 (주 대각선)
// [0][0], [1][1], [2][2]
let sum = 0;
matrix.forEach((num, index) => {
  sum += num[index];
});

console.log("대각선 요소들의 합 : ", sum);

// 3. 각 행의 최댓값들로 새로운 배열 만들기
const maxArr = matrix.map((num) => {
  return Math.max(...num);
});

console.log(maxArr);

console.log("-----------------------------------");

// 문제 7: 복잡한 데이터 조작
const orders = [
  {
    id: 1,
    customer: "Alice",
    items: [{ product: "laptop", price: 1000, qty: 1 }],
  },
  {
    id: 2,
    customer: "Bob",
    items: [
      { product: "mouse", price: 25, qty: 2 },
      { product: "keyboard", price: 75, qty: 1 },
    ],
  },
  {
    id: 3,
    customer: "Alice",
    items: [{ product: "monitor", price: 300, qty: 2 }],
  },
];

// 1. 각 주문의 총 금액 계산하기
// orders.items.price * orders.items.qty
let total = 0;
orders.forEach((order, idx) => {
  order.items.forEach((item) => {
    total += item.price * item.qty;
    return total;
  });
});

console.log("총 주문 금액: ", total);

// 2. 고객별 총 구매 금액 구하기
let customerOrder = {};
orders.forEach((order) => {
  let orderTotal = 0;

  order.items.forEach((item) => {
    orderTotal += item.price * item.qty;
  });

  if (customerOrder[order.customer]) {
    customerOrder[order.customer] += orderTotal;
  } else {
    customerOrder[order.customer] = orderTotal;
  }
});
console.log(customerOrder);

// 3. 평균 주문 금액 계산하기
let totalAvg = 0;
orders.forEach((order, idx) => {
  order.items.forEach(item => {
    totalAvg += item.price * item.qty
  })
})
console.log("평균 주문 금액 : ", totalAvg / orders.length)

console.log("===========================================");
console.log("모든 문제 완료! 🎉");
