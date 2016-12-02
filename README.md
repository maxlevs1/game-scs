# game-scs
Game saves control system. Automatily commitimg new changes and restor if it deleted.

# Dependecys

# How to work
Gaze watch file changes on saves directory and return type of it.
Depend on change type Gulp use either git.add and git.commit for save current game process or git.reset (HEAD --hard) for restore the last saving game process.
