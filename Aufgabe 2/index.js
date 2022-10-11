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
        DEFAULT_PLAYER_SPAWN: new Vector2D(100, 100)
    })

    #entities = []

    game_status = GAME_STATUS.STOPPED

    constructor(width, height, player_spawn=DEFAULT_PLAYER_SPAWN, ctx){
        this.player_spawn = player_spawn
        this.width = width
        this.height = height
        this.ctx = ctx
        this.#entities.push(new Player(this.player_spawn, new Vector2D(1,0)))
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
    constructor(position=new Vector2D(), type=ENTITY_TYPES.UNDEFINED, acc=0, speed=new Vector2D()){
        this.position = position
        this.type = type
        this.acc = acc
        this.speed = speed
        this.#init()
    }

    #init(){
    }
    
    update(){
        console.log(this.position, this.speed)
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
    constructor (position, speed){
        super(position, ENTITY_TYPES.ENEMY, undefined, speed)
        this.image = new Image()
        this.image.src=CONSTANTS.PLAYER_IMAGE
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
        this.x += vec2.x
        this.y += vec2.y
    }
}