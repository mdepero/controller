'''
The MIT License (MIT)

Copyright (c) 2013 Dave P.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
'''

import signal, sys, ssl, logging, threading, math
from SimpleWebSocketServer import WebSocket, SimpleWebSocketServer, SimpleSSLWebSocketServer
from optparse import OptionParser

logging.basicConfig(format='%(asctime)s %(message)s', level=logging.DEBUG)

gameObjects = [];
gameRunning = False;


class GameObject:

   def __init__(self, address):
      self.id = address
      self.x = 50
      self.y = 50
      self.speed = 1
      self.direction = 0
      self.deltaDirection = 0





def gameEngine():
   threading.Timer(0.1, gameEngine).start()
   for go in gameObjects:
      go.x += math.cos(go.direction)*go.speed;
      go.y += math.sin(go.direction)*go.speed;
      print go.id, '- Still ingame object id', '(', go.x, ',', go.y,')'

gameEngine()





class SimpleConnect(WebSocket):


   def handleMessage(self):
      if self.data is None:
         self.data = ''
      # Set Data From Message
      for go in gameObjects:
         if(go.id == self.address[1]):
            go.direction = float(self.data)
      # Send Game State to all connected devices

      

   def broadCast(self, data):
      # Broadcast Function
      for client in self.server.connections.itervalues():
         try:
            client.sendMessage(str(self.address[0]) + ' - ' + str(self.data))
         except Exception as n:
            print n


   def handleConnected(self):
      # Create a new game object for this connection
      x = GameObject(self.address[1])
      gameObjects.append(x)

      print self.address, 'connected'
      for client in self.server.connections.itervalues():
         if client != self:
            try:
               client.sendMessage(str(self.address[0]) + ' - connected')
            except Exception as n:
               print n

   def handleClose(self):
      print self.address, 'closed'

      for go in gameObjects:
         if(go.id == self.address[1]):
            gameObjects.remove(go)

      for go in gameObjects:
         print go.id, '- Still ingame object id'

      for client in self.server.connections.itervalues():
         if client != self:
            try:
               client.sendMessage(str(self.address[0]) + ' - disconnected')
            except Exception as n:
               print n


if __name__ == "__main__":

   parser = OptionParser(usage="usage: %prog [options]", version="%prog 1.0")
   parser.add_option("--host", default='', type='string', action="store", dest="host", help="hostname (localhost)")
   parser.add_option("--port", default=8000, type='int', action="store", dest="port", help="port (8000)")
   parser.add_option("--example", default='echo', type='string', action="store", dest="example", help="echo, chat")
   parser.add_option("--ssl", default=0, type='int', action="store", dest="ssl", help="ssl (1: on, 0: off (default))")
   parser.add_option("--cert", default='./cert.pem', type='string', action="store", dest="cert", help="cert (./cert.pem)")
   parser.add_option("--ver", default=ssl.PROTOCOL_TLSv1, type=int, action="store", dest="ver", help="ssl version")
   
   (options, args) = parser.parse_args()

   cls = SimpleConnect

   if options.ssl == 1:
      server = SimpleSSLWebSocketServer(options.host, options.port, cls, options.cert, options.cert, version=options.ver)
   else:	
      server = SimpleWebSocketServer(options.host, options.port, cls)

   def close_sig_handler(signal, frame):
      server.close()
      sys.exit()

   signal.signal(signal.SIGINT, close_sig_handler)

   server.serveforever()
