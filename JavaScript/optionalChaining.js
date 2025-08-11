/* 
    객체
*/

const data = {
  user: {
    name: "홍길동",
    profile: {
      email: "hong@example.com",
    },
  },
};

console.log(data.user.name);
console.log(data?.user?.name);

/* 
    객체가 존재하고 속성만 없는 경우에는 옵셔널 체이닝과 관계없이 undefined를 반환
    주된 차이는 객체 자체가 null/undefined인 경우에 효과가 있음
*/
console.log(data.user.phone); // undefined
console.log(data?.user?.phone); // undefined

/* 
    객체 자체가 없다면
*/
const obj = null;

console.log(obj?.user); // undefined
console.log(obj.user); // TypeError 발생

/* 
    배열
 */
const users = [
  { name: "김철수", age: 25 },
  { name: "이영희" }
];

console.log(users?.[0]?.name);    // 김철수
console.log(users?.[1]?.name);    // 이영희
console.log(users?.[1]?.age);     // undefined

/* 
    함수
*/
const api = {
  getData: () => "데이터",
  getUser: null
};

console.log(api?.getData?.())   // 데이터
console.log(api?.getUser?.())   // undefined
console.log(api.getUser())   // TypeeError 발생

/* 
    메서드 체이닝
*/
const response = {
  data: {
    users: [
      { getName: () => "홍길동" },
      { getName: null }
    ]
  }
};

console.log(response?.data?.users?.[0]?.getName?.())   // 홍길동
console.log(response?.data?.users?.[1]?.getName?.())   // undefined

/* 
    실전 예제
*/
const usersArr = [
  {
    id: 1,
    name: "김철수",
    profile: {
      email: "kim@example.com",
      address: {
        city: "서울",
        district: "강남구"
      }
    }
  },
  {
    id: 2,
    name: "이영희"
  },
  {
    id: 3,
    name: "박민수",
    profile: {
      email: "park@example.com"
    }
  }
];

// 과제: 아래 코드를 에러 없이 실행되도록 수정하세요
console.log(usersArr[0].profile.address.city);            // 서울
console.log(usersArr?.[1]?.profile?.email);               // undefined
console.log(usersArr?.[2]?.profile?.address?.district);   // undefined
console.log(usersArr?.[10]?.name);                        // undefined