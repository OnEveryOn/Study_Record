// 변수 선언 및 데이터 타입
let str = '자바스크립트 "이게 바로 자바스크립트다"';
console.log(str);

let name = "홍길동";
let age = 30;

console.log("내 이름은 " + `${name}` + "입니다.");
console.log(typeof name); // string
console.log(typeof age); // number
console.log(typeof "age"); // string

console.log(typeof Number("101")); // number
console.log(typeof String(12345)); // string

console.log(typeof +"40"); // number

let num = null;
console.log(typeof num);
console.log(num);


// 스코프
// 함수 스코프
function testScope() {
  var a = 10;
  let b = 20;
  const c = 30;
  console.log(a);
  console.log(b);
  console.log(c);
}

testScope();
console.log(a);  // 함수 스코프
console.log(b);  // 함수 스코프 
console.log(c)   // 함수 스코프

// 블록 스코프
function testScope2(age) {
    if(age){
        var a = 100;
        let b = 200;
        const c = 300;
    }

    console.log("a : " , a) // 함수 스코프까지만 적용
    console.log("b : " , b) // 블록 스코프
    console.log("c : " , c) // 블록 스코프
}
testScope2(15)

// 스코프 체이닝
let global = "전역 변수";

function first() {
    let firstVar = "first";
    function second(){
        let secondVar = "second";
        console.log(global);
        console.log(firstVar);
        console.log(secondVar);
    }
    second();
    console.log(secondVar) // 함수 내 변수에 접근 불가
}

first();

// 총정리
console.group("1. 스코프 테스트");
var globalVar = "전역 var";
let globalLet = "전역 let";
const globalConst = "전역 const";

{
    var blockVar = "블록 내부 var";
    let blockLet = "블록 내부 let";
    const blockConst = "블록 내부 const";
    console.log("블록 내부:", blockVar, blockLet, blockConst); 
}

console.log("블록 외부 var:", blockVar)
console.log("블록 외부 let:", blockLet)     // 에러 발생
console.log("블록 외부 const:", blockConst) // 에러 발생
console.groupEnd();

console.time('작업 1')
console.log("111")
console.log("111")
console.log("111")
console.log("111")
console.timeEnd('작업 1');
