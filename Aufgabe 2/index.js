const ENTITY_TYPES = Object.freeze({
    ENEMY: "Enemy",
    PLAYER: "Player",
    BONUS: "Bonus",
    UNDEFINED: "undefined"
})

const CONSTANTS = Object.freeze({
    PLAYER_IMAGE: "./assets/img/face-cool.png",
    ENEMY_IMAGE: "./assets/img/face-devilish.png",
    BONUS_IMAGE: "./assets/img/face-monkey.png",
    UNDEFINED_IMAGE: "./assets/img/undefined.png"
})

const GAME_STATUS = Object.freeze({
    RUNNING: "Running",
    PAUSED: "Paused",
    STOPPED: "Stopped"
})

var player
var game_status = GAME_STATUS.STOPPED

var canvas = document.getElementById("field")
var _ctx = canvas.getContext("2d")


function start() {
    player = new Entity(new Vector2D(100, 100), ENTITY_TYPES.PLAYER, 0, 0)
    game_status = GAME_STATUS.RUNNING
    draw()
}

function stop() {
    game_status = GAME_STATUS.STOPPED
}

function draw(){
    player.draw(_ctx)
    if(game_status === GAME_STATUS.RUNNING)
        window.requestAnimationFrame(draw)
    
    if(game_status === GAME_STATUS.STOPPED)
        reset()
}

function update(){

    window.requestAnimationFrame(update)
}

function reset(){

}

function getImage(type){
    let img = new Image()

    switch(type){
        case ENTITY_TYPES.PLAYER:
            img.src = CONSTANTS.PLAYER_IMAGE
            break
        case ENTITY_TYPES.ENEMY:
            img.src = CONSTANTS.ENEMY_IMAGE
            break
        case ENTITY_TYPES.Bonus:
            img.src = CONSTANTS.BONUS_IMAGE
            break
        case ENTITY_TYPES.UNDEFINED:
            img.src = CONSTANTS.UNDEFINED_IMAGE
            break
    }

    return img

}



class Game {

    game_config = Object.freeze({
        MAX_ENEMIES: 100,
        MAX_BONUS: 25,
        BONUS_REWARD: 100,
        MAX_SPEED: 2,
        
    })

    constructor(){

    }


}

class Entity {
    constructor(position=new Vector2D(), type=ENTITY_TYPES.UNDEFINED, acc=0, speed=new Vector2D()){
        this.position = position
        this.type = type
        this.acc = acc
        this.speed = speed
        this.image = getImage(type)
        this.#init()
    }

    #init(){
        alert("helloooo")
        this.draw(_ctx)
    }
    
    update(){
        this.position.add(this.speed)
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y)
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