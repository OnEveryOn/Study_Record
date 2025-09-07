function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.introduce = function () {
  return `안녕하세요, 저는 ${this.name}이고 ${this.age}살입니다.`;
};
Person.prototype.getOlder = function () {
  this.age++;
  return `${this.name}님이 ${this.age}살이 되었습니다.`;
};

// 테스트
const person1 = new Person("김철수", 25);
const person2 = new Person("이영희", 30);
console.log(person1.introduce());
console.log(person2.getOlder());

// 1. 기본 Array 프로토타입에 유용한 메서드들을 추가

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

// 3. 아래 코드의 출력 결과를 예측하고, 프로토타입 체인을 그려보세요

function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

function Admin(name, role) {
  User.call(this, name);
  this.role = role;
}

// Admin이 User를 상속
Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.getRole = function () {
  return `Role: ${this.role}`;
};

const admin = new Admin("관리자", "super");

// 다음 결과들을 예측해보세요
console.log(admin.name); // 관리자
console.log(admin.greet()); // Hello, 관리자
console.log(admin.getRole()); // super
console.log(admin instanceof Admin); // true
console.log(admin instanceof User); // true
console.log(admin.constructor === Admin); // true

