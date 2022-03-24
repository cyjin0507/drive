class Game {
    constructor(form) {
        this.form = form
        this.imgs = SPECIALTY
        this.cradGrid = $('.event-card-grid')
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
        this.startBtn.html('게임시작')
        clearInterval(this.timerInterval)
        this.cardList = []
        this.activeCard = []
        for(let i=0; i<16; i++) {
            this.cradGrid.append(`
            <div class="event-card">
                        <div class="front">
                            <img src="/resources/images/특산품/거제시_유자.jpg" class="card-img" alt="">
                            <div class="info">
                                특산품
                            </div>
                        </div>
                        <div class="back">
                            back
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

    gameImageList() {
        const imgList = this.imgs.sort((a,b)=> {
            return Math.random() - 0.5
        })
        imgList.splice(8,10000)
        return imgList
    }

    cardSet() {
        this.cradGrid.html('')
        const imgList = this.gameImageList()
        for(let img of imgList) {
            for(let i=0; i<2; i++) {
                const card = new Card(img, this.activeCard, this.UpdateFindCardCount)
                card.select(TIMEDATA.START_COUNTDOWN + 0.5)
                this.cardList.push(card)
            }
        }
        this.cardList = this.cardList.sort((a,b)=> Math.random()-0.5)
        for(let card of this.cardList) {
            this.cradGrid.append(card.dom)
        }
    }

    UpdateFindCardCount = (count=1)=> {
        this.findCardCount += count
        if(this.findCardCount >= 8) {
            this.gameEnd()
        }
        $('.finded-event-card').html(`찾은 카드 수 : ${this.findCardCount}`)
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
            if(second > 59) {
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