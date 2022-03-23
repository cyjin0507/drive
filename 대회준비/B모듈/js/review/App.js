class App {
    constructor(){
        this.init()
        this.reset()
        this.addEvent()
    }

    init() {
        this.imageList = []

        // 모든 입력란을 불러옴
        this.name = $('#name')
        this.product = $('#product')
        this.shop = $('#shop')
        this.date = $('#date')
        this.content = $('#content')
        this.imagefile = $('#add-file') 
        this.photoAddBtn = $('#add-photo')
        this.imageFileGroup = $('.photo-form')

        // Star.js 참고
        this.star = new Star()
    }

    reset() {
        this.name.val('')
        this.product.val('')
        this.shop.val('')
        this.date.val('')
        this.content.val('')
        this.star.reset()
        this.imagefile.css('display', 'none')
        this.imageFileGroup.html('')
    }

    addEvent() {
        $('#review-close').click(()=> {
            this.reset()
        })
        $('#review-check').click(()=> {
            this.reviewCheck()
        })
        this.name.on('input', (e)=> {
            e.target.value = removeNotKOROrEN(e.target.value)
        })
        this.photoAddBtn.click(()=> {
            const imgFile = $(this.imagefile[0].cloneNode(true))
            imgFile.css('display', 'inline')
            imgFile.data('id', new Date().getTime())
            imgFile.on('click', this.imageCheck)
            this.imageFileGroup.append(imgFile)
        })
        this.imageList = []
    }

    async imageCheck(e) {
        const files = e.target.files
        const id = $(e.target).data('id')
        for(let i=0; i<this.imageList.length; i++) {
            if(this.imageList[i].id == id) {
                this.imageList.splice(i,1)
            }
        }
        for(let file of files) {
            const img = await getImage(file)
            if(img) {
                this.imageList.push({
                    img:img,
                    id:id,
                    file:file
                })
            } else {
                alert("이미지 형식 오류")
                $(e.target).val('')
                break
            }
        }
    }

    reviewCheck() {
        const name = this.name.val()
        if(name.length < 2 || name.length > 50 || !/^[ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z]*$/.test(name)) {
            alert('이름 형식 오류')
            return false
        }
        const product = this.product.val()
        if(product == undefined || product == "") {
            alert('구매품 오류')
            return false
        }
        const shop = this.shop.val()
        if(shop == undefined || shop == "") {
            alert('구매처 오류')
            return false
        }
        const date = this.date.val()
        if(!/^[0-9]{4}-[0-9]{3}-[0-9]{3}/.test(date)) {
            alert('날짜 오류')
            return false
        }
        const content = this.content.val()
        if(content.length > 100) {
            alert('내용 오류')
            return false
        }
        if(this.imageList.length == 0) {
            alert('이미지 오류')
            return false
        }

        alert('구매후기가 등록되었습니다')
        this.reset()
        return true

    }

}

window.addEventListener('load', ()=>{
    new App()
})