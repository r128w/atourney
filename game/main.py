
from game.timer import setInterval

class Game:

    framecount = 0

    players = []

    interval = None

    def getState(self): # python methods always take the object itself as first arg??? why
        # TODO
        self.iterate()
        output = "Frames: %i" % self.framecount
        return output

    def __init__(self):
        self.framecount = 0
        return

    def iterate(self):
        self.framecount += 1
        return

    def addPlayer(self, playerName):
        return

    def updatePlayer(self, playerName, newState):
        return

    def removePlayer(self, playerName):
        return

    def startLoop(self):
        # 30fps
        self.interval = setInterval(self.iterate, 1/30)
        return