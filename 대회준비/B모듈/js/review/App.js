class App {
    constructor() {
        this.init()
        this.reset()
        this.addEvent()
    }

    init() {
        this.imgList = []
        this.name = $('#name')
        this.date = $('#date')
        this.product = $('#product')
        this.shop = $('#shop')
        this.content = $('#content')
        this.addPhotoBtn = $('.add-photo')
        this.imgFile = $('.add-file')
        this.imgForm = $('.photo-form')
        this.star = new Star()
    }

    addEvent() {
        $('.review-close').click(()=> {
            this.reset()
        })
        $('.review-check').click(()=> {
            this.reviewCheck()
        })
        
        this.name.on('input', (e)=> {
            e.target.value = removeNotKOROrEN(e.target.value)
        })
        this.addPhotoBtn.click(()=> {
            const imgFile = $(this.imgFile[0].cloneNode(true))
            imgFile.css('display', 'block')
            imgFile.data('id', new Date().getTime())
            imgFile.on('click', this.imageCheck)
            this.imgForm.append(imgFile)
        })
        this.imgList = []
    }

    reset() {
        this.name.val('')
        this.date.val('')
        this.product.val('')
        this.shop.val('')
        this.content.val('')
        this.star.reset()
        this.imgFile.css('display', 'none')
        this.imgForm.html('')
    }

    imageCheck = async(e)=> {
        const files = e.target.files
        const id = $(e.target).data('id')

        console.log(this.imgList);
        for(let i=0; i<this.imgList.length; i++) {
            if(this.imgList[i].id == id) {
                this.imgList.splice(i,1)
            }
        }
        for(let file of files) {
            const img = await getImage(file)
            if(img) {
                this.imgList.push({
                    img:img,
                    id:id,
                    file:file
                })
            } else {
                alert('확장자 오류')
                $(e.target).val('')
                break
            }
        }
    }

    reviewCheck() {
        const name = this.name.val()
        if(name.length < 2 || name.length > 50 || !/^[ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z]*$/.test(name)) {
            alert('이름 형식 오류')
            return
        }
        const date = this.date.val()
        if(!/^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date)) {
            alert('날짜 형식 오류')
            return
        }
        const product = this.product.val()
        if(product == undefined || product == "") {
            alert('구매품 오류')
            return
        }
        const shop = this.shop.val()
        if(shop == undefined || shop == "") {
            alert('구매처 오류')
            return
        }
        const content = this.content.val()
        if(content.length < 100) {
            alert('내용 오류')
            return
        }
        if(this.imgList.length == 0) {
            alert('이미지 미등록')
            return
        }

        alert('구매 후기 등록 완료')
        this.reset()
        return true

    }

}

window.onload = () => {
    new App()
}