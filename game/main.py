
from game.timer import setInterval
from game.player import Player

class Game:

    framecount = 0

    players = []

    interval = None

    def getState(self): # python methods always take the object itself as first arg??? why
        # self.iterate()
        output = "Frames: %i" % self.framecount
        return output

    def __init__(self):
        self.framecount = 0
        return

    def iterate(self):
        self.framecount += 1
        return

    def _isPresent(self, id):
        for obj in self.players:
            if obj.id == id:
                return True
        return False

    def getPlayer(self, id):
        if not self._isPresent(id):
            return None
        for obj in self.players:
            if obj.id == id:
                return obj

    def addPlayer(self, playerName):
        id = 0
        while self._isPresent(id):
            id+=1
        newPlayer = Player(id, playerName, 100, 100)
        self.players.append(newPlayer)
        print(" ======= ======= ======= CONNECT %i: %s" % (id, playerName))
        return newPlayer

    def updatePlayer(self, id, newState):
        return

    def removePlayer(self, id):
        print(" ======= ======= ======= DISCONNECT %i" % id)
        self.players.pop(int(id))
        return

    def startLoop(self):
        # 30fps
        self.interval = setInterval(self.iterate, 1/30)
        return