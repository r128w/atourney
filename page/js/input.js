
var input = {
    a:false,
    d:false,
    s:false,
    w:false,
    keydown:(e) => {
        
        let key=e.key.toLowerCase()

        switch(key){
            case "a":input.a=true;break
            case "d":input.d=true;break
            case "s":input.s=true;break
            case "w":input.w=true;break
        }
    },
    keyup: (e) => {
        let key=e.key.toLowerCase()

        switch(key){
            case "a":input.a=false;break
            case "d":input.d=false;break
            case "s":input.s=false;break
            case "w":input.w=false;break
        }
    }
}


window.addEventListener('keydown', input.keydown)
window.addEventListener('keyup', input.keyup)