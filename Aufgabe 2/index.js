const ENTITY_TYPES = Object.freeze({
    ENEMY: "Enemy",
    PLAYER: "Player",
    BONUS: "Bonus",
    UNDEFINED: "undefined"
})

const CONSTANTS = Object.freeze({
    PLAYER_IMAGE: "./assets/img/face-monkey.png",
    ENEMY_IMAGE: "./assets/img/face-devilish.png",
    BONUS_IMAGE: "./assets/img/face-cool.png",
    UNDEFINED_IMAGE: "./assets/img/undefined.png"
})

const GAME_STATUS = Object.freeze({
    RUNNING: "Running",
    PAUSED: "Paused",
    STOPPED: "Stopped"
})

var game

function start() {
    let enemy = new Enemy(new Vector2D(0,0), new Vector2D())
    console.log(enemy)
    let canvas = document.getElementById("field")
    let ctx = canvas.getContext("2d")

    game = new Game(canvas.width, canvas.height, new Vector2D(100, 100), ctx)
    
    game.game_status = GAME_STATUS.RUNNING

    game.update()
    game.draw(ctx)
}

function stop() {
    game.game_status = GAME_STATUS.STOPPED
    game.reset()
}


class Game {

    game_config = Object.freeze({
        MAX_ENEMIES: 100,
        MAX_BONUS_ENTITIES: 25,
        MAX_ENTITIES: 125,
        BONUS_REWARD: 100,
        MAX_SPEED: 2,
        BONUS_SPAWN_CHANCE: .1,
        DEFAULT_PLAYER_SPAWN: new Vector2D(100, 100),
        PLAYER_TICKS: 2,
        PLAYER_SPEED: new Vector2D(1, 1)
    })

    #entities = []

    game_status = GAME_STATUS.STOPPED

    constructor(width, height, player_spawn=this.game_config.DEFAULT_PLAYER_SPAWN, ctx){
        this.player_spawn = player_spawn
        this.width = width
        this.height = height
        this.ctx = ctx
        let player = new Player(this.player_spawn, new Vector2D(1,0), this.game_config.PLAYER_TICKS)
        player.MAX_SPEED = this.game_config.PLAYER_SPEED
        this.#entities.push(player)
    }

    #init(){

    }

    update() {
        this.spawnEntities()
        this.handleEntities()

        this.#entities.forEach((entity) => {
            entity.update()
        })

        if(this.game_status == GAME_STATUS.RUNNING)
            window.requestAnimationFrame(this.update.bind(this))
    }

    draw(){
        this.#entities.forEach((entity) => {
            entity.draw(this.ctx)
        })
        if(this.game_status == GAME_STATUS.RUNNING)
            window.requestAnimationFrame(this.draw.bind(this))
    }

    //TODO: Spawn Entities
    spawnEntities() {
        if(this.#entities.length >= this.game_config.MAX_ENTITIES)
            return
        
        
    }

    //TODO: Handle Entities
    handleEntities() {
        
    }

    reset() {
        this.#entities = []
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

}

class Entity {
    constructor(position=new Vector2D(), type=ENTITY_TYPES.UNDEFINED, acc=new Vector2D(), speed=new Vector2D(), max_ticks){
        this.position = position
        this.type = type
        this.acc = acc
        this.speed = speed
        this.max_ticks = max_ticks
        this.MAX_SPEED = 0
        this.#init()
    }

    #init(){
    }
    
    update(){
        this.position.add(this.speed)
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Enemy extends Entity {
    constructor(position, speed) {
        super(position, ENTITY_TYPES.ENEMY, undefined, speed)
        this.image = new Image()
        this.image.src=CONSTANTS.ENEMY_IMAGE
    }


}

class Player extends Entity {
    constructor (position, speed, max_ticks){
        super(position, ENTITY_TYPES.ENEMY, undefined, speed, max_ticks)
        this.image = new Image()
        this.image.src=CONSTANTS.PLAYER_IMAGE
        this.ticks = 0
        window.addEventListener("keydown", (event) => this.keyHandler(event))
    }

    keyHandler(event) {
        switch(event.code){
            case 'KeyA': 
                this.acc.x = -.2
                break
            case 'KeyS':
                this.acc.y = -.2
                break
            case 'KeyD':
                this.acc.x = .2
                break
            case '"KeyW':
                this.acc.y = .2
                break
        }
    }

    update () {
        if(this.ticks%this.max_ticks == 0){
            console.log(this.acc)
            this.speed.add(this.acc)
            
            this.speed.cap(this.MAX_SPEED)

            this.position.add(this.speed)
            this.ticks = 0
        }
        this.ticks++
    }
}

class Bonus extends Entity {
    constructor(position, speed){
        super(position, ENTITY_TYPES.ENEMY, undefined, speed)
        this.image = new Image()
        this.image.src=CONSTANTS.BONUS_IMAGE
    }
}

class Vector2D{
    constructor(x=0, y=0){
        this.x = y
        this.y = y
        
    }

    is(vec2){
        return vec2.x == this.x && vec2.y == this.y
    }
    add(vec2){
        // console.warn(this)
        this.x += vec2.x
        this.y += vec2.y
        // console.warn(this)
        // console.log("-------")
    }

    cap(vec2){
        console.warn(this)

        if(Math.abs(this.x) > vec2.x)
            this.x = this.x<0? vec2.x*-1 : vec2.x 
        if(Math.abs(this.y) > vec2.y)
            this.y = this.y<0? vec2.y*-1 : vec2.y 


        console.warn(this)
        console.log("-------")
    }
}