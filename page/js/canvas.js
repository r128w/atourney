const canvas = {
    init:function(game){
        this.ele = document.getElementById('main-canvas')
        this.ctx = this.ele.getContext('2d')
        this.game = game

        this.render()

        this.sprites[0].src = "./page/assets/car.png"

        this.ctx.imageSmoothingEnabled = false
    },
    clear:function(){
        this.ctx.fillStyle="#111"
        this.ctx.fillRect(0, 0, this.ele.width, this.ele.height)
    },
    sprites:[new Image()],
    render:function(){
        this.ele.width = this.ele.clientWidth
        this.ele.height = this.ele.clientHeight

        this.clear()

        for(var i = 0; i < players.length; i ++){
            players[i].render(this.ctx)
        }

        for(var i = 0; i < game.balls.length; i ++){
            this.game.balls[i].render(this.ctx)
        }

    },
    renderHit:function(){
        this.ctx.fillStyle = "#ff000055"
        this.ctx.fillRect(0, 0, 10000, 10000)
    },
    renderSpriteRot(image, x, y, rot, r){
        this.ctx.translate(x, y)
        this.ctx.rotate(rot)
        this.ctx.drawImage(image, -r, -r, r*2, r*2)
        this.ctx.rotate(-rot)
        this.ctx.translate(-x, -y)
    },
    game:null
}
