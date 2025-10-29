import time

class Player:

    x = 0
    y = 0
    w = False
    a = False
    s = False
    d = False


    def __init__(self, id, name, x, y,):
        self.id = id
        self.name = name
        self.x = x
        self.y = y
        self.lastUpdate = time.time()
        return

    def iterate(self, dtime):

        speed = 120
        if self.w:
            self.y -= speed*dtime
        if self.s:
            self.y += speed*dtime
        if self.a:
            self.x -= speed*dtime
        if self.d:
            self.x += speed*dtime

        return