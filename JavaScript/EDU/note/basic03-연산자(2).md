## 비교 연산자
### 동등 비교와 일치 비교
> 동등 비교는 해당 데이터의 값이 동등한지를 비교하고 일치 비교는 해당 데이터의 값뿐 아니라 타입까지 일치한지를 비교하는 것이다.
```javaScript
// 특수값 비교
console.log(NaN === NaN);          // false
console.log(Number.isNaN(NaN));    // true (NaN 확인 방법)
console.log(null == undefined);    // true
console.log(null === undefined);   // false
```
- 위의 코드에서 === 로 비교하는 것이 더 정확한 비교임을 확인할 수 있다.
- null의 type은 object이고, undefined의 type은 undefined이기 때문에 일치 비교를 하게 되면 false가 나오는 것이다.
- NaN간의 비교는 Number 객체의 isNaN 메서드를 활용하는 것이 더 좋다.

> 문자열 비교는 유니코드를 활용하여 비교한다.
```javaScript
const result = "apple" < "banana"
console.log(result) // true
```

### 그렇다면 객체 비교는?
- 동등 비교를 하게 되면 '비어 있다'라는 의미에서만 비교를 하기 때문에 true가 나오나, 일치 비교의 경우 해당 객체의 메모리 주소까지 비교하기 때문에 false가 나온다.
```javaScript
// 객체 비교 (참조 비교)
console.log({} === {});            // false (다른 객체)
console.log([] === []);            // false (다른 배열)

let obj1 = { name: "John" };
let obj2 = obj1;
console.log(obj1 === obj2);        // true (같은 참조)
```

## 논리 연산자
### &&(and) 와 ||(or)
> true/false 값뿐 아니라 실제 값을 반환하기도 한다.
```javaScript

// Truthy/Falsy 값과의 연산
console.log("Hello" && "World");  // "World" (둘 다 truthy)
console.log(0 && "World");        // 0 (첫 번째가 falsy)
console.log("Hello" || "World");  // "Hello" (첫 번째가 truthy)
console.log(0 || "World");        // "World" (첫 번째가 falsy)

// 실제 값 반환 예제
let userName = "";
let displayName = userName || "게스트";
console.log(displayName);  // "게스트"

userName = "김철수";
displayName = userName || "게스트";
console.log(displayName);  // "김철수"
```
- 위의 경우가 실무에서 주로 볼 수 있는 코드이다. 조건문에서 가장 많이 사용된다.
- 어떠한 데이터가 있다면 **true**이다.
- 그렇다면 a || b 연산을 해야 하는데 a와 b에 모두 데이터가 있다면 || 의 특성상 앞의 데이터 a가 반환된다. 
- **||** 앞에 선언된 값이 true이면 바로 참이며 이를 **truly**라고 한다. 그에 반해 **\&&** 는 && 연산자 앞에 선언된 데이터가 false라면 바로 거짓이 되므로, 이를 **falsy**라고 한다.
 
## 기타연산자
### 1. 삼항 연산자
```javaScript
 (condition ? value1 : value2)
```

실제 코드
```javaScript
const age = 17;
const result = age >= 20 ? "성인" : "청소년"
console.log(result)   // 청소년
```


### 2. instanceof : 객체가 특정 생성자의 인스턴스인지 확인
```javaScript
// instanceof 연산자
function Person(name) {
    this.name = name;
}

let person = new Person("김철수");
console.log(person instanceof Person);  // true
console.log(person instanceof Object);  // true
```


### 3. typeof : 데이터의 타입을 문자열로 반환
```javaScript
console.log(typeof 42);          // "number"
console.log(typeof "Hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (JavaScript 버그)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"
```

### 4. in : 객체 해당 키 값이 포함되어있는지 여부

```javaScript
let person = {name : "홍길동", age : 12};
console.log("name" in person)
console.log("age" in person)
```