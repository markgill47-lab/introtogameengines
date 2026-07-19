# Week 2: Scene Graphs, Transforms, and Coordinate Spaces

> **How to use this module:** Everything you need to complete this week's work is in these articles. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept articles, follow the practice exercises in your engine, and check [[a1-spec|the A1 spec]] before you record.

**Role in the course:** The first universal concept. Everything on screen lives in a tree, and every object's position is relative to its parent. A passenger walking to the lavatory moves relative to the plane; the salty snacks on the cart don't move relative to the cart, and yet they're crossing a continent. That's most of this week.

## Learning objectives

- Explain the [[scene-graph|scene graph]] and parent/child relationships.
- Distinguish [[local-vs-world|local vs. world coordinate spaces]], and convert between them conceptually.
- Compose position, rotation, and scale, and predict what happens when a parent [[transforms|transforms]].
- Place and aim a [[camera-as-object|camera]].

## Where to start

1. [[start-at-35000-feet|Start at 35,000 Feet]]: the plane, the cart, and the pretzels.
2. [[scene-graph|The Scene Graph]] → [[transforms|Transforms]] → [[local-vs-world|Local vs. World]] → [[the-pivot|The Pivot]].
3. [[standard-prefab|The Standard Prefab]]: house style, starting now.
4. The four practice exercises: [[hierarchy-basics|Hierarchy Basics]], [[the-house|The House]], [[the-windmill|The Windmill]], [[the-shot|The Shot]].
5. [[a1-spec|A1: Scenes & Transforms]]: paced this week. The first assignment of the course.
