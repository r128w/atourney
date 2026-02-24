class Ball {
    constructor(x, y, vx, vy){
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    iterate(dtime){
        this.x += this.vx * dtime
        this.y += this.vy * dtime
    }

    render(ctx){
        ctx.fillStyle="#ff0000"
        ctx.fillRect(this.x-5, this.y-5, 10, 10)
    }

    static fromJSON(json){
        return new Ball(json.x, json.y, json.vx, json.vy)
    }

}