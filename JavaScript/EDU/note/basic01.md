### javaScript란 무엇인가

- 웹 페이지를 동적으로 만들기 위해 만들어진 프로그래밍언어
    

## console
1. console.log : 콘솔창에 로그를 남기기 위한 함수
    - console.log("Hellow", "world", "!") 
        - 쉼표를 통해서 로그를 찍을 수도 있음
2. console.warn : warning임을 알리고자 할 때 사용하는 함수
    - console.warn("조심하세요")
3. console.error : error임을 알리고자 할 때 사용하는 함수
    - console.error("에러가 났다")
4. console.table : 테이블 형태로 순차적으로 메시지를 보여주는 함수
    - console.table("사과", "포도", "참외")
5. console.clear() : 로그를 지우는 함수
6. console.info : 정보성 메시지를 출력하고자 할 때 사용하는 함수
```javaScript
console.info("message info")
```
7. console.group()-console.groupEnd() : grouping시에 사용
8. console.time-console.timeEnd() : 작업 시간 측정
```javaScript
console.time('작업 1')
console.log("111")
console.log("111")
console.log("111")
console.log("111")
console.timeEnd('작업 1');
```

## 변수 : 변할 수 있는 값(의 자리를 만든다)

- var, let, const 3가지로 변수를 선언할 수 있다.
- 변수를 선언하지 않으면 사용할 수 없음
- 변수 선언 시에 camelCase 혹은 snakeCase를 사용해야 함

```javaScript
var --font-size-lg = 18px;   // 변수 선언 및 할당
font-size = --font-size-lg;  // 새로운 변수에 값 할당
```

### var (레거시)
- 함수 스코프
- 재선언 및 재할당 가능
- 호이스팅 발생
```javaScript
var x = 20;
var x = 30;
console.log(x) // 재선언 가능
```

### let
- 블록 스코프
- 재선언 불가
- 재할당 가능
```javaScript
let x = 20;
let x = 30; // 재선언 불가 : syntaxError 발생
console.log(x)
```


### const
- 한 번 선언하면 값을 재할당할 수 없음
- 상수나 참조값에 사용
```javaScript
const z = 20;
z = 40;  // 재할당 불가 : TypeError 발생
``` 

## 데이터 타입
javascript는 동적 타입 언어로, 변수 선언 시 타입을 지정하지 않는다.
1. Number
2. String
3. Boolean : true(1)/false(0)
4. undefined : 값이 할당되지 않음
5. null : 의도적으로 값이 없음을 표현
---- 
6. Symbol - 거의 사용하지 않음
7. BigInt - 거의 사용하지 않음

### Number
- 모든 숫자(정수와 실수)를 표현하는 타입
- 64비트 부동소수점 형식을 사용
    - 64비트로 표현가능한 숫자
- 그 외의 숫자는 Infinity, -Infinity로 표현 (정수 overflow라고 부름)

### String
- 텍스트 데이터를 표현하는 타입
- 작은 따옴표나 큰 따옴표로 표현
```javaScript
let str = "동해물과 백두산이 '마르고'"
let str1 = '동해물과 백두산이 "마르고"'
```
- 백틱(``)으로 표현
- escape sequence : 특수문자 표현
    - \n, \t, \\\ 등
```javaScript
let str = "자바스크립트 \"이게 바로 자바스크립트다\"";
console.log(str)
```

### 총정리
```javaScript
let name = "홍길동";
let age = 30;

console.log("내 이름은 " + `${name}` +  "입니다."); // 내 이름은 홍길동입니다.
console.log(typeof name)   // string
console.log(typeof age)    // number
console.log(typeof "age")  // string
```
### Boolean
- true/false 값을 반환
```javaScript
let isStudent = true;
console.log(typeof isStudent);  // boolean
console.log(!isStudent)         // false
```

### 타입 변환
```javaScript
console.log(typeof Number("101"))  // number
console.log(typeof String(12345))  // string
console.log(typeof +("40"))        // number
```
- "+" 연산자는 문자열로 인식하게 됨
    - "5" + 3  > 53으로 결과가 나옴
- "-" 연산자는 숫자로 인식하여 연산이 됨

### undefined
- 변수가 선언되었으나 값이 할당되지 않은 상태를 나타내는 값
- javaScript 엔진이 자동으로 할당하는 기본값
    - 개발자가 명시적으로 할당하는 null과는 다름
```javaScript
let num;
console.log(typeof num)   // undefined
console.log(num)          // undefined
```

### null
- 개발자가 변수에 어떠한 값을 할당할지 아직 정하지 못 했을 때 null로 초기화할 때 사용
```javaScript
let num = null;
console.log(typeof num)   // object : javaScript의 오래된 버그로, 현재는 그냥 사용중
console.log(num)
```

### ReferenceError
- 존재하지 않거나 접근할 수 없는 변수를 참조하려고 할 때 발생하는 에러
    - **let/const 변수를 선언 전에 사용하려고 할 때 발생**
    - var와 달리 let/const는 호이스팅 되어도 해당 값

## Scope
- javaScipt는 위에서부터 아래로 선언 및 실행이 되기 때문에 순서가 중요
```javaScript
// 스코프
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

```

### scope chaining
```javaScript
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
```

### scope 총정리
```javaScript
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
console.log("블록 외부 let:", blockLet)      // 에러 발생
console.log("블록 외부 const:", blockConst)  // 에러 발생
console.groupEnd();
```


## 호이스팅
- javaScript가 코드를 실행하기 전에 변수와 함수 선언을 해당 스코프의 맨위로 끌어올리는 것처럼 동작하는 현상
    - 이러한 현상이 발생하는 이유는 javaScript는 변수 생성과 초기화 작업을 분리해서 진행되기 때문이다.
        - 변수부터 생성을 한 뒤에 초기화 작업을 분리해서 하기 때문에 호이스팅이 발생하는 것 (변수를 최상단으로 끌어올리는 것)
    - var는 undefined로 초기화되어 호이스팅
    - let/const는 호이스팅은 되나 초기화는 되지 않으며 TDZ에 위치함

- TDZ(Temporal Dead Zome)
     - let/const 변수가 선언되었지만 초기화되기 전까지의 사각지대를 의미함


