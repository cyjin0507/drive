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