const KEY_LIST = ['KeyW', 'KeyA', 'KeyS', 'KeyD']

class Player extends Entity {
    constructor(props) {
        super(props)
        this.keyMap = {
            keyW : false,
            keyA : false,
            keyS : false,
            keyD : false
        }
        this.init()
    }

    init() {
        window.addEventListener('keypress', this.handleKeyDown.bind(this))
        window.addEventListener('keyup', this.handleKeyUp.bind(this))

    }

    handleKeyDown(e) {
        const {code} = e
        if(!KEY_LIST.includes(code)) return
        this.keyMap[code] = true
    }

    handleKeyUp(e) {
        const {code} = e
        if(!KEY_LIST.includes(code)) return
        this.keyMap[code] = false
    }

    // Override
    render(ctx) {
        this.moveByKeyMap()
        const {x, y, size, color} = this
        
        ctx.beginPath()
        ctx.arc(x,y,size, 0, 2*Math.PI)
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
    }

    moveByKeyMap() {
        const {keyMap, speed} = this
        
        let xDistance = 0
        let yDistance = 0
        if(keyMap['KeyW']) yDistance -= speed
        if(keyMap['KeyA']) xDistance -= speed
        if(keyMap['KeyS']) yDistance += speed
        if(keyMap['KeyD']) xDistance += speed

        let nextX = this.x + xDistance
        let nextY = this.y + yDistance

        this.x = nextX
        this.y = nextY
    }
}