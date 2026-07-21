# Choosing Colliders

The menu of collider shapes, in order of preference. The order is the lesson.

## Primitives: box, sphere, capsule

Fast, robust, and right more often than feels plausible.

A house is a box. A rock is a sphere that renders as a rock. Nobody playing your game will ever know, because **nobody plays the collider**. They play the thing they see, and what they see is the visual riding on top.

Students resist this. It feels like cheating, or laziness, or a placeholder you are supposed to replace later. It is none of those. It is the correct answer that also happens to be the cheap one, which is rare enough that you should take it when it appears.

## Compound colliders

Several primitives on one object, approximating a complex shape. A box body plus a box roof is a house with a real roofline, and it is still cheap.

[[w02:standard-prefab|The Standard Prefab]] handles this gracefully: primitives on the parent (or a `Colliders` child if there are many), costume in Visuals. The arrangement you built in Week 2 for tidiness turns out to be the arrangement physics wanted.

## Mesh colliders

The actual model's geometry as its collision shape.

Expensive, restrictive on dynamic bodies (engines mostly refuse, or demand a convex simplification), and usually the answer to a question nobody asked. Terrain and one-off complex statics are the legitimate uses. Reaching for one on a crate is a smell.

## The capsule, specifically

The capsule is the industry's whole answer to characters.

A pill shape has no edges to catch on stairs and door frames. That is the entire reason. Every character controller in every engine is secretly a capsule wearing a person costume, and the reason your character does not snag on a step is that there is no corner there to snag.

When your Mixamo character arrives in Week 8, its collider will be a capsule, and now you know why rather than just noticing that it works.

## The sizing trap

Size the **collider**, not the prefab parent.

Scaling the parent to make the collision shape bigger shears the physics world away from the visual one, and produces bugs that look like the engine is lying to you. [[w02:standard-prefab|Week 2's (1, 1, 1) rule]] was a physics rule. This is where it collects.

*Next: [[collision-vs-trigger|Collision vs. Trigger]], the difference between a wall and a checkpoint.*
