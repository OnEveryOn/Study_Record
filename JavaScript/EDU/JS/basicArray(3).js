// =======================================
// 🎯 배열 연습 문제 - some, every, find 중심
// =======================================

// 문제 1: some()과 every() 기본 연습
const scores = [85, 92, 78, 96, 73, 88];
let result;
// 1-1. 90점 이상인 점수가 하나라도 있는지 확인하기
// 힌트: some() 사용
result = scores.some((score) => score >= 90);
console.log("90점 이상인 점수 있는지 확인: ", result);

// 1-2. 모든 점수가 70점 이상인지 확인하기
// 힌트: every() 사용
result = scores.every((score) => score >= 70);
console.log("모든 점수가 70점 이상인지 확인 : ", result);

// 1-3. 모든 점수가 80점 이상인지 확인하기
// 힌트: every() 사용
// 정답: false (73, 78이 80점 미만)
result = scores.every((score) => score >= 80);
console.log("모든 점수가 80점 이상인지 확인 : ", result);

console.log("===========================================");

// 문제 2: 사용자 데이터 검증
const users = [
  { name: "Alice", age: 25, isActive: true, email: "alice@test.com" },
  { name: "Bob", age: 17, isActive: true, email: "bob@test.com" },
  { name: "Charlie", age: 30, isActive: false, email: "charlie@test.com" },
  { name: "Diana", age: 22, isActive: true, email: "" },
];

// 2-1. 미성년자(18세 미만)가 있는지 확인하기
result = users.some((user) => user.age < 18);
console.log("미성년자가 있는지 확인 :", result); // true

// 2-2. 모든 사용자가 이메일을 가지고 있는지 확인하기
result = users.every((user) => user.email !== "");
console.log("모든 사용자가 이메일을 가지고 있는지 확인 :", result);

// 2-3. 활성 사용자(isActive: true)가 한 명이라도 있는지 확인하기
result = users.some((user) => user.isActive === true);
console.log("활성 사용자가 있는지 확인 :", result);

console.log("===========================================");

// 문제 3: find()와 findIndex() 연습
const products = [
  { id: 1, name: "노트북", price: 1000000, category: "전자제품" },
  { id: 2, name: "마우스", price: 30000, category: "전자제품" },
  { id: 3, name: "책", price: 15000, category: "도서" },
  { id: 4, name: "키보드", price: 80000, category: "전자제품" },
];

// 3-1. 가격이 50000원 이상인 첫 번째 상품 찾기
result = products.find((product) => product.price >= 50000);
console.log("가격이 5만원 이상인 상품: ", result.name);

// 3-2. 카테고리가 "도서"인 상품의 인덱스 찾기
result = products.findIndex((product) => product.category === "도서");
console.log(`카테고리가 "도서"인 ${products[result].name} 인덱스 :`, result);

// 3-3. 존재하지 않는 상품(id: 999) 찾아보기 (undefined 나와야 함)
result = products.find((product) => product.id === "999");
console.log("존재하지 않는 상품? ", result);

console.log("===========================================");

// 문제 4: 복합 조건 검사
const employees = [
  { name: "김철수", dept: "개발", salary: 5000, experience: 3 },
  { name: "이영희", dept: "디자인", salary: 4500, experience: 5 },
  { name: "박민수", dept: "개발", salary: 6000, experience: 7 },
  { name: "최지원", dept: "마케팅", salary: 4000, experience: 2 },
];

// 4-1. 연봉 5000 이상인 직원이 있는지 확인
result = employees.some((employee) => employee.salary >= 5000);
console.log("연봉 5000 이상인 직원이 있는지 확인: ", result); // true

// 4-2. 모든 직원의 경력이 2년 이상인지 확인
result = employees.every((employee) => employee.experience >= 2);
console.log("모든 직원의 경력이 2년 이상인지 확인: ", result); // true

// 4-3. 개발부서에서 연봉이 가장 높은 직원 찾기
result = employees
  .filter((employee) => employee.dept === "개발")
  .reduce((acc, cur) => {
    return acc.salary > cur.salary ? acc.name : cur.name;
  });
console.log("개발부서에서 연봉이 가장 높은 직원:", result);

console.log("===========================================");

// 문제 5: 배열 안의 배열 (중첩 데이터)
const classes = [
  {
    name: "수학",
    students: [
      { name: "학생1", score: 85 },
      { name: "학생2", score: 92 },
      { name: "학생3", score: 78 },
    ],
  },
  {
    name: "영어",
    students: [
      { name: "학생4", score: 88 },
      { name: "학생5", score: 95 },
      { name: "학생6", score: 82 },
    ],
  },
];

// 5-1. 모든 반에서 90점 이상 받은 학생이 한 명이라도 있는지 확인
result = classes.every((student) => {
  return student.students.some((student) => student.score >= 90);
});
console.log("모든 반에서 90점 이상 받은 학생이 한 명이라도 있는지: ", result);

// 5-2. 특정 반(수학)에서 모든 학생이 80점 이상인지 확인
const mathClass = classes.find((classInfo) => classInfo.name === "수학");
result = mathClass.students.every((student) => student.score >= 80);

console.log("특정 반(수학)에서 모든 학생이 80점 이상인지 확인:", result);

// 5-3. 전체에서 95점 이상 받은 첫 번째 학생이 속한 반 이름 찾기
let className = "";
classes.forEach((classInfo) => {
  const student = classInfo.students.find((student) => student.score >= 95);
  if (student) {
    className = classInfo.name;
  }
});

console.log("전체에서 95점 이상 받은 첫 번째 학생이 속한 반: ", className);
console.log("===========================================");

// 🎯 추가 도전 문제
// 문제 6: 쇼핑몰 주문 검증
const orders = [
  {
    id: 1,
    items: [
      { name: "상품A", price: 10000, qty: 2 },
      { name: "상품B", price: 25000, qty: 1 },
    ],
    status: "배송중",
  },
  {
    id: 2,
    items: [{ name: "상품C", price: 15000, qty: 3 }],
    status: "완료",
  },
];

// 6-1. 총 주문금액이 50000원 이상인 주문이 있는지 확인
orders.some((order) => {
  order.items.reduce((sum, item) => (sum += item.price * item.qty)) >= 50000;
});
console.log(result);

// 6-2. 모든 주문이 완료 상태인지 확인
result = orders.every((order) => order.status === "완료");
console.log("모든 주문이 완료 상태인지 확인: ", result);

// 6-3. 특정 상품("상품B")을 포함한 주문 찾기
result = orders.find((order) => {
  return order.items.some((item) => item.name === "상품B" )
});
console.log(result)
console.log("===========================================");


