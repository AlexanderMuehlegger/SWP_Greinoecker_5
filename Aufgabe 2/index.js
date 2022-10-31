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



