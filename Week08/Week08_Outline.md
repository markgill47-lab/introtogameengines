# Week 8: Animation

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** Making things move with intent: keyframes, animation states, and connecting player input to motion.

## Learning objectives
- Explain keyframe animation and interpolation.
- Drive animation from game state (idle, run, jump) using an animation state machine.
- Blend between animations, and explain why snapping looks wrong.
- Animate both characters (rigged/imported) and properties (doors, platforms, UI).

## Concept material (to be written)
1. **Keyframes and Curves:** animation as data over time.
2. **Clips:** imported (characters) vs. authored in-engine (doors, platforms).
3. **The Animation State Machine.** You are about to build your first FSM without knowing it. Week 10 will pull back the curtain, on purpose.
4. Blending and transitions, plus root motion in one paragraph.
5. Where to get animated characters (Mixamo and friends). This is not a modeling class.
6. **The Bottom-Up Swap:** the Standard Prefab pays off. Delete the primitives inside Visuals, drop in the rigged model, scale to the colliders, and nothing else changes: not the scripts, not the physics, not the scenes. The Week 2 promise, kept on camera.
6. **Cross-Engine Dictionary:** Animator/Animation clips (Unity), AnimationPlayer/AnimationTree (Godot), Anim Blueprints (Unreal), AnimationMixer (Three.js).

## Practice guide (to be written)
- Unity walkthrough: import a Mixamo character, build idle/run/jump states, drive them from input.
- Equivalent steps sketched for the other engines.

## Assignment paced this week: A6, Animation
A character or object with at least three animation states driven by input/game events, with smooth transitions. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
