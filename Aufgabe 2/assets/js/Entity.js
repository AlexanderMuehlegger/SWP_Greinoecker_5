 class Entity {
    constructor(position=new Vector2D(), type=ENTITY_TYPES.UNDEFINED, acc=new Vector2D(), speed=new Vector2D(), max_ticks){
        this.position = position
        this.type = type
        this.acc = acc
        this.speed = speed
        this.max_ticks = max_ticks
        this.MAX_SPEED = 0
        this.#init()
    }

    #init(){
    }
    
    update(){
        this.position.add(this.speed)
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}