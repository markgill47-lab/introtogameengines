# Gotchas and Judgment Calls

- **The dt-on-an-impulse bug.** Multiplying a one-time action (jump force, damage number, purchase) by [[delta-time|delta time]]. Now your jump height depends on the framerate of the frame you jumped in. Continuous: dt. Instantaneous: no dt. Say it twice.
- **Edge detection in the wrong clock.** `GetKeyDown` polled inside `FixedUpdate` misses presses, because [[two-clocks|the metronome]] doesn't beat every frame. Read input in the frame update. Week 5 shows the clean handoff to physics.
- **Tuning speeds by feel on your machine only.** The whole point of dt is machine independence, but sloppy testing hides violations. [[the-proof|The practice guide]] shows you how to cap your framerate and *prove* your movement is honest, which is also exactly how [[a2-spec|Assignment 2]] asks you to prove it.
- **The magic-number nudge.** `0.1f` per frame felt fine right up until it didn't. Once dt is in the expression, your tuning constants become real units (meters per second, degrees per second) that mean something on every machine, and you can reason about them like an engineer instead of a dowser.
