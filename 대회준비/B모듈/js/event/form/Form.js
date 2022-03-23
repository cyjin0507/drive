class Form {
    constructor() {
        this.dom = $('.form')
        this.dom.css('display', 'none')
        this.name = this.dom.find('.name')
        this.phone = this.dom.find('.phone')
        this.submitBtn = this.dom.find('.submit-btn')
        this.addEvent()
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

    formOpen(findCardCount, gameReset) {
        this.gameReset = gameReset
        this.dom.css('display', 'inline')
        this.dom.find('.find-card-count').html(findCardCount)
    }

    formReset() {
        this.name.val('')
        this.phone.val('')
        this.dom.css('display', 'none')
        this.dom.find('.find-card-count').html('0')
    }

    async checkValue(){
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
        this.gameReset
        this.formReset()
        await this.printStamp()
        this.isCheckRunnig = false
        return true
    }

    printStamp() {
        const isPrint = [...$('.stamp')].some((x)=> {
            if($(x).find('svg').length == 0) {
                $(x).html(`
                <svg>
                    <text x="10" y="55">test</text>
                    <text x="10" y="90">${new Date().myDateFormat()}</text>
                </svg>
                `)
                return true
            }
            return false
        })
        if(!isPrint) {
            alert('이밎 3번 다 찍음')
        }
    }

}