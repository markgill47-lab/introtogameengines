# Week 7: Cameras and Game Feel

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** The difference between a tech demo and a game people want to touch. Same mechanic, same code, and one version feels dead while the other feels alive. The difference has a name: juice.

## Learning objectives
- Implement follow and orbit camera rigs, and explain smoothing/damping.
- Add feedback (particles, sound effects, screen shake) tied to game events.
- Explain "game feel" and why the same mechanic feels different with feedback.
- Exercise restraint: feedback that communicates vs. noise.

## Concept material (to be written)
1. **The Camera as a Designed Object:** what the player is allowed to see.
2. **Camera Rigs:** fixed, follow (with damping), orbit, and the lerp/smoothing idea.
3. **Juice:** the case study. One mechanic shown dry, then fully juiced.
4. **Particles:** emitters, lifetime, bursts. Decorative vs. communicative.
5. **Audio Basics:** one-shot SFX vs. loops, hooked to events.
6. Screen shake done politely (trauma-based decay, plus an accessibility note).
7. **Cross-Engine Dictionary:** Cinemachine/ParticleSystem/AudioSource (Unity), Camera3D/GPUParticles/AudioStreamPlayer (Godot), Spring Arm/Niagara (Unreal), lerped camera/three-nebula/HTML5 audio (Three.js).

## Practice guide (to be written)
- Unity walkthrough: follow cam with damping, then a particle burst, sound, and shake on a collision event.
- Standard Prefab callback: juice lands in the Effects and Audio children that have been sitting empty since Week 2. This week they earn their slots.
- Equivalent steps sketched for the other engines.

## Assignment paced this week: A5, Cameras & Game Feel
A moving target followed by a smoothed camera, with at least three distinct pieces of event-driven feedback. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
