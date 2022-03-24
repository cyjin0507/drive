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
                            <img src="/resources/images/특산품/${this.imgSrc}" class="card-img" alt="">
                            <div class="info">
                                ${this.location}
                            </div>
                        </div>
        `)
        this.dom.append(`
        <div class="back">
                            back
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
            this.activeCardList.splice(0,10000000000)
            window.isUnactiving = false
        }, TIMEDATA.CARD_ROTATE_TIME * 1000)
        this.timerList.push(timer)
    }

    select = (time = TIMEDATA.CARD_ACTIVE_TIME) => {
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