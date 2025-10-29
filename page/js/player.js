class Player {

    constructor(name, x, y){
        this.name = name; this.x = x; this.y = y

        this.isLead = false // set this manually :) not a constructor thing
    }

    render(ctx){
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(this.x, this.y, 20, 20)
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

        const speed = 120
        if(this.w){this.y -= speed*dtime}
        if(this.s){this.y += speed*dtime}
        if(this.a){this.x -= speed*dtime}
        if(this.d){this.x += speed*dtime}

        
    }

}