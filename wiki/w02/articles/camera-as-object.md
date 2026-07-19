# The Camera Is Just an Object

The camera feels like it should be something special: a viewport, a window, a magical eye. It's not. It's a node in the [[scene-graph|tree]] with a [[transforms|transform]] like everything else, plus a couple of lens properties (field of view, near/far clipping). It can be moved, rotated, and, most usefully, *parented*.

Two consequences to absorb now:

- **Camera placement is a decision, not a default.** Every engine spawns the camera somewhere arbitrary, and a scene shot from the default camera position looks exactly like nobody decided anything. [[a1-spec|Assignment 1]] asks for a deliberately placed camera and a sentence of narration about the choice, because "what does the player see" is the first design question of every scene you will ever build.
- **A parented camera inherits motion.** Park the camera on a moving object (strap it to the cart) and it rides along, filming. That one idea, plus damping, is the whole third-person camera rig, and Week 7 builds it. This week, place the camera by hand and frame the shot on purpose.

*Practice the deliberate shot in [[the-shot|Exercise 4: The Shot]].*
