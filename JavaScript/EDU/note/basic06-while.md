## While문
> 조건식이 true인 동안에만 반복문을 실행 
-  반복 횟수가 명확하지 않을 때 사용

#### 활용 예제
```javascript
const targetNumber = Math.floor(Math.random() * 100) + 1;
let guess = 0;
let attempts = 0;

while(guess !== targetNumber){
    guess = parseInt(prompt("1~100 사이의 숫자를 맞춰보세요:"));
    attempts++;

    if(guess < targetNumber){
        console.log("더 큰 숫자입니다.")
    }else if(guess > targetNumber){
        console.log("더 작은 숫자입니다.")
    }else{
        console.log(`정답입니다. ${attempts}번만에 맞혔습니다.`)
    }
}
```

> while문을 사용할 때에는 무한 루프에 빠지지 않도록 주의해야 한다. 조건이 반드시 false가 되어야 한다는 것.

## do-while문
> 실행문을 먼저 실행한 후에 조건을 검사하는 반복문이다. 조건이 false여도 최소 1회 실행은 보장된다.

 ```javascript
do {
    // 실행문 (최소 1회 실행)
} while (조건식);
```

실전 예제
```javaScript
let choice;
do {
    console.log("=== 메뉴 ===");
    console.log("1. 파일 열기");
    console.log("2. 파일 저장");
    console.log("3. 종료");
    
    choice = parseInt(prompt("메뉴를 선택하세요 (1-3):"));
    
    switch (choice) {
        case 1:
            console.log("파일을 엽니다.");
            break;
        case 2:
            console.log("파일을 저장합니다.");
            break;
        case 3:
            console.log("프로그램을 종료합니다.");
            break;
        default:
            console.log("잘못된 선택입니다.");
    }
} while (choice !== 3);
```

### 그렇다면 반복문을 어떤 상황에 어떤 것을 쓰면 좋을까?
1. **반복 횟수가 정해져있다** → 일반 for문
2. **배열이나 객체 순회를 한다** → for of(이터러블 객체 순회) 또는 for in(객체 순회)
3. **특정 조건까지 반복을 한다** → while문
4. **최초 1회 실행되어야 한다** → do-while문

## break와 continue
### break문 : 반복문을 즉시 종료하고 루프를 빠져나간다.
    - 검색에서 원하는 결과를 찾았을 때, 특정 조건에서 루프 종료
### continue문 : 현재 반복을 건너뛰고 다음 반복으로 넘어간다.
    - 특정 데이터 제외하고 처리, 유효하지 않은 값 걸러내기
### 레이블
    - 중첩 루프에서 특정 루프를 지정하여 break/continue 적용
    - 반복문에 라벨링을 해주는 것이라고 생각하면 된다
    
```javaScript
// 레이블 사용 예제
outer: for (let i = 1; i <= 3; i++) {
    console.log(`외부 루프: ${i}`);
    
    inner: for (let j = 1; j <= 3; j++) {
        if (i === 2 && j === 2) {
            console.log("외부 루프 종료");
            break outer; // 외부 루프까지 종료
        }
        console.log(`  내부 루프: ${j}`);
    }
}

// 출력:
// 외부 루프: 1
//   내부 루프: 1
//   내부 루프: 2
//   내부 루프: 3
// 외부 루프: 2
//   내부 루프: 1
// 외부 루프 종료
```