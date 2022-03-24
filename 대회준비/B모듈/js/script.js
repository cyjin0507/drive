class GameInit {
    constructor() {
        this.form = new Form()
        this.game = new Game(this.form)
        console.log(dateFormet(new Date()));
    }
}

function dateFormet(date) {
    return date.getFullYear() + "-" + (Number(date.getMonth())+1) + "-" + date.getDate()
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

    gameReset() {
        this.cardGrid.html('')
        this.startBtn.html('게임시작')
        clearInterval(this.timerInterval)
        this.cardList = []
        this.activeCard = []
        for(let i=0; i<16; i++){
            this.cardGrid.append(`
            <div class="event-card">
                        <div class="front">
                            <img src="/resources/images/특산품/거제시_유자.jpg" class="card-img" alt="">
                            <div class="info">
                                특산품
                            </div>
                        </div>
                        <div class="back">
                            <img src="/resources/images/makeImg/슬로건1-black.svg" alt="">
                        </div>
                    </div>
            `)
        }
        this.timerText.html(TIMEDATA.START_COUNTDOWN + '초')
        this.findCardCount = 0
        this.UpdateFindCardCount(0)
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
        clearTimeout(this.timerInterval)
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

    gameRandomImageList() {
        const imgList = this.imgs.sort((a,b)=> {
            return Math.random()-0.5
        })
        imgList.splice(8,1000)
        return imgList
    }

    cardSet() {
        this.cardGrid.html('')
        const imgList = this.gameRandomImageList()
        for(let img of imgList) {
            for(let i=0; i<2; i++) {
                const card = new Card(img, this.activeCard, this.UpdateFindCardCount)
                card.select(TIMEDATA.START_COUNTDOWN + 0.5)
                this.cardList.push(card)
            }
        }
        this.cardList = this.cardList.sort((a,b)=> Math.random()-0.5)
        for(let card of this.cardList) {
            this.cardGrid.append(card.dom)
        }
    }

    UpdateFindCardCount = (count=1)=> {
        this.findCardCount += count
        if(this.findCardCount >= 8) {
            this.gameEnd()
        }
        $('.finded').html(`찾은 카드 수 :<span>${this.findCardCount}개</span>`)
    }

    firstTimerSet() {
        this.timer = new Date()
        const countDown = TIMEDATA.START_COUNTDOWN
        return new Promise((res, rej)=> {
            const timerInterval = setInterval(()=> {
                let gameTime = (new Date()).getTime() - this.timer.getTime()
                let second = parseInt(gameTime/1000)
                if(countDown - second >= 0) {
                    this.timerText.html(`${countDown-second}초`)
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
            } else{
                this.timerText.html(`${padstart(second%60)}초`)
                if(second <= 0) {
                    this.gameEnd()
                }
            }
        }, 100)
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
        console.log(this.dom);
        this.init()
        this.addEvent()
    }

    init() {
        this.dom.append(`
        <div class="front">
        <img src="/resources/images/특산품/${this.imgSrc}" class="card-img" alt="">
        <div class="info">
            ${this.location}
        </div>
    </div>
        `)
        this.dom.append(`
        <div class="back">
                            <img src="/resources/images/makeImg/슬로건1-black.svg" alt="">
                        </div>
        `)
        this.isFixed = false
        this.isActive = false
    }

    addEvent() {
        this.dom.click(()=>{
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
                this.activeCardList.splice(0,1000)
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
        }, TIMEDATA.CARD_ROTATE_TIME*1000)
        this.timerList.push(timer)
    }

    select = (time = TIMEDATA.CARD_ACTIVE_TIME)=> {
        this.active()
        const timer = setTimeout(()=> {
            this.unactive()
        }, time * 1000)
        this.timerList.push(timer)
    }

    fix() {
        this.timerReset()
        this.isFixed = true
        this.active()
        this.dom.find('.info').addClass('active')
    }

}

class Form {
    constructor() {
        this.dom = $('.form')
        this.dom.css('display', 'none')
        this.name = this.dom.find('.name')
        this.phone = this.dom.find('.phone')
        this.submitBtn = this.dom.find('.submit-btn')
        this.addEvent()
    }

    formReset() {

    }

    formOpen() {

    }

    addEvent() {

    }

}

const TIMEDATA = {
    START_COUNTDOWN : 5,
    GAME_PLAY_TIME : 90,
    CARD_ACTIVE_TIME : 3,
    CARD_ROTATE_TIME : 0.5,
    HINT_TIME : 3
}

const SPECIALTY = [
    '거제시_유자.jpg',
    '거창군_사과.jpg',
    '고성군_방울토마토.jpg',
    '김해시_단감.jpg',
    '남해군_마늘.jpg',
    '의령군_수박.jpg',
    '양산시_매실.jpg',
    '산청군_약초.jpg',
    '사천시_멸치.jpg',
    '밀양시_대추.jpg',
    '합천군_돼지고기.jpg',
    '함양군_밤.jpg',
    '함안군_곶감.jpg',
    '하동군_녹차.jpg',
    '통영시_굴.jpg',
    '창원시_풋고추.jpg',
    '창녕군_양파.jpg',
    '진주시_고추.jpg',
]

function removeNotNumber(number) {
    return number.toString().replace(/[^0-9]/g, '')
}

function numberFormet(number) {
    number = parseInt(removeNotNumber(number))
    return number.toLocaleString('ko-KR')
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
            res(true)
        }
        img.onerror = () => {
            res(false)
        }
    })
}

window.onload = () => {
    new GameInit()
}