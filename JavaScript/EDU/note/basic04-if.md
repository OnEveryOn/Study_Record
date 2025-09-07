## if문
> 주어진 조건이 참(true)일 때 특정 코드 블록을 실행하는 가장 기본적인 조건문
### 1. 단일 if문
```javaScript
let score = 85;
if (score >= 90) {
    console.log("A학점입니다!");
}
```

### 2. if else문
```javaScript
let age = 17;
if (age >= 18) {
    console.log("성인입니다.");
} else {
    console.log("미성년자입니다.");
}
```

### 3. if else, if else문
```javaScript
function getGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

console.log(getGrade(75));  // "C"
```

### 4. 중첩 if문
```javaScript
let weather = "sunny";
let temperature = 25;

if (weather === "sunny") {
    if (temperature > 20) {
        console.log("날씨가 좋습니다! 산책하기 좋은 날이에요.");
    } else {
        console.log("맑지만 쌀쌀합니다.");
    }
} else if (weather === "rainy") {
    console.log("비가 옵니다. 우산을 챙기세요.");
}
```

### 삼항 연산자를 활용한 조건문
```javaScript
// 삼항 연산자
const getGrade2 = (score) => {
    const grade =  score >= 90 ? "A" 
        : score >= 80 ? "B"
        : score >= 70 ? "C"
        : score >= 60 ? "D"
        : "F" 

    return grade
}

console.log(getGrade2(30))   // F
```

### Early Return, Guard Clause
### Early Return란
> 함수에서 특정 조건을 만족하면 즉시 return하여 불필요한 코드 실행을 방지하는 패턴을 말한다.
```javaScript
function processUserDataImproved(user) {
    if (!user) return "사용자 정보가 없습니다";
    if (!user.isActive) return "비활성 사용자입니다";
    if (!user.hasPermission) return "권한이 없습니다";
    if (!user.email) return "이메일이 없습니다";
    
    // 메인 로직: 조건을 모두 통과한 경우
    console.log(`처리 중: ${user.email}`);
    return user.email.toLowerCase();
}
```

### Guard Clause
> 함수 시작 부분에서 예외 상황이나 잘못된 입력을 먼저 체크하고 처리하는 패턴을 말한다.
```javaScript
function calculateDiscount(user, product) {
    // 입력값 검증
    if (!user) throw new Error("사용자 정보가 필요합니다");
    if (!product) throw new Error("상품 정보가 필요합니다");
    if (product.price <= 0) throw new Error("상품 가격이 유효하지 않습니다");
    
    // 할인 불가 조건 체크
    if (!user.isMember) return 0;
    if (product.category === "excluded") return 0;
    
    // 할인율 계산
    let discountRate = 0.05; // 기본 5%
    
    if (user.membershipLevel === "gold") {
        discountRate = 0.15;
    } else if (user.membershipLevel === "silver") {
        discountRate = 0.10;
    }
    
    if (product.isOnSale) {
        discountRate += 0.05; // 세일 상품 추가 5%
    }
    
    return Math.min(discountRate, 0.5); // 최대 50% 할인
}
```