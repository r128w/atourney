
class Game:

    state = 0

    def getState(self): # python methods always take the object itself as first arg??? why
        # TODO
        self.iterate()
        return str(self.state)

    def __init__(self):
        self.state = 0
        return

    def iterate(self):
        self.state += 1
        return

    def startLoop(self):
        # TODO 60fps calling self.iterate()
        return