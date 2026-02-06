class Ball:
    x = 0
    y = 0
    vx = 0
    vy = 0

    def __init_(self, x, y, vx, vy):
        self.x = x
        self.y = y
        self.vx = vx
        self.vy = vy


    def toDict(self):
        return {
            "x": self.x,
            "y": self.y,
            "vx": self.vx,
            "vy": self.vy
        }