## for문
> 초기식, 조건식, 증감식으로 구성된 반복문
```javascript
for (초기식; 조건식; 증간식){
    // 실행문
}
```
#### 실제 예제
```javaScript
for(let i = 1; i <= 5; i++){
    console.log(i);
}
```

### 배열 순회
```javascript
const numbers = [10, 23, 45, 58, 90]

console.log("순차 순회:")
for(let i = 0; i < numbers.length; i++){
  console.log(`인덱스 ${i} : ${numbers[i]}`)
}

console.log("\n역순 순회")
for(let i = numbers.length-1; i >= 0; i--){
  console.log(`인덱스 ${i} : ${numbers[i]}`)
}

console.log("\n20 이상인 수")
for(let i = 0; i < numbers.length; i++){
  if(numbers[i] >= 20){
    console.log(`${numbers[i]}는 20 이상입니다.`)
  }
}
```

### for문 변형
#### 1. 객체 순회 : for...in
```javaScript
// 객체 속성 동적 처리
const userProfile = {
    name: "김철수",
    age: 28,
    email: "kim@example.com",
    phone: "010-1234-5678",
    address: "서울시 강남구"
};

// 모든 속성과 값 출력
console.log("=== 사용자 프로필 ===");
for (let key in userProfile) {
    console.log(`${key}: ${userProfile[key]}`);
}

// 특정 속성만 필터링
console.log("\n=== 연락처 정보만 ===");
const contactFields = ["email", "phone"];
for (let key in userProfile) {
    if (contactFields.includes(key)) {
        console.log(`${key}: ${userProfile[key]}`);
    }
}
```

> 배열의 경우, 인덱스를 반환한다
```javascript
// 배열에서 for...in 사용 시 주의점
const colors = ["빨강", "파랑", "노랑"];
console.log("\n=== 배열 for...in (인덱스 반환) ===");
for (let index in colors) {
    console.log(`인덱스 ${index}: ${colors[index]}`);
    console.log(`인덱스 타입: ${typeof index}`); // "string"
}
```

#### 2. 이터러블 순회 : for...of
> 즉, 일반 객체는 사용이 불가능하고 순서가 있는 객체만 가능하다는 것.

다음은 구조 분해 할당과 함께 이터러블한 객체를 순회해보았다.
> 구조 분해 할당은 객체나 배열의 속성을 분해해서 개별 변수에 담을 수 있는 표현식이다.
```javaScript
// 구조 분해 할당과 함께 사용
const students = [
    { name: "김철수", score: 85 },
    { name: "이영희", score: 92 },
    { name: "박민수", score: 78 }
];

for(let {name, score} of students){
  console.log(`${name}의 점수는 ${score}점`)
}

// 구조 분해 할당과 함께 사용
const students = [
    { name: "김철수", score: 85 },
    { name: "이영희", score: 92 },
    { name: "박민수", score: 78 }
];

for(let {name, score} of students){
  console.log(`${name}의 점수는 ${score}점`)
}

const grades = new Map([
    ["김철수", "A"],
    ["이영희", "A+"],
    ["박민수", "B+"]
]);

for (let [name, grade] of grades) {
  console.log(`${name}의 학점은 ${grade}`)
}

```

