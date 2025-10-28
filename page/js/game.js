const game = {
    iterate: function(){
        for(var i = 0; i < players.length; i ++){
            players[i].iterate()
        }

        canvas.render()
    },
    timer:null
}

game.timer = setInterval(game.iterate, 30)