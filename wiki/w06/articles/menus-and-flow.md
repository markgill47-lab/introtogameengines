# Menus, Flow, and the Pause That Ships

Every game you have ever played has the same skeleton around its gameplay: a start screen, the playing state, maybe a pause, an end screen, and a way back to the start.

That loop (**start → play → end → restart**) is the flow. [[a4-spec|Assignment 4]] requires the whole circuit, and there are three mechanisms to know.

*Everything in this article is playable in [[frozen-clock|The Frozen Clock]]: the time scale, the ghost mover, and the restart trap.*

## Screens are panels

The start screen, pause overlay, and game-over screen are just UI containers you show and hide. One canvas, three panels, and a bit of state (which screen are we on?) deciding visibility.

Which means the flow is *itself* game state, tracked this week with a couple of booleans (`isPaused`, `isGameOver`) plus some if-statements.

That arrangement is going to get uglier every week as states multiply. I know it, and you'll know it by Week 9, and Week 10 replaces it with the real machinery. Like the [[hud-anatomy|polling HUD]]: scheduled debt, receipt issued.

## Pause is a dividend from Week 3

Set the engine's time scale to zero and delta time reports zero, so everything you correctly multiplied by dt (movement, spins, physics) stops, for free.

**You already built pause in Week 3 without knowing it.** This week you just add the button.

Two clauses in the fine print:

- UI must keep working while time is stopped. Engines provide unscaled time for exactly this, and menus animate on it.
- Any movement someone snuck in *without* [[w03:delta-time|delta time]] will keep sliding through your paused game like a ghost. At which point the pause menu has caught a Week 3 bug for you. It's a better linter than I am.

[[frozen-clock|The Frozen Clock]] has a toggle for that ghost. Turn it on, then pause, and watch the pink dot keep going.

## Restart by reloading

The cheap, correct restart is reloading the scene. Everything returns to its authored starting arrangement because the engine rebuilds it from the file.

The tempting alternative, walking through the world resetting values by hand, fails the way memory always fails: you'll forget one thing, and the second run of the game will be haunted by the first.

Reload the scene. Let the file be the memory.

One infamous landmine, named now so it can join the practice guide's trap collection: **time scale survives a scene reload.** Pause the game, restart from the pause menu, and the fresh scene arrives frozen solid, because you never set time back to one.

Every student ships this bug once. You get to ship it this week, on purpose, where it's cheap. [[frozen-clock|The Frozen Clock]] will let you ship it right now, actually: pause it, then press Restart.

*Next: [[screen-vs-world|Screen Space vs. World Space]].*
