const msgBox = document.getElementById("popup-message");
const btn_confirm = document.querySelector(".confirm-btn");
const btn_cancel = document.querySelector(".cancel-btn");

const onLoadFunction = () => {
  window.opener.postMessage({ type: "READY" });
};

// 팝업 코드 (popup.js)
const onMsgFunction = (event) => {
  const data = event.data;
  
  if (data.message) {
    msgBox.innerHTML = data.message;
  }
  
  // 버튼 설정이 있으면 적용
  if (data.showCancel === false) {
    btn_cancel.style.display = "none";
  }
};

const btnConfirmClickHandler = () => {
  window.opener.postMessage({ action: "confirm" }, "*");
  window.close();
};

const btnCancelClickHandler = () => {
  window.opener.postMessage({ action: "cancel" }, "*");
  window.close();
};

window.addEventListener("load", onLoadFunction);
window.addEventListener("message", onMsgFunction);
btn_cancel.addEventListener("click", btnCancelClickHandler);
btn_confirm.addEventListener("click", btnConfirmClickHandler);
