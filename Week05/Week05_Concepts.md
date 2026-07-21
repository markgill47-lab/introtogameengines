# Week 5 Concepts: Physics and Collision

> **How to use this module:** This document is the complete concept material for Week 5. You do not need the lectures to complete A3. Read this, then work through `Week05_Practice.md` in your engine, then check `A3_Spec.md` before you record.

---

## Start at the bowling alley

Watch what happens to your relationship with a bowling ball over the course of one frame of bowling. In the approach, you have total authority: the ball is exactly where your hand says it is, at every instant, no negotiation. Then you release. And the moment it leaves your fingers, your authority ends completely. The lane, the oil, the spin you gave it, and the laws of motion own that ball now. Every bowler leans, twists, and pleads with it anyway (body english is a beautiful, universal, completely useless behavior), and the ball does not care. All the influence you were ever going to have got spent before release.

Nobody thinks the released ball is more real than the carried one. They're two arrangements of the same question: **who has authority over where this object is?**

That question is this entire week, because it's a design choice you make per object, and you've actually been answering it all semester without the vocabulary. The windmill blades, the sun pivot, your Week 3 player: every one of them is *scripted transform* placement. Your code computes where the object belongs and puts it there, explicitly, every frame. Full authority, carried in your hand. Whole games ship this way, and outside games it's often the only correct answer: a scientific visualization of storm-cell data doesn't hand placement to a game physics engine, because its own math *is* the physics, and the visible artifacts are the physical artifacts. Scripted placement isn't the beginner mode. It's a legitimate authority arrangement you should keep using wherever the math is yours.

The new option this week is the release: for any object, you can **turn authority over to the physics engine**. Place it, give it a shove, and let it go. From then on gravity, collisions, and momentum decide where it is, your transform-writing days for that object are over, and your influence arrives the way the bowler's does: through forces, applied while you legitimately have the ball. In Unity, the component that signs authority over is the **Rigidbody**. Adding one to an object is the release; everything else this week is learning what you can and can't do after you've let go.

### Where the metaphor has a seam

Find this one on purpose, because students walk into it in the first ten minutes of the practice guide's throw exercise. When the bowler releases, the ball is *already moving*: it inherited the approach, the arm swing, and the spin off the fingers. Release isn't the beginning of the ball's motion; it's the moment authority changes hands over motion that already exists.

Your engine doesn't do that. A body arrives in the simulation with **no velocity and no spin**, both exactly zero. It doesn't look at last frame's position and work out that the object was traveling, because scripted placement never told it anything about speed: your code was setting positions, and a position isn't a velocity. So the first thing most students see is a bowling ball that drops straight down and thuds on the floor when they expected it to sail down the lane. Nothing is broken; they handed the simulation an object at rest and it obliged.

Whatever state a body has at the moment of transfer is whatever you explicitly gave it and nothing more. If it should leave your hand moving, you have to *be the arm*: set the velocity, or apply an impulse, at the instant of the handoff. That's exactly what the line after `Instantiate` is doing in the practice guide's rock thrower, and commenting it out for ten seconds is the cheapest demonstration of this idea in the whole week. The same seam appears when you flip a kinematic body to dynamic mid-game: a platform that's been sliding for ten seconds starts from a standstill and falls. If continuity matters there, set the velocity yourself as part of the switch rather than trusting the engine to carry it across.

---

## 1. What the simulation sees

When you do hand an object to the physics engine, the engine doesn't take the object as-is. It reasons about a simplified stand-in, and the reason is cost: testing whether two boxes overlap is a handful of comparisons, while testing whether two 40,000-triangle meshes overlap is a research problem, and the engine answers overlap questions for *every moving pair, fifty times a second, on the fixed clock* (Week 3's metronome, and now you know what marches to it). So physics runs on simple shapes, the simulation moves those shapes, their transforms update, and your visible objects (parented exactly the way Week 2's Standard Prefab arranged them) ride along.

The vocabulary:

- A **collider** is the stand-in: an invisible geometric proxy (box, sphere, capsule) that defines the object's shape as far as physics is concerned. The Standard Prefab put colliders on the parent back in Week 2; this week the simulation starts using them, and Visuals gets to be exactly what it always was: presentation, riding along.
- A **rigid body** is the authority transfer: the component that gives an object mass and velocity and hands its placement to the simulation.

Collider without rigid body: a shape things can bump into, whose placement still belongs to you (a wall). Rigid body plus collider: authority surrendered, fully simulated (a crate). And the pairing rules between these two are the source of this week's most famous gotcha, which section 4 will make you walk into on purpose.

---

## 2. Body types: who moves whom

Every physical object declares one of three citizenships, and most physics confusion is a citizenship error:

- **Static.** Never moves, ever: ground, houses, the castle gate's frame. The engine exploits this promise hard (precomputed, cached, cheap by the hundreds), which is why you *declare* it rather than just not moving the thing. Moving a static object anyway breaks the promise and the engine quietly pays a cost re-checking the world; don't.
- **Kinematic.** Moved by *you* (code, animation), not by the simulation: moving platforms, doors, elevators. A kinematic body is the hand of god: it pushes dynamic objects out of its way, and nothing in the simulation can push back. Gravity doesn't apply. Collisions don't deflect it. It goes where it's told, and the simulation reroutes everyone else around the fact.
- **Dynamic.** The full citizens: gravity pulls them, forces shove them, collisions deflect them. Crates, rocks, ragdolls. You influence a dynamic body by *asking the simulation* (apply a force, set a velocity), never by grabbing its transform.

That last sentence is the cardinal rule of the week, so here it is in bold: **never move a dynamic body by writing to its transform.** You signed authority over; grabbing the transform is running down the lane and repositioning the ball mid-roll. It doesn't move the object through the world; it *rewrites reality between physics steps*, and the simulation responds the way the bowling alley would: badly. Objects jam into walls, velocity and position disagree, stacks explode. If you want a dynamic object to go somewhere, push it (section 5). And if you find yourself needing to place an object directly, that's not a crime; it's a diagnosis: this object wanted scripted placement or kinematic citizenship, and the fix is changing the authority arrangement, not cheating the one you chose.

(Player characters sit in a genuinely awkward spot in this taxonomy: you want them to collide like citizens but obey input like a kinematic. Every engine ships a purpose-built compromise, the character controller, and Week 8's demo game upgrade will use one. This week, our player can stay simple and our projectiles do the physics.)

---

## 3. Choosing colliders: primitive, compound, capsule

The menu of collider shapes, in order of preference:

- **Primitives** (box, sphere, capsule): fast, robust, and right more often than feels plausible. A house is a box. A rock is a sphere that renders as a rock. Nobody playing your game will ever know, because nobody plays the collider.
- **Compound colliders:** several primitives on one object approximating a complex shape: a box body plus a box roof is a house with a real roofline, and it's still cheap. The Standard Prefab handles this gracefully: primitives on the parent (or a Colliders child if there are many), costume in Visuals.
- **Mesh colliders:** the actual model's geometry as its collision shape. Expensive, restrictive on dynamic bodies (engines mostly refuse, or demand a convex simplification), and usually the answer to a question nobody asked. Terrain and one-off complex statics are the legitimate uses. Reaching for one on a crate is a smell.
- **The capsule,** specifically, is the industry's whole answer to characters: a pill shape has no edges to catch on stairs and door frames, which is why every character controller in every engine is secretly a capsule wearing a person costume. When your Mixamo character arrives in Week 8, its collider will be a capsule, and now you know why.

---

## 4. Collision vs. trigger: bounce vs. checkpoint

Every collider makes one more declaration: is it *solid*, or is it a *tripwire*?

- A **collision** is physical: two solid colliders meet, the simulation resolves it (bounce, stop, topple, push), and your code gets an event ("these two hit, this hard, at this point") in case gameplay cares. The wall stops the rock *and* tells you about it.
- A **trigger** (Unity's term; Godot says Area, Unreal says overlap) is non-physical: objects pass through freely, and the *only* thing that happens is the event. Nothing bounces. Something *notices*. A checkpoint, a pickup radius, a pressure plate, the village gate that logs your arrival: all triggers.

The distinction maps exactly onto a design question: *does this thing exist to change motion, or to change game state?* Walls change motion. Checkpoints change state. When both (a locked door that stops you *and* shows a message), that's a solid collider whose collision event does gameplay: still one declaration, just a solid one.

Two things about trigger events that earn their ink now:

1. **The famous gotcha:** most engines only generate collision and trigger events when at least one object in the pair has a rigid body. A trigger arch and a player who is just a collider-on-a-capsule will pass through each other in *total silence*, and this exact silence is the most-Googled physics problem in Unity's history. The practice guide walks you into it deliberately, because you'll hit it eventually and I'd rather you hit it in a week where it's the lesson.
2. **Aim events at game state, not at visuals.** `OnTriggerEnter` firing "the player entered the gate zone" is a fact about the *game*. What reacts to that fact (a log line today; a quest objective in Week 11) shouldn't be hard-wired inside the trigger. You don't have the pattern for doing this properly yet. You will, and this trigger arch is on the shortlist of things Week 11 renovates.

---

## 5. Forces, impulses, and the handoff

How do you move a dynamic body, if not by transform? You ask the simulation, and there are two grammatical tenses for asking:

- **Continuous force** ("keep pushing"): applied every physics step, accumulating into acceleration: thrust, wind, a conveyor. Lives in the fixed update, because it's a per-step conversation with the metronome.
- **Impulse** ("shove, once"): an instantaneous kick that changes velocity right now: throwing a rock, a jump, an explosion. Fired once at the moment of the event, no delta time anywhere near it, because it's Week 3's "instantaneous things don't get dt" rule wearing a physics jacket. Engines mark the difference explicitly (Unity's `ForceMode.Impulse`, Godot's `apply_impulse`, Unreal's `AddImpulse`).

The supporting cast: **mass** (same shove, heavier object, smaller result), **gravity** (a standing force the engine applies for free, toggleable per body), **drag** (velocity leakage, useful for making things settle), and **velocity** itself, which you can read anytime and write when you know why (setting velocity directly is legal and blunt: legitimate uses include jump mechanics and arrow-straight projectiles; it overrides the simulation's opinion, so use it on purpose or not at all).

And the timing rule this week inherits from Week 3, now with its full punchline: **input is read in the frame update, forces are applied in the fixed update.** The two clocks don't beat together, so a `GetKeyDown` polled inside `FixedUpdate` can fall between beats and vanish. The clean pattern (read in `Update`, set a flag, act on the flag in `FixedUpdate`, clear it) is eight lines in the practice guide and it's the canonical handshake between the two clocks. One exception worth knowing: a single impulse triggered by a single press (our rock throw) is fine to fire from `Update` directly; the engine queues it sensibly. It's *continuous* force application that must live on the metronome.

---

## 6. Layers and masks: who is allowed to hit whom

The last tool is bureaucratic and indispensable: the **collision matrix**. Every collider belongs to a **layer** (Player, Projectile, Environment, PickupZone), and the matrix declares which layers interact at all. Uncheck Projectile-vs-Player and your thrown rocks pass through you like you're a ghost, while still cracking satisfyingly into crates: no code, one checkbox, and the alternative (checking "did I hit myself?" in code, every collision, forever) is how projects grow barnacles.

Design your layers like you designed your scene graph: on purpose, this week, while there are four of them. The demo game's set (Player, NPC, Projectile, Environment, Zones) is a reasonable default that survives to Week 15, where a cousin of this machinery (masks on *raycasts*: asking "what would I hit if I looked this way?") becomes the eyes of every guard in the valley. Same matrix, pointed at perception instead of collision. That's a Week 15 sentence; file it.

---

## 7. Cross-Engine Dictionary

| Concept | Unity | Godot | Unreal | Three.js (+ rapier/cannon-es) |
|---|---|---|---|---|
| Dynamic body | Rigidbody | RigidBody3D | Simulate Physics: on | RigidBody (dynamic) |
| Static | collider, no Rigidbody | StaticBody3D | Static mesh, no sim | fixed body |
| Kinematic | Rigidbody, isKinematic | AnimatableBody3D / CharacterBody3D | interpolated movement, sim off | kinematic body |
| Collider | Box/Sphere/CapsuleCollider | CollisionShape3D | Collision in Static Mesh / shapes | ColliderDesc |
| Trigger | isTrigger checkbox | Area3D | Overlap (vs. Block) response | sensor: true |
| Collision event | OnCollisionEnter | body_entered signal | OnComponentHit | contact events |
| Trigger event | OnTriggerEnter | Area3D body_entered | OnComponentBeginOverlap | intersection events |
| Impulse | AddForce(…, ForceMode.Impulse) | apply_impulse() | AddImpulse | applyImpulse |
| Layers | Layers + collision matrix | collision_layer / collision_mask | Collision channels + presets | collision groups |

Culture notes. Godot's Area3D reporting through *signals* is the Observer pattern again, hiding in plain sight; Week 11 students in Godot keep winning. Unreal replaces the matrix with per-object *channels and responses* (Block, Overlap, Ignore), which is the same idea with more knobs. And Three.js students: your engine ships no physics at all, so you'll install one (rapier is the modern pick), step it manually on a fixed timestep, and copy body positions to your meshes every frame. That copy loop you're about to write *is* the wire between the two worlds. Everyone else should be slightly jealous: you don't have to believe the two-worlds model, you get to type it.

---

## Check yourself

1. The windmill blades, the sun pivot, and a thrown rock: for each, who has authority over its placement, and what granted that authority?
2. Static, kinematic, dynamic: assign citizenships to a house, an elevator, and a thrown rock, and state who can push whom.
3. Why is teleporting a dynamic body by its transform a bug even when it looks like it worked?
4. Your trigger zone fires no events as the player walks through. What's the first thing you check, and why is the failure silent?
5. Throwing a rock: force or impulse, which update does it fire from, and where did delta time go?
6. You hand a moving object to the simulation and it drops straight down instead of continuing on its way. What did the engine not inherit, and whose job was it to supply it?

---

## Going deeper

- **Fiedler's [game physics series](https://gafferongames.com/categories/game-physics/):** free articles on integration, timesteps, and simulation by a veteran of the field. The natural next step if the authority handoff made you curious what the simulation is doing between your fixed updates.
