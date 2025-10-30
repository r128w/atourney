
from game.timer import setInterval
from game.player import Player

import time

import json


playerTimeout = 5

class Game:

    framecount = 0

    players = []

    interval = None

    def getState(self): # python methods always take the object itself as first arg??? why
        # self.iterate()
        output = "Frames: %i" % self.framecount

        for obj in self.players:
            newLine = "\n%s | " % obj.name
            newLine += json.dumps(obj.__dict__)
            output += newLine

        return output

    def __init__(self):
        self.framecount = 0
        return

    def iterate(self, dtime):
        self.framecount += 1
        if self.framecount % 100 == 0:
            print("====== ------ ====== Game Frame %i" % self.framecount)
        
        for obj in self.players:
            obj.iterate(dtime)
        
        curTime = time.time()
        i = 0
        while i < len(self.players):
            obj = self.players[i]
            if curTime - obj.lastUpdate > playerTimeout:
                print("%i TIMEOUT ==========" % obj.id)
                try:
                    self.removePlayer(obj.id)
                except:
                    print("Remove error ========")
            else:
                i+=1
        
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

        p = self.getPlayer(id)

        p.lastUpdate = time.time()

        p.x = newState["x"] # only these attributes are copied over
        p.y = newState["y"] # meaning that isLead is not getting sent from one client to another
        p.a = newState["a"]
        p.s = newState["s"]
        p.d = newState["d"]
        p.w = newState["w"]

        return

    def removePlayer(self, id):
        if self._isPresent(id):
            print(" ======= ======= ======= DISCONNECT %i" % id)
            self.players.remove(self.getPlayer(id))
        else:
            print(" ======= Attempted DISCONNECT %i ======= Not present" % id)
        return

    def startLoop(self):
        # 30fps
        fps = 30
        self.interval = setInterval(lambda: self.iterate(1/fps), 1/fps)
        return