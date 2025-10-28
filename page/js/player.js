class Player {

    constructor(name, x, y){
        this.name = name; this.x = x; this.y = y
    }

    render(ctx){
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(this.x, this.y, 20, 20)
    }

    iterate(){
        // console.log('a')
        // this.x ++
        const speed = 4
        if(input.w){this.y -= speed}
        if(input.s){this.y += speed}
        if(input.a){this.x -= speed}
        if(input.d){this.x += speed}
    }

}