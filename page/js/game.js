const game = {
    iterate: function(){
        let rn = Date.now()
        let dtime = (rn - game.lastFrame)/1000
        game.lastFrame = rn

        for(var i = 0; i < players.length; i ++){
            players[i].iterate(dtime)
        }

        for(var i = 0; i < game.balls.length; i ++){
            game.balls[i].iterate(dtime)
        }

        canvas.render()

        if(game.checkCollisions()){
            canvas.renderHit()
        }
    },
    checkCollisions:function(){
        for(var i = 0; i < this.balls.length; i ++){
            if(this.balls[i].x > players[0].x && this.balls[i].x < players[0].x+players[0].width){
                if(this.balls[i].y > players[0].y && this.balls[i].y < players[0].y+players[0].height){
                    return true
                }    
            }
        }
        for(var i = 1; i < players.length; i ++){
            if(players[i].x > players[0].x && players[i].x < players[0].x+players[0].width){
                if(players[i].y > players[0].y && players[i].y < players[0].y+players[0].height){
                    return true
                }    
            }
        }
        return false
    },
    updateSelf(gamedata, balldata){

        // console.log(gamedata)
        this.width = gamedata.width
        this.height = gamedata.height

        game.balls = []
        for(var i = 0; i < balldata.length; i ++){
            game.balls[i] = Ball.fromJSON(balldata[i])
        }
    },
    balls:[],
    width:640,
    height:360,
    timer:null,
    lastFrame:Date.now()
}
