# Aura Tourney
WIP competitive bullet hell multiplayer game etc


## How to run
Download the whole repo, ```cd``` to the directory, and run
```bash
python3 server.py
```
The server hosts the game on port 8000, and prints out the IP with which it can be accessed by other devices on the local network on startup. ```localhost:8000``` or ```127.0.0.1:8000``` also work.
Players join by going to the site.

Hosting a game over the wider internet would require port forwarding or something, haven't tried it