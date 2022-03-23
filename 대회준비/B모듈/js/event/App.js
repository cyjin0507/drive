class App {
    constructor() {
        this.form = new Form()
        this.game = new Game(this.form)
    }
}

window.onload = () => {
    new App()
}