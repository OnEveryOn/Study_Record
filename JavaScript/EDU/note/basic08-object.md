## 객체
키(key)와 값(value)의 쌍으로 구성된 데이터 집합으로, 실제 세계의 사물을 모델링하는 데에 사용된다.
- 객체는 참조로 전달되며, 변수는 객체의 메모리 주소를 가리킨다.
- 런타임에 프로퍼티를 자유롭게 추가, 수정, 삭제할 수 있다.
- 객체는 배열의 상위 개념이다.

```javaScript
const person = {
    name : "김철수",
    age : 25,
    isStudent : true,
    hobbies : ["독서", "축구"],
    introduce : function () {
        return "안녕하세요"
    },
    study() {
        return this.name + "이(가) 공부합니다."
    }
}
```

### 객체 생성과 속성 조작
1. 중괄호를 사용한 직접적인 생성
2. new Object()를 사용한 생성
3. Object.create() 사용한 생성
4. 사용자 정의 생성자 함수로 생성

```javascript
const student = new Object();
student.name = "이영희";
student.age = 34;
student.subjects = ["영어", "수학"]

/*
 대괄호 표기법 
 - 프로퍼티 키값을 ("")로 감싸야 한다. 
*/
console.log(student["name"])
console.log(student["age"])

// 동적 속성 접근 : 런타임 시에 
const propertyName = "subjects";
console.log(student[propertyName])

// 속성 삭제
delete student.name
console.log(student) // { age: 34, subjects: [ '영어', '수학' ] }
```

### 속성 존재 확인 및 열거
- in을 활용하여 속성 존재 확인 가능하며, for ... in 루프를 통해 모든 속성을 열거할 수 있다.
```javascript
/* 속성 존재 확인 및 열거 */
const book = {
  title: "JavaScript 완벽 가이드",
  author: "데이비드 플래너건",
  pages: 688,
  publishYear: 2020,
};

console.log("title" in book); // true
console.log("date" in book); // false

// for..in 루프 사용
for (let key in book) {
  console.log(`${key}:`, book[key]);
}
```

### Object 내장 메서드
```javascript

// Object.keys() : key 배열
const keys = Object.keys(book);
console.log(keys); // [ 'title', 'author', 'pages', 'publishYear' ]

// Object.values() : value 배열
const values = Object.values(book);
console.log(values); // [ 'JavaScript 완벽 가이드', '데이비드 플래너건', 688, 2020 ]

// Object.entries() : [키, 값] 쌍 배열
const entries = Object.entries(book);
console.log(entries);
/* 
    [
        [ 'title', 'JavaScript 완벽 가이드' ],
        [ 'author', '데이비드 플래너건' ],
        [ 'pages', 688 ],
        [ 'publishYear', 2020 ]
    ] 
*/

// entries를 활용한 반복
entries.forEach(([key, value]) => console.log(`${key} : ${value}`));
```

### 객체 메서드와 this
#### this
> 현재 실행 컨텍스트에서 객체를 참조하는 키워드이다. 함수가 호출될 때, this는 그 함수를 소유한 객체를 가리킨다.
- 메서드 체이닝을 하고자 한다면 return 값을 this로 한다.

```javascript
// 문제 1: 자기소개 객체
const person1 = {
  name: '김철수',
  age: 25,
  city: '서울',
  
  // introduce 메서드 완성하기
  introduce: function() {
    // "안녕하세요, 저는 김철수입니다. 25살이고 서울에 살아요."
    return `안녕하세요, 저는 ${this.name}입니다. ${this.age}살이고 ${this.city}에 살아요.`
  }
};

console.log(person1.introduce());

// 문제 2: 계산기 객체
const calculator = {
  result: 0,
  
  add: function(num) {
   this.result += num
   return this
  },
  
  getValue: function() {
    return this.result
  },
  
  reset: function() {
    this.result = 0;
    return this
  }
};

// 테스트: 메서드 체이닝
console.log(calculator.add(10).add(5).getValue()); // 15
console.log(calculator.reset().add(100).getValue()); // 100


// 문제 3: 카운터 객체
const counter = {
  count: 0,
  
  increment: function() {
    // count를 1 증가시키고 "현재 카운트: 1" 출력
    this.count += 1
    console.log("현재 카운트:", this.count)
  },
  
  decrement: function() {
    // count를 1 감소시키고 현재 값 출력
    this.count -= 1;
    console.log("현재 카운트:", this.count)
  },
  
  getCount: function() {
    // 현재 count 값 반환
    return this.count
  }
};

// 테스트
counter.increment(); // "현재 카운트: 1"
counter.increment(); // "현재 카운트: 2"
counter.decrement(); // "현재 카운트: 1"


const student1 = {
  name: '박민수',
  scores: [85, 92, 78],
  
  addScore: function(score) {
    // scores 배열에 점수 추가하고 "점수 추가됨: 95" 출력
    this.scores.push(score)
    console.log("점수 추가 : ", score)
  },
  
  getAverage: function() {
    // 평균 점수 계산해서 반환
    return this.scores.reduce((acc, cur) => acc + cur, 0) / this.scores.length
  },
  
  showReport: function() {
    // "박민수의 평균 점수: 85.0점" 출력
    console.log(`${this.name}의 평균 점수는 ${this.getAverage()}`)
  }
};

// 테스트
student1.addScore(95);
console.log(student1.getAverage()); // 87.5
student1.showReport(); // "박민수의 평균 점수: 87.5점"
```

#### 화살표 함수와 this
- 상위 스코프의 this를 그대로 사용한다.(렉시컬 this)
- 호출 방식과 관계 없이 정의된 위치에서의 this를 사용한다.
```javaScript
const obj1 = {
  name: "김철수",

  // 일반 함수
  sayHello1: function () {
    console.log(`안녕, 나는 ${this.name}야`);
  },

  // 화살표 함수 - 이게 어떻게 동작할까요?
  sayHello2: () => {
    console.log(`안녕, 나는 ${this.name}야`);
  },
};

obj1.sayHello1(); // 결과: 안녕, 나는 김철수야
obj1.sayHello2(); // 결과: 안녕, 나는 undefined야 > 정의된 위치에서의 this > window

// 문제 2: 콜백 함수에서의 this 문제
const employee = {
  name: "이영희",
  hobbies: ["독서", "영화감상", "요리"],

  // 방법 1: 일반 함수 사용
  // showHobbies1을 호출한 employee가 this에 해당 
  // 다만, 콜백함수 내부에서는 콜백함수만의 스코프가 생기며, 특정 객체에서 호출하지 않으면 기본적으로 window로 설정
  showHobbies1: function () {
    const self = this; // this를 변수에 저장
    this.hobbies.forEach(function (hobby) {
      console.log(`${self.name}은 ${hobby}을 좋아합니다`);
    });
  },

  // 방법 2: 화살표 함수 사용
  // 상위 스코프의 this를 따라간다. 상위 스코프는 showHobbies2의 스코프이므로, this가 employee를 가리킨다.
  showHobbies2: function () {
    this.hobbies.forEach((hobby) => {
      console.log(this); // employee를 가리킴
      console.log(`${this.name}은 ${hobby}을 좋아합니다`);
    });
  },

  // 방법 3: bind 사용 > 직접 스코프 지정 
  showHobbies3: function () {
    this.hobbies.forEach(
      function (hobby) {
        console.log(`${this.name}은 ${hobby}을 좋아합니다`);
      }.bind(this)
    );
  },
};

console.log("=== 방법 1 ===");
employee.showHobbies1(); 

console.log("=== 방법 2 ===");
employee.showHobbies2(); 

console.log("=== 방법 3 ===");
employee.showHobbies3(); 

// 문제 3: 타이머와 this 문제 해결하기
const timer = {
  seconds: 0,

  start1: function () {
    setInterval(function () {
      this.seconds++;
      console.log(`경과 시간: ${this.seconds}초`);
    }, 1000);
  },

  start2: function () {
    setInterval(() => {
      this.seconds++;
      console.log(`경과 시간: ${this.seconds}초`);
    }, 1000);
  },

  start3: function () {
    const self = this;
    setInterval(function () {
      self.seconds++;
      console.log(`경과 시간: ${self.seconds}초`);
    }, 1000);
  },
};

timer.start1(); // 문제 발생
timer.start2(); // 화살표 함수 버전
timer.start3(); // 변수 저장 버전
```

## 생성자 함수와 프로토타입
### 생성자 함수란?
> new 키워드와 함께 호출되어 객체를 생성하는 함수이다.
- 반드시 new 키워드로 호출해야 한다. 그렇지 않으면 일반 함수로 동작하여 this가 가리키는 객체가 window가 된다.
```javaScript
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job

    this.introduce = function() {
        return `안녕하세요. 저는 ${this.name}입니다. 나이는 ${this.age}이고, 직업은 ${this.job}입니다.`
    }
}

const per = new Person("이철산", 34, "개발자")
const per1 = new Person("남도산", 23, "개발자")

console.log(per.name)
console.log(per1.introduce())

// 객체 타입 확인
console.log(per instanceof Person) // true
```

### 프로토타입이란?
> JavaScript 객체가 다른 객체로부터 기능을 상속받을 수 있게 하는 메커니즘이다. 모든 함수는 prototype 속성을 가지며, 이를 통해 메서드를 공유할 수 있다.
- 프로토타입 사용 시 모든 인스턴스가 같은 메서드를 공유한다.

> Person.prototype: 생성자 함수의 prototype 속성 <br/> person.\_\_proto\_\_: 인스턴스의 프로토타입 (Person.prototype과 같음)

```javascript
// 1. Array.prototype.sum - 배열의 모든 숫자 합계
Array.prototype.sum = function () {
  return this.reduce((sum, cur) => sum + cur, 0);
};

// 2. Array.prototype.average - 배열의 평균값
Array.prototype.average = function() {
    return this.sum() / this.length
}
// 3. Array.prototype.unique - 중복 제거
Array.prototype.unique = function () {
    return Array.from(new Set(this))
}
// 4. Array.prototype.shuffle - 배열 섞기
Array.prototype.shuffle = function() {
    return this.sort(() => Math.random() - 0.5)
}

// 테스트
const numbers = [1, 2, 3, 4, 5, 2, 3];
console.log(numbers.sum()); // 20
console.log(numbers.average()); // 2.857...
console.log(numbers.unique()); // [1, 2, 3, 4, 5]

const arr = [1, 2, 3, 4, 5];
console.log(arr.shuffle()); // 섞인 배열
```

### 프로토타입 체인
> 객체에서 속성이나 메서드를 찾을 때, 현재 객체에 없으면 프로토타입을 따라 올라가면 찾아가는 메커니즘이다.

```javascript
// 2. Animal 생성자 함수
function Animal(name) {
  this.name = name;
}

// Animal 프로토타입 메서드
Animal.prototype.speak = function () {
  return `${this.name}이 소리를 냅니다.`;
};

Animal.prototype.move = function () {
  return `${this.name}이 움직입니다.`;
};

// Dog 생성자 함수 (Animal을 상속)
function Dog(name, breed) {
  // Animal 생성자 호출
  Animal.call(this, name)
  this.breed = breed
}

// Dog가 Animal을 상속하도록 설정
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog;

// Dog만의 메서드 추가
Dog.prototype.bark = function () {
  return `${this.name}이/가 멍멍 짖습니다.`;
};

// speak 메서드 오버라이드
Dog.prototype.speak = function () {
  return `${this.name}이/가 멍멍하고 짖습니다.`;
};

// 테스트
const animal = new Animal("동물");
const dog = new Dog("멍멍이", "진돗개");

console.log(animal.speak()); // "동물이 소리를 냅니다."
console.log(dog.speak()); // "멍멍이이 멍멍하고 짖습니다."
console.log(dog.bark()); // "멍멍이이 멍멍 짖습니다."
console.log(dog.move()); // "멍멍이이 움직입니다." (상속받은 메서드)
``` 

