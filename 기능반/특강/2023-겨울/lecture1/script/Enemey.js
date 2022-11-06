class Enemey extends Entity {
    constructor(props, spawnSide) {
        super(props)
        this.startPoint = -30
        this.spawnSide = spawnSide
        this.targetSide = (spawnSide + 2) % 4


        this.init()
    }

    render(ctx) {

    }

    init() {
        const {spawnSide} = this
        const {width, height} = canvas

        let spawnSide2 = [0,0]
        if(spawnSide == 0) spawnSide2 = [Math.round(Math.random() * width), this.startPoint]
        if(spawnSide == 1) spawnSide2 = [this.startPoint, Math.round(Math.random() * height)]
        if(spawnSide == 2) spawnSide2 = [Math.round(Math.random() * width), height - this.startPoint]
        if(spawnSide == 3) spawnSide2 = [width - this.startPoint, Math.round(Math.random() * height)]
        console.log(spawnSide,spawnSide2);
    }

}