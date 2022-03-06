class App {
    constructor() {
        this.$clip_area = $('.clip-area');

        this.setEventHandlers();
    }

    setEventHandlers() {
        $('.btn-merge').on('click', this.doTest.bind(this))
    }

    doTest() {
        this.createTrack()
    }

    createTrack() {
        const id = 1;
        const track = new Track(id)
        track.createAt(this.$clip_area)
    }
}

window.onload = () => {
    new App();
}