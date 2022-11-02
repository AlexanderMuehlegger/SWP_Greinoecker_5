 class Game {

    game_config = Object.freeze({
        MAX_ENEMIES: 75,
        MAX_BONUS_ENTITIES: 25,
        MAX_ENTITIES: 100,
        BONUS_REWARD: 100,
        MAX_SPEED: 2,
        BONUS_SPAWN_CHANCE: .2,
        DEFAULT_PLAYER_SPAWN: new Vector2D(100, 100),
        PLAYER_TICKS: 2,
        PLAYER_SPEED: new Vector2D(2, 2),
        ENEMY_SPEED: new Vector2D(-.8, 0),
        DEFAULT_HEALTH: 10
    })

    #entities = []

    game_status = GAME_STATUS.STOPPED
    current_Enemy_count = 0
    health = 10
    score = 0

    constructor(width, height, player_spawn=this.game_config.DEFAULT_PLAYER_SPAWN, ctx){
        this.player_spawn = player_spawn
        this.width = width
        this.height = height
        this.ctx = ctx
        let player = new Player(this.player_spawn, new Vector2D(0,0), this.game_config.PLAYER_TICKS)
        player.MAX_SPEED = this.game_config.PLAYER_SPEED
        this.#entities.push(player)
        this.time = 0
        this.timeInterval = setInterval(increaseTime, 1000)
    }

    #init(){

    }

    update() {
        if(this.health <= 0){
            this.game_status = GAME_STATUS.STOPPED
            lost_DOM.setAttribute("visible", "true")
        }

        this.spawnEntities()
        this.handleEntities()
        this.#entities.forEach((entity) => {
            entity.update()
        })

        this.updateUI()

        if(this.game_status == GAME_STATUS.RUNNING)
            window.requestAnimationFrame(this.update.bind(this))
    }

    draw(){
        this.ctx.clearRect(0, 0, this.width, this.height)

        this.#entities.forEach((entity) => {
            entity.draw(this.ctx)
        })
        if(this.game_status == GAME_STATUS.RUNNING)
            window.requestAnimationFrame(this.draw.bind(this))
    }

    spawnEntities() {
        if(this.#entities.length >= this.game_config.MAX_ENTITIES)
            return
        
        let randSpawn = randPercentage()
        // console.log(randSpawn)
        if(randSpawn <= this.game_config.BONUS_SPAWN_CHANCE){
            this.#entities.push(new Bonus(new Vector2D(size.width, randNum(22, size.height-100)), this.game_config.ENEMY_SPEED))
            return;
        }
        
        if(this.current_Enemy_count < this.game_config.MAX_ENEMIES){
            this.#entities.push(new Enemy(new Vector2D(size.width, randNum(22, size.height-100)), this.game_config.ENEMY_SPEED))
            this.current_Enemy_count++
        }
    }

    handleEntities() {
        let player = this.#entities[0]
        this.#entities.forEach((entity, index) => {
            if(entity.type == ENTITY_TYPES.ENEMY){
                if(entity.position.x <= 0-22 || entity.position.y <= 0-22 || entity.position.y >= size.height){
                    this.#entities.splice(index, 1)
                    this.current_Enemy_count--
                }else {
                    if(checkCollition(player, entity)){
                        this.health--
                        this.#entities.splice(index, 1)
                    }
                }
            }else if(entity.type == ENTITY_TYPES.BONUS){
                if(entity.position.x <= 0-22 || entity.position.y <= 0-22 || entity.position.y >= size.height)
                    this.#entities.splice(index, 1)
                else {
                    if(checkCollition(player, entity)){
                        this.score += this.game_config.BONUS_REWARD
                        this.#entities.splice(index, 1)
                    }
                } 
            }
        })
    }

    reset() {
        this.#entities = []
        this.ctx.clearRect(0, 0, this.width, this.height)
        clearInterval(this.timeInterval)
        lost_DOM.setAttribute("visible", false)
    }
    updateUI(){
        score_DOM.innerText = `Score: ${this.score}`
        health_DOM.innerText = `Health: ${this.health/this.game_config.DEFAULT_HEALTH*100}%`
        time_DOM.innerText = `${this.time}s`
    }
}