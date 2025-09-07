function getGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

console.log(getGrade(30))

// 삼항 연산자
const getGrade2 = (score) => {
    const grade =  score >= 90 ? "A" 
        : score >= 80 ? "B"
        : score >= 70 ? "C"
        : score >= 60 ? "D"
        : "F" 

    return grade
}

console.log(getGrade2(30))


// swtich문 (표현식 활용)
const getGrade3 = (score) => {
    switch (true) {
        case score >= 90:
            return "우수"
        case score >= 80:
            return "보통"
        default:
            return "해당 없음";
    }
}

console.log(getGrade3(89))