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
        this.phone.on('input', (e)=> {
            e.target.value = phoneNumberFormet(e.target.value)
        })
        this.name.on('input', (e)=> {
            e.target.value = removeNotKOROrEN(e.target.value)
        })
        console.log(this.submitBtn);
        this.submitBtn.click(()=> {
            console.log("Test");
            this.checkValue()
        })
    }

    formOpen(findCardCount, gameReset) {
        this.gameReset = gameReset
        this.dom.css('display', 'inline-block')
        this.dom.find('.find-card-count').html(findCardCount)
    }

    formReset() {
        this.name.val('')
        this.phone.val('')
        this.dom.css('display', 'none')
        this.dom.find('.find-card-count').html('0')
    }

    async checkValue() {
        if(this.isCheckRunnig) {
            return
        }
        this.isCheckRunnig = true
        const phoneNumber = this.phone.val().replaceAll('-','')
        if(phoneNumber.length != 11 || !/^[0-9]*$/.test(phoneNumber)) {
            alert('전화번호 오류')
            this.this.isCheckRunnig = false
            return
        }
        if(this.name.val().length < 2 || this.name.val().length > 50 || !/^[ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z]*$/.test(this.name.val())) {
            alert('이름 오류')
            this.this.isCheckRunnig = false
            return            
        }
        alert('이벤트에 참여해 주셔서 감사합니다.')
        await this.printStamp()
        this.gameReset()
        this.formReset()
        this.this.isCheckRunnig = false
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
            alert("이미 3번 찍음")
        }
    }

}