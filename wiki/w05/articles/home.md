# Week 5: Physics, Collision, and Authority

> **How to use this module:** Everything you need to complete this week's work is in these articles. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept articles, follow the practice exercises in your engine, and check [[a3-spec|the Assignment 3 spec]] before you record. Also: [[w03:two-clocks|Week 3 promised you a fixed clock]] and never told you what marches to it. This module is the answer.

**Role in the course:** Every object in your scene answers one question, whether you have asked it or not: who has authority over where this thing is? Your code, explicitly, every frame? Or the simulation? Until now the answer has always been "your code." This week you learn to let go on purpose, and to know which arrangement each object deserves.

## Learning objectives

- Name the authority arrangement behind any object in a scene: [[bowling-alley|Start at the Bowling Alley]].
- Distinguish colliders from rigid bodies and explain what the simulation actually reasons about: [[what-physics-sees|What the Simulation Sees]].
- Assign static, kinematic, and dynamic citizenships correctly: [[body-types|Body Types]].
- Move dynamic bodies through [[forces-and-impulses|forces and impulses]], never through their transforms.
- Distinguish a wall from a tripwire: [[collision-vs-trigger|Collision vs. Trigger]].
- Control which categories of object interact at all: [[layers-and-masks|Layers and Masks]].

## Where to start

1. [[bowling-alley|Start at the Bowling Alley]]: the metaphor that carries the whole week.
2. [[what-physics-sees|What the Simulation Sees]] → [[body-types|Body Types]] → [[choosing-colliders|Choosing Colliders]] → [[collision-vs-trigger|Collision vs. Trigger]] → [[forces-and-impulses|Forces and Impulses]] → [[layers-and-masks|Layers and Masks]].
3. The four practice exercises, which cover the assignment checklist almost one-for-one: [[gravity-on|Gravity On]], [[the-throw|The Throw]], [[silent-gate|The Silent Gate]], [[the-matrix|The Matrix]].
4. [[a3-spec|Assignment 3: Physics & Collision]]: paced this week. Requires [[w03:a2-spec|Assignment 2]] passed before grading.

*One promise about this week's most famous bug: [[silent-gate|the practice guide walks you into it deliberately]]. You will hit it eventually in some project, and I would rather you hit it in the week where it is the lesson.*
