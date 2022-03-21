class Game {
    constructor(form) {
        this.form = form

        this.imgs = SPECIALTY

        this.cardGrid = $('.event-card-grid')
        this.timerText = $('.timer span')
        this.gameStartBtn = $('.game-start')
        this.hintBtn = $('.hint')

        this.startBtnActive = true

        this.gameStarted = false

        this.addEvent()
        this.gameReset()
    }

    addEvent = () => {
        this.gameStartBtn.click(() => {

            if (this.startBtnActive) {
                this.gameStart()
            }

            this.startBtnActive = false
        })

        this.hintBtn.click(() => {
            if (this.gameStarted) {
                this.hint()
            }
        })
    }

    getRandomImageList = () => {
        const imgList = this.imgs.sort((a, b) => {
            return Math.random() - 0.5
        })

        imgList.splice(8, 100000)

        return imgList
    }

    gameReset = () => {
        this.gameStartBtn.html('시작하기')

        clearInterval(this.timerInterval)

        this.cardList = []
        this.acitiveCard = []

        this.cardGrid.html('')

        for(let i = 0; i < 16; i++){
            this.cardGrid.append(
            `<div class="event-card">
                <div class="front">
                    <img src="./img/특산품/거제시_유자.jpg" alt="앞면 이미지" title="앞면 이미지">
                    <div class="info">
                        <span>거제시</span>
                    </div>
                </div>
                <div class="back">뒷면</div>
            </div>`)
        }


        this.timerText.html(TIMEDATA.START_COUNTDOWN + '초')

        this.findCardCount = 0
        this.UpdateFindCardCount(0)
    }

    gameStart = async() => {
        this.form.formReset()
        this.gameReset()
        this.cardSet()
        await this.firstTimerSet()
        this.gameStarted = ture;
        this.gameTimerSet()
    }

    gameEnd() {
        this.form.formOpen(this.findCardCount, this.gameReset)
        this.gameStarted = false;
        clearInterval(this.timerInterval)
        this.cardList.forEach(card=> {
            if(!card.isFixed) {
                card.dom.addClass('unfind')
                card.fix()
            }
        })
    }

    cardSet() {
        this.cardGrid.html('')
        const randomImageList = this.getRandomImageList()
        for(let img of randomImageList) {
            for(let i=0; i<2; i++) {
                const card = new Card(img, this.acitiveCard, this.UpdateFindCardCount)
                card.select(TIMEDATA.START_COUNTDOWN + 0.5)
                this.cardList.push(card)
            }
        }
        this.cardList = this.cardList.sort((a,b)=>Math.random()-0.5)
        for(let card of this.cardList) {
            this.cardGrid.append(card.dom)
        }
    }

    UpdateFindCardCount = (count =1)=> {
        this.findCardCount += count;
        if(this.findCardCount >= 8) {
            this.gameEnd()
        }
        $('.finded-event-card').html(`찾은 카드 수 ${this.findCardCount}`)
    }

    firstTimerSet() {
        this.timer = new Date()
        const countDown = TIMEDATA.START_COUNTDOWN;
L            // let gameTime = 
        })
    }

}