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
            const a = players[0];
            const b = players[i];

            const leftA   = a.x;
            const rightA  = a.x + a.width;
            const topA    = a.y;
            const bottomA = a.y + a.height;

            const leftB   = b.x;
            const rightB  = b.x + b.width;
            const topB    = b.y;
            const bottomB = b.y + b.height;

            if (rightA <= leftB)  continue;
            if (rightB <= leftA)  continue;
            if (bottomA <= topB)  continue;
            if (bottomB <= topA)  continue;

            return true;
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
