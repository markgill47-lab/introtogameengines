# Week 3: The Game Loop, Time, and Input

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** The heartbeat of every game: a loop that reads input, updates the world, and draws a frame, sixty-ish times a second, forever. Every engine hides this loop from you. This week we drag it into the light.

## Learning objectives
- Describe the update/render loop and what happens each frame.
- Write frame-rate-independent movement using delta time.
- Handle input: polling vs. events; keyboard, mouse, and gamepad basics.
- Explain why physics often runs on a fixed timestep.

## Concept material (to be written)
1. **The Loop:** input, update, render, repeat.
2. **Delta Time:** why `position += speed` is a bug and `position += speed * dt` isn't. Your game should not run faster on a gaming rig than on a laptop.
3. Fixed timestep vs. variable timestep, and where physics runs.
4. **Input Models:** polling ("is the key down right now?") vs. events ("the key just went down").
5. **Cross-Engine Dictionary:** Update/FixedUpdate (Unity), _process/_physics_process (Godot), Tick (Unreal), requestAnimationFrame (Three.js).

## Practice guide (to be written)
- Unity walkthrough: movement script with delta time, input polling, and a deliberately broken non-dt version to compare.
- Equivalent steps sketched for the other engines.

## Assignment paced this week: A2, The Loop & Input
An object the player moves with frame-rate-independent motion, plus at least two distinct input responses. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
