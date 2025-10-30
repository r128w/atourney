const game = {
    iterate: function(){
        let rn = Date.now()
        let dtime = (rn - game.lastFrame)/1000
        game.lastFrame = rn

        for(var i = 0; i < players.length; i ++){
            players[i].iterate(dtime)
        }

        canvas.render()
    },
    timer:null,
    lastFrame:Date.now()
}


const fps = 60
game.timer = setInterval(game.iterate, 1000/fps)