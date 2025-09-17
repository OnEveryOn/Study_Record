import express from "express";
import indexRouter from "./routes/index.js"
import { readFile } from 'fs';

const app = express();
const port = 9090;

app.use(express.json());

// 정적 파일 서빙 추가
// express.static 미들웨어에 "public" 폴더를 사용할 수 있도록 제공 
app.use(express.static("public"));

/* 
  화면 렌더링 엔진을 ejs로 설정
  ejs 엔진을 사용하고자 한다면 views 폴더 하위에 존재해야 한다.
  req는 요청 객체, res는 응답 객체 
*/
app.set("view engine", "ejs");

app.use('/', indexRouter)

/* 
  express.js 서버 구축 시에 주의할 점 순서를 고려하여 작업을 진행해야 한다
  구체적인 경로부터 시작해서 일반적인 경로로 정의를 해야 한다.
  그렇지 않으면 일반적인 경로에서 모든 라우터가 걸리는 문제가 발생한다. 
*/

/* post 실습 */
// 1. id가 홀수인 데이터 리턴 : promise/async
app.post("/user", (req, res) => {
  // 클라이언트에서 요청한 json을 받아서 처리한 다음 응답 데이터로 전송
  console.log(req.body);

  // id가 홀수인 데이터
  const filterdData = req.body.filter((data) => {
    return data.id % 2 !== 0;
  });

  console.log(filterdData);
  res.json({ data: filterdData });
});

//setTimeout(300) : name이 이영희 인 유저 리턴
app.post("/user/timeout", (req, res) => {
  let filterdData = "";
  setTimeout(() => {
    filterdData = req.body.filter((data) => {
      return data.name === "이영희";
    });
    console.log(filterdData);
    res.json({ data: filterdData });
  }, 300);
});

//setInterval(300) : roles가 viewer인 유저 리턴
app.post("/user/interval", (req, res) => {
  let filterdData = "";

  filterdData = req.body.filter((data) => {
    return data.roles.includes("viewer");
  });
  const newArr = filterdData.map((data) => data.name);
  res.json({ data: newArr });
});

app.post("/autoComplete", (req, res) => {
  const searchTerm = req.body.searchTerm;
  console.log('검색어:', searchTerm);
  
  readFile('./public/data/WebSquareAPI.json', 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      res.status(500).json({ error: 'File read error' });
    } else {
      try {
        const jsonData = JSON.parse(data);
        console.log("로드된 데이터:", jsonData);
        
        res.json({ 
          searchTerm: searchTerm,
          data: jsonData
        });
      } catch (parseError) {
        console.log('JSON parse error:', parseError);
        res.status(500).json({ error: 'JSON parse error' });
      }
    }
  });
});


app.listen(port, () => {
  console.log(`${port}에서 듣고 있습니다.`);
});
