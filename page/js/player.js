class Player {

    constructor(name, x, y){
        this.name = name; this.x = x; this.y = y
    }

    render(ctx){
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(this.x, this.y, 20, 20)
    }

    iterate(dtime){
        // console.log('a')
        // this.x ++
        const speed = 120
        if(input.w){this.y -= speed*dtime}
        if(input.s){this.y += speed*dtime}
        if(input.a){this.x -= speed*dtime}
        if(input.d){this.x += speed*dtime}

        this.a=input.a// this info gets sent to server so it can interpolate etc
        this.w=input.w
        this.s=input.s
        this.d=input.d
    }

}