# Labyrinthe (Maze)

An exploration game: by the light of a lantern, walk through a maze plunged in darkness to find the key, then the exit door. The map draws itself as you go.

*Version française : [README.md](README.md)*

## Controls

- **Arrows** or **ZQSD** (WASD on QWERTY): move; **hold** the key to keep walking.
- **Mouse**: hold the button towards a direction to walk that way.
- **Full screen**: the button of the same name; Escape to leave it. Otherwise the game takes all the room the window leaves.

## Rules

- You start in a corner. The **key** is hidden at the point furthest from the start, and the **door** at the point furthest from the key.
- Pick up the key by walking over it; the door only opens with it.
- The lantern only lights nearby cells. Everything it has already lit **stays on the map**, dimmed, to help you find your way.
- The timer runs from the start.

## Traps

- **Trapdoors** (from level 2): planks in the corridors. They **shake** for half a second, then open for a second; if you are on one, you **fall** and start again from the start (keeping the key). Wait for it to close, or go fast.
- **Gates** (from level 3): a portcullis that **comes down** and closes the corridor for a little under 2 seconds, then goes up. It never closes while you are under it.
- There are more traps as the levels go up; they are never at the start, on the key or on the door. At the exit, the number of falls shows with the time.

## The levels

- Each maze is generated and **always solvable**: a single main path, with a few shortcuts that become more numerous.
- Each level is bigger than the last, up to 13 × 10 corridors.
- A finished maze opens the next level. Each level always keeps the same layout, so you can beat your time record; tick **Random mazes** to get a new one each game.

## Statistics

The Records panel shows the **furthest level** reached, your **time record** on the current level and the number of **mazes finished**.

## Data and sync

Your level, records and settings are stored by NeoDex, backed up and synced between your PCs when sync is on.

## Install

In NeoDex: **NeoStore → Discover → Labyrinthe → Install**.

Building a plugin: see the [NeoDex SDK](https://github.com/NDesumeur/neodex-sdk).
