## 연산자
### 산술 연산자
1. 덧셈 연산자(+)
2. 뺄셈 연산자(-)
3. 곱셈 연산자(*)
4. 나눗셈 연산자(/)
5. 나머지 연산자(%)
6. 거듭제곱 연산자(**)

```javaScript
// 문자열과 숫자 연산
console.log("5" + 3)   // 53
console.log("5" - 3)   // 2
console.log("5" * 3)   // 15

// 특수값 처리
console.log(10 / 0)    // Infinity
console.log(-10 / 0)   // -Infinity
console.log(0 / 0)     // NaN : type은 number지만 값이 없음
console.log("abc" * 2)  // NaN

// 소수점 연산
console.log(0.1 + 0.2) // 0.30000000000000004
// toFixed를 사용하여 연산
console.log((0.1 + 0.2).toFixed(1))
console.log(0.1 + 0.1) // 0.2
```

### 증감 연산자
- 변수의 값을 1씩 증가시키거나 감소시키는 단항 연산자
    - 전위 증감(++a/--a), 후위 증감(a++/a--)
```javascript
let count = 0;
console.log("현재 카운트: ", count++); // 1
console.log("다음 카운트: ",count)     // 2
```

### 할당 연산자
- 변수에 값을 할당하는 연산자
    - 기본 할당 연산자(=)와 산술 연산을 결합한 복합 할당 연산자(+=, -=, *=, /= etc.)
```javaScript
let a = 3;
let b = 6;
a += b; // a = a + b;
```

#### 연쇄 할당
```javaScript
let a = b = c = 10
console.log(a, b, c) // 10 10 10
```

### 연산자 우선순위
1. 괄호
2. **, ++, -- : 거듭제곱, 증감 연산자
3. *, /, % : 곱셈, 나눗셈, 나머지
4. \+ , - : 덧셈, 뺄셈
5. <, >, <=, >= : 관계 연산자
6. ==, ===, !=, !== : 동등성 연산자
7. && : 논리 and
8. || : 논리 or
9. ? : : 삼항 연산자
10. =- : 할당 연산자

#### 괄호의 중요성
- typeof의 우선순위
```javaScript
console.log(typeof x + 1) // (typeof x) + 1 로 동작
```



