# Exercise 4: The Matrix (10 minutes)

Layers, so your rocks stop assaulting their thrower.

1. Your rocks currently spawn in front of the player and occasionally clip the player's own collider on the way out, which is at best untidy and at worst a self-inflicted physics event. Create two layers: `Player` and `Projectile`. Assign accordingly.

   (The prefab makes assignment a one-time job. [[w02:standard-prefab|Week 2 keeps paying rent]].)

2. Open the physics settings' **collision matrix** and uncheck Player × Projectile.
3. Demonstrate for the camera: stand point-blank against a wall of crates and throw. Rocks ignore you and murder the crates.

One checkbox, zero code. Say that sentence in the video, because it is [[a3-spec|Requirement 5]]'s whole point, and because [[layers-and-masks|the alternative]] is a self-hit check you would maintain in every collision handler for the rest of the project.

## Worth noticing

You just changed physics behavior without writing, compiling, or debugging a line of code.

That is not a trick. It is the engine offering you a configuration surface for a class of problem that would otherwise live in code and rot there. Most of what separates a maintainable project from a barnacled one is recognizing those offers when they appear.

*Next: [[other-engines|Other Engines]] if you are not in Unity, or [[a3-spec|Assignment 3]] if your four exercises are done.*
