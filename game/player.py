import time

import math

class Player:

    x = 0
    y = 0
    w = False
    a = False
    s = False
    d = False
    r = 0
    vx = 0
    vy = 0


    def __init__(self, id, name, x, y,):
        self.id = id
        self.name = name
        self.x = x
        self.y = y
        self.lastUpdate = time.time()
        return

    def iterate(self, dtime):

        # speed = 120
        # if self.w:
        #     self.y -= speed*dtime
        # if self.s:
        #     self.y += speed*dtime
        # if self.a:
        #     self.x -= speed*dtime
        # if self.d:
        #     self.x += speed*dtime

        dx = math.cos(self.r)
        dy = math.sin(self.r)

        forward = dx * self.vx + dy * self.vy
        lateral = dx * self.vy - dy * self.vx

        forward *= 0.99
        # if abs(forward) < 3 and abs(lateral) < 1:
        #     lateral *= math.exp(0.08 * abs(lateral)) - 0.33

        lateral *= (0.98 - 0.5 * math.exp(-0.05 * abs(lateral)))

        speed = 3
        turnspeed = 0.03 * forward

        if self.a:
            self.r -= turnspeed * dtime
        if self.d:
            self.r += turnspeed * dtime

        if self.w:
            forward += speed
        if self.s:
            forward -= speed * 0.5
            if forward > 0:
                forward *= 0.93

        self.vx = dx * forward - dy * lateral
        self.vy = dy * forward + dx * lateral

        self.x += self.vx * dtime
        self.y += self.vy * dtime

        return

    def toDict(self):
        return {
            "x": self.x,
            "y": self.y,
            "w": self.w,
            "a": self.a,
            "s": self.s,
            "d": self.d,
            "r": self.r,
            "vx": self.vx,
            "vy": self.vy,
            "id": self.id
        }

    def __str__(self):
        return f"id:{self.id}, x:{self.x}, y:{self.y}"