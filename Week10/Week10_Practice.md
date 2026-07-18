# Week 10 Practice Guide: The Dial and the Guard

> **How to use this guide:** The hands-on half of Week 10, mirroring the demo game's `W10_States` session: the Week 6 flow soup gets its dial, and the gate guard gets a brain. Read `Week10_Concepts.md` first, and have `A8_Spec.md` open before you record. Bring a pencil; both exercises start on paper, and A8 grades the paper.

---

## What you're building

- **Exercise 1: The Flow Machine.** Week 6's boolean soup refactored to an enum-and-switch FSM.
- **Exercise 2: The Guard.** A four-state patrol brain built with state objects, the pattern proper.
- **Exercise 3: The Handshake.** Your FSM and the animator, talking through parameters.

## Exercise 1: The Flow Machine (30 minutes)

1. **Paper first.** Draw the circles: Menu, Playing, Paused, GameOver. Draw only the arrows you can justify: Menu→Playing (start pressed), Playing⇄Paused (escape), Playing→GameOver (death), GameOver→Menu or →Playing (restart). Note what's *absent*: no Paused→GameOver, no GameOver→Paused. The absences are the design.
2. Open your Week 6 `GameFlow` and perform the refactor (behavior identical after, per Week 9's safety rail): delete `isPaused`, `isGameOver`, `started`; add `enum FlowState { Menu, Playing, Paused, GameOver }` and one field. Route `Update` through a switch on the state. Move each panel-show, panel-hide, and time-scale change into small `EnterX()` transition methods so the ceremony lives in one place per transition.
3. The proof moments for your video: search your file for the deleted booleans (gone, not shadowed); then try to *write* the pause-during-game-over bug (there's nowhere to put it: the Paused case can't be reached from GameOver, structurally); then re-run the Week 6 frozen-restart trap and note it can't happen anymore *if* your EnterPlaying ceremony owns the time scale (if it can still happen, your Exit/Enter ceremony has a hole, and finding it is the exercise).
4. Count lines before and after. The FSM version is usually *shorter*. Say so on camera; people expect architecture to cost lines, and the best patterns refund them.

## Exercise 2: The Guard (45 minutes)

The course's first creature with a brain, built with state objects because his states have real Enter/Exit ceremony.

1. **Paper first.** Patrol → Suspicious (player within `noticeRange`) → Chase (player within `confirmRange`, or suspicious too long while player approaches) → Return (player beyond `loseRange`) → Patrol. Suspicious → Patrol (player left before confirming). Five-ish arrows. No Patrol→Chase directly: he *notices before he hunts*, and that pacing is what makes him readable and beatable.
2. Build a `Guard` Standard Prefab: capsule in Visuals (or a spare Mixamo character), kinematic body, and the machine owner from the concepts doc (`ChangeState`, `current?.Update(this)`), plus fields: waypoints array, ranges, speeds, and a `Transform player` reference (wired in the inspector today; Week 15 replaces this cheat with actual senses, and the narration should call it a cheat).
3. The states, each a small class:
   - **PatrolState:** Enter picks nearest waypoint, sets walk speed. Update moves toward waypoint (dt, of course), advances to next on arrival, watches for `noticeRange`. Exit: nothing. (A state with an empty Exit is fine; the *slot* existing is the point.)
   - **SuspiciousState:** Enter stops movement, starts a timer, maybe recolors the guard's visuals yellow (cheap and readable; real games use an indicator, and so does yours now). Update: player closes to `confirmRange` → Chase; player leaves or timer expires → Patrol. Exit clears the tint.
   - **ChaseState:** Enter sets run speed, tint red. Update pursues the player's position; beyond `loseRange` → Return. Exit clears tint.
   - **ReturnState:** Enter targets nearest waypoint. Update walks there, arrives → Patrol. (And notice: if the player closes in during Return, the notice logic can fire again. Decide on paper whether Return→Suspicious exists, then make the code match the paper. Either answer is defensible; *undrawn behavior* is the only wrong one.)
4. Play the whole loop on camera: approach (yellow), press in (red, pursuit), break away (he gives up, walks back, resumes his route). You can *narrate his mind* from across the scene. That legibility is the pattern, visible.

## Exercise 3: The Handshake (15 minutes)

If your guard wears a Mixamo character: states set animator facts on the way through. `PatrolState.Enter`: `animator.SetFloat("Speed", walkSpeed)`. `ChaseState.Enter`: run speed. `SuspiciousState.Enter`: zero. The graph does the blending exactly as in Week 8, and you now have two state machines cooperating through parameters, which is the concepts doc's "colleagues, not twins" section running live. Point at both machines in your video: the one you drew, and the one in the Animator window, and say which decides behavior and which decides pose.

---

## Other Engines

The pattern is plain code and translates verbatim; only the furniture changes. **Godot:** states as inner classes or a node-per-state (a common idiom: state nodes as children, machine activates one), `_process(delta)` as Update; tint via material override. **Unreal:** enum + switch in Blueprint or C++ works today; note that Unreal's Behavior Trees will replace this brain in Week 15, and building the FSM version first is precisely how you'll understand what BTs are improving on. **Three.js:** state objects as plain JS objects `{ enter, update, exit }` and the machine in ten lines; you have no inspector, so ranges live in a config object, which is a Week 13 preview you're getting early.

---

## Recording your A8 video

A shape that fits 2–5 minutes:

1. **The diagrams (30 sec):** both drawings, held up or screen-shared. Point at an absent arrow and say why it's absent.
2. **The flow machine (60 sec):** the refactor diff (booleans deleted), the impossible bug you can no longer write, the line count. Run the circuit once to prove behavior survived.
3. **The guard (90 sec):** the full behavioral loop on camera with your narration of his mind; then a code tour of one state class, naming Enter/Update/Exit and what lives where, and the `ChangeState` ceremony.
4. **The handshake (30 sec):** both state machines on screen, one sentence on the division of labor.
5. **Wrap (15 sec):** what fought you, what fixed it.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
