## 배열
### 배열이란?
> 순서가 있는 데이터의 집합이다. 다양한 타입의 값을 저장할 수 있는 동적 자료 구조
- 배열의 크기는 런타임 시에 자유롭게 변경이 가능하다.
- 모든 타입을 저장할 수 있다.

### 배열 생성 방법
1. 배열 리터럴 : [] 대괄호를 사용한 직접적인 배열 생성
2. Array 생성자 : new Array()를 사용한 배열 생성
3. Array.from() : 이터러블 객체나 유사 배열을 배열로 변환
4. Array.of() : 전달받은 인수들로 배열 생성


### 탐색 메서드
1. indexOf() : 요소의 인덱스를 반환, 없으면 -1
```javaScript
const fruits = ['apple', 'banana', 'orange', 'apple'];
const numbers = [5, 12, 8, 130, 44];

console.log(fruits.indexOf('apple')); // 0 (첫 번째 apple)
console.log(fruits.indexOf('grape')); // -1 (없음)
```

2. includes() : 요소 존재 여부를 불린값으로 반환
```javaScript
console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape')); // false
```

3. find() : 조건을 만족하는 첫 번째 요소 반환
```javaScript
const bigNumber = numbers.find(num => num > 10);
console.log(bigNumber); // 12
```
arr.find(조건문)

4. findIndex() : 조건을 만족하는 첫 번째 요소의 인덱스 반환
```javaScript
const bigNumberIndex = numbers.findIndex(num => num > 10);
console.log(bigNumberIndex); // 1
```

5. some() : 특정 조건을 만족하는 요소가 있다면 true 반환
```javaScript
const scores = [85, 92, 78, 96, 73, 88];
scores.some((score) => score >= 90); // true
```

6. every() : 모든 요소가 특정 조건을 만족해야 true 반환
```javascript
const users = [
  { name: "Alice", age: 25, isActive: true, email: "alice@test.com" },
  { name: "Bob", age: 17, isActive: true, email: "bob@test.com" },
  { name: "Charlie", age: 30, isActive: false, email: "charlie@test.com" },
  { name: "Diana", age: 22, isActive: true, email: "" },
];

users.every((user) => user.email !== "");
```

### 고차 함수
1. **map** : 각 요소를 변환하여 **새 배열 생성**
    - 원본 배열은 변경하지 않고 새로운 배열을 만드는 것
```javaScript
const squares = numbers.map((element, index, array) => {
    // element: 현재 처리 중인 배열 요소
    // index: 현재 요소의 인덱스 (선택적)
    // array: 메서드를 호출한 원본 배열 (선택적)
    console.log(`map 처리 중: element=${element}, index=${index}`);
    return element * element;
});
console.log('제곱:', squares); // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

2. **filter** : 조건을 만족하는 요소들로 새 배열 생성
```javaScript
const evens = numbers.filter((element, index, array) => {
    // element: 현재 처리 중인 배열 요소
    // index: 현재 요소의 인덱스 (선택적)
    // array: 메서드를 호출한 원본 배열 (선택적)
    const isEven = element % 2 === 0;
    console.log(`filter 처리 중: element=${element}, index=${index}, 짝수여부=${isEven}`);
    return isEven;
});
console.log('짝수:', evens); // [2, 4, 6, 8, 10]
```


3. **reduce** : 모든 요소를 하나의 값으로 축약
```javaScript
const sum = numbers.reduce((accumulator = 0, currentValue, currentIndex, array) => {
    // accumulator: 누적값 (이전 콜백의 반환값 또는 초기값)
    // currentValue: 현재 처리 중인 배열 요소
    // currentIndex: 현재 요소의 인덱스 (선택적)
    // array: 메서드를 호출한 원본 배열 (선택적)
    console.log(`reduce 처리 중: accumulator=${accumulator}, currentValue=${currentValue}, index=${currentIndex}`);
    return accumulator + currentValue;
}, 0); // 초기값: 0
console.log('합계:', sum); // 55
```

4. **forEach** : 각 요소에 대해 함수 실행(반환값 없음)
```javaScript
numbers.forEach((element, index, array) => {
    // element: 현재 처리 중인 배열 요소
    // index: 현재 요소의 인덱스 (선택적)
    // array: 메서드를 호출한 원본 배열 (선택적)
    console.log(`forEach 처리 중: element=${element}, index=${index}`);
});
```

> 메서드 체이닝 : 짝수만 골라서 제곱한 후 합계
```javaScript
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sum = 0;
const result = numbers
  .filter((num) => num % 2 === 0)
  .map((even) => (even * even))
  .reduce((sum, num) => (sum += num));

console.log(result);
```

### 다차원 배열
```javaScript
const 침착맨 영상을 본 유저 = [
    [이름, 나이, 구독자수, [침착맨 구독, 슈카월드 구독]],
    [이름, 나이, 구독자수, [침착맨 구독, 슈카월드 구독]]
]
```

실전 예제
```javaScript
// 학생 성적 표 (이름, 수학, 영어, 과학)
const studentGrades = [
    ['김철수', 90, 85, 92],
    ['이영희', 95, 88, 90],
    ['박민수', 87, 92, 85],
    ['최지연', 92, 90, 95]
];

// 특정 학생의 영어 점수 (두 번째 열)
console.log('이영희의 영어 점수:', studentGrades[1][2]); // 88

// 모든 학생의 이름 추출
const studentNames = studentGrades.map(student => student[0]);
console.log('학생 이름들:', studentNames);
```

### 배열 정렬
- 배열 요소들을 특정 기준에 따라 순서대로 배치하는 것이다.
    - 기본적으로 문자열 기준으로 정렬한다. 즉, 숫자는 문자열로 변환 후 정렬


```javaScript
// 1. 문자열 배열 정렬
const fruits = ['banana', 'apple', 'orange', 'grape'];
const sortedFruits = [...fruits].sort(); // 원본 보존을 위해 복사 후 정렬
console.log('정렬된 과일:', sortedFruits); // ['apple', 'banana', 'grape', 'orange']

// 2. 숫자 배열 정렬 (주의: 기본 sort는 문자열 기준)
const numbers = [10, 5, 40, 25, 1000, 1];
console.log('기본 정렬 (잘못):', [...numbers].sort()); // [1, 10, 1000, 25, 40, 5]
console.log('숫자 오름차순:', [...numbers].sort((a, b) => a - b)); // [1, 5, 10, 25, 40, 1000]
console.log('숫자 내림차순:', [...numbers].sort((a, b) => b - a)); // [1000, 40, 25, 10, 5, 1]

// 3. 객체 배열 정렬
const people = [
    { name: '김철수', age: 25 },
    { name: '이영희', age: 30 },
    { name: '박민수', age: 20 },
    { name: '최지연', age: 35 }
];

// 나이순 정렬
const sortedByAge = [...people].sort((a, b) => a.age - b.age);
console.log('나이순 정렬:', sortedByAge);

// 이름순 정렬
const sortedByName = [...people].sort((a, b) => a.name.localeCompare(b.name));
console.log('이름순 정렬:', sortedByName);
```

### 고급 배열 기법
1. 스프레드 연산자 : 얕은 복사
```javaScript
// 배열 복사 방법들
const original = [1, 2, 3, 4, 5];

// 1. 스프레드 연산자 (얕은 복사)
const copy1 = [...original];

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
console.log('합친 배열:', combined);
```

2. Array.from() : 얕은 복사
```javaScript
const copy2 = Array.from(original);
```

3. slice() : 얕은 복사
```javaScript
const copy3 = original.slice();
console.log('원본:', original);
console.log('복사본들:', copy1, copy2, copy3);
```

4. 중복 제거 > set 활용
```javaScript
const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = [...new Set(duplicates)];
console.log('중복 제거:', unique); // [1, 2, 3, 4, 5]
```

5. 배열 뒤집기 > reverse()
```javaScript
const reservedArr = [...original].reverse();
console.log("reservedArr: ", reservedArr)
```