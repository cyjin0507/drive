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