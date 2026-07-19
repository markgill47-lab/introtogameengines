# Degrees per What?

> **Supplemental** · deepens [[delta-time|Delta Time]] · the Turbo button, playable

Below is a tiny scene: a gold square spinning on its own central pivot, and a red circle orbiting it (the [[w02:solar-system|Solar System]] rig, down to one planet). Two sliders set the two rates, from -20 to 20. Negative numbers are legal, because a rate's sign is just its direction.

The toggle is the whole lesson. **Degrees per second** multiplies each rate by delta time: real units, honest motion. **Degrees per frame** skips the multiplication and nudges by the raw number every trip through [[the-loop|the loop]]: the [[broken-twin|Broken Twin's]] sin, in rotational costume.

{{widget:ratelab}}

Three things to catch:

- **Same slider, different meanings.** At 10 °/s the square takes 36 seconds per lap: stately. Flip to 10 °/frame and it becomes a blur, because your machine delivers sixty-ish frames a second and each one now carries a full ten degrees. Per-frame numbers look small and behave huge, which is exactly how the bug sneaks past the vibe check.
- **Watch the fps readout while in per-frame mode.** Whatever that number is, it's now a hidden multiplier in your motion. On a 120 Hz display this scene literally runs twice as fast as on a 60 Hz one, with identical code and identical sliders. That's the [[delta-time|Turbo button]] problem, live, and no narration can make the point as well as flipping the toggle does.
- **Per-second mode doesn't care.** Framerate can wobble all it likes; the angles advance by rate times measured seconds, and a lap takes the same wall-clock time everywhere. That's the property [[a2-spec|Assignment 2's Requirement 3]] asks you to prove on camera, and [[the-proof|Exercise 4]] shows you how.

One production note, because this page practices what Week 1 preached: the scene renders in [[w01:threejs|Three.js]], the course's browser engine, loaded from a copy that lives beside this wiki. If it ever fails to load, the page quietly falls back to a flat 2D drawing of the same scene, which is itself a Week 1 lesson: [[w01:renderer|degrade gracefully]].
