import time, threading

#https://stackoverflow.com/questions/2697039/python-equivalent-of-setinterval/48709380#48709380

# use: interval = setInterval(func, interval in seconds)
# interval.cancel()

class setInterval :
    def __init__(self, action, interval) :
        self.interval=interval
        self.action=action
        self.stopEvent=threading.Event()
        thread=threading.Thread(target=self.__setInterval)
        thread.start()

    def __setInterval(self) :
        nextTime=time.time()+self.interval
        while not self.stopEvent.wait(nextTime-time.time()) :
            nextTime+=self.interval
            self.action()

    def cancel(self) :
        self.stopEvent.set()
