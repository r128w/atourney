
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

const sync = {
    username:"Anonymous",
    timer:null,
    interval:1000,
    id:null,
    update:async function(){
        // console.log(sync.id)
        let res = await sendPost("/player", {p:players[0], id:sync.id})

        if(res == "join up cuh"){// if not already connected
            console.log('not connected yet')
            sync.connect()
        }

    },
    connect:async function(){

        clearTimeout(sync.timer)

        let joinData = JSON.parse(await sendPost("/join", {username:sync.username}))
        // console.log(joinData)
        sync.id = joinData.id
        players.push(new Player(this.username, joinData.x, joinData.y))

        sync.timer = setInterval(sync.update, sync.interval)
    },
    disconnect:async function(){
        await sendPost("/leave", {id:sync.id})
        // console.log(JSON.stringify({id:this.id}))
        sync.id = null
        clearTimeout(sync.timer)
    }
}

sync.connect()

window.addEventListener('unload', sync.disconnect)