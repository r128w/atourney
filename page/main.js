document.addEventListener('DOMContentLoaded', ()=>{

    

    // add elements
    const c = document.createElement('canvas')
    c.id = "main-canvas"
    c.style = "width:100vw;height:95vh"
    c.className = "center"

    document.body.appendChild(c)


    const fps = 60
    game.timer = setInterval(game.iterate, 1000/fps)
    
    canvas.init(game)

    window.addEventListener('resize', canvas.render)

})