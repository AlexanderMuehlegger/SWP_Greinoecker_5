class Bonus extends Entity {
    constructor(position, speed){
        super(position, ENTITY_TYPES.ENEMY, undefined, speed)
        this.image = new Image()
        this.image.src=CONSTANTS.BONUS_IMAGE
    }
}