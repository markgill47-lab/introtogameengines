# Anatomy of a HUD

The **HUD** (heads-up display) is the part of the picture that isn't the world. Bars, counters, labels, painted on the glass between the player and the scene.

Every engine gives you a 2D layer for this (Unity's Canvas, Godot's Control nodes, Unreal's UMG, the browser's DOM), and the parts list is short:

- **Labels:** text bound to a fact. Gold: 12.
- **Bars:** a shape whose fill length is a fact expressed as a fraction, health as `current / max`. The bar is the oldest and best trick in UI, because humans read lengths faster than numbers.
- **Counters, icons, timers:** the same idea in different clothes.

Every HUD element is a fact, converted to pixels, by a little piece of code whose only job is that conversion.

## How does the HUD learn the facts changed?

This week: **it asks, every frame.**

The HUD's update loop reads `state.health` and sets the bar fill, sixty times a second, whether health changed or not. The scoreboard operator staring at the scorer's book, re-copying the number every second, forever.

Let's name the tradeoff while we make it. Polling works, it's simple, at this scale it costs nothing measurable, and **it should bother you a little.** Sixty reads a second to catch a change that happens twice a minute is a strange arrangement, and it puts a quiet dependency in a place we just spent a whole article keeping clean: the display now has its hand permanently on the state.

We're doing it anyway, because the better arrangement needs a pattern you don't have yet.

Week 11 renovates this exact code, on camera, in both the demo game and your own Assignment 9. Consider this paragraph a receipt: **the polling HUD is scheduled debt, incurred on purpose, with the payoff date printed on it.**

## The rule that is not deferred

**Display code never changes state.** The HUD reads; it does not write.

The moment a health bar script also applies the damage, you've got a scoreboard deciding the score, and by Week 9 that knot is genuinely painful to untie.

Menu buttons look like an exception, since the pause button changes the paused flag. It isn't an exception. The button *requests* the change and `GameState` makes it, through the same legal methods as everyone else. The button never reaches into the data directly.

Hold that thought until Week 12, when requests-as-things becomes a whole pattern with a name.

*Next: [[menus-and-flow|Menus, Flow, and the Pause That Ships]].*
