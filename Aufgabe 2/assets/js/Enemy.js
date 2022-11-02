 
 // for random y position: randNum(this.image.height, size.height-this.image.height)
 class Enemy extends Entity {
    constructor(position, speed) {
        super(position, ENTITY_TYPES.ENEMY, undefined, speed)
        this.image = new Image()
        this.image.src=CONSTANTS.ENEMY_IMAGE
    }

    update() {
        this.position.add(this.speed)
    }

}