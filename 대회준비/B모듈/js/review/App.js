class App {
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

            // 새로운 입력란에 이벤트 추가
            imgFile.on('input', this.checkImage)

            this.imageFileGroup.append(imgFile)
        })

        this.imageList = []
    }


    checkImage = async (e)=>{
        const files = e.target.files

        for(let i = 0; i < this.imageList.length; i++){
            // 이미 이미지를 추가 했었던 입력란에서 이미지를 변경 했다면
            if(this.imageList[i].id == e.target.dataset.id){    
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
                    id : e.target.dataset.id,
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

window.addEventListener('load', ()=>{
    new App()
})