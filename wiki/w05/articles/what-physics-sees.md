# What the Simulation Sees

When you hand an object to the physics engine, the engine does not take the object as-is. It reasons about a simplified stand-in.

The reason is cost. Testing whether two boxes overlap is a handful of comparisons. Testing whether two 40,000-triangle meshes overlap is a research problem. And the engine answers overlap questions for *every moving pair, fifty times a second*, on the fixed clock ([[w03:two-clocks|Week 3's metronome]], and now you know what marches to it).

So physics runs on simple shapes. The simulation moves those shapes, their transforms update, and your visible objects ride along.

## The two components, and the difference between them

- A **collider** is the stand-in: an invisible geometric proxy (box, sphere, capsule) that defines the object's shape as far as physics is concerned. [[w02:standard-prefab|The Standard Prefab]] put colliders on the parent back in Week 2. This week the simulation starts using them, and Visuals gets to be exactly what it always was: presentation, riding along.
- A **rigid body** is the authority transfer: the component that gives an object mass and velocity and hands its placement to the simulation.

They are independent, and the four combinations are the whole vocabulary:

| | No rigid body | Rigid body |
|---|---|---|
| **No collider** | a pure visual, invisible to physics | falls through the world forever |
| **Collider** | a wall: things bump into it, placement still yours | a crate: authority surrendered, fully simulated |

That top-right cell is a real bug students ship: a rigid body with no collider is an object that has agreed to obey gravity and has nothing to land on.

The bottom-left cell is the useful one you already had without knowing it. Your ground plane has been a collider with no rigid body since Week 1. It was a physics object the entire time; it just never had anything to talk to.

## Why the two-worlds model matters

The simulation is not moving your visible mesh. It is moving a shape, and your mesh is parented to that shape. Two worlds, wired together, and the wire is the transform.

Most of this week's confusing bugs are the two worlds disagreeing: a collider sized differently from the model it stands in for, a scale applied to the wrong node, a visual that drifts from the shape doing the actual colliding. [[w02:standard-prefab|Week 2's rule about keeping the prefab parent at scale (1, 1, 1)]] was a physics rule all along. Now you know why.

Three.js students get the least mysterious version of this: your engine ships no physics, so you will [[other-engines|write the copy loop by hand]], and the wire between the two worlds will be a line of your own code. Everyone else should be slightly jealous.

*Next: [[body-types|Body Types]], the three citizenships every physical object declares.*
