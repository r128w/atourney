let username = "Anonymous"

async function sendPost(url, data=null){
    let options = {
        method:"POST"
    }
    if(data){
        options.body = data
        options.headers = {"Content-Type": "application/json"}
    }
    return (await fetch(url, options)).text()
}