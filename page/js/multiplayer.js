
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
    interval:400,
    update:function(){
        sendPost("/player", players[0])
    }
}

sync.timer = setInterval(sync.update, sync.interval)