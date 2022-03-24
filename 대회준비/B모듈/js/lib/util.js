function removeNotNumber(number) {
    return number.toString().replace(/[^0-9]/g, '')
}

function numberFormet(number) {
    number = parseInt(removeNotNumber(number))
    return number.toLocaleString(number)
}

function removeNotKOROrEN(str) {
    return str.replace(/[^ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z]/g, '')
}

function phoneNumberFormet(number) {
    number = removeNotNumber(number)
    if(number.length > 7) {
        number = number.replace(/(\d{0,3})(\d{0,4})(\d{0,4})/, '$1-$2-$3')
    } else if(number.length > 3) {
        number = number.replace(/(\d{0,3})(\d{0,4})/, '$1-$2')
    } else {
        number = number.replace(/(\d{0,3})/, '$1')
    }
    number = number.substr(0,13)
    return number
}

function padstart(num, length=2, str="0") {
    return num.toString().padStart(length, str)
}

function getFileImage(file) {
    const fileReader = new FileReader()
    return new Promise((res, rej)=> {
        fileReader.onload = () => {
            res(fileReader.result)
        }
        fileReader.onerror = () => {
            rej(false)
        }
        fileReader.readAsDataURL(file)
    })
}

async function getImage(file) {
    const img = document.createElement('div')
    img.src = await getImage(file)
    return new Promise((res, rej)=> {
        img.onload = () => {
            res(img)
        }
        img.onerror = () => {
            res(false)
        }
    })
}

// 날짜를 yyyy-mm-dd 형으로 바꿔줌
Date.prototype.myDateFormat = function(){
    return this.getFullYear().padStart() + '-' + (this.getMonth()+1).padStart() + '-' + this.getDate().padStart();
}