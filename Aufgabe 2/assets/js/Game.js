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