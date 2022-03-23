//  3분 53초
class Star {
    constructor() {
        this.dom = $('.star-input')
        this.dom.css('color', 'red')
        this.lastSelect = 0
        this.stars = this.dom.find('.star')
        this.addEvent()
    }

    addEvent() {
        this.stars.each((index, x) => {
            $(x).on('mouseover', ()=> {
                this.lastSelect = index
                for(let i=0; i<=index; i++) {
                    $(this.stars[i]).html('★')
                }
                for(let i=index+1; i<this.stars.length; i++) {
                    $(this.stars[i]).html('☆')
                }
            })
        })
    }

    reset() {
        this.lastSelect = 0
        this.stars.html('☆')
    }

    val() {
        return this.lastSelect;
    }

}