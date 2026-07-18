# Week 3 Concepts: The Game Loop, Time, and Input

> **How to use this module:** This document is the complete concept material for Week 3. You do not need the lectures to complete A2. Read this, then work through `Week03_Practice.md` in your engine, then check `A2_Spec.md` before you record. Also: last week you copied `Time.deltaTime` into the windmill script on faith. This module is where the faith gets replaced.

---

## Start in a stop-motion studio

Picture how a stop-motion film gets made. The set is frozen. An animator walks in, nudges every character a tiny bit (an arm here, a foot there), steps out, and a camera takes one photo. Then they do it again. And again. Twenty-four photos per second of finished film, each one a frozen world nudged slightly forward from the last. Play the photos fast enough and the nudges disappear into motion.

Your game is a stop-motion studio that runs itself. Sixty-ish times a second, the engine freezes the world, lets your scripts walk in and nudge whatever they own, then photographs the result and throws it at the screen. That photo is a **frame**. The nudge session is an **update**. And the whole arrangement (check what the player did, let every script nudge, take the photo, repeat forever) is the **game loop**, the first of Week 1's three promises and the one that makes the other two matter.

The reason this metaphor is worth keeping in your head: nothing in your game ever actually *moves*. There's no motion, anywhere. There are only positions that differ slightly between photos, and your scripts are the animators deciding how big each nudge is. This week is about two questions every animator on that set has to answer: *how big should my nudge be?* (that's time) and *what did the player just do?* (that's input).

---

## 1. The Loop

Strip any engine to its skeleton and you find the same four beats, repeating until the program dies:

1. **Read input.** What are the devices saying right now?
2. **Update.** Every script gets its nudge: move things, decide things, react to input.
3. **Render.** Photograph the scene from the camera and present it.
4. **Repeat.** Immediately. Forever.

In Three.js you write this loop yourself with `requestAnimationFrame`, which is why I keep saying Three.js students will understand this week in their bones. In Unity, Godot, and Unreal, the loop is hidden inside the engine, and what you get is a *callback*: a function of yours the loop promises to call once per frame. Unity's is `Update()`. Godot's is `_process(delta)`. Unreal's is `Tick(DeltaTime)`. Different names, same contract: "I will call this every frame; do your nudging inside."

One consequence of the contract deserves its own sentence: **your `Update` must finish fast.** The loop can't take the next photo until every script's nudge is done, so a script that dawdles (loads a file, loops a million times, waits for a network) doesn't slow itself down; it slows the *entire universe* down. Frames-per-second is just how many trips through this loop your machine completes per second, and every script in the scene is standing between one photo and the next.

---

## 2. Delta Time: how big is a nudge?

Here's the bug you're going to write this week (everyone does; the practice guide has you write it on purpose):

```csharp
void Update()
{
    transform.Translate(Vector3.forward * 0.1f);   // move forward a bit each frame
}
```

Looks fine. Runs fine, on your machine. The object moves 0.1 units *per frame*. And that's the bug, because a frame is not a unit of time. A gaming rig pushing 240 fps takes 240 nudges a second and the object screams ahead at 24 units per second. A laptop grinding at 30 fps manages 3 units per second on identical code. Your game's actual speed is now a hardware benchmark.

This is not a hypothetical. Old PCs shipped with a physical **Turbo button** whose real purpose was to *slow the machine down*, because a generation of games nudged per frame, and on newer, faster hardware they became unplayable. An entire industry put a "make my expensive computer worse" button on the front of the case rather than fix this bug. You get to just fix the bug.

The fix is the road-trip question. If you're driving 60 miles per hour, how far did you go? No idea, until I tell you *how long you drove*. Distance is speed times time, and a frame is just a very short drive of slightly unpredictable length. The engine measures each frame's duration and hands it to you: **delta time**, the seconds (usually a small fraction of one) since the last photo.

```csharp
void Update()
{
    transform.Translate(Vector3.forward * 6f * Time.deltaTime);   // 6 units per SECOND
}
```

Read the units out loud: 6 units per second, times deltaTime seconds, equals a distance. The 240 fps machine takes 240 tiny nudges; the 30 fps machine takes 30 bigger ones; after one second of wall-clock time, both objects are exactly 6 units along. Same game, every machine. That's **frame-rate independence**, it's what A2 grades first, and the rule compresses to one line: **anything continuous gets multiplied by delta time.** Movement, rotation, timers, fading, filling: if it happens *over time*, dt is in the expression. (The windmill from last week now makes complete sense: 45 degrees per second, times seconds. Faith replaced, as promised.)

The equally important flip side: anything *instantaneous* does not. A jump impulse, a purchase, a door unlocking: those happen once, not per-second, and multiplying them by dt turns a jump into a twitch. Knowing which of the two you're writing is most of this week's skill.

---

## 3. Two clocks: the variable frame and the fixed step

So far, one loop, variable-length frames. But there's a second clock ticking in your engine, and it beats like a metronome.

Rendering *wants* to run as fast as possible: more photos, smoother motion. Physics wants the opposite: identical, predictable time slices, every single step, because simulation math accumulates error when the step size jitters, and enough jitter means objects tunneling through walls and stacks of crates exploding for no reason. Engines resolve the argument by running **two update streams**:

- **The frame update** (`Update`, `_process`, `Tick`): once per rendered frame, variable length, dt provided. Your input reading, your gameplay logic, your visuals.
- **The fixed update** (`FixedUpdate`, `_physics_process`, physics sub-stepping): a steady metronome (Unity defaults to 50 beats per second) that the physics engine marches to, regardless of framerate. On fast machines it runs less often than rendering; on slow machines the engine runs it multiple times between photos to keep the metronome truthful.

Week 5 is when you start writing physics code and this split starts costing you real decisions (forces in FixedUpdate, input in Update, and the classic bug where a keypress read in FixedUpdate gets missed between beats). This week you just need the map: **two callbacks, two clocks, and "which clock does this belong to?" is a question you'll ask for the rest of the course.**

One more inhabitant of this section, met briefly now and properly in Week 6: the engine's clock has a throttle. Unity calls it `Time.timeScale`. Set it to 0 and delta time reports zero: everything multiplied by dt freezes, which is to say, *the game pauses itself* as a side effect of you having written frame-rate-independent code all along. Set it to 0.5 and you've built slow motion. Good discipline this week buys superpowers later; it's a theme around here.

---

## 4. Input: polling vs. events, held vs. pressed

The other thing the loop does every frame is ask the devices what's happening. Two philosophies exist, and you met their names in the outline:

- **Polling:** your code asks, every frame. "Is W down *right now*?" Simple, visible, and perfect for continuous controls like movement, because you re-ask every nudge anyway.
- **Events:** the system tells you when something changes. "W just went down." No asking, no per-frame cost; the natural fit for discrete actions, UI, and everything Week 11 and 12 will build.

This week we poll, because polling keeps the whole mechanism on one visible line. But inside polling hides the distinction that causes more Week 3 bugs than everything else combined, and it's three functions that look like siblings and behave like strangers:

- `Input.GetKey(KeyCode.W)`: true *every frame the key is held*. This is a **state**. Use it for movement.
- `Input.GetKeyDown(KeyCode.Space)`: true *only on the single frame the key went down*. This is an **edge**, a moment. Use it for jumps, toggles, purchases.
- `Input.GetKeyUp(KeyCode.Space)`: the other edge: the frame of release. Use it for charge-and-release mechanics.

Hold Space for half a second at 60 fps: `GetKey` was true about thirty times, `GetKeyDown` exactly once, `GetKeyUp` exactly once. Wire a purchase to `GetKey` and one press buys thirty swords. Wire movement to `GetKeyDown` and your character moves one nudge per press, like a sewing machine. A2 requires one continuous input and one discrete input precisely so you have to feel this difference in your own hands.

(Housekeeping note, consistent with what we did in Week 2: this is Unity's legacy input API, used because it makes every mechanism visible in one line. The modernized input systems every engine now ships are a Week 12 story, and it's a good one, but it's built on top of exactly these ideas.)

---

## 5. Cross-Engine Dictionary

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| Frame update | `Update()` | `_process(delta)` | `Tick(DeltaSeconds)` | your `requestAnimationFrame` loop |
| Fixed update | `FixedUpdate()` | `_physics_process(delta)` | physics sub-stepping | you call your physics lib at a fixed step |
| Delta time | `Time.deltaTime` | the `delta` argument | the `DeltaSeconds` argument | `THREE.Clock.getDelta()` |
| Held key (state) | `Input.GetKey` | `Input.is_action_pressed` | `IsInputKeyDown` | track via `keydown`/`keyup` listeners |
| Pressed (edge) | `Input.GetKeyDown` | `Input.is_action_just_pressed` | key event / Enhanced Input Triggered | the `keydown` event itself |
| Time throttle | `Time.timeScale` | `Engine.time_scale` | global time dilation | scale your own dt |

Two footnotes worth their ink. Godot hands you `delta` as a function argument instead of a global, which is arguably the better design: you can't forget it exists when it's sitting in your parameter list. And Three.js students: the browser gives you the loop but not the stopwatch, so `THREE.Clock` is your first stop; the `keydown` event's auto-repeat behavior is your first trap (hold a key and the browser fires repeats; track key state yourself in a little object, and you've just hand-built polling, which is illuminating).

---

## 6. Gotchas and judgment calls

- **The dt-on-an-impulse bug.** Multiplying a one-time action (jump force, damage number, purchase) by delta time. Now your jump height depends on the framerate of the frame you jumped in. Continuous: dt. Instantaneous: no dt. Say it twice.
- **Edge detection in the wrong clock.** `GetKeyDown` polled inside `FixedUpdate` misses presses, because the metronome doesn't beat every frame. Read input in the frame update. Week 5 shows the clean handoff to physics.
- **Tuning speeds by feel on your machine only.** The whole point of dt is machine independence, but sloppy testing hides violations. The practice guide shows you how to cap your framerate and *prove* your movement is honest, which is also exactly how A2 asks you to prove it.
- **The magic-number nudge.** `0.1f` per frame felt fine right up until it didn't. Once dt is in the expression, your tuning constants become real units (meters per second, degrees per second) that mean something on every machine, and you can reason about them like an engineer instead of a dowser.

---

## Check yourself

1. In the stop-motion studio, what are the frame, the update, and delta time?
2. Why did the Turbo button exist, and what one-line code change makes it unnecessary?
3. A jump wired to `GetKey` and a walk wired to `GetKeyDown`: describe how each misbehaves and why.
4. Which clock does physics march to, and why does it refuse to march to the other one?
5. Your movement code is `transform.Translate(Vector3.forward * 6f * Time.deltaTime)`. What are the units of each factor, and what changes on a machine three times faster?

---

## Going deeper

- **Nystrom, [Game Loop](https://gameprogrammingpatterns.com/game-loop.html) and [Update Method](https://gameprogrammingpatterns.com/update-method.html):** this module's material from the course's favorite free book, with the engine-internals view of what your callbacks hang from.
- **Fiedler, [Fix Your Timestep!](https://gafferongames.com/post/fix_your_timestep/):** the classic article behind the two-clocks section, by the person who made the argument famous. Short, and it goes one level deeper than we did (interpolation between fixed steps).
