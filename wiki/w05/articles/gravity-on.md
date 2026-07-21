# Exercise 1: Gravity On (10 minutes)

Body types, demonstrated by a tower of crates.

Build in your valley scene or start fresh. A ground plane, [[w03:real-mover|your player mover from Week 3]], and some open space is all this needs.

1. Confirm your ground is **static**: collider, no Rigidbody. It was all along. Now it is a decision you can name.
2. Build a crate as a [[w02:standard-prefab|Standard Prefab]]: `Crate` parent with a Box Collider, cube in Visuals, empty Effects/Audio. Add a **Rigidbody** to the parent. Press play: it falls. That component is the crate's citizenship papers.
3. Stack five crates into a tower. Play. They settle with a tiny shuffle (the simulation negotiating rest), and if you stacked them sloppy, they topple. You now have physical comedy for free, and [[a3-spec|Assignment 3's Requirement 1]] on tape.

## Two experiments while you are here

Thirty seconds each, and both are worth more than the reading.

- Crank one crate's **mass** to 50 and watch the tower treat it differently. Mass is not a number in an inspector; it is the reason the tower behaves.
- Toggle one crate to **kinematic** mid-stack. It becomes [[body-types|the hand of god]]: nothing moves it, and it holds the tower up like Atlas. That is your Requirement 1 kinematic demonstration if you keep it, and it is more interesting on camera than a moving platform because the *refusal to be pushed* is the visible part.

*Next: [[the-throw|Exercise 2: The Throw]].*
