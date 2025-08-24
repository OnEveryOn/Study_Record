/*  
  화살표 함수는 this가 상위 스코프 
  이벤트리스너가 제거가 되었는데도 inputHandler가 동작함 (비동기로 실행) > 플래그 활용하여 컨트롤
*/

let inputBox = document.getElementById("ipt_search");
let timeout;
let isActive = true;
let worker; 

if(window.Worker){
  // data 처리할 worker 파일 
  worker = new Worker('/js/autocomplete/dataControl.js')

  // 웹 워커에서 데이터 처리가 완료되면 받을 수신기
  worker.onmessage = (e) => {
    const processedData = e.data
    console.log("처리된 데이터: ", processedData)
    
    // 결과를 화면에 표시
    displayResults(processedData);
  }

  worker.onerror = (error) => {
    console.error("Web Worker 에러:", error);
  };

}

const inputHandler = (e) => {
  clearTimeout(timeout);

  const inputValue = e.target.value;
  
  if (isActive && inputValue.trim() !== '') {
    
    timeout = setTimeout(() => {
      if(worker){
        console.log("Web Worker에 메시지 전송:", inputValue);
        worker.postMessage(inputValue)
      }
    }, 2000);
  }
};

const blurHandler = (e) => {
  console.log("input 이벤트리스너 제거 ");
  isActive = false;
  inputBox.removeEventListener("input", inputHandler);
  inputBox.value = "" // 초기화
};

const focusHandler = (e) => {
  console.log("input 이벤트리스너 등록");

  // 등록 전에 제거
  inputBox.removeEventListener("input", inputHandler);
  inputBox.addEventListener("input", inputHandler);
};

// 결과를 화면에 표시하는 함수
const displayResults = (data) => {
  const resultDisplay = document.getElementById('result-display');
  if (resultDisplay) {
    if (data.error) {
      resultDisplay.textContent = `에러: ${data.error}`;
    } else if (data.result && data.result.suggestions) {
      const suggestions = data.result.suggestions;
      if (suggestions.length > 0) {
        let resultText = `검색 결과 (${suggestions.length}개):\n\n`;
        suggestions.forEach((item, index) => {
          resultText += `${index + 1}. 키: ${item.key}\n`;
          
          if (item.type) {
            resultText += `   타입: ${item.type}\n`;
          }
          if (item.description) {
            resultText += `   설명: ${item.description}\n`;
          }
          resultText += '\n';
        });
        resultDisplay.textContent = resultText;
      } else {
        resultDisplay.textContent = '검색 결과가 없습니다.';
      }
    }
  }
};

inputBox.addEventListener("focus", focusHandler);
inputBox.addEventListener("blur", blurHandler);
