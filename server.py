import http.server
import socketserver

import random

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    
    def do_POST(self):
        # print("post req for %s" % self.path)


        # python 3.9 -> no match case statement :(

        reply_body = "nothing"
        
        if self.path == "/rand":
            self.send_response(200, "Served :)")
            self.end_headers()

            reply_body = "%i" % (random.random()*100)
        elif self.path == "/state":
            self.send_response(200, "Served :)")
            self.end_headers()

            reply_body = "state"
        else:
            self.send_response(501, "Not a valid POST")
            self.end_headers()

        self.wfile.write(reply_body.encode('utf-8'))

        return


httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()