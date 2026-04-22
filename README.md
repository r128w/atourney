# Aura Tourney
Multiplayer bullet hell drift sim tag game


## How to run
Download the whole repo, ```cd``` to the directory, and run
```bash
python3 server.py
```
The server hosts the game at the first free port starting at 6767, and prints out the IP with which it can be accessed by other devices on the local network on startup.```localhost:6767``` or ```127.0.0.1:6767``` also work.

Players join by going to the site.

Hosting a game over the wider internet would require port forwarding or something, haven't tried it.