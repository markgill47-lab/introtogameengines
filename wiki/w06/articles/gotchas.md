# Gotchas and Judgment Calls

- **State stored in the display.** The gold count living in the text label, health living on the bar. [[game-state|The save-file test]] sorts every case, so apply it before you record, because I apply it while I grade. This one also has a delayed detonation: Week 13 asks you to serialize your state, and there is nothing to serialize if your state is a string in a UI widget.
- **Game logic in UI scripts.** A health bar that also applies damage. A button handler that edits gold directly instead of asking the state object. [[ballpark|The scoreboard does not decide the score.]] The reference being handy is exactly the temptation this week exists to train you out of.
- **The frozen restart.** Pausing, then restarting, and the new scene inheriting a zero time scale. [[menus-and-flow|Time scale survives a scene reload.]] The practice guide has you spring this on purpose. Springing it in your submission video means you skipped the practice guide.
- **The ghost in the pause.** One object still moving while paused because it never used [[w03:delta-time|delta time]]. The pause menu is a Week 3 audit, and it will audit you on camera. Fix it in the mover, not in the pause.
- **A first-lap-only demo.** The circuit shown once, restart clicked, video ends. [[a4-spec|Requirement 3]]'s second lap is where reset bugs live, which is exactly why it is required.
- **Two copies of one fact.** The HUD caches health in its own field "for convenience" and now there are two healths. They agree until the day they don't, and that day is always a demo day.
- **A world-space element pinned to the glass,** or a screen-space element bolted into the world because it was easier. [[screen-vs-world|Requirement 5's sentence of narration]] exists to prove the placement was a decision.
- **The edge-on health bar.** A world-space bar that vanishes when its object turns, shipped as-is. That demonstrates the problem, not the solution. Billboard it.
