import socket from "./socket/server.js";
import utils from "./cm/utils.js";

const btn_logout = document.getElementById("logout-btn");
const ipt_msgBox = document.getElementById("ipt_msgBox");
const div_dropdown = document.getElementById("div_dropdown");
const userInfo = document.getElementById("user-email");
const btn_send = document.getElementById("btn_send");
const chatMessages = document.getElementById("chat-messages");

let resizeObserver = null;
let prevSize = { width: 0, height: 0 };
let isFirstTime = true;
let disconnectHandler;
let isActive = true;
let timeout;
let worker;
let lastMessage = {
  sender: null,
  time: null,
};

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function isSameTimeGroup(time1, time2) {
  return time1 === time2;
}

// 메시지를 채팅창에 추가하는 함수
function addMessage(sender, message, isMyMessage = false) {
  const currentTime = getCurrentTime();
  const shouldShowHeader =
    lastMessage.sender !== sender ||
    !isSameTimeGroup(lastMessage.time, currentTime);

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isMyMessage ? "sent" : "received"}`;

  if (shouldShowHeader) {
    // 헤더 포함한 메시지
    messageDiv.innerHTML = `
      <div class="message-content">
        <div class="message-header">
          <span class="message-sender">${sender}</span>
          <span class="message-time">${currentTime}</span>
        </div>
        <div class="message-bubble">${message}</div>
      </div>
    `;
  } else {
    // 헤더 없는 연속 메시지
    messageDiv.innerHTML = `
      <div class="message-content">
        <div class="message-bubble" style="margin-top: 4px;">${message}</div>
      </div>
    `;
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // 마지막 메시지 정보 업데이트
  lastMessage = {
    sender: sender,
    time: currentTime,
  };
}

const onLoadHandler = async (e) => {
  let response;
  const loginType = sessionStorage.getItem("loginType");
  if (loginType === "kakao") {
    response = await axios({
      method: "POST",
      url: "/auth/profile",
      withCredentials: true,
    });
  } else {
    // 일반 사용자 정보 조회
    // response = await axios.get('/auth/me', { withCredentials: true });
  }

  if (response && response.data.success) {
    const userName = response.data.userName || response.data.userEmail;
    userInfo.textContent = userName;
  }
};

const initialinitResizeObserver = () => {
  if (!ipt_msgBox) return;

  if (!resizeObserver) {
    resizeObserver = new ResizeObserver((entries) => {
      console.log("옵저버 등록");
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;

        if (isFirstTime) {
          isFirstTime = false;
          prevSize = { width: width, height: height };
        }

        console.group("sizeCheck");
        console.log("이전 크기 : ", prevSize.width, prevSize.height);
        console.log("현재 크기 : ", width, height);
        console.groupEnd("sizeCheck");

        handleObserver(width, height);
        prevSize = { width: width, height: height };
      });
    });
  }

  resizeObserver.observe(ipt_msgBox);
};

const handleObserver = (width, height) => {
  if (!ipt_msgBox) return;

  if (width > prevSize.width || height > prevSize.height) {
    ipt_msgBox.style.backgroundColor = "#c3d2fc";
  } else if (width < prevSize.width || height < prevSize.height) {
    ipt_msgBox.style.backgroundColor = "#c3fcf0ff";
  }
};

disconnectHandler = () => {
  console.log("resizeObserver 통신 차단");
  if (resizeObserver) resizeObserver.disconnect();
};

/* 로그아웃 */
const logoutHandler = async () => {
  try {
    const popupData = {
      message: "로그아웃하시겠습니까?",
      showCancel: true
    };
    
    const result = await utils.openPopup("/popup", popupData);
    console.log(result)
    console.log(result)
    if (result.action === "confirm") {
      sessionStorage.clear();
      const response = await axios.post("/auth/logout", {}, { withCredentials: true });
      if (response.data.success) {
        window.location.href = "/login";
      }
    }
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};

/* ===================== 자동완성 ===================== */
if (window.Worker) {
  worker = new Worker("/js/worker/dataControl.js");

  worker.onmessage = (e) => {
    const processedData = e.data;
    console.log("처리된 데이터: ", processedData);

    if (processedData.result && processedData.result.suggestions) {
      const suggestions = processedData.result.suggestions;
      showDropdown(suggestions.map((item) => item.key));
    }
  };

  worker.onerror = (error) => {
    console.error("Web Worker 에러:", error);
  };
}

const inputHandler = (e) => {
  clearTimeout(timeout);
  const inputValue = e.target.value;

  if (inputValue.trim() === "") {
    hideDropdown();
    return;
  }

  if (isActive && inputValue.trim() !== "") {
    timeout = setTimeout(() => {
      if (worker) {
        console.log("Web Worker에 메시지 전송:", inputValue);
        worker.postMessage(inputValue);
      }
    }, 300);
  }
};

const blurHandler = (e) => {
  console.log("input 이벤트리스너 제거 ");
  isActive = false;
  ipt_msgBox.removeEventListener("input", inputHandler);
  hideDropdown();
};

const focusHandler = (e) => {
  console.log("input 이벤트리스너 등록");
  isActive = true;
  ipt_msgBox.removeEventListener("input", inputHandler);
  ipt_msgBox.addEventListener("input", inputHandler);
};

const hideDropdown = () => {
  if (div_dropdown) {
    div_dropdown.style.display = "none";
  }
};

const showDropdown = (items) => {
  if (!items || items.length === 0) {
    hideDropdown();
    return;
  }

  div_dropdown.innerHTML = items
    .map((item) => `<div class="div_dropdown_item">${item}</div>`)
    .join("");

  div_dropdown.style.display = "block";

  div_dropdown.querySelectorAll(".div_dropdown_item").forEach((item) => {
    item.onmousedown = (e) => {
      e.preventDefault();
      ipt_msgBox.value = item.textContent;
      hideDropdown();
    };
  });
};

/* ===================== 실시간 채팅 ===================== */
socket.on("connect", () => {
  console.log("서버에 연결되었습니다:", socket.id);
});

socket.on("message", (data) => {
  const isMyMessage = data.userName === userInfo.textContent;
  addMessage(data.userName, data.msg, isMyMessage);
});

// Enter 키로 메시지 전송
const handleKeyPress = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

const sendMessage = () => {
  const sendMsg = ipt_msgBox.value.trim();
  if (!sendMsg) return;

  const data = { userName: userInfo.textContent, msg: sendMsg };

  socket.emit("sendMessage", data, (res) => {
    if (res.success) {
      ipt_msgBox.value = "";
      console.log("메시지 전송 완료");
    }
  });
};

// 이벤트 리스너 등록
btn_send.addEventListener("click", sendMessage);
ipt_msgBox.addEventListener("keypress", handleKeyPress);
btn_logout.addEventListener("click", logoutHandler);
window.addEventListener("beforeunload", disconnectHandler);
ipt_msgBox.addEventListener("focus", focusHandler);
ipt_msgBox.addEventListener("blur", blurHandler);
window.addEventListener("load", onLoadHandler);
document.addEventListener("DOMContentLoaded", () => {
  initialinitResizeObserver();
});
