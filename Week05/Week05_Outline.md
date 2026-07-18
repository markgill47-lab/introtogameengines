# Week 5: Physics and Collision

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** Making objects obey the laws of nature, or usefully disobey them: rigid bodies, collisions, triggers, and forces.

## Learning objectives
- Distinguish kinematic, dynamic, and static bodies.
- Explain collision response vs. trigger (overlap) events, and when to use each.
- Apply forces and impulses, and explain why teleporting a rigid body breaks physics.
- Use collision layers/masks to control who collides with whom.

## Concept material (to be written)
1. The physics engine as a separate simulation the renderer looks at.
2. **Body Types:** static, kinematic, dynamic. Who moves whom.
3. Colliders vs. meshes: primitive colliders and why they're preferred.
4. **Collision vs. Trigger:** bouncing off a wall vs. walking through a checkpoint.
5. Forces, impulses, velocity, gravity, and the fixed timestep connection (Week 3 callback).
6. **Layers and Masks:** the collision matrix.
7. **Cross-Engine Dictionary:** Rigidbody/Collider (Unity), RigidBody/Area (Godot), Primitive Components (Unreal), cannon-es/rapier (Three.js).

## Practice guide (to be written)
- Unity walkthrough: falling objects, a bounce, a trigger zone that fires an event, layers demo.
- Equivalent steps sketched for the other engines.

## Assignment paced this week: A3, Physics & Collision
A scene with physical collision response AND a non-physical trigger event, driven by applied forces. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
