# The Standard Prefab: House Style, Starting Now

A prefab is a reusable object: build once, stamp copies everywhere, edit the original and every copy updates. Every engine has some version of this (the [[cross-engine-dictionary|dictionary]] has the names), and it's the single biggest lever for not doing the same work forty times.

In this course, every visible thing is a prefab, and every prefab has the same skeleton. This is house style. It's also parenting with a purpose, which is why it's introduced this week and not later:

```
ThingName          <- the parent: logic components and physics colliders
├── Visuals        <- models and materials, scaled to fit within the colliders
├── Effects        <- particle systems, line and trail renderers
└── Audio          <- the object's sound manager
```

**The parent is the truth.** Its collider defines the object's real footprint in the world, and its scale stays at (1, 1, 1), which [[transforms|the scale landmine]] already told you to want. The children are presentation, and children are replaceable: that's the snack-cart property again, working for your production pipeline instead of your physics. Swap the pretzels for peanuts and the cart neither knows nor cares.

## What this buys, concretely

- **Bottom-Up Asset Replacement.** Your house is gray cubes this week. When real art arrives, open the prefab, delete the cubes inside Visuals, drop the model in, scale it to fit the collider, done. No script changes, no scene edits, nothing else even notices. In Week 8 we perform exactly this swap on the demo game's player character, live, and it takes five minutes *because the skeleton was here in Week 2*.
- **The Collaboration Seam.** On a team, the artist owns Visuals, Effects, and Audio; the programmer owns the parent. Same object, no collisions, and the prefab is the contract between them.
- Effects and Audio sit empty for a few weeks. That's fine and intentional: they're reserved parking. Week 7 fills both, and you'll be glad the spots were waiting.

There's a deeper pattern hiding inside this structure. I'm not going to name it yet; Week 9 does, and it's better as a reveal. For now: separate what a thing *is* from how it *looks*, and put the split in the hierarchy where everyone can see it.

*Build your first one in [[the-house|Exercise 2: The House]]. It's graded: [[a1-spec|A1's R4]].*
