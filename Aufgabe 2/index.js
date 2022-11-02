// import { Entity, Player, Bonus, Enemy, utils, Game } from "./assets/js/"
let canvas = document.getElementById("field")

var game
var size = {
    width: canvas.width,
    height: canvas.height
}

var score_DOM = document.getElementById("score")
var health_DOM = document.getElementById("health")
var time_DOM = document.getElementById("time")
var lost_DOM = document.getElementById("lost")

function start() {
    let enemy = new Enemy(new Vector2D(0,0), new Vector2D())
    
    
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



