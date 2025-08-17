// 문자열과 숫자 연산
console.log("5" + 3); // 53
console.log("5" - 3); // 2
console.log("5" * 3); // 15

// 특수값 처리
console.log(10 / 0); // Infinity
console.log(-10 / 0); // -Infinity
console.log(0 / 0); // NaN : type은 number지만 값이 없음
console.log("abc" * 2); // NaN

// 소수점 연산
console.log(0.1 + 0.2); // 0.30000000000000004
// toFixed를 사용하여 연산
console.log((0.1 + 0.2).toFixed(1));
console.log(0.1 + 0.1); // 0.2

// 연쇄 할당
let a = (b = c = 10);
console.log(a, b, c);

// 산술 연산자 우선순위
console.log(2 + 3 * 4);   // 곱셈 > 덧셈
console.log((3 + 4) * 2); // 14

// 증감 연산자
let num = 3;
console.log(num++ * 2);  // 6
console.log(num)         // 4

// typeof 연산자
let x = "string"
console.log(typeof x + 1) 
console.log(typeof (x + 1)) 

// 복잡한 표현식
let result = 2 + 3 * 4 > 10 && 15 / 3 < 6;
// 1. 곱셈 12
// 2. 덧셈 14
// 4. 나눗셈 5
// 3. 비교 연산자 14 > 10 true
// 5. 비교 연산자 5 < 6 true
// 6. 논리 연산자 true && true = true
// result : true
console.log(result)

