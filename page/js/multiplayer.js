
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

    requestUpdate: async function(){ // get information of players
        let res = await sendPost("/state")
        let lines = res.split('\n')// def breaks if playernames have newlines or etc
        // console.log(lines)
        playerdata = []
        balldata = []

        var i = 1;

        for(; i < lines.length; i ++){
            if(lines[i] == "END PLAYERS"){i++;break} // breaks if playernames etc..... :(
            // console.log(lines[i])
            playerdata.push(JSON.parse(lines[i].split("|")[1])) // for sure breaks if playernames are weird
        }

        for(; i < lines.length; i ++){
            if(lines[i] == "END BALLS"){break}
            balldata.push(JSON.parse(lines[i]))
        }

        updated = []

        for(var ii = 0; ii < playerdata.length; ii ++){// for all lines that are not the inital frame counter

            if(playerdata[ii].id == sync.id){// if this line describes the client
                // ignore for now
                continue
            }

            let thisp
            for(var iii = 0; iii < players.length; iii ++){
                if(players[iii].id == playerdata[ii].id){
                    thisp = players[iii]
                }
            }
            
            if(!thisp){
                players.push(new Player())
                thisp=players[players.length-1]
            }
            
            Object.keys(playerdata[ii]).forEach((v)=>{
                thisp[v] = playerdata[ii][v]
            })

            updated.push(playerdata[ii].id)
        }

        // let ii = 0
        let iterate = 0

        let t = 0

        // get rid of players which are not updated
        while(iterate < players.length && t < 100){
            t++
            // console.log(iterate)
            if(players[iterate].id == sync.id){iterate++;continue}
            for(var iiterate = 0; iiterate < updated.length; iiterate ++){
                if(updated[iiterate] == players[iterate].id){iterate++;continue}
            }
            players.splice(iterate, 1)// remove player which was not updated or is self
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