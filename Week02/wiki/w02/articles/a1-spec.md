# Assignment 1: Scenes & Transforms

> **Tier:** 3 (C tier) · **Paced:** Week 2 · **Prerequisites for grading:** none. This is the front door.

## Goal

Construct a scene that demonstrates command of the [[scene-graph|scene graph]]: parent/child hierarchies, [[local-vs-world|local versus world]] coordinate spaces, parented motion, reusable [[standard-prefab|prefab structure]], and deliberate [[camera-as-object|camera placement]].

Everything in this course lives in a tree, and this assignment proves you can build one on purpose. Any engine. Primitives are expected; art is irrelevant; gray is a color. The checklist below is graded from your narrated video, with source as the audit trail.

## Requirements (all must pass)

**R1: A Real Hierarchy.** The scene contains at least one compound object built from **four or more primitives** arranged in a parent/child tree at least **three levels deep** (parent → child → grandchild counts as three). Moving the top-level parent visibly moves the entire assembly. Shown in the video by moving the parent, live.

**R2: Local vs. World, Demonstrated.** The video shows one object whose local coordinates stay fixed while its world position changes (a child of a moving or rotating parent, inspector visible), with narration stating which numbers we're looking at and why they aren't changing. One sentence of correct explanation is the bar.

**R3: Parented Motion.** At least one child animates in its own local space while riding a parent (a spinning blade assembly on a windmill, wheels on a cart, a radar dish on a tower: anything structurally equivalent). The motion must rotate or move around a *correct* [[the-pivot|pivot]]. Flailing counts as a fail, and yes, I can tell.

**R4: The Standard Prefab.** At least one compound object is saved as a reusable prefab (or your engine's equivalent) following the house structure: a logic-and-collider parent at scale (1, 1, 1), with a Visuals child containing all geometry, and Effects/Audio children present even if empty. The video shows at least **two instances** of the prefab in the scene, then an edit made inside the prefab's Visuals propagating to all instances.

**R5: The Deliberate Camera.** The camera is placed to frame the scene intentionally, and the narration includes at least one sentence of *why*: what the shot is showing and what decision drove the placement. "It's where the camera ended up" is not a decision.

**R6: Standard Deliverables.** Narrated demo video (2–5 minutes) covering R1 through R5, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

## Track your build

{{widget:checklist}}

## Common failure modes (read this before you record)

- A flat scene: fifteen objects, all siblings at the root. That's a list wearing a tree costume. R1 wants depth.
- The pivot flail: a "spinning" child orbiting a distant point because it rotates around its own misplaced origin. The empty-parent fix is in [[the-windmill|the practice guide]], step by step.
- Non-uniform scale on a logic parent, shearing every rotating child inside it. Scale lives in Visuals; parents stay (1, 1, 1).
- Prefab shown once. R4 requires two instances plus a propagating edit, because "reusable" is the entire point of the requirement.
- The camera left at its default spawn, or moved but unexplained. R5 is the cheapest requirement on this list and the most-failed. One placed camera, one sentence of intent.
- Narration that describes what we can already see ("now the cube moves") instead of what we can't: which space, which parent, which decision. Narrate the *thinking*.

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.

*Video structure that works: [[recording-a1|Recording Your A1 Video]].*
