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
        this.addPhotoBtn = $('#add-photo')
        this.imgFile = $('#add-file')
        this.imgGroup = $('.photo-form')
        this.star = new Star()
    }

}