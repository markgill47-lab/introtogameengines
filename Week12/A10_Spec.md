# Assignment 10: Input as Commands

**Tier:** 2 (B tier)
**Pattern:** Command
**Paced:** Week 12
**Prerequisites for grading:** All Tier 3 assignments (A1 through A7) passed.

---

## Goal

The student will implement an input architecture in which gameplay actions are represented as command objects, decoupling the input device from the actor that performs the actions, and will demonstrate one derived capability (rebinding, replay, or undo) that this architecture makes possible.

## Description

Direct input handling welds the device to the actor: the key is the jump. This assignment breaks that weld. Input will flow through a **Command Layer**: the input system will produce command objects, and the actor will consume them without holding any reference to input APIs. On top of that layer, the student will build exactly one of the **Three Superpowers** defined in the Week 12 materials.

Any engine. Any game or scene, including a scene built just for this assignment or a continuation of your Micro-Game. The checklist below is engine-neutral and graded from your narrated video, with source as the audit trail.

---

## Requirements (all must pass)

**R1: Command Objects Exist.**
Gameplay actions are represented as command objects (class instances, structs, or equivalent in your language) with an execute operation. At least **three distinct actions** flow through commands. Shown in the video's code walkthrough.

**R2: The Actor Is Input-Blind.**
The actor (character, unit, or controllable entity) exposes action methods and contains **no input-reading code**: no key checks, no button references, no input API calls anywhere in the actor. Shown in the video by scrolling the actor's full source on camera.

**R3: The Input Layer Produces, the Actor Consumes.**
An identifiable input layer reads the device and emits command objects; a dispatch point routes them to the actor. The video walkthrough names these pieces and shows the seam between them.

*Note on engine input systems:* Unity's Input System package, Godot's InputMap, and Unreal's Enhanced Input are allowed and encouraged as the device-reading front of your input layer. They do not satisfy R1 through R3 by themselves: an action or a callback is not a command object. The layer that turns actions into command objects and feeds them to the actor is the assignment.

**R4: One Superpower, Demonstrated Live.**
Exactly one of the following, working on camera:

- **Rebinding:** a binding is changed *at runtime* (no restart). Video shows the original binding working, the change happening, the new binding working, and the old key doing nothing.
- **Replay:** a play session is recorded, the scene is reset, and the recorded session replays through the same actor with hands off the input device (narrator states this on camera). Replayed run visibly matches the recorded run.
- **Undo:** at least three distinct actions are performed, then undone in reverse order, each undo visibly restoring the prior state (including any state a command overwrote, such as a previous color).

**R5: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R4, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

Documented from prior semesters and from the ways this assignment wants to go wrong:

- The actor still contains a key check "just for the pause menu." R2 says no input code in the actor. Put it in the input layer.
- Rebinding demonstrated by editing the inspector while paused, or by restarting. R4 says runtime.
- Replay that visibly drifts because the scene wasn't reset to the same starting state, or because unseeded randomness differs between runs.
- Undo of a "recolor"-style command that doesn't restore the previous value, because the command never saved what it overwrote.
- Command classes named after hardware (SpacebarCommand). Name commands after what they do to the game. This one's a warning, not a fail, but you'll hear about it.
- Video shows everything working but never shows the code seam (R2, R3 are code-walkthrough items). If it isn't in the video, it didn't happen.

## Pass / Fail

Pass requires all five requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
