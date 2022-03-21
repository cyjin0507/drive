class Card {
    constructor(imgSrc, activeCardList, findCardCountUpdate) {
        this.dom = $(document.createElement('div'))
        this.dom.addClass('event-card')

        this.imgSrc = imgSrc
        this.location = imgSrc.split('_')[0]
        
        this.timerList = []

        this.findCardCountUpdate = findCardCountUpdate

        this.activeCardList = activeCardList

        this.init()
        this.addEvent()
    }

    init() {
        this.dom.append(`
            <div class="front">
                <img src="./img/특산품/${this.imgSrc}" alt="앞면 이미지" title="앞면 이미지">
                <div class="info">
                    <span>${this.location}</span>
                </div>
            </div>
        `)
        this.dom.append(`
            <div class="back">뒷면</div>
        `)

        this.isFixed = false
        this.isActive = false
    }

    addEvent = () => {
        this.dom.on('click', () => {


            if (this.isFixed || this.activeCardList.length >= 2 || this.isActive || window.isUnactiving) {
                return
            }


            this.activeCardList.push(this)

            this.activeCardList.forEach((card)=>{
                card.timerReset()
            })

            this.select()


            if (this.activeCardList.length >= 2) {
                this.cardCheck()
            }
        })
    }
    cardCheck = ()=>{
        if(this.activeCardList[0].imgSrc === this.activeCardList[1].imgSrc){

            this.activeCardList.forEach(card => {
                card.fix()
            })


            this.findCardCountUpdate()



            const timer = setTimeout(()=>{
                this.activeCardList.splice(0,10000000)
            }, TIMEDATA.CARD_ROTATE_TIME*1000)

            this.timerList.push(timer)
        } else {




            const timer = setTimeout(()=>{
                this.activeCardList.forEach(card => {
                    card.unactive()
                })
            }, TIMEDATA.CARD_ROTATE_TIME*1000)
            this.timerList.push(timer)
        }
    }
    timerReset = ()=>{
        while(this.timerList.length != 0){
            clearTimeout(this.timerList[0])
            this.timerList.splice(0,1)
        }
    }
    active = () => {
        this.timerReset()

        this.isActive = true
        this.dom.addClass('active')
    }
    unactive = () => {
        this.timerReset()

        this.isActive = false
        this.dom.removeClass('active')

        window.isUnactiving = true

        let timeOut = setTimeout(()=>{
            this.activeCardList.splice(0,10000000)
            window.isUnactiving = false
        }, TIMEDATA.CARD_ROTATE_TIME * 1000)

        this.timerList.push(timeOut)
    }


    select = (time = TIMEDATA.CARD_ACTIVE_TIME) => {
        this.active()

        let timeOut = setTimeout(() => {
            this.unactive()
        }, time * 1000)

        this.timerList.push(timeOut)
    }
    fix = () => {
        this.timerReset()

        this.isFixed = true
        this.active()

        this.dom.find('.info').addClass('active')
    }

}