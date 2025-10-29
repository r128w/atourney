import http.server
import socketserver
import socket

import random

import json

from game.main import Game

import signal
import sys

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

            data = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
            
            if not gameObject._isPresent(data["id"]):
                self.send_response(401, "Not joined")
                reply_body = "join up cuh"
            else:
                self.send_response(200, "Understood")
                print("player data", data["id"], data["p"])
                gameObject.updatePlayer(data["id"], data["p"])

            self.end_headers()
            
            # print("player %s (%i), x:%i, y:%i" % (data["p"]["name"], data["id"], data["p"]["x"], data["p"]["y"]))

        elif self.path == "/join":
            self.send_response(200, "Understood")
            self.end_headers()

            data = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
            newPlayer = gameObject.addPlayer(data["username"])

            print("join data", json.dumps(data))

            reply_body = "{\"id\":%i,\"x\":%d,\"y\":%d}" % (newPlayer.id, newPlayer.x, newPlayer.y)

        elif self.path == "/leave":
            self.send_response(200, "Understood")
            self.end_headers()

            data = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
            print("leave data", json.dumps(data))

            gameObject.removePlayer(data["id"])

            reply_body = "" # send nothing (since the client is disconnected)

        else:
            self.send_response(501, "Not a valid POST")
            self.end_headers()

        if not reply_body == "":
            self.wfile.write(reply_body.encode('utf-8'))

        return


# this file is always a main method; never import it :)

gameObject = Game()
gameObject.startLoop()


# network ""settings""
PORT = 8000


def get_local_ipv4_address(): # google ai overview
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip_address = s.getsockname()[0]
        s.close()
        return local_ip_address
    except socket.error:
        return "127.0.0.1"



httpd = socketserver.TCPServer(("", PORT), Handler)

host, port = httpd.socket.getsockname()
print("hosting at %s:%s" % (get_local_ipv4_address(), PORT))

signal.signal(signal.SIGINT, signal.default_int_handler)


try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("Closing")
    gameObject.interval.cancel()
    httpd.shutdown()
    sys.exit()