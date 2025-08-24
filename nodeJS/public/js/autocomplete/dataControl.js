// data를 받아서 처리 후 처리 완료되었다고 알림
// 사용자가 입력한 검색어와 같은 값을 찾아야 함
self.onmessage = async (e) => {
    const searchTerm = e.data;
    console.log("Web Worker에서 받은 검색어:", searchTerm);

    // 서버 호출
    try {
        console.log("서버에 요청 전송 중...");
        const response = await fetch('/autoComplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchTerm: searchTerm })
        });

        const data = await response.json();
        console.log("서버 데이터:", data);

        const suggestions = filterData(data.data, searchTerm);
        console.log("필터링된 결과:", suggestions);

        self.postMessage({
            searchTerm: searchTerm,
            result: {
                suggestions: suggestions
            }
        });

    } catch (error) {
        console.error("Web Worker 에러:", error);
        self.postMessage({
            searchTerm: searchTerm,
            result: [],
            error: error.message
        });
    }
};

// 데이터 필터링 함수
const filterData = (jsonData, searchTerm) => {
    const suggestions = [];
    
    // 모든 가능한 키들을 수집
    const allKeys = [];
    
    // 최상위 키들
    Object.keys(jsonData).forEach(key => {
        allKeys.push(key);
    });
    
    // $p.data 내부 키들
    if (jsonData.$p && jsonData.$p.data) {
        Object.keys(jsonData.$p.data).forEach(key => {
            allKeys.push(`$p.data.${key}`);
        });
    }
    
    // 검색어와 매칭되는 키들 찾기
    allKeys.forEach(key => {
        if (key.toLowerCase().includes(searchTerm.toLowerCase())) {
            // 해당 키의 값 가져오기
            let value = null;
            if (key.includes('.')) {
                const keys = key.split('.');
                let current = jsonData;
                for (let k of keys) {
                    if (current && current[k] !== undefined) {
                        current = current[k];
                    } else {
                        current = null;
                        break;
                    }
                }
                value = current;
            } else {
                value = jsonData[key];
            }
            
            if (value) {
                // Web Worker에서 파싱된 정보 생성
                const parsedInfo = parseValue(value);
                suggestions.push({
                    key: key,
                    type: parsedInfo.type,
                    description: parsedInfo.description,
                    value: value
                });
            }
        }
    });
    
    return suggestions;
};

// 값 파싱 함수
const parseValue = (value) => {
    const result = {
        type: '',
        description: ''
    };
    
    if (typeof value === 'object' && value !== null) {
        if (value['!type']) {
            result.type = value['!type'];
        }
        if (value['!doc']) {
            const doc = value['!doc'];
            result.description = doc.length > 100 ? doc.substring(0, 100) + '...' : doc;
        }
    } else {
        result.type = typeof value;
        result.description = String(value);
    }
    
    return result;
};