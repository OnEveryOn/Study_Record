import express from "express";

// 페이지 요청 라우팅
const router = express.Router();

router.get("/", (req, res) => {
  res.render("main");
});

router.get("/autoComplete", (req, res)=>{
  res.render("autoComplete")
})

router.get("/user", (req, res) => {
  res.render("promise");
});

router.get("/user/interval", (req, res) => {
  res.render("interval");
});

router.get("/user/timeout", (req, res) => {
  res.render("timeOut");
});

/* get 실습 */
// query 실습
router.get("/getTest", (req, res) => {
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
router.get("/getTest/:param", (req, res) => {
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

export default router;