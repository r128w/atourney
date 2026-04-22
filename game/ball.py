
class Ball:
    x = 0
    y = 0
    vx = 0
    vy = 0
    age = 0

    def __init__(self, x, y, vx, vy, gameObject):
        self.x = x
        self.y = y
        self.vx = vx
        self.vy = vy
        self.gameObject = gameObject
        return

    def toDict(self):
        return {
            "x": self.x,
            "y": self.y,
            "vx": self.vx,
            "vy": self.vy,
        }

    def iterate(self, dtime):
        self.x += self.vx * dtime
        self.y += self.vy * dtime
        self.age += dtime

        if self.x > self.gameObject.width:
            self.vx *= -1
            self.x = self.gameObject.width
        if self.x < 0:
            self.vx *= -1
            self.x = 0
        if self.y > self.gameObject.height:
            self.vy *= -1
            self.y= self.gameObject.wiheightdth
        if self.y < 0:
            self.vy *= -1
            self.y = 0
        return