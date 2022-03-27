class GameApp {
    constructor() {
        this.form = new Form()
        this.game = new Game(this.form)
    }
}

class Form {
    constructor() {
        this.dom = $('#form-layout')
        this.dom.css('display', 'none')
        this.name = this.dom.find('#name')
        this.phone = this.dom.find('#phone')
        this.submitBtn = this.dom.find('#submitBtn')
        this.addEvent()
    }

    formReset() {
        this.name.val('')
        this.phone.val('')
        this.dom.css('display', 'none')
        this.dom.find('.find-card-count').html(`찾은 카드 수 : 0개`)
    }

    formOpen(findCardCount, gameReset) {
        this.gameReset = gameReset
        this.dom.css('display', 'block')
        this.dom.find('.find-card-count').html(`찾은 카드 수 : ${findCardCount}개`)
    }

    addEvent() {
        this.name.on('input', (e)=> {
            e.target.value = removeNotKOROrEN(e.target.value)
        })
        this.phone.on('input', (e)=> {
            e.target.value = phoneNumberFormet(e.target.value)
        })
        this.submitBtn.click(()=> {
            this.checkValue()
        })
    }

    async checkValue() {
        if(this.isCheckRunnig) {
            return
        }
        this.isCheckRunnig = true
        const phoneNumber = this.phone.val().replaceAll('-','')
        if(phoneNumber.length != 11 || !/^[0-9]/.test(phoneNumber)) {
            alert('전화번호 오류')
            this.isCheckRunnig = false
            return false
        }
        const name = this.name.val()
        if(name.length < 2 || name.length > 50 || !/^[ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z]/.test(name)) {
            alert('이름 오류')
            this.isCheckRunnig = false
            return false
        }
        alert('이벤트에 참여해 주셔서 감사합니다.')
        await this.printStamp()
        this.gameReset()
        this.formReset()
        this.isCheckRunnig = true
    }

    printStamp() {
        const isStamp = [...$('.stamp-area > .col')].some((x)=> {
            if($(x).find('svg').length==0) {
                $(x).html(`
                <svg>
                                <text x="1" y="20">스탬프</text>
                                <text x="1" y="60">${getNowDate()}</text>
                            </svg>
                `)
                return true
            }
            return false
        })
    }

}

class Card {
    constructor(imgSrc, activeCardList, findCardCountUpdate) {
        this.dom = $(document.createElement('div'))
        this.dom.addClass('event-card')
        this.imgSrc = imgSrc
        this.location = imgSrc.split('_')[0]
        this.timerList = []
        this.activeCardList = activeCardList
        this.findCardCountUpdate = findCardCountUpdate
        this.init()
        this.addEvent()
    }

    init() {
        this.dom.append(`
        <div class="front">
                            <img src="./resources/images/특산품/${this.imgSrc}.jpg" class="card-img" alt="">
                            <div class="info">
                                ${this.location}
                            </div>
                        </div>
        `)
        this.dom.append(`
        <div class="back">
                            <img src="./resources/images/makeImg/슬로건1-black.svg" alt="">
                        </div>
        `)
        this.isFixed = false
        this.isActive = false
    }

    addEvent() {
        this.dom.click(()=> {
            if(this.isActive || this.isFixed || this.activeCardList.length >= 2 || window.isUnactiving) {
                return
            }
            this.activeCardList.push(this)
            this.activeCardList.forEach(card=> {
                card.timerReset()
            })
            this.select()
            if(this.activeCardList.length >= 2) {
                this.cardCheck()
            }
        })
    }

    cardCheck() {
        if(this.activeCardList[0].imgSrc === this.activeCardList[1].imgSrc) {
            this.activeCardList.forEach(card=> {
                card.fix()
            })
            this.findCardCountUpdate()
            const timer = setTimeout(()=> {
                this.activeCardList.splice(0,10000000)
            }, TIMEDATA.CARD_ROTATE_TIME * 1000)
            this.timerList.push(timer)
        } else {
            const timer = setTimeout(()=> {
                this.activeCardList.forEach(card=> {
                    card.unactive()
                })
            }, TIMEDATA.CARD_ROTATE_TIME * 1000)
            this.timerList.push(timer)
        }
    }

    timerReset() {
        while(this.timerList.length != 0) {
            clearTimeout(this.timerList[0])
            this.timerList.splice(0,1)
        }
    }

    active() {
        this.timerReset()
        this.isActive = true
        this.dom.addClass('active')
    }

    unactive() {
        this.timerReset()
        this.isActive = false
        this.dom.removeClass('active')
        window.isUnactiving = true
        const timer = setTimeout(()=> {
            this.activeCardList.splice(0,100000)
            window.isUnactiving = false
        }, TIMEDATA.CARD_ROTATE_TIME * 1000)
        this.timerList.push(timer)
    }

    select = (time = TIMEDATA.CARD_ACTIVE_TIME) => {
        this.active()
        const timer = setTimeout(()=> {
            this.unactive()
        }, time*1000)
        this.timerList.push(timer)
    }

    fix() {
        this.timerReset()
        this.isFixed = true
        this.active()
        this.dom.find('.info').addClass('active')
    }
 
}

class Game {
    constructor(form) {
        this.form = form
        this.imgs = SPECIALTY
        this.cardGrid = $('.event-card-grid')
        this.timerText = $('.timer span')
        this.startBtn = $('.btn1')
        this.hintBtn = $('.btn2')
        this.startBtnActive = true
        this.gameStarted = false
        this.addEvent()
        this.gameReset()
    }

    addEvent() {
        this.startBtn.click(()=> {
            if(this.startBtnActive) {
                this.gameStart()
            }
            this.startBtnActive = false
        })
        this.hintBtn.click(()=> {
            if(this.gameStarted) {
                this.hint()
            }
        })
    }

    gameReset=()=> {
        this.startBtn.html('게임시작')
        this.cardGrid.html('')
        clearInterval(this.timerInterval)
        this.cardList = []
        this.activeCard = []
        for(let i=0; i<16; i++) {
            this.cardGrid.append(`
            <div class="event-card">
                        <div class="front">
                            <img src="./resources/images/특산품/거제시_유자.jpg" class="card-img" alt="">
                            <div class="info">
                                특산품
                            </div>
                        </div>
                        <div class="back">
                            <img src="./resources/images/makeImg/슬로건1-black.svg" alt="">
                        </div>
                    </div>
            `)
        }
        this.timerText.html(padstart(TIMEDATA.START_COUNTDOWN) + '초')
        this.findCardCount = 0
        this.UpdateCardCount(0)
    }

    gameRandomImageList() {
        const imgList = this.imgs.sort((a,b)=> {
            Math.random() - 0.5
        })
        imgList.splice(8,10000)
        return imgList
    }

    async gameStart() {
        this.form.formReset()
        this.gameReset()
        this.cardSet()
        this.gameStarted = true
        await this.firstTimerSet()
        this.gameTimerSet()
    }

    gameEnd() {
        this.form.formOpen(this.findCardCount, this.gameReset)
        this.gameStarted = false
        clearInterval(this.timerInterval)
        this.cardList.forEach(card=> {
            if(!card.isFixed) {
                card.dom.addClass('unfind')
                card.fix()
            }
        })
    }

    hint() {
        this.cardList.forEach(card=> {
            if(!card.isFixed) {
                card.select(TIMEDATA.HINT_TIME)
            }
        })
    }

    cardSet() {
        this.cardGrid.html('')
        const imgList = this.gameRandomImageList()
        for(let img of imgList) {
            for(let i=0; i<2; i++) {
                const card = new Card(img, this.activeCard, this.UpdateCardCount)
                card.select(TIMEDATA.START_COUNTDOWN + 0.5)
                this.cardList.push(card)
            }
        }
        this.cardList = this.cardList.sort((a,b)=> Math.random()-0.5)
        for(let card of this.cardList) {
            this.cardGrid.append(card.dom)
        }
    }

    UpdateCardCount = (count=1)=> {
        this.findCardCount += count
        if(this.findCardCount >= 8) {
            this.gameEnd()
        }
        $('.finded-card-count').html(`찾은 카드 수 :<span>${this.findCardCount}개</span>`)
    }

    firstTimerSet() {
        this.timer = new Date()
        const countDown = TIMEDATA.START_COUNTDOWN
        return new Promise((res, rej)=> {
            const timerInterval = setInterval(()=> {
                let gameTime = (new Date()).getTime() - this.timer.getTime()
                let second = parseInt(gameTime/1000)
                if(countDown - second >= 0) {
                    this.timerText.html(`${countDown - second}초`)
                } else {
                    this.startBtnActive = true
                    this.startBtn.html('다시시작')
                    clearInterval(timerInterval)
                    res(true)
                }
            },100)
        })
    }

    gameTimerSet() {
        this.timer = new Date()
        this.timerInterval = setInterval(()=> {
            let gameTime = (new Date()).getTime() - this.timer.getTime()
            let second = TIMEDATA.GAME_PLAY_TIME - parseInt(gameTime/1000)
            if(second>59) {
                let minute = parseInt(second/60)
                this.timerText.html(`${padstart(minute)}분 ${padstart(second%60)}초`)
            } else {
                this.timerText.html(`${padstart(second%60)}초`)
                if(second <= 0) {
                    this.gameEnd()
                }
            }
        },100)
    }

}

class ReviewApp {
    constructor() {
        this.init()
        this.reset()
        this.addEvent()
    }

    init() {
        this.imgList = []
        this.dom = $('#review-content')
        this.name = $('#name')
        this.date = $('#date')
        this.product = $('#product')
        this.shop = $('#shop')
        this.content = $('#content')
        this.addPhoto = $('#addPhoto')
        this.imgFile = $('#imgFile')
        this.imgForm = $('.imgForm')
        this.star = new Star()
    }

    reset() {
        this.name.val('')
        this.date.val('')
        this.product.val('')
        this.shop.val('')
        this.content.val('')
        this.imgFile.css('display', 'none')
        this.imgForm.html('')
        this.star.reset()
    }

    addEvent() {
        $('.review-check').click(()=> {
            this.reviewCheck()
        })
        $('.review-close').click(()=> {
            this.reset()
        })
        this.name.on('input', (e)=> {
            e.target.value = removeNotKOROrEN(e.target.value)
        })
        this.imgList = []
        this.addPhoto.click(()=> {
            const imgFile = $(this.imgFile[0].cloneNode(true))
            imgFile.css('display', 'inline')
            console.log(this.imgList);
            imgFile.data('id', new Date().getTime())
            imgFile.on('input', this.imgCheck)
            this.imgForm.append(imgFile)
        })
    }

    imgCheck = async(e)=> {
        const files = e.target.files
        console.log(this.imgList);
        const id = $(e.target).data('id')
        for(let i=0; i<this.imgList.length; i++) {
            if(this.imgList[i].id == id) {
                this.imgList.splice(i,1)
            }
        }
        console.log(files);
        for(let file of files) {
            const img = await getImage(file)
            console.log(img);
            if(img) {
                this.imgList.push({
                    img:img,
                    id:id,
                    file,file
                })
            } else {
                alert('이미지 형식 오류')
                $(e.target).val('')
                break
            }
        }
    }

    reviewCheck() {
        const name = this.name.val()
        if(name.length < 2 || name.length > 50 || !/[^ㅏ-ㅣㄱ-ㅎ-가-힣a-zA-Z]*$/.test(name)) {
            alert('이름 형식 오류')
            return false
        }
        const date = this.date.val()
        if(!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date)) {
            alert('날짜 형식 오류')
            return false
        }
        const product = this.product.val()
        if(product == undefined || product == "") {
            alert('구매품 오류')
            return false
        }
        const shop = this.shop.val()
        if(shop == undefined || shop == "") {
            alert('구매처 오류')
            return false
        }
        const content = this.content.val()
        if(content.length < 100) {
            alert('내용 오류')
            return false
        }

        if(this.star.val() == 0) {
            alert('별점 오류')
            return false
        }

        if(this.imgList.length == 0) {
            alert('이미지 오류')
            return false
        }
        alert('구매 후기가 등록되었습니다.')
        this.reset()
        window.location.href = "#"

        return true
    }

}

class Star {
    constructor() {
        this.dom = $('.star-input')
        this.dom.css('color', 'red')
        this.lastSelect = 0
        this.stars = this.dom.find('.star')
        this.addEvent()
    }

    addEvent() {
        this.stars.each((index,x)=> {
            $(x).on('mouseover', ()=> {
                this.lastSelect = index
                for(let i=0; i<=index; i++) {
                    $(this.stars[i]).html('★')
                }
                for(let i=index+1; i<this.stars.length; i++) {
                    $(this.stars[i]).html('☆')
                }
            })
        })
    }

    reset() {
        this.stars.html('☆')
        this.lastSelect = 0
    }

    val() {
        return this.lastSelect
    }

}

const TIMEDATA = {
    START_COUNTDOWN : 5,
    HINT_TIME : 3,
    GAME_PLAY_TIME : 90,
    CARD_ROTATE_TIME : 0.5,
    CARD_ACTIVE_TIME : 3
}

const SPECIALTY = [
    '거제시_유자',
    '거창군_사과',
    '고성군_방울토마토',
    '김해시_단감',
    '남해군_마늘',
    '밀양시_대추',
    '사천시_멸치',
    '산청군_약초',
    '양산시_매실',
    '의령군_수박',
    '진주시_고추',
    '창녕군_양파',
    '창원시_풋고추',
    '통영시_굴',
    '하동군_녹차',
    '함안군_곶감',
    '함양군_밤',
    '합천군_돼지고기'
]

function removeNotNumber(number) {
    return number.toString().replace(/[^0-9]/g,'')
}

function numberFormet(number) {
    number = parseInt(removeNokNumber(number))
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

function padstart(number, length=2, str="0") {
    return number.toString().padStart(length, str)
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
            res(false)
        }
    })
}

function getNowDate() {
    let date = new Date()
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
}

window.onload = () => {
    new GameApp()
    new ReviewApp()
}