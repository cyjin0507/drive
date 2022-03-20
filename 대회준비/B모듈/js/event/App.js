class App {
    constructor(){
        this.init()
    }

    init(){
        this.form = new Form()
        this.game = new Game(this.form)
    }
}

window.addEventListener('load', ()=>{
    window.app = new App()
})