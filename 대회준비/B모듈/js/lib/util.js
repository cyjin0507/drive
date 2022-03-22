function removeNotNumber(number) {
    return number.toString().replace(/^[0-9]/g, '')
}

function numberFormet(number) {
    number = parseInt(removeNotNumber(number))
    return number.toLocaleString('ko-KR')
}

function removeNotKOROrEN(str) {
    return str.replace(/[^ㅏ-ㅣㄱ-ㅎ가-힣a-zA-z]/g, '')
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
    number.substr(0,13)
    return number
}

function padstart(num, length=2, str="0") {
    return num.toString().padStart(length, str)
}

function getImageFile(file) {
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
    const img = document.createElement('img')
    img.src = await getImageFile(file)
    return new Promise((res, rej)=> {
        img.onload = () => {
            res(img)
        }
        img.onerror = () => {
            rej(false)
        }
    })
}