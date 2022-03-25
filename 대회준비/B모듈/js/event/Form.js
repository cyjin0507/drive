class Form {
    constructor() {
        this.dom = $('.form-layout')
        this.dom.css('display', 'none')
        this.name = this.dom.find('.name')
        this.phone = this.dom.find('.phone')
        this.submitBtn = this.dom.find('.submitBtn')
        this.addEvent()
    }

    formReset() {
        this.name.val('')
        this.phone.val('')
        this.dom.css('display', 'none')
        $('.find-card-count').html('0')
    }

    formOpen(findCardCount, gameReset) {
        this.gameReset = gameReset
        this.dom.css('display', 'block')
        $('.find-card-count').html(findCardCount)
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
        if(this.isCheckRunning) {
            return
        }
        this.isCheckRunning = true
        const phoneNumber = this.phone.val().replaceAll('-','')
        if(phoneNumber.length != 11 || !/^[0-9]/.test(phoneNumber)) {
            alert('전화번호 오류')
            this.isCheckRunning = false
            return false
        }
        const name = this.name.val()
        if(name.length < 2 || name.length > 50 || !/^[ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z]/.test(name)) {
            alert('이름 오류')
            this.isCheckRunning = false
            return false
        }
        alert('이벤트에참여해 주셔서 감사합니다')
        await this.printStamp()
        this.formReset()
        this.gameReset()
        this.isCheckRunning = false
    }

    printStamp() {
        const isStamp = [...$('.stamp')].some((x)=> {
            if($(x).find('svg').length==0) {
                $(x).html(`
                <svg>
                                <text x="10" y="10">스탬프</text>
                                <text x="10" y="50">${myDateFormet()}</text>
                            </svg>
                `)
                return true
            }
            return false
        })
        if(!isStamp) {
            alert('이미 3번 다 찍음')
        }
    }

}