class Player {

    constructor(id, name, x, y){
        this.name = name; this.x = x; this.y = y
        this.id = id

        this.width = 20
        this.height = 20

        this.r = 0 // rotation

        this.vx = 0 // velocity
        this.vy = 0

        this.isLead = false // set this manually :) not a constructor thing
    }

    render(ctx){
        canvas.renderSpriteRot(canvas.sprites[0], this.x+this.width/2, this.y+this.height/2, this.r, this.width/2)

        // ctx.fillStyle = "#ffffff"
        // ctx.fillRect(this.x, this.y, 2, 2)
    }

    iterate(dtime){
        // console.log('a')
        // this.x ++

        if(this.isLead){
            this.a=input.a
            this.w=input.w
            this.s=input.s
            this.d=input.d
        }
        
        let dx = Math.cos(this.r)
        let dy = Math.sin(this.r)

        let forward = dx*this.vx + dy*this.vy
        let lateral = dx*this.vy - dy*this.vx

        forward *= 0.99;
        // if(Math.abs(forward) < 3 && Math.abs(lateral) < 1){lateral *= Math.exp(0.08*Math.abs(lateral)) - 0.33}
        lateral *= (0.98-0.5*Math.exp(-0.05*Math.abs(lateral)));


        const speed = 3
        const turnspeed = 0.03 * forward

        if(this.a){this.r -= turnspeed * dtime}
        if(this.d){this.r += turnspeed * dtime}

        if(this.w){
            forward += speed
        }
        if(this.s){
            forward -= speed * 0.5
            if(forward > 0){forward *= 0.93}
        }


        this.vx = dx * forward - dy * lateral
        this.vy = dy * forward + dx * lateral

        this.x += this.vx * dtime
        this.y += this.vy * dtime

    }

}