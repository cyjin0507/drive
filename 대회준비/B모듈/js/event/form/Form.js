class Form {
    constructor() {
        // 폼의 dom객체를 가져옴
        this.dom = $('.form')
        this.dom.css('display', 'none')

        // 폼 안에 있는 요소들을 가져옴
        this.phone = this.dom.find('.phone')
        this.name = this.dom.find('.name')
        this.submitBtn = this.dom.find('.submit-btn')

        this.addEvent()
    }

    addEvent = () => {
        // 각 필드에 입력할때마다 형식에 맞춰서 다시 값을 넣어줌
        this.phone.on('input', (e) => {
            e.target.value = phoneNumberFormet(e.target.value)
        })
        this.name.on('input', (e) => {
            e.target.value = removeNotKOROrEN(e.target.value)
        })

        // 등록 버튼을 누르면 필드 안에 있는 값을 검사하기 시작함
        this.submitBtn.click((e) => {
            this.checkValue()
        })
    }

    // 폼을 보이게 함, 카드 뒤집기 게임을 초기화 하는 함수를 전달 받음
    formOpen = (findCardCount, gameResetFunction) => {
        this.gameResetFunction = gameResetFunction

        this.dom.css('display', 'inline-block')
        this.dom.find('.find-card-count').html(findCardCount)
    }

    // 모든 필드를 비우고 폼을 숨김 
    formReset = () => {
        this.phone.val('')
        this.name.val('')
        this.dom.find('.find-card-count').html('0')
        this.dom.css('display', 'none')
    }

    checkValue = async () => {
        // ajax 받을때 비동기 처리를 기다리는 동안 1번 더 실행될 수 있으므로 막아준다.
        if (this.isCheckValueRunning) {
            return
        }
        this.isCheckValueRunning = true

        // 핸드폰 번호는 '-'을 제거 하고 검사해야한다
        const phoneNumber = this.phone.val().replaceAll('-', '');

        // 핸드폰 번호 길이가 11이 아닐때, 숫자가 아닌 다른 문자가 있을때 경고 메시지를 띄운다.
        if (phoneNumber.length != 11 || !/^[0-9]*$/.test(phoneNumber)) {
            alert('핸드폰번호는 11자리 숫자만 입력이 가능합니다.')
            this.isCheckValueRunning = false
            return
        }

        // 이름 형식 검사이다
        // 길이가 2이상, 50이하가 아니거나 한글, 영어 이외에 다른 문자가 있으면 경고 메시지를 띄운다
        if (this.name.val().length < 2 || this.name.val().length > 50 || !/^[ㅏ-ㅣ가-힣ㄱ-ㅎa-zA-Z]*$/.test(this.name.val())) {
            alert('이름은 2자 이상 50자 이내의 한글과 영어만 입력이 가능하다')
            this.isCheckValueRunning = false
            return
        }

        alert('이벤트에 참여해 주셔서 감사합니다.')


        // 스탬프 정보를 서버에 보내야하지만 B모듈에서는 구현하지 않음
        // await this.postStamp()
        await this.printStamp()

        // formOpen 함수에서 전달 받았던 함수를 사용한다.
        // 카드 뒤집기 게임이 초기화 된다.
        this.gameResetFunction()

        // 폼이 꺼지고 모든 필드가 비워진다.
        this.formReset()

        // 다시 등록 버튼을 누를 수 있도록 한다
        this.isCheckValueRunning = false
    }

    // 출석 스탬프 찍기
    printStamp = async () => {
        // const stampInfo = await this.getStamp()

        // 스탬프 출력 코드
        const isPrint = [...$('.stamp')].some((x)=>{
            // svg(스탬프)가 없는 칸을 발견하면
            if($(x).find('svg').length == 0) {

                // 스탬프를 넣어줌 
                // 날짜 형식 변환 메소드는 util.js에서 Date의 프로토타입으로 달아줌 
                $(x).html(`
                <svg>
                    <text x="10" y="55">스탬프 이미지</text>
                    <text x="10" y="90">날짜 : ${(new Date().myDateFormat())}</text>
                </svg>
                `)

                return true
            }

            return false
        })

        if(!isPrint){
            alert('이미 스탬프를 3번 다 찍었습니다.')
        }
    }

    // ajax로 출석스탬프 정보 DB에서 가져옴
    getStamp = () => {
        return new Promise((res, rej) => {
            $.ajax({
                type:'GET',
                url:'/getStamp',
                dataType:'text',
                
                success: (result) => {
                    res(JSON.parse(result))
                },

                error: (err) => {
                    rej(err)
                }
            })
        })
    }

    // ajax로 출석스탬프 정보 서버로 보냄
    postStamp = () => {
        return new Promise((res, rej) => {
            $.ajax({
                type:'POST',
                url:'/postStamp',
                dataType:'text',

                success: (result) => {
                    res()
                },

                error: (err) => {
                    rej(err)
                }
            })
        })
    }
}