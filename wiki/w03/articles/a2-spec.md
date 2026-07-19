# Assignment 2: The Loop & Input

> **Tier:** 3 (C tier) · **Paced:** Week 3 · **Prerequisites for grading:** [[w02:a1-spec|Assignment 1]] passed.

## Goal

Implement frame-rate-independent motion driven by [[the-loop|the game loop]], handle both continuous (state) and discrete (edge) [[input-held-vs-pressed|input]] correctly, and demonstrate on camera that the motion's real-world speed does not depend on framerate.

Everything in a game happens inside the loop, one nudge per frame, and the size of the nudge has to come from measured time or the game's speed becomes a hardware benchmark. This assignment proves you can write motion that tells the truth on every machine, and that you know the difference between "the key is held" and "the key was just pressed," which are different questions with different answers and different bugs.

Any engine. The scene can be your Assignment 1 scene extended (recommended; the demo game does the same) or something fresh. Graded from your narrated video, source as the audit trail.

## Requirements (all must pass)

**Requirement 1: Frame-Rate-Independent Player Motion.** An object the player controls moves continuously using delta-time scaling, with speed expressed in real units (units per second, degrees per second). The video's code walkthrough shows the delta-time expression and the narration states the units of each factor. A modifier that changes the rate while held (sprint, slow-walk, turbo) is included, because two speeds through one honest expression is the cheapest proof you own the concept.

**Requirement 2: One Continuous, One Discrete.** At least **two distinct input responses** with different temporal character: one **continuous** (fires every frame while held: movement, turning, charging) and one **discrete** (fires exactly once per press: jump, toggle, spawn, color change). The code walkthrough shows which input function backs each, and the narration says why they aren't interchangeable.

**Requirement 3: The Framerate Proof.** On camera: the same player motion demonstrated at two meaningfully different framerates (e.g., uncapped vs. capped near 15 fps), covering visibly similar distance per wall-clock second. Choppier is expected; slower is a fail. [[the-proof|The practice guide]] provides the capping technique per engine. Showing a frame-*dependent* [[broken-twin|"broken twin"]] misbehaving under the same test is optional and recommended; it makes the point better than narration can.

**Requirement 4: Time-Driven Motion Without Input.** At least one object moves or rotates continuously on delta time with no player input (a sun, a windmill, a patrolling platform), demonstrating that "per second" is a property of the world, not of the keyboard.

**Requirement 5: Standard Deliverables.** Narrated demo video (2–5 minutes) covering Requirements 1 through 4, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

## Track your build

{{widget:checklist}}

## Common failure modes (read this before you record)

- The dt-on-an-impulse bug: a discrete action (jump force, spawn count) multiplied by delta time. Continuous gets dt; instantaneous does not. Requirement 2's narration is where you prove you know which is which.
- Movement wired to `GetKeyDown` (one nudge per press, sewing-machine walking) or a discrete action wired to `GetKey` (thirty firings per press). The strobe test in [[real-mover|the practice guide]] exists so you catch this yourself.
- The framerate proof attempted with vSync still on, so the cap never engages and both runs look identical. Check [[the-proof|the practice guide's note]] before recording, not after.
- Diagonal speed-boost: unnormalized direction vectors making W+D faster than W. Not an automatic fail on its own, but it will be named, and fixing it is one word.
- Speeds tuned per frame ("0.1 feels right") instead of per second. If your narration can't state the units, Requirement 1 isn't demonstrated.
- Input polled in the fixed update, silently eating keypresses. Input lives in [[two-clocks|the frame update]]. Week 5 covers the physics handoff.

## Pass / Fail

Pass requires all five requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.

*Video structure that works: [[recording-a2|Recording Your Assignment 2 Video]].*
