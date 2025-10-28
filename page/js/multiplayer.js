
async function sendPost(url, data=null){
    let options = {
        method:"POST"
    }
    if(data){
        options.body = JSON.stringify(data)
        options.headers = {"Content-Type": "application/json"}
    }
    return (await fetch(url, options)).text()
}

let players = []
// TODO load players from /state POST

players.push(new Player("Anonymous", 100, 100))

const sync = {
    username:"Anonymous",
    timer:null,
    interval:4000,
    id:null,
    update:async function(){
        sendPost("/player", players[0])
    },
    connect:async function(){
        let id = await sendPost("/join", {username:this.username})
        this.id = Number(id)
    },
    disconnect:async function(){
        await sendPost("/leave", {id:this.id})
        this.id = null
        clearTimeout(this.timer)
    }
}

sync.connect().then(()=>{
    sync.timer = setInterval(sync.update, sync.interval)
})

window.addEventListener('unload', sync.disconnect)