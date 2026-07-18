# Week 6 Concepts: Interface and Game State

> **How to use this module:** This document is the complete concept material for Week 6. You do not need the lectures to complete A4. Read this, then work through `Week06_Practice.md` in your engine, then check `A4_Spec.md` before you record.

---

## Start at the ballpark

Bottom of the seventh, and the scoreboard in center field goes dark. Total electrical failure. Question: what's the score?

Whatever it was before the lights went out, obviously. Nobody has to replay the inning. Nobody's home run is revoked. The score was never *in* the scoreboard; the score is a fact about the game, kept by the official scorer, and the scoreboard is a large, glowing *display of that fact*. When it dies, the fact survives. When it's fixed, it gets told the fact and resumes glowing. And notice the direction of the relationship: the scorer never once consults the scoreboard to find out what the score is. Information flows from the game to the board, always, and never back.

Every UI bug you will ever write comes from violating some clause of the previous paragraph. Storing the score *in* the scoreboard (state living inside a text label). Letting the scoreboard decide the score (game rules running in button handlers). Having two scoreboards disagree (the HUD says 3 gold, the shop says 5, because each kept its own copy). This week is about building the ballpark correctly: the game keeps its facts, the interface displays them, and the line between those two jobs stays visible in your project structure.

---

## 1. Game state: the data that IS the game

Strip away everything you can see and hear, and what's left of your game is a small pile of data: health is 40 of 100, gold is 12, the third quest is active, the game is paused. That pile is the **game state**, and the discipline this week installs is simple to say: **the state lives in its own object, and nothing else owns a copy.**

Concretely, that means a `GameState` script (the demo game builds exactly this) holding the numbers and the methods that legally change them: `TakeDamage`, `AddGold`, `Die`. Not scattered across the player, the UI, and three enemies. Not stored inside a text label. One place, one owner, one set of rules for changing it.

What belongs in state: anything you'd need to reconstruct the *situation*. Health, gold, score, inventory contents, quest flags, whether the game is paused or over. What doesn't: anything about presentation. The health bar's color, which menu panel is showing, the font size. A useful test that will sound familiar by end of semester: *if you saved the game and loaded it tomorrow, what would need to be in the file?* That's state. Everything else is display. (Week 13 makes this test literal, because what you serialize *is* your state, and students whose state lives in text labels have a very bad Week 13.)

Why the separation earns its keep immediately, not just philosophically:

- **One fact, many displays.** Health appears as a bar, a number, a red vignette when low, and a game-over screen at zero. Four displays, one fact. If each kept its own copy, they'd drift, and "the HUD disagrees with the shop" is a bug players screenshot.
- **Displays are disposable.** You'll restyle your HUD three times this semester. If state lives in its own object, a restyle touches zero game logic, which should sound exactly like swapping Visuals inside a Standard Prefab, because it's the same discipline one level up: the data is the parent, the UI is the costume.
- There's a name for this separation, and a whole architecture built around it. Week 9 pulls that curtain; you're building the evidence now.

---

## 2. Anatomy of a HUD

The **HUD** (heads-up display) is the part of the picture that isn't the world: bars, counters, labels, painted on the glass between the player and the scene. Every engine gives you a 2D layer for this (Unity's Canvas, Godot's Control nodes, Unreal's UMG, the browser's DOM), and the parts list is short:

- **Labels:** text bound to a fact. Gold: 12.
- **Bars:** a shape whose fill length is a fact expressed as a fraction: health as `current / max`. The bar is the oldest and best trick in UI, because humans read lengths faster than numbers.
- **Counters, icons, timers:** the same idea in different clothes. Every HUD element is a fact, converted to pixels, by a little piece of code whose only job is that conversion.

And how does the HUD learn the facts changed? This week: **it asks, every frame.** The HUD's update loop reads `state.health` and sets the bar fill, sixty times a second, whether health changed or not. The scoreboard operator staring at the scorer's book, re-copying the number every second, forever.

Let's name the tradeoff while we make it: polling works, it's simple, at this scale it costs nothing measurable, and *it should bother you a little*. Sixty reads a second to catch a change that happens twice a minute is a strange arrangement, and it puts a quiet dependency in a place we just spent a whole section keeping clean (the display now has its hand permanently on the state). We're doing it anyway, because the better arrangement needs a pattern you don't have yet. Week 11 renovates this exact code, on camera, in both the demo game and your own A9. Consider this paragraph a receipt: *the polling HUD is scheduled debt, incurred on purpose, with the payoff date printed on it.*

One rule that is not deferred to Week 11: **display code never changes state.** The HUD reads; it does not write. The moment a health bar script also applies the damage, you've got a scoreboard deciding the score, and by Week 9 that knot is genuinely painful to untie. (Menu buttons look like an exception: the pause button changes the paused flag. It isn't an exception; the button *requests* the change and `GameState` makes it, through the same legal methods as everyone else. The button never reaches into the data directly. Hold that thought until Week 12, when requests-as-things becomes a whole pattern.)

---

## 3. Menus, flow, and the pause that ships

Every game you have ever played has the same skeleton around its gameplay: a start screen, the playing state, maybe a pause, an end screen, and a way back to the start. That loop (**start → play → end → restart**) is the flow, A4 requires the whole circuit, and there are three mechanisms to know:

**Screens are panels.** The start screen, pause overlay, and game-over screen are just UI containers you show and hide. One canvas, three panels, and a bit of state (which screen are we on?) deciding visibility. Which means the flow is *itself* game state, tracked this week with a couple of booleans (`isPaused`, `isGameOver`) plus some if-statements. That arrangement is going to get uglier every week as states multiply, and I know it, and you'll know it by Week 9, and Week 10 replaces it with the real machinery. Like the polling HUD: scheduled debt, receipt issued.

**Pause is a dividend from Week 3.** Set the engine's time scale to zero and delta time reports zero, so everything you correctly multiplied by dt (movement, spins, physics, timers) stops, for free. *You already built pause in Week 3 without knowing it*; this week you just add the button. Two clauses in the fine print: UI must keep working while time is stopped (engines provide unscaled time for exactly this; menus animate on it), and any movement someone snuck in *without* dt will keep sliding through your paused game like a ghost, at which point the pause menu has caught a Week 3 bug for you. It's a better linter than I am.

**Restart by reloading.** The cheap, correct restart is reloading the scene: everything returns to its authored starting arrangement because the engine rebuilds it from the file. The tempting alternative (walking through the world resetting values by hand) fails the way memory always fails: you'll forget one thing, and the second run of the game will be haunted by the first. Reload the scene; let the file be the memory. One infamous landmine, named now so it can join the practice guide's trap collection: **time scale survives a scene reload.** Pause the game, restart from the pause menu, and the fresh scene arrives frozen solid, because you never set time back to one. Every student ships this bug once. You get to ship it this week, on purpose, where it's cheap.

---

## 4. Screen space vs. world space

One distinction closes out the concepts: *where does a piece of UI live?*

- **Screen space:** painted on the glass. Fixed to the frame, same place regardless of where the camera looks. The HUD, the menus, the score. Property of the *player's view*.
- **World space:** attached to a thing *in* the scene: the health bar floating over an enemy's head, the "PRESS E" prompt hovering on a door, damage numbers popping off a hit. Property of an *object*, and it obeys Week 2 like everything else: it's a child in the object's tree (the Standard Prefab has a spot for it; a small canvas under the parent does fine), it rides its parent, and it shrinks with distance.

The choice is a design decision with a clean test: **whose information is this?** The player's own health is about *you*: glass. The training dummy's health is about *it*: world. Mixing these up produces real UX damage; twelve enemy health bars pinned to the glass is a spreadsheet, not a battlefield.

World-space UI has one famous chore: it inherits its parent's rotation, so when the dummy turns, its health bar turns edge-on and vanishes. The fix is **billboarding**: a one-line script that rotates the element to face the camera every frame. The practice guide includes the line. Its cousin (making the bar a *constant size* regardless of distance) is a nice-to-have you can skip this week.

---

## 5. Cross-Engine Dictionary

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| UI layer | Canvas (uGUI) | Control nodes / CanvasLayer | UMG Widget Blueprints | HTML/CSS overlay (the DOM) |
| Label | Text / TextMeshPro | Label | Text Block | `<div>` |
| Bar | Image, fill amount | TextureProgressBar / ProgressBar | Progress Bar | `<div>` with a width style |
| Show/hide screen | SetActive on a panel | visible property / CanvasLayer | Add/Remove from viewport, visibility | style.display |
| Pause | Time.timeScale = 0 | get_tree().paused (with per-node exemptions) | SetGamePaused | stop advancing your dt |
| Unscaled time | Time.unscaledDeltaTime | process_mode exemptions | time dilation-immune tick | a second, unscaled clock |
| Restart | SceneManager.LoadScene | get_tree().reload_current_scene() | Open Level | re-run your init |
| World-space UI | Canvas in World Space mode | Sprite3D / SubViewport | Widget Component | CSS2DRenderer / sprite |

Housekeeping notes. Unity ships two UI systems (told you in Week 1: churn is the house style); we use **uGUI**, the Canvas-based one, because its bar-filling and world-space stories are simpler for this course. Godot's pause is unusually elegant: the tree pauses and each node declares whether it obeys, which makes "UI keeps running" a checkbox instead of a second clock. Three.js students get the last laugh this week: your UI layer is the DOM, which is the most mature UI toolkit ever shipped, and your pause is just not advancing your own delta time, which by now you understand better than anyone in the room.

---

## Check yourself

1. The scoreboard dies mid-game. In your project's terms: what object survived, what object didn't, and why does the direction of information flow make recovery trivial?
2. Give the save-file test for deciding whether something is state or display, and apply it to: current health, the health bar's red color, the paused flag, which panel is visible.
3. Why does setting time scale to zero pause a well-built game for free, and what kind of object sails straight through the pause?
4. The pause-then-restart freeze: what causes it, and where's the fix?
5. Your enemy's world-space health bar disappears when it turns. Name the problem and the one-line cure.

---

## Going deeper

- **A second angle:** the community compendium [2D Game Development: From Zero To Hero](https://github.com/2DGD-F0TH/2DGD_F0TH) (free, CC BY-NC-SA) covers game state, UI, and flow from an engine-agnostic direction; useful if you want the same ideas in different words.
