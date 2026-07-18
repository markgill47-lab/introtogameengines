# Week 6: Interface and Game State

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** The part of the game that isn't the world: HUDs, menus, score, and the start-play-end flow every game has. Also the week we quietly plant the seed of MVC.

## Learning objectives
- Build a HUD that displays live game data (score, health, progress).
- Build menu flow: start screen, gameplay, end screen, restart.
- Explain screen space vs. world space UI.
- Keep game state (the data) distinct from its display (the UI).

## Concept material (to be written)
1. **Game State:** the data that IS the game, separate from whatever draws it.
2. **Anatomy of a HUD:** labels, bars, counters, and updating them. (We'll poll every frame for now. That decision will bother us in Week 11, on purpose.)
3. **Menus and Flow:** scenes/screens, pausing, restarting cleanly.
4. Screen space vs. world space UI: a health bar on the screen vs. one floating over a character's head.
5. **Cross-Engine Dictionary:** uGUI/UI Toolkit (Unity), Control nodes (Godot), UMG (Unreal), HTML/CSS overlay (Three.js).

## Practice guide (to be written)
- Unity walkthrough: canvas, text and bar elements bound to game data, start/end screens, pause.
- Equivalent steps sketched for the other engines.

## Assignment paced this week: A4, Interface & Game State
A working HUD plus a complete start-play-end-restart flow. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
