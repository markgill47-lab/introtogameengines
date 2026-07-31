# Game State: The Data That Is the Game

Strip away everything you can see and hear, and what's left of your game is a small pile of data. Health is 40 of 100. Gold is 12. The third quest is active. The game is paused.

That pile is the **game state**, and the discipline this week installs is simple to say:

**The state lives in its own object, and nothing else owns a copy.**

Concretely: a `GameState` script holding the numbers and the methods that legally change them. `TakeDamage`, `AddGold`, `Die`. Not scattered across the player, the UI, and three enemies. Not stored inside a text label. One place, one owner, one set of rules for changing it.

## The save-file test

What belongs in state is anything you'd need to reconstruct the *situation*: health, gold, score, inventory contents, quest flags, whether the game is paused or over.

What doesn't is anything about presentation: the health bar's color, which menu panel is showing, the font size.

Here's the test, and it will sound familiar by the end of the semester:

> **If you saved the game and loaded it tomorrow, what would need to be in the file?**

That's state. Everything else is display.

Week 13 makes this test literal, because what you serialize *is* your state. Students whose state lives in text labels have a very bad Week 13. I have watched it happen. The fix at that point is not a refactor, it's an archaeology dig.

## Why the separation earns its keep immediately

Not philosophically. This week.

- **One fact, many displays.** Health appears as a bar, a number, a red vignette when low, and a game-over screen at zero. Four displays, one fact. If each kept its own copy, they would drift, and "the HUD disagrees with the shop" is a bug players screenshot.
- **Displays are disposable.** You will restyle your HUD three times this semester. If state lives in its own object, a restyle touches zero game logic. That should sound exactly like swapping Visuals inside a [[w02:standard-prefab|Standard Prefab]], because it is the same discipline one level up: the data is the parent, the UI is the costume.

There's a name for this separation, and a whole architecture built around it. Week 9 pulls that curtain. You're building the evidence now.

*Next: [[hud-anatomy|Anatomy of a HUD]], which is the other half of the ballpark.*
