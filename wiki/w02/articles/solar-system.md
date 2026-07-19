# The Solar System

> **Supplemental** · deepens [[the-pivot|The Pivot]] and [[local-vs-world|Local vs. World]] · the windmill, celestially scaled

Here is everything this week teaches, running in one sky. The Sun sits still. The Earth orbits the Sun. The Moon orbits the Earth. And the part worth staring at: **nobody is moving any of them.** The only animated numbers in the entire system are two rotations, on two empty objects, sitting at the centers of the Sun and the Earth.

That's the [[the-windmill|windmill fix]] doing planetary work. An empty at the center of the Sun rotates; the Earth is parented to it at (130, 0, 0); the orbit falls out of the hierarchy for free. The Moon's pivot rides the Earth, so the Moon inherits the whole stack: snack rides cart, cart rides plane, [[start-at-35000-feet|plane rides the sky]].

Select things, in the scene or in the hierarchy, and read the inspector like you would in your engine:

{{widget:solarsystem}}

Three things to catch before you move on:

- **Select the Earth and watch the numbers.** Its local position holds at (130, 0, 0), frozen, while its world position sweeps a circle. That's [[local-vs-world|the inspector surprise]] in motion: the inspector shows local, and local is the truth the tree stores.
- **Select a pivot.** Its rotation is the only number changing anywhere in its subtree, and its position never moves. One animated value per orbit. That economy is what a well-arranged [[scene-graph|tree]] buys.
- **The dashed lines are the parent doing the work.** Each line runs from a pivot to the body it controls: influence flowing down the tree, never up. Spin the Moon and the Earth would not care.

This structure is also exactly what [[a1-spec|Assignment 1's Requirement 3]] grades: a child animating in local space around a correct pivot. If your windmill blades can do what this Moon does, you're done.
