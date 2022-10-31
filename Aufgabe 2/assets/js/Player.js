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