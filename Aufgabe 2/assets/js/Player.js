 class Player extends Entity {
    constructor (position, speed, max_ticks){
        super(position, ENTITY_TYPES.PLAYER, undefined, speed, max_ticks)
        this.image = new Image()
        this.image.src=CONSTANTS.PLAYER_IMAGE
        this.ticks = 0
        window.addEventListener("keydown", (event) => this.keyDownHandler(event))
        window.addEventListener("keyup", (event) => this.keyUpHandler(event))
    }

    keyDownHandler(event) {
        switch(event.code){
            case 'KeyA': 
                this.speed.x = -this.MAX_SPEED.x
                break
            case 'KeyS':
                this.speed.y = this.MAX_SPEED.y
                break
            case 'KeyD':
                this.speed.x = this.MAX_SPEED.x
                break
            case 'KeyW':
                this.speed.y = -this.MAX_SPEED.y
                break
        }
    }

    keyUpHandler(event) {
        switch(event.code){
            case 'KeyA': 
                this.speed.x = 0
                break
            case 'KeyS':
                this.speed.y = 0
                break
            case 'KeyD':
                this.speed.x = 0
                break
            case 'KeyW':
                this.speed.y = 0
                break
        }
    }

    update () {
        if(this.ticks%this.max_ticks == 0){

            this.position.add(this.speed)
            this.ticks = 0

            if(this.position.x >= size.width-this.image.width)
                this.position.x = size.width-this.image.width
            if(this.position.x <= 0)
                this.position.x = 0

            if(this.position.y >= size.height-this.image.height)
                this.position.y = size.height-this.image.height
            if(this.position.y <= 0)
                this.position.y = 0
        }


        this.ticks++
    }   
}