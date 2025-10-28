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
            self.send_response(200, "Understood")
            self.end_headers()

            data = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
            print("player %s, x:%i, y:%i" % (data["name"], data["x"], data["y"]))

        else:
            self.send_response(501, "Not a valid POST")
            self.end_headers()

        self.wfile.write(reply_body.encode('utf-8'))

        return


# this file is always a main method; never import it :)

gameObject = Game()
gameObject.startLoop()


# network ""settings""
PORT = 8000


def get_local_ipv4_address(): # google ai overview
    try:
        # Create a temporary socket to connect to an external address (Google's DNS server)
        # This connection is not actually established, but it forces the OS to
        # determine the local IP address that would be used for such a connection.
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip_address = s.getsockname()[0]
        s.close()
        return local_ip_address
    except socket.error:
        # Fallback if connection attempt fails (e.g., no network connection)
        return "127.0.0.1"  # Return loopback address as a default

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