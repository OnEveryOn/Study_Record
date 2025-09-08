/* 프로토타입 */
// 1번 문제
const grandParent = {
  family: "Kim",
  greet() {
    return `안녕, 나는 ${this.family}가 사람이야`;
  },
};

const parent = Object.create(grandParent);
parent.job = "developer";

const child = Object.create(parent);
child.age = 10;

// TODO: child -> parent -> grandParent 체인을 만드세요
// 최종적으로 child.family, child.job, child.age 모두 접근 가능해야 함

// 테스트
console.log(child.family); // 'Kim'
console.log(child.job); // 'developer'
console.log(child.age); // 10
console.log(child.greet()); // '안녕, 나는 Kim가 사람이야'

// 문제 2
// Vehicle 생성자 함수 (부모)
function Vehicle(brand, speed) {
  this.brand = brand;
  this.speed = speed;
}

// TODO: Vehicle.prototype에 move() 메서드 추가
// "{brand} 차량이 {speed}km/h로 이동합니다" 출력
Vehicle.prototype.move = function () {
  return `${this.brand} 차량이 ${this.speed}km/h로 이동합니다.`;
};

// Car 생성자 함수 (자식)
function Car(brand, speed, doors) {
  // TODO: Vehicle을 상속받고 doors 속성 추가
  Vehicle.call(this, brand, speed);
  this.doors = doors;
}

// TODO: Car가 Vehicle을 상속받도록 설정
// TODO: Car.prototype에 honk() 메서드 추가 - "빵빵!" 출력
Car.prototype = Object.create(Vehicle.prototype)
Car.prototype.constructor = Car;
Car.prototype.honk = function() {
  return "빵빵!"
}


// 테스트
const myCar = new Car("현대", 60, 4);
console.log(myCar.move()); // "현대 차량이 60km/h로 이동합니다"
console.log(myCar.honk()); // "빵빵!"
console.log(myCar instanceof Vehicle); // true
console.log(myCar instanceof Car); // true


// 문제 3번
// Animal -> Mammal -> Dog
// Animal -> Bird -> Eagle

function Animal(name) {
  // TODO: 구현
  this.name = name
}

function Mammal(name, furColor) {
  // TODO: Animal 상속
  Animal.call(this, name)
  this.furColor = furColor
}

function Bird(name, wingspan) {
  // TODO: Animal 상속
  Animal.call(this, name)
  this.wingspan = wingspan  
}

function Dog(name, furColor, breed) {
  // TODO: Mammal 상속
  Mammal.call(this, name, furColor)
  this.breed = breed
}

function Eagle(name, wingspan, huntingArea) {
  // TODO: Bird 상속
  Bird.call(this, name, wingspan)
  this.huntingArea = huntingArea
}

// TODO: 적절한 프로토타입 체인 설정
Mammal.prototype = Object.create(Animal.prototype)
Mammal.prototype.constructor = Mammal

Bird.prototype = Object.create(Animal.prototype)
Bird.prototype.constructor = Bird

Dog.prototype = Object.create(Mammal.prototype)
Dog.prototype.constructor = Dog

Eagle.prototype = Object.create(Bird.prototype)
Eagle.prototype.constructor = Eagle


// 테스트가 통과되도록 구현하세요
const dog = new Dog('멍멍이', '갈색', '진돗개');
const eagle = new Eagle('독수리', '2m', '산악지대');

console.log(dog instanceof Animal); // true
console.log(dog instanceof Mammal); // true
console.log(eagle instanceof Animal); // true
console.log(eagle instanceof Bird); // true
console.log(dog.name)