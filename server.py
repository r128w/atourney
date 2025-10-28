import http.server
import socketserver

import random

from game.main import Game

import signal
import sys

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    
    def do_POST(self):
        # print("post req for %s" % self.path)


        # python 3.9 -> no match case statement :(

        # self.send_header("Access-Control-Allow-Origin", "*")

        reply_body = "nothing"
        
        if self.path == "/rand":
            self.send_response(200, "Served :)")
            self.end_headers()

            reply_body = "%i" % (random.random()*100)
        elif self.path == "/state":
            self.send_response(200, "Served :)")
            self.end_headers()

            reply_body = gameObject.getState()
        elif self.path == "/player":
            self.send_response(200, "Understood")
            self.end_headers()

            data = self.rfile.read(int(self.headers['Content-Length']))
            print(data)
        else:
            self.send_response(501, "Not a valid POST")
            self.end_headers()

        self.wfile.write(reply_body.encode('utf-8'))

        return

gameObject = Game()
gameObject.startLoop()

# this file is always a main method :) never import it
httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)

signal.signal(signal.SIGINT, signal.default_int_handler)


try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("Closing")
    gameObject.interval.cancel()
    httpd.shutdown()
    sys.exit()