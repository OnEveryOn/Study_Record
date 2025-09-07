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

// 객체 순회
const userProfile = {
    name: "김철수",
    age: 28,
    email: "kim@example.com",
    phone: "010-1234-5678",
    address: "서울시 강남구"
};

for (let key in userProfile){
  console.log(`${key}의 값은 ${userProfile[key]}`)
}

const contactFields = ["email", "phone"];
for (let key in userProfile) {
    if (contactFields.includes(key)) {
        console.log(`${key}: ${userProfile[key]}`);
    }
}

// 배열에서 for...in 사용 시 주의점
const colors = ["빨강", "파랑", "노랑"];
console.log("\n=== 배열 for...in ===");
for (let index in colors) {
    console.log(`인덱스 ${index}: ${colors[index]}`);
    console.log(`인덱스 타입: ${typeof index}`); // "string"
}

// 객체 메서드와 속성 구분
const calculator = {
    x: 10,
    y: 20,
    add: function() { return this.x + this.y; },
    subtract: function() { return this.x - this.y; }
};

console.log("\n=== 속성과 메서드 구분 ===");
for (let key in calculator) {
    if (typeof calculator[key] === 'function') {
        console.log(`메서드: ${key}()`);
    } else {
        console.log(`속성: ${key} = ${calculator[key]}`);
    }
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

const size = 5
let pattern = ""

// 이등변 별 쌓기
 for(let i = 1; i <= size; i++){
     for(let j = 1; j <= i; j++){
       pattern += "⭐";
     }
     pattern += "\n"
}

console.log(pattern)

// 피라미드 별 쌓기
for(let i = 1; i < size; i++){
  for(let j = size; j > i ; j--){
    pattern += " "
  }
  for(let k = 1; k <= 2*i -1; k++){
    pattern += "*"
  }
  pattern += "\n"
}

console.log(pattern)