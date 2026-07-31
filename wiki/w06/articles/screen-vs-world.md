# Screen Space vs. World Space

One distinction closes out the concepts: *where does a piece of UI live?*

- **Screen space:** painted on the glass. Fixed to the frame, same place regardless of where the camera looks. The HUD, the menus, the score. A property of the **player's view**.
- **World space:** attached to a thing *in* the scene. The health bar floating over an enemy's head, the "PRESS E" prompt hovering on a door, damage numbers popping off a hit. A property of an **object**.

World-space UI obeys [[w02:scene-graph|Week 2]] like everything else. It's a child in the object's tree ([[w02:standard-prefab|the Standard Prefab]] has a spot for it; a small canvas under the parent does fine), it rides its parent, and it shrinks with distance.

## The test

The choice is a design decision with a clean test:

> **Whose information is this?**

The player's own health is about *you*: glass. The training dummy's health is about *it*: world.

Mixing these up produces real UX damage. Twelve enemy health bars pinned to the glass is a spreadsheet, not a battlefield.

[[a4-spec|Requirement 5]] asks for one sentence of narration on this decision, and that sentence exists to prove the placement was a decision rather than whichever was easier to wire up.

## The famous chore

World-space UI inherits its parent's rotation. So when the dummy turns, its health bar turns edge-on and vanishes.

The fix is **billboarding**: a one-line script that rotates the element to face the camera every frame. [[floating-bar|The practice guide]] includes the line.

Its cousin, making the bar a *constant size* regardless of distance, is a nice-to-have you can skip this week.

*Next: [[cross-engine-dictionary|the Cross-Engine Dictionary]], or straight to [[official-scorer|the practice exercises]].*
