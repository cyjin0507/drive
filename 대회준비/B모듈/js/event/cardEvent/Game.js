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
        this.gameStartBtn.html('시작하기')

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


        this.timerText.html(TIMEDATA.START_COUNTDOWN + '초')

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
                    this.timerText.html(`${countDown - second}초`)
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