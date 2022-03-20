class Card {
    constructor(imgSrc, activeCardList, findCardCountUpdate) {
        // 클래스가 'card'인 요소를 생성
        // 회전 효과 등은 거의 다 css로 구현
        this.dom = $(document.createElement('div'))
        this.dom.addClass('event-card')

        // 이미지 이름의 '_' 앞 부분은 지역명과 같으므로 지역명은 이미지 주소를 이용하여 가져옴
        this.imgSrc = imgSrc
        this.location = imgSrc.split('_')[0]
        
        // 한번에 대기 중인 timeout을 모두 초기화 시킬 목적으로 생성한 리스트 
        this.timerList = []

        // 화면에 출력되어 있는 찾은 카드 수를 업데이트하는 함수의 주소를 불러옴 
        // 카드를 찾았다면 이 함수를 실행하여 화면에 출력
        this.findCardCountUpdate = findCardCountUpdate

        // 뒤집은 카드 리스트의 주소를 불러옴
        // 자신이 뒤집히면 여기에 자신을 넣어주고 이 리스트의 길이가 2가 되면 카드를 비교하여
        // 같은 카드인지 검사함
        this.activeCardList = activeCardList

        this.init()
        this.addEvent()
    }

    init() {
        // 카드 html 설정
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

        // 이미 짝을 맞추는지 확인 하기 위해 사용하는 변수
        this.isFixed = false
        // 뒤집혀 있는지 확인 하기 위애 사용하는 변수
        this.isActive = false
    }

    addEvent = () => {
        this.dom.on('click', () => {
            // 클릭한 카드가 짝을 맞춘 카드, 뒤집어진 카드가 이거나 현재 선택된 카드가 2개 이상일 경우 카드를 뒤집지 않는다
            // 또한 뒷면으로 돌아가고 있는 중인 카드가 있다면 카드를 뒤집지 않는다
            if (this.isFixed || this.activeCardList.length >= 2 || this.isActive || window.isUnactiving) {
                return
            }

            // 선택된 카드 리스트에 자신을 추가
            this.activeCardList.push(this)

            
            // 카드 선택시 타이머 초기화 하는 이유 

            // 타이머 초기화 안했을때는 예를 들어
            // 1번쨰 카드 클릭 후 2.7초 지남 -> 2번째 카드 클릭
            // -> 2번째 카드와 1번째 카드가 다르다면 0.5초(카드가 돌아가는 시간) 후에 선택된 카드 리스트 초기화
            // -> 하지만 1번째 카드가 먼저 뒤집힘(애니메이션이 어색한 문제 발생)
            // -> 또한 1번째 카드가 뒤집히면서 먼저 리스트를 초기화 시킴
            // -> 2번째 카드를 0.2초 사이에 다시 클릭하면 다시가 뒤집히던 도중 다시 뒤집힘
            // -> 하지만 0.5초 후에 선택된 카드 리스트 초기화를 해주므로 2번째 선택된 카드는 앞면이지만 앞면으로 인식되지 않음
            // -> 다른 카드 2개 더 클릭하면 3개가 앞면으로 보이는 문제 발생

            // 하지만 타이머를 초기화 하면 1번째로 클릭한 카드가 먼저 뒷면으로 돌아가지 않으니 이런 버그가 발생하지 않음
            this.activeCardList.forEach((card)=>{
                card.timerReset()
            })

            this.select()

            // 카드 선택이 2개 되었다면 두 카드가 같은지 검사한다.
            if (this.activeCardList.length >= 2) {
                this.cardCheck()
            }
        })
    }

    // 선택한 카드가 이전에 클릭한 카드와 동일한 카드인지 확인
    cardCheck = ()=>{
        if(this.activeCardList[0].imgSrc === this.activeCardList[1].imgSrc){
            // 두 카드가 같다면 카드가 뒤집힌 채로 고정되게 함 
            this.activeCardList.forEach(card => {
                card.fix()
            })

            // 화면에 보이는 '찾은 카드 수'를 업데이트 해줌
            this.findCardCountUpdate()

            // 다른 카드를 뒤집을 수 있게 하기 위해 
            // 카드 회전 시간이 끝난 후 선택된 카드 리스트를 초기화 시켜준다
            const timer = setTimeout(()=>{
                this.activeCardList.splice(0,10000000)
            }, TIMEDATA.CARD_ROTATE_TIME*1000)

            this.timerList.push(timer)
        } else {
            // 같지 않다면 다시 뒤집어준다 

            // 바로 카드 뒷면을 보이게 하면 2번째로 선택한 카드를 확인 할 수 없으므로
            // 2번째 카드가 돌아가는 시간만큼 기다린 후 카드를 다시 뒤집어야한다. 
            const timer = setTimeout(()=>{
                this.activeCardList.forEach(card => {
                    card.unactive()
                })
            }, TIMEDATA.CARD_ROTATE_TIME*1000)
            this.timerList.push(timer)
        }
    }

    // 이 카드에 설정된 모든 timeout을 중지함
    timerReset = ()=>{
        while(this.timerList.length != 0){
            clearTimeout(this.timerList[0])
            this.timerList.splice(0,1)
        }
    }

    // 카드 뒤집기
    active = () => {
        this.timerReset()

        this.isActive = true
        this.dom.addClass('active')
    }

    // 카드 원래대로
    unactive = () => {
        this.timerReset()

        // 뒤집기
        this.isActive = false
        this.dom.removeClass('active')

        // 전역변수를 이용해 뒷면으로 돌아가고 있는 카드가 있는지 확인
        window.isUnactiving = true

        // 카드가 돌아가는 시간을 기다린 후에 실행
        let timeOut = setTimeout(()=>{
            // this.activeCardList를 초기화
            this.activeCardList.splice(0,10000000)

            // 뒷면으로 돌아갔다면 변수 초기화
            window.isUnactiving = false
        }, TIMEDATA.CARD_ROTATE_TIME * 1000)

        this.timerList.push(timeOut)
    }

    
    // 카드 뒤집고 CARD_ACTIVE_TIME만큼의 시간(혹은 설정한 시간)이 흐른 후에 원래대로 돌아간다.

    // 직접 클릭 했을때, 힌트 보기로 뒤집어야할때, 처음 카드 확인시간에 이 함수를 사용한다.
    // time 변수에 값을 넣어서 다시 뒷면이 보이게 되는 시간을 다르게 설정할 수 있다
    select = (time = TIMEDATA.CARD_ACTIVE_TIME) => {
        // 앞면이 보이게 뒤집음
        this.active()

        // 설정한 시간 만큼 지난 후 뒷면이 보이게 뒤집음
        let timeOut = setTimeout(() => {
            this.unactive()
        }, time * 1000)

        this.timerList.push(timeOut)
    }

    // 카드를 뒤집힌채로 고정 시키기
    fix = () => {
        this.timerReset()

        this.isFixed = true
        this.active()

        // 짝을 맞춘 카드는 그 카드의 지역명을 보여줌
        this.dom.find('.info').addClass('active')
    }

}

class Game {
    constructor(form) {
        this.form = form

        // 제공파일의 이미지 리스트 불러오기
        this.imgs = SPECIALTY

        // 게임 요소들을 불러옴
        this.cardGrid = $('.event-card-grid')
        this.timerText = $('.timer span')
        this.gameStartBtn = $('.game-start')
        this.hintBtn = $('.hint')

        // 시작하고 나서 다시시작 버튼이 뜨기 전까지 이 변수를 이용하여 다시 시작하는걸 막음
        this.startBtnActive = true

        // 게임이 시작되었는지 이 변수에 저장하여 힌트 버튼을 눌렀을때 힌트가 나와야하는지 보기
        this.gameStarted = false

        this.addEvent()
        this.gameReset()
    }

    addEvent = () => {
        // 시작 버튼을 눌렀을때 시작
        this.gameStartBtn.click(() => {
            // 동시에 누르는걸 막기 위해서 활성화 되지 않았다면 시작하지 않음 (카드 확인 시간이 끝날떄까지 재시작 불가)
            if (this.startBtnActive) {
                this.gameStart()
            }

            this.startBtnActive = false
        })

        // 힌트 버튼을 클릭 했을떄 게임이 진행중이라면 hint 함수 실행
        this.hintBtn.click(() => {
            if (this.gameStarted) {
                this.hint()
            }
        })
    }

    getRandomImageList = () => {
        // 기본 이미지 리스트를 섞어서 새로운 리스트에 저장
        const imgList = this.imgs.sort((a, b) => {
            return Math.random() - 0.5
        })

        // 이미지를 8개만 남기고 삭제함
        imgList.splice(8, 100000)

        return imgList
    }

    gameReset = () => {
        // 인터벌과 변수를 모두 초기화 해줌
        this.gameStartBtn.html('게임시작')

        clearInterval(this.timerInterval)

        this.cardList = []
        this.acitiveCard = []

        this.cardGrid.html('')

        // 뒷면이 보이는 카드 16개를 추가해서 처음처럼 보이게 해줌
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


        this.timerText.html(padstart(TIMEDATA.START_COUNTDOWN) + '초')

        this.findCardCount = 0
        this.UpdateFindCardCount(0)
    }

    gameStart = async () => {
        // 폼 닫기
        this.form.formReset()

        // 변수 초기화
        this.gameReset()

        // 랜덤 카드 리스트 준비
        this.cardSet()

        // 처음 카드 확인 시간에 쓰는 타이머 시작
        await this.firstTimerSet()

        // 힌트를 사용할 수 있도록 게임 시작 알리기
        this.gameStarted = true

        this.gameTimerSet()
    }

    gameEnd = () => {
        // 게임이 끝났다면 참여정보 등록 폼을 열음
        this.form.formOpen(this.findCardCount, this.gameReset)

        // reset과는 다르게 게임을 초기화하진 않고 게임을 멈춰줌
        this.gameStarted = false
        clearInterval(this.timerInterval)

        // 찾지 못한 카드를 모두 뒤집어서 보여주고 'unfind' 클래스를 붙여줌
        this.cardList.forEach(card => {
            if (!card.isFixed) {
                card.dom.addClass('unfind')
                card.fix()
            }
        })
    }

    hint = () => {
        // 찾지 못한 카드를 모두 뒤집어서 보여줌
        // HINT_TIME 만큼 뒤집혀있다가 다시 돌아옴
        this.cardList.forEach(card => {
            if (!card.isFixed) {
                card.select(TIMEDATA.HINT_TIME)
            }
        })
    }

    cardSet = () => {
        // 그리드에 있는 카드를 삭제
        this.cardGrid.html('')

        // 랜덤 이미지를 받아옴
        const randomImageList = this.getRandomImageList()

        // 카드 객체를 생성함 
        for (let img of randomImageList) {
            // 같은 카드가 2장씩 있어야하므로 2개씩 생성
            for (let i = 0; i < 2; i++) {
                const card = new Card(img, this.acitiveCard, this.UpdateFindCardCount)

                // 카드 앞면 보이게 해줌
                card.select(TIMEDATA.START_COUNTDOWN + 0.5)

                // 카드 리스트에 추가
                this.cardList.push(card)
            }
        }

        // 카드를 섞어줌
        this.cardList = this.cardList.sort((a, b) => Math.random() - 0.5)

        // 카드를 화면에 출력
        for (let card of this.cardList) {
            this.cardGrid.append(card.dom)
        }
    }

    UpdateFindCardCount = (count = 1) => {
        this.findCardCount += count

        // 8개 모두 찾았다면 게임 종료
        if (this.findCardCount >= 8) {
            this.gameEnd()
        }

        $('.finded-event-card').html(`
            찾은 카드 수 : ${this.findCardCount}
        `)
    }

    firstTimerSet = () => {
        // 타이머에 현재시간을 넣어서 시작한 시간을 알려줌
        this.timer = new Date()

        const countDown = TIMEDATA.START_COUNTDOWN

        return new Promise((res, rej) => {

            // 처음 모든 카드 보여줄때 카운트 다운
            const timerInterval = setInterval(() => {
                // 게임 시작시간이랑 현재시간 비교해서 경과시간 계산 
                let gameTime = (new Date()).getTime() - this.timer.getTime()
                let second = parseInt(gameTime / 1000)

                // 남은 시간 계산
                if (countDown - second >= 0) {
                    // 몇초 남았는지 출력
                    this.timerText.html(`${padstart(countDown - second)}초`)
                } else {
                    // 5초 카운트 다운이 끝났다면...

                    // 게임시작 버튼을 다시하기 버튼으로
                    this.startBtnActive = true
                    this.gameStartBtn.html('다시하기')

                    // 이 인터벌을 삭제함
                    clearInterval(timerInterval)

                    res(true)
                }
            }, 100)
        })
    }

    gameTimerSet = () => {
        // 타이머를 현재 시간으로 재 설정
        this.timer = new Date()

        // 게임시간 타이머
        this.timerInterval = setInterval(() => {
            // 경과한 시간 = 현재시간 - 시작시간
            let gameTime = (new Date()).getTime() - this.timer.getTime()

            // 남은 시간 = 주어진 시간 - 경과한 시간
            let second = TIMEDATA.GAME_PLAY_TIME - parseInt(gameTime / 1000)

            if (second > 59) {
                // 남은 시간이 1분을 넘어가면 초와 분을 모두 출력 
                let minute = parseInt(second / 60)
                this.timerText.html(`${padstart(minute)}분 ${padstart(second % 60)}초`)
            } else {
                // 남은 시간이 1분을 넘지 않는다면 초만 출력
                this.timerText.html(`${padstart((second % 60))}초`)

                // 남은 시간이 0 이하 일때 게임을 종료함
                if(second <= 0){
                    this.gameEnd()
                }
            }

        }, 100)
    }
}

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

class EventApp {
    constructor(){
        this.init()
    }

    init(){
        this.form = new Form()
        this.game = new Game(this.form)
    }
}

// 모든 시간 상수는 초 단위로 씀
// START_COUNTDOWN : 시작하기 전 카드 확인 시간 
// GAME_PLAY_TIME : 카드 확인 시간이 종료된 후 게임 플레이 시간
// CARD_ACTIVE_TIME : 카드를 뒤집었을때 다시 뒤집기까지의 시간
// CARD_ROTATE_TIME : 카드가 회전하는 시간(실제로 회전 시간을 변경하려면 css에서 바꿔야함)
// HINT_TIME : 힌트보기 버튼을 눌렀을때 힌트를 보여주고 다시 뒤집히기 전까지의 시간
const TIMEDATA = {
    START_COUNTDOWN : 5,
    GAME_PLAY_TIME : 90,
    CARD_ACTIVE_TIME : 3,
    CARD_ROTATE_TIME : 0.5,
    HINT_TIME : 3
}

// 특산품 이미지 파일의 이름
// 지역명은 '_'을 기준으로 잘라서 얻으면 되기 때문에 따로 저장 X
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
];

// 숫자아닌 글자 없에기
function removeNotNumber(number) {
    return number.toString().replace(/[^0-9]/g, '')
}


// 숫자 자릿수마다, 표시
function numberFormet(number){
    // 먼저 숫자아닌 글자를 없에고 정수로 형변환
    number = parseInt(removeNotNumber(number))

    // 자릿수 ,으로 표시
    return number.toLocaleString('ko-KR') 
}

// 한글, 영어만 남기기
function removeNotKOROrEN(str){
    return str.replace(/[^ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z]/g, '')
}

// 전화번호를 3,4,4으로 끊어서 표현
function phoneNumberFormet(number) {
    number = removeNotNumber(number)

    // 길이가 7이 넘을때, 3이 넘을때, 3보다 작을때를 구분해야함
    if(number.length > 7){
        number = number.replace(/(\d{0,3})(\d{0,4})(\d{0,4})/, '$1-$2-$3')
    } else if(number.length > 3){
        number = number.replace(/(\d{0,3})(\d{0,4})/, '$1-$2')
    } else {
        number = number.replace(/(\d{0,3})/, '$1')
    }
    
    // 13자리만 표시하고 뒷자리는 버림
    number = number.substr(0, 13)

    return number
}

// 정수형의 남는 앞자리 0으로 채워주기 방법 2개
// 1. 함수
function padstart(num, length=2, str="0"){
    return num.toString().padStart(length, str)
}
// 2. 프로토타입
Number.prototype.padStart = function (length=2, str='0'){
    return this.toString().padStart(length, str)
}

// 이미지 파일을 base64로 불러옴
function getImageFile(file){
    const fileReader = new FileReader()

    return new Promise((res, rej)=>{
        fileReader.onload = ()=>{
            res(fileReader.result)
        }

        fileReader.onerror = ()=>{
            rej(false)
        }

        fileReader.readAsDataURL(file)
    })
}

// 이미지 파일을 dom 객체로 변환
async function getImage(file){
    const img = document.createElement('img')
    
    img.src = await getImageFile(file)

    return new Promise((res, rej)=>{
        img.onload = ()=>{
            res(img)
        }
    
        img.onerror = ()=>{
            res(false)
        }
    })
}


// 날짜를 yyyy-mm-dd 형으로 바꿔줌
Date.prototype.myDateFormat = function(){
    return this.getFullYear().padStart() + '-' + (this.getMonth()+1).padStart() + '-' + this.getDate().padStart();
}



class ReviewApp {
    constructor(){
        this.init()
        this.reset()
        this.addEvent()
    }

    init(){
        this.imageList = []

        // 모든 입력란을 불러옴
        this.name = $('#name')
        this.product = $('#product')
        this.shop = $('#shop')
        this.date = $('#date')
        this.content = $('#content')
        this.imagefile = $('#add-file') 
        this.addImageFileBtn = $('#add-photo')
        this.imageFileGroup = $('.photo-form')

        // Star.js 참고
        this.star = new Star()
    }

    reset = ()=>{
        // 모든 입력란을 초기화
        this.name.val('')
        this.product.val('')
        this.shop.val('')
        this.date.val('')
        this.content.val('')
        this.star.reset()

        // 파일 입력란을 처음엔 숨김
        this.imagefile.css('display', 'none')
        this.imageFileGroup.html('')
    }

    addEvent = ()=>{
        // 닫기 버튼을 눌렀을때 초기화 (닫는 건 util.js의 setModalPopup에서 함)
        $('#review-close').click(()=>{
            this.reset()
        })

        $('#review-check').click(()=>{
            this.reviewCheck()
        })

        // 이름이 입력될때마다 한글이나 영어가 아닌 값 삭제
        this.name.on('input', (e)=>{
            e.target.value = removeNotKOROrEN(e.target.value)
        })

        // 이미지 추가 버튼 클릭시 파일 입력란 보이게 하기
        this.addImageFileBtn.click(()=>{
            // 숨겨져 있던 입력란 1개를 복사하여 새로운 입력란을 만듦
            const imgFile = $(this.imagefile[0].cloneNode(true))
            imgFile.css('display', 'inline')

            // 새로운 입력란에 아이디 추가
            imgFile.data('id', new Date().getTime())
            console.log(imgFile.data('id'))

            // 새로운 입력란에 이벤트 추가
            imgFile.on('input', this.checkImage)

            this.imageFileGroup.append(imgFile)
        })

        this.imageList = []
    }


    checkImage = async (e)=>{
        const files = e.target.files

        const id = $(e.target).data('id')

        for(let i = 0; i < this.imageList.length; i++){
            // 이미 이미지를 추가 했었던 입력란에서 이미지를 변경 했다면
            if(this.imageList[i].id == id){    
                // 먼저 입력했던 이미지 삭제
                this.imageList.splice(i, 1)
            }
        }

        // files에 있는 이미지를 불러옴
        for(let file of files){
            // 확장자만 이미지 일 수 있으므로 진짜 이미지인지 검사
            const img = await getImage(file)

            if(img){
                // 이미지 리스트에 이미지 추가
                this.imageList.push( {
                    img : img,
                    id : id,
                    file : file
                })
            } else {
                // 올바르지 않은 이미지 파일이라면 값 삭제
                alert('올바른 이미지 파일이 아닌 파일입니다.')
                $(e.target).val('')
                break
            }
        }
    }

    reviewCheck = ()=>{
        const name = this.name.val()

        // 이름 검사  길이 2~50, 영어, 글자만
        if( name.length < 2 ||
            name.length > 50 || 
            !/^[ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z]*$/.test(name)){
            alert('이름은 2자 이상 50자 이내의 한글과 영어만 입력이 가능합니다.')
            return false
        }


        const product = this.product.val()

        // 값이 있는지 검사
        if(product == undefined || product == ''){
            alert('구매품을 입력해주세요')
            return false
        }


        const shop = this.shop.val()

        // 값이 있는지 검사
        if(shop == undefined || shop == ''){
            alert('구매처를 입력해주세요')
            return false
        }


        const date = this.date.val()

        // 구매일 검사 yyyy-mm-dd 형식인지 검사
        if(!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date)){
            alert('구매일은 yyyy-mm-dd 형식 이어야합니다.')
            return false
        }


        const content = this.content.val()

        // 100자 이상 인지 검사
        if(content.length < 100){
            alert('내용은 100자 이상이어야합니다.')
            return false
        }

        const score = this.star.val()
        // 별점 검사
        if(score < 0 || score > 10){
            alert('별점이 범위를 넘어갔습니다.')
            return false
        }


        // 이미지 파일 검사
        if(this.imageList.length == 0){
            alert('이미지 파일이 1개 이상 있어야합니다.')
            return false
        }


        this.postReivew({
            name,
            product,
            shop,
            date,
            content,
            score,
            imgs : this.imageList.map(x=>x.img)
        })

        alert('구매 후기가 등록되었습니다.')
        window.location.href = '#'

        this.reset()
        return true
    }

    postReivew = (data)=>{
        // $.ajax({
        //     type:'POST',
        //     url:'/postReview',
        //     dataType:'text',
        //     data : JSON.stringify(data),

        //     success: (result) => {},

        //     error: (err) => {alert('등록 실패')}
        // })
    }
}

class Star {
    constructor(){
        // 요약
        // css로 별 2개를 반쪽씩 1개로 합침
        // 모든 별 하나하나에 호버 이벤트를 걸어주고 이벤트 발생시
        // 자신과 자신보다 왼쪽에 있는 모든 별을 색칠, 오른쪽 별은 비어있게 만들어서 화면에 출력
        // 호버한 별의 인덱스를 저장하여 그것을 별점의 값으로 사용함


        // 별점의 dom 객체
        this.dom = $('.star-input')
        
        // 별의 색
        this.dom.css('color', 'yellowgreen')

        // 별점의 value
        this.lastSelect = 0
    
        this.init()
        this.addEvent()
    }

    init (){
        // 모든 별을 불러옴 (화면 상으론 반쪽밖에 안 보임)
        this.stars = this.dom.find('.star')
    }

    addEvent = ()=>{
        this.stars.each((index,x)=>{
            // 호버 이벤트 걸기
            $(x).on('mouseover', ()=>{
                this.lastSelect = index

                // 자신의 왼쪽에 있는 별 색칠
                for(let i = 0; i <= index; i++){
                    $(this.stars[i]).html('★')
                }

                // 자신의 오른쪽에 있는 별 비어있게
                for(let i = index+1; i < this.stars.length; i++){
                    $(this.stars[i]).html('☆')
                }
            })
        })
    }

    // 값 초기화
    reset = ()=>{
        this.lastSelect = 0
        this.stars.html('☆')
    }

    // 값 전달
    val = () => {
        return this.lastSelect
    }
}





window.addEventListener('load', ()=>{
    if($('#event-card').length == 0){
        new ReviewApp()
    } else {
        new EventApp()
    }
})