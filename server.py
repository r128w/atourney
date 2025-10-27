import http.server
import socketserver

import random

PORT = 8000
class Handler(http.server.SimpleHTTPRequestHandler):
    # def do_GET(arg):
    #     return http.server.SimpleHTTPRequestHandler.do_GET(arg)
    
    def do_POST(self):
        print("post req, looking for %s" % self.path)
        self.send_response(200, ":)")
        self.end_headers()

        reply_body = "%i" % (random.random()*100)
        self.wfile.write(reply_body.encode('utf-8'))
        return
        # return http.server.SimpleHTTPRequestHandler.do_POST(arg)


httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()