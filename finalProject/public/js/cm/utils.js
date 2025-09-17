/**
 * 화면 중앙에 팝업 창을 열고 데이터를 전송하는 함수
 * @param {string} url - 팝업 창에서 열 URL
 * @param {Object} data - 팝업에 전송할 데이터 객체
 * @param {number} [width=400] - 팝업 창의 너비 (기본값: 400px)
 * @param {number} [height=280] - 팝업 창의 높이 (기본값: 280px)
 * @returns {Window|null} 생성된 팝업 창 객체 또는 null
 * @description
 * - 팝업에서 "READY" 메시지를 받으면 데이터를 전송한다.
 */

const openPopup = (url, data, width = 400, height = 280) => {
  return new Promise((resolve, reject) => {
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const options = `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`;

    try {
      const popup = window.open(url, "알림", options);

      if (!popup) {
        reject(new Error("팝업이 차단되었습니다."));
        return;
      }

      const messageHandler = (event) => {
        if (event.data.type === "READY") {
          popup.postMessage(data, "*");
        } else if (event.data.action) {
          window.removeEventListener("message", messageHandler);
          resolve(event.data);
        }
      };

      window.addEventListener("message", messageHandler);
    } catch (error) {
      console.log("error:", error);
      reject(error);
    }
  });
};

/**
 * 값이 비어있는지 확인하는 함수
 * @param {*} value - 검사할 값
 * @returns {boolean} 비어있으면 true, 아니면 false
 * @description
 * 빈 문자열, null, undefined, "undefined" 문자열을 모두 비어있는 값으로 판단한다.
 */
const isEmpty = (value) => {
  if (
    value.trim() === "" ||
    value.trim() === "undefined" ||
    typeof value.trim() === "undefined" ||
    value.trim() === null ||
    value.trim() === undefined
  ) {
    return true;
  }
  return false;
};

/**
 * 유효성 검사 결과 메시지 생성하는 함수
 * @param {Object} targetEl = 에러 메시지가 생성될 element
 * @returns {String} msg - 에러 메시지
 * @description
 * 유효성 검사 후 에러 메시지가 발생한 경우 검사 대상 하위에 메시지가 생성된다.
 */
const createErroMsg = (targetEl, msg) => {
  const target = targetEl;
  const parent = target.parentNode.parentNode;

  const existingErrors = parent.querySelectorAll(".error-message");
  existingErrors.forEach((error) => error.remove());

  const divEl = document.createElement("div");
  divEl.className = "error-message";
  divEl.textContent = msg;
  divEl.style.color = "red";
  divEl.style.fontSize = "12px";
  divEl.style.marginTop = "5px";
  parent.appendChild(divEl);
};

/**
 * 사용자가 입력한 값이 유효한지 확인하는 함수
 * @param {*} targetEl - 유효성 검사 대상 element
 * @returns {boolean} value - 사용자가 입력한 값
 * @description
 * 사용자가 입력한 값의 길이가 정해진 속성에 맞는지와 email의 경우 이메일 형식에 맞게 입력하였는지 확인한다.
 */
const checkInputField = (targetEl, value) => {
  const maxlength = targetEl.getAttribute("maxlength");
  const minlength = targetEl.getAttribute("minlength");
  const val = value.trim();
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (isEmpty(val)) return null;

  if (minlength && val.length < minlength) {
    targetEl.focus();
    return `${minlength}자 이상이어야 합니다.`;
  }

  if (maxlength && val.length > maxlength) {
    targetEl.focus();
    return `${maxlength}자 이하여야 합니다.`;
  }

  if (targetEl.getAttribute("type") === "email") {
    return !regEmail.test(val) ? "이메일 형식에 맞게 작성해야 합니다." : null;
  }

  return null;
};

export default {
  openPopup,
  isEmpty,
  createErroMsg,
  checkInputField,
};
