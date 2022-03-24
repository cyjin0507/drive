class App {
    constructor() {
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
        this.imagefile.css('display', 'none')
        this.imageFileGroup.html('')
    }

    addEvent() {
        $('.review-close').click(()=> {
            this.reset()
        })
        $('.review-check').click(()=> {
            this.checkValue()
        })
        this.name.on('click', (e)=> {
            e.target.value = removeNotKOROrEN(e.target.value)
        })
        this.photoAddBtn.click(()=> {
            const imgFile = $(this.imagefile[0].cloneNode(true))
            imgFile.css('display', 'none')
            imgFile.data('id', new Date().getTime())
            imgFile.on('click', this.checkImage)
            this.imageFileGroup.append(imgFile)
        })
    }

    async checkImage(e) {
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
                    
                })
            }
        }
    }

}

window.addEventListener('load', ()=>{
    new App()
})