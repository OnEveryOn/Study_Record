import express from "express";

const app = express();
const port = 9090;

// json 요청을 보내기 위함
app.use(express.json());

// 정적 파일 서빙 추가
app.use("/data", express.static("data"));

/* 
  화면 렌더링 엔진을 ejs로 설정
  ejs 엔진을 사용하고자 한다면 views 폴더 하위에 존재해야 한다.
  req는 요청 객체, res는 응답 객체 
*/
app.set("view engine", "ejs");

/* 
  express.js 서버 구축 시에 주의할 점 순서를 고려하여 작업을 진행해야 한다
  구체적인 경로부터 시작해서 일반적인 경로로 정의를 해야 한다.
  그렇지 않으면 일반적인 경로에서 모든 라우터가 걸리는 문제가 발생한다. 
*/
app.get("/", (req, res) => {
  res.render("main");
});

app.get("/user", (req, res) => {
  res.render("promise");
});

app.get("/user/interval", (req, res) => {
  res.render("interval");
});

app.get("/user/timeout", (req, res) => {
  res.render("timeOut");
});

/* get 실습 */
// query 실습
app.get("/getTest", (req, res) => {
  const hasQuery = Object.keys(req.query).length > 0;
  res.render("getTest", {
    check: "",
    msg: hasQuery ? "" : "파라미터 없음",
    id: req.query.id || "",
    name: req.query.name || "",
    title: req.query.title || "",
    param: "",
  });
});

// params 실습
app.get("/getTest/:param", (req, res) => {
  // 응답으로 받은 데이터 request 파라미터을 통해 정보 받아서 "getTest.ejs"에 렌더링
  res.render("getTest", {
    check: "",
    msg: "",
    param: req.params.param,
    id: "",
    name: "",
    title: "",
  });
});

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

app.listen(port, () => {
  console.log(`${port}에서 듣고 있습니다.`);
});
