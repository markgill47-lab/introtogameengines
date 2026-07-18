# Assignment 4: Interface & Game State

**Tier:** 3 (C tier)
**Paced:** Week 6
**Prerequisites for grading:** A1 through A3 passed.

---

## Goal

The student will separate game state from its display, build a HUD that presents live state, implement the complete start-play-end-restart flow with a working pause, and place at least one piece of UI in world space with a stated reason.

## Description

The score is not in the scoreboard. This assignment proves you can keep the game's facts in one owned place, read them onto the glass without letting the glass grow opinions, and wrap gameplay in the flow skeleton every shipped game has: a start, an end, a pause, and a restart that actually resets. The polling approach to HUD updates is expected and correct this week; Week 11 renovates it, and your narration acknowledging that debt is part of the assignment.

Any engine. Build onto your existing scene (recommended: your Week 5 range makes a fine source of damage and gold) or start fresh. Graded from your narrated video, source as the audit trail.

---

## Requirements (all must pass)

**R1: State Lives Apart.**
An identifiable game-state object owns the facts (at minimum: a depletable resource like health, and an accumulating one like gold or score) and the legal methods that change them. The code walkthrough shows it, and shows what it does *not* contain: no UI references, no text, no panels. Display code reads state and never writes it; the narration states the one-way street.

**R2: A Live HUD.**
At least two screen-space HUD elements bound to state, one of them a **filled bar** expressing a fraction (current over max), both visibly updating during play. A number that never moves on camera is scenery, not a HUD.

**R3: The Full Circuit, Twice.**
Start screen → gameplay → an end state (death or victory) → restart → gameplay again, all on camera. The second lap must demonstrate a genuinely clean reset (resources back at starting values, end-state panel gone). Restart by scene reload is the recommended mechanism; hand-rolled resets are legal but you own every value you forget.

**R4: A Working Pause.**
A pause that visibly freezes the world (moving objects stop; your Week 3 dt discipline is what makes this cheap) while the pause UI remains alive and interactive, and a resume that picks the world back up. If any object sails through your paused game, it's telling you it never met delta time; fix it there, not in the pause.

**R5: One Thing in the World.**
At least one world-space UI element attached to a scene object (a health bar over a dummy, a floating prompt, damage numbers), shown alongside the screen-space HUD, with one sentence of narration on the design test: whose information is this, the player's or the object's? Billboarding is expected if the element can face away from the camera; an edge-on invisible bar demonstrates the problem, not the solution.

**R6: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R5, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

- State stored in the display: the gold count living in the text label, health living on the bar. The save-file test from the concepts doc sorts every case; apply it before you record, because I apply it while I grade.
- Game logic in UI scripts: a health bar that also applies damage, a button handler that edits gold directly instead of asking the state object. The scoreboard does not decide the score.
- The frozen restart: pausing, then restarting, and the new scene inheriting a zero time scale. This is the trap the practice guide has you spring on purpose; springing it in your submission video means you skipped the practice guide.
- A first-lap-only demo: the circuit shown once, restart clicked, video ends. R3's second lap is where reset bugs live, which is exactly why it's required.
- The ghost in the pause: one object still moving while paused because it never used delta time. The pause menu is a Week 3 audit, and it will audit you on camera.
- A world-space element pinned to the glass or a screen-space element bolted into the world because it was easier. R5's sentence of narration exists to prove the placement was a decision.

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
