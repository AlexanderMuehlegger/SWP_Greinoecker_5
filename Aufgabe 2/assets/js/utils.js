class Vector2D{
    constructor(x=0, y=0){
        this.x = y
        this.y = y
        
    }

    is(vec2){
        return vec2.x == this.x && vec2.y == this.y
    }
    add(vec2){
        // console.warn(this)
        this.x += vec2.x
        this.y += vec2.y
        // console.warn(this)
        // console.log("-------")
    }

    cap(vec2){
        console.warn(this)

        if(Math.abs(this.x) > vec2.x)
            this.x = this.x<0? vec2.x*-1 : vec2.x 
        if(Math.abs(this.y) > vec2.y)
            this.y = this.y<0? vec2.y*-1 : vec2.y 


        console.warn(this)
        console.log("-------")
    }
}