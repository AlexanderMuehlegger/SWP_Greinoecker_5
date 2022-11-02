
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


function randNum(min, max){
    return Math.random() * (max-min) * min
}

function randPercentage(){
    return Math.random()
}

function checkCollition(entity1, entity2){
    if(entity1.position.x + entity1.image.width >= entity2.position.x
        && entity1.position.x <= entity2.position.x + entity2.image.width
        && entity1.position.y + entity1.image.height >= entity2.position.y
        && entity1.position.y <= entity2.position.y + entity2.image.height)
        return true
    return false
}

function increaseTime(){
    game.time += 1
    game.score += Math.floor(game.time*.15)
}

 class Vector2D{
    constructor(x=0, y=0){
        this.x = x
        this.y = y
        
    }

    is(vec2){
        return vec2.x == this.x && vec2.y == this.y
    }
    add(vec2){
        this.x += vec2.x
        this.y += vec2.y
    }

    cap(vec2){
        if(Math.abs(this.x) > vec2.x)
            this.x = this.x<0? vec2.x*-1 : vec2.x 
        if(Math.abs(this.y) > vec2.y)
            this.y = this.y<0? vec2.y*-1 : vec2.y
    }
}