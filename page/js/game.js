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
