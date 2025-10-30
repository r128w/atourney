
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
// players[0] is the client's player

const sync = {
    username:"Anonymous",
    timer:null,
    interval:40,
    id:null,
    update:async function(){
        sync.sendUpdate()
        sync.requestUpdate()
    },
    sendUpdate:async function(){
        let res = await sendPost("/player", {p:players[0], id:sync.id})
        if(res == "join up cuh"){// if not already connected
            console.log('not connected yet')
            sync.connect()
        }
    },
    requestUpdate: async function(){
        let res = await sendPost("/state")
        let lines = res.split('\n')// def breaks if playernames have newlines or etc

        for(var i = 1; i < lines.length; i ++){
            lines[i] = JSON.parse(lines[i].split("|")[1]) // for sure breaks if playernames are weird
        }
        // console.log(res)
        for(var i = 1; i < lines.length; i ++){// for all lines that are not the inital frame counter

            if(lines[i].id == sync.id){// if this line describes the client

                // ignore for now
                continue
            }

            let thisp
            for(var ii = 0; ii < players.length; ii ++){
                if(players[ii].id == lines[i].id){
                    thisp = players[ii]
                }
            }
            if(!thisp){
                players.push(new Player())
                thisp=players[players.length-1]
            }
            
            
            console.log(lines[i])
            Object.keys(lines[i]).forEach((v)=>{
                thisp[v] = lines[i][v]
            })
            

        }
    },
    connect:async function(){

        clearTimeout(sync.timer)

        let joinData = JSON.parse(await sendPost("/join", {username:sync.username}))
        // console.log(joinData)
        sync.id = joinData.id
        players.push(new Player(this.username, joinData.x, joinData.y))
        players[0].isLead = true

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