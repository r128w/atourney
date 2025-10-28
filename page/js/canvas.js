const canvas = {
    init:function(){
        this.ele = document.getElementById('main-canvas')
        this.ctx = this.ele.getContext('2d')

        this.render()
    },
    clear:function(){
        this.ctx.fillStyle="#111"
        this.ctx.fillRect(0, 0, this.ele.width, this.ele.height)
    },
    render:function(){
        this.ele.width = this.ele.clientWidth
        this.ele.height = this.ele.clientHeight

        this.clear()
    }
}


// all this only called after domcontentloaded, when this script is added to the page
canvas.init()

window.addEventListener('resize', canvas.render)