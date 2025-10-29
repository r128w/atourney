const game = {
    iterate: function(dtime){
        for(var i = 0; i < players.length; i ++){
            players[i].iterate(dtime)
        }

        canvas.render()
    },
    timer:null
}


const fps = 60
game.timer = setInterval(game.iterate, 1000/fps, 1/fps)