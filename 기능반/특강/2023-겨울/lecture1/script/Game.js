let gameInstance

class Game {

    constructor(canvas) {
        if(gameInstance) return gameInstance

        this.ctx = canvas.getContext('2d')
        this.width = canvas.width
        this.height = canvas.height
        this.player = null
        this.enemeyList = []

        gameInstance = this
        this.init()
    }

    init() {
        const {width, height} = this
        const playerData = {
            size : 30,
            color : '#22dbcf',
            x : width / 2,
            y : height / 2,
            speed : 5
        }
        this.player = new Player(playerData)

        for (let i=0; i<10; i++) {
            const spawnSide = Util.getRandomSpawnSide()
            const enemyData = {
                size : 10,
                color : "#ddd",
                speed : 2,
            }
            const enemy = new Enemey(enemyData, spawnSide)
            this.enemeyList.push(enemy)
        }
        this.render()
    }

    render() {
        const { ctx, width, height } = this
        this.ctx.clearRect(0,0,width, height)
        this.player.render(ctx)
        requestAnimationFrame(this.render.bind(this))
    }

}