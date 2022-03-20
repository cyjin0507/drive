// 숫자아닌 글자 없에기
function removeNotNumber(number) {
    return number.toString().replace(/[^0-9]/g, '')
}


// 숫자 자릿수마다, 표시
function numberFormet(number){
    // 먼저 숫자아닌 글자를 없에고 정수로 형변환
    number = parseInt(removeNotNumber(number))

    // 자릿수 ,으로 표시
    return number.toLocaleString('ko-KR') 
}

// 한글, 영어만 남기기
function removeNotKOROrEN(str){
    return str.replace(/[^ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z]/g, '')
}

// 전화번호를 3,4,4으로 끊어서 표현
function phoneNumberFormet(number) {
    number = removeNotNumber(number)

    // 길이가 7이 넘을때, 3이 넘을때, 3보다 작을때를 구분해야함
    if(number.length > 7){
        number = number.replace(/(\d{0,3})(\d{0,4})(\d{0,4})/, '$1-$2-$3')
    } else if(number.length > 3){
        number = number.replace(/(\d{0,3})(\d{0,4})/, '$1-$2')
    } else {
        number = number.replace(/(\d{0,3})/, '$1')
    }
    
    // 13자리만 표시하고 뒷자리는 버림
    number = number.substr(0, 13)

    return number
}

// 정수형의 남는 앞자리 0으로 채워주기 방법 2개
// 1. 함수
function padstart(num, length=2, str="0"){
    return num.toString().padStart(length, str)
}
// 2. 프로토타입
Number.prototype.padStart = function (length=2, str='0'){
    return this.toString().padStart(length, str)
}

// 이미지 파일을 base64로 불러옴
function getImageFile(file){
    const fileReader = new FileReader()

    return new Promise((res, rej)=>{
        fileReader.onload = ()=>{
            res(fileReader.result)
        }

        fileReader.onerror = ()=>{
            rej(false)
        }

        fileReader.readAsDataURL(file)
    })
}

// 이미지 파일을 dom 객체로 변환
async function getImage(file){
    const img = document.createElement('img')
    
    img.src = await getImageFile(file)

    return new Promise((res, rej)=>{
        img.onload = ()=>{
            res(img)
        }
    
        img.onerror = ()=>{
            res(false)
        }
    })
}


// 날짜를 yyyy-mm-dd 형으로 바꿔줌
Date.prototype.myDateFormat = function(){
    return this.getFullYear().padStart() + '-' + (this.getMonth()+1).padStart() + '-' + this.getDate().padStart();
}