import express from "express";
import fs from "fs";
const router = express.Router();

const chatRouter = (io) => {
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });

    socket.on("sendMessage", (info, callback) => {
      try {
        // server에서 클라이언트로 메시지 전달
        io.emit("message", {
          msg: info.msg,
          userName: info.userName,
          timestamp: new Date().toISOString(),
        });
        callback({ success: true, message: "메시지가 도착했습니다." });
      } catch (error) {
        callback({ success: false, message: "메시지 전달에 실패하였습니다." });
      }
    });
  });

  /* 자동 완성 API */
  router.post("/autoComplete", (req, res) => {
    const searchTerm = req.body.searchTerm;

    fs.readFile("./public/data/WebSquareAPI.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "File read error" });
      } else {
        try {
          const jsonData = JSON.parse(data);

          res.json({
            success: true,
            message: "정상적으로 파일 로드되었습니다.",
            searchTerm: searchTerm,
            data: jsonData,
          });
        } catch (parseError) {
          console.log("JSON parse error:", parseError);
          res.json({
            success: false,
            message: "파일 로드에 실패하였습니다.",
          });
        }
      }
    });
  });

  return router;
};

export default chatRouter;
