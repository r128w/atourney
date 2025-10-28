const scripts = ["input", "player", "multiplayer", "canvas", "game"]

document.addEventListener('DOMContentLoaded', ()=>{

    // add scripts
    for(var i = 0; i < scripts.length; i ++){
        const s = document.createElement('script')
        s.src = "./page/js/" + scripts[i] + ".js"
        s.setAttribute("synthetic", "true")
        document.head.appendChild(s)
    }

    // add elements
    const c = document.createElement('canvas')
    c.id = "main-canvas"
    c.style = "width:100vw;height:95vh"
    c.className = "center"

    document.body.appendChild(c)

})