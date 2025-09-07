const person = {
  name: "김철수",
  age: 25,
  isStudent: true,
  hobbies: ["독서", "축구"],
  introduce: function () {
    return "안녕하세요";
  },
  study() {
    return this.name + "이(가) 공부합니다.";
  },
};

/* 객체 생성 및 속성 조작 */
const student = new Object();
student.name = "이영희";
student.age = 34;
student.subjects = ["영어", "수학"];

/*
 대괄호 표기법 
 - 프로퍼티 키값을 ("")로 감싸야 한다. 
*/
console.log(student["name"]);
console.log(student["age"]);

// 동적 속성 접근 : 런타임 시에
const propertyName = "subjects";
console.log(student[propertyName]);

// 속성 삭제
delete student.name;
console.log(student); // { age: 34, subjects: [ '영어', '수학' ] }

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

/* 객체 메서드 정의와 this 사용 */
// 문제 1: 자기소개 객체
const person1 = {
  name: "김철수",
  age: 25,
  city: "서울",

  // introduce 메서드 완성하기
  introduce: function () {
    // "안녕하세요, 저는 김철수입니다. 25살이고 서울에 살아요."
    return `안녕하세요, 저는 ${this.name}입니다. ${this.age}살이고 ${this.city}에 살아요.`;
  },
};

console.log(person1.introduce());

// 문제 2: 계산기 객체
const calculator = {
  result: 0,

  add: function (num) {
    this.result += num;
    return this;
  },

  getValue: function () {
    return this.result;
  },

  reset: function () {
    this.result = 0;
    return this;
  },
};

// 테스트: 메서드 체이닝
console.log(calculator.add(10).add(5).getValue()); // 15
console.log(calculator.reset().add(100).getValue()); // 100

// 문제 3: 카운터 객체
const counter = {
  count: 0,

  increment: function () {
    // count를 1 증가시키고 "현재 카운트: 1" 출력
    this.count += 1;
    console.log("현재 카운트:", this.count);
  },

  decrement: function () {
    // count를 1 감소시키고 현재 값 출력
    this.count -= 1;
    console.log("현재 카운트:", this.count);
  },

  getCount: function () {
    // 현재 count 값 반환
    return this.count;
  },
};

// 테스트
counter.increment(); // "현재 카운트: 1"
counter.increment(); // "현재 카운트: 2"
counter.decrement(); // "현재 카운트: 1"

const student1 = {
  name: "박민수",
  scores: [85, 92, 78],

  addScore: function (score) {
    // scores 배열에 점수 추가하고 "점수 추가됨: 95" 출력
    this.scores.push(score);
    console.log("점수 추가 : ", score);
  },

  getAverage: function () {
    // 평균 점수 계산해서 반환
    return this.scores.reduce((acc, cur) => acc + cur, 0) / this.scores.length;
  },

  showReport: function () {
    // "박민수의 평균 점수: 85.0점" 출력
    console.log(`${this.name}의 평균 점수는 ${this.getAverage()}`);
  },
};

// 테스트
student1.addScore(95);
console.log(student1.getAverage()); // 87.5
student1.showReport(); // "박민수의 평균 점수: 87.5점"

/* 
    화살표 함수에서의 this
*/
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

// timer.start1(); // 문제 발생
// timer.start2(); // 화살표 함수 버전
// timer.start3(); // 변수 저장 버전

// 생성자 함수 정의
// 반드시 new 키워드 사용하여 호출하여야 한다. 그렇지 않으면 일반 함수로 동작하게 된다.
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  this.introduce = function () {
    return `안녕하세요. 저는 ${this.name}입니다. 나이는 ${this.age}이고, 직업은 ${this.job}입니다.`;
  };
}

const per = new Person("이철산", 34, "개발자");
const per1 = new Person("남도산", 23, "개발자");

console.log(per.name);
console.log(per1.introduce());

// 객체 타입 확인
console.log(per instanceof Person); // true

//  1. BankAccount 생성자 함수 문제
function BankAccount(owner, initialBalance = 0) {
  // 속성 설정
  this.owner = owner;
  this.initialBalance = initialBalance;

  // 입급
  this.deposit = function (money) {
    this.initialBalance += money;
    return `${money}원이 입금되어 총 ${this.initialBalance}원 입니다.`;
  };

  // 출금 (잔액 부족시 "잔액이 부족합니다" 반환)
  this.withdraw = function (money) {
    if (this.initialBalance < money) return "잔액이 부족합니다.";
    this.initialBalance -= money;
    return `${money}원 출금되었습니다. 잔액은 ${this.initialBalance}원 입니다.`;
  };

  // 잔액 조회
  this.getBalance = function () {
    return `현재 잔액: ${this.initialBalance}원`;
  };
}

// 테스트
const account1 = new BankAccount("김철수", 10000);
const account2 = new BankAccount("이영희");

console.log(account1.deposit(5000)); // "15000원 입금되었습니다"
console.log(account1.withdraw(3000)); // "12000원 출금되었습니다"
console.log(account1.getBalance()); // "현재 잔액: 12000원"
console.log(account2.withdraw(1000)); // "잔액이 부족합니다"

// Product 생성자 함수 문제
function Product(name, price, category) {
  // name, price, category, stock(기본값 0) 속성 설정
  this.name = name;
  this.price = price;
  this.category = category;
  this.stock = 0;

  // addStock 메서드: 재고 추가
  this.addStock = function(quantity) {
    this.stock += quantity
    return this
  }
  // sell 메서드: 판매 (재고 부족시 에러 메시지)
  this.sell = function(quantity) {
    if(this.stock < quantity) return "재고가 부족합니다."
    this.stock -= quantity
    return `${quantity}개 판매되었습니다. 남은 재고: ${this.stock}개`
  }
  // getInfo 메서드: 상품 정보 출력
  this.getInfo = function() {
    return `${this.name} - ${this.price}원 (${this.category})  재고: ${this.stock}개`
  }
  // applyDiscount 메서드: 할인율 적용
  this.applyDiscount = function (percent) {
    this.price -= this.price*(percent / 100)
    return `${percent}% 할인 적용. 할인 가격: ${this.price}원`
  }
}

// 테스트
const product1 = new Product("노트북", 1000000, "전자제품");
product1.addStock(10);
console.log(product1.sell(3)); // "3개 판매되었습니다. 남은 재고: 7개"
console.log(product1.applyDiscount(10)); // "10% 할인 적용. 새 가격: 900000원"
console.log(product1.getInfo()); // "노트북 - 900000원 (전자제품) 재고: 7개"
