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


// 메뉴 시스템 예제
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

// 레이블 예제
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