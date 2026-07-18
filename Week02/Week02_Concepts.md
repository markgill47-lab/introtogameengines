# Week 2 Concepts: Scene Graphs, Transforms, and Coordinate Spaces

> **How to use this module:** This document is the complete concept material for Week 2. You do not need the lectures to complete A1. Read this, then work through `Week02_Practice.md` in your engine, then check `A1_Spec.md` before you record.

---

## Start at 35,000 feet

You're on a passenger flight, cruising at 550 miles an hour. A passenger unbuckles and walks back to the lavatory. Question: how fast is that passenger moving?

You want to say "about two miles an hour, annoyed." And relative to the plane, you're right: forty feet of aisle, a small wait, done. But that passenger is also crossing a state line mid-stride, because they're walking *inside a thing that's moving*. Both answers are correct. They're just answers to different questions: "where is the passenger relative to the plane?" and "where is the passenger relative to the world?"

Now watch the snack cart come down the aisle, because the cart adds the layer that makes this a data structure. The cart moves relative to the plane. The salty snacks on the cart do not move relative to the cart at all; they just sit there, being pretzels. And yet those pretzels are doing 550 miles an hour and climbing through the same time zone you are. Snack rides cart, cart rides plane, plane rides the sky. Nobody on board computes any of this. Attachment does the math.

That's this entire week. Every object in your game is riding something, everything ultimately rides the world itself, and the engine keeps track of "relative to my parent" versus "relative to the world" so nobody on board has to. The structure that does the bookkeeping is called the scene graph, and it's the first of the three promises from Week 1 to get its own week.

---

## 1. The Scene Graph: everything is a tree

Open any engine and make a few objects, and you'll notice you're not making a *list*. You're making a *tree*: objects can contain objects, which contain objects. The village contains houses, a house contains walls and a roof, the roof contains a chimney. This tree is the **scene graph**, and it's the engine's answer to a real problem: position is relational.

Think about how you actually describe where things are. The watch is on your wrist. The wrist is on your arm. Your arm is on you, and you are in a room. Nobody, ever, has described a wristwatch by its coordinates relative to the center of the Earth, even though it has some. You describe things relative to what they're attached to, and when you walk across the room, you do not recompute the watch. It's attached. It comes along.

The scene graph makes that intuition executable:

- Every object has a **parent** (except the root things sitting directly in the world).
- Every object stores its position, rotation, and scale **relative to its parent**.
- Moving a parent moves its entire subtree, automatically, recursively, for free.

And the "for free" is the point. When the plane banks, the engine walks down the tree (plane, then cabin, then cart, then the pretzels on the cart) and composes each object's "relative to my parent" numbers into a final "relative to the world" answer. You will never write that code. You'll just arrange the tree so that it produces the right answer, which turns out to be a design skill, and it's the skill A1 grades.

One direction matters: influence flows *down* the tree, never up. Bank the plane and the cart comes along. Roll the cart down the aisle and the plane does not veer. Children ride parents. Parents do not ride children. Half your future hierarchy bugs are this sentence, ignored.

---

## 2. Transforms: the three numbers every object carries

Each node in the tree carries a **transform**: position, rotation, and scale. Three properties, and every visual thing you ever place has exactly one set of them.

- **Position:** where the object sits, relative to its parent.
- **Rotation:** how it's turned, relative to its parent.
- **Scale:** how it's sized, relative to its parent. A scale of 1 means "as authored."

The subtlety worth learning this week rather than during a 2 AM debugging session: these three operations do not commute. Rotate-translate-scale is a *different transform* than scale-translate-rotate. Not a slightly different transform: a different one, with the object in a different place, at a different size, facing a different way. Your engine applies them in one fixed order (scale, then rotation, then translation, composed child-under-parent up the tree), and that consistency is the only reason your scenes behave the same way twice.

Feel it physically: hold your arm straight out and turn your body: your hand traces a big arc. Now turn your body first and *then* raise your arm: your hand is somewhere else entirely. Same two operations, different order, different result. This is also why the hierarchy placement of an operation matters: scaling a parent then rotating a child is not the same as rotating then scaling, which is precisely how the non-uniform-scale shear below happens. When an object ends up somewhere that seems insane, order of operations is suspect number two. (Suspect number one is the pivot, and it's coming in section 3.)

Scale has one landmine all its own: **non-uniform scale on a parent**. Stretch a parent to (1, 3, 1) and every child rotating inside it will shear, skew, and generally look like it's melting. The practice guide shows the fix, which is the same fix as most hierarchy problems: an extra empty parent, so the stretch applies to visuals and not to the things trying to rotate. Scale your Visuals; leave your logic parents at (1, 1, 1). The Standard Prefab (section 6) bakes this rule in so you stop having to remember it.

---

## 3. Local vs. world, and the pivot

Vocabulary time, because these two words carry the whole week:

- **Local space:** an object's numbers relative to its parent. The pretzels' local position never changes; they're just sitting on the cart.
- **World space:** the object's final composed placement in the scene. The pretzels' world position changes constantly, because the cart's does, because the plane's does.

The inspector in your engine shows *local* numbers. This surprises everyone once. You'll select a chimney, read position (0, 2.5, 0), and wonder how a chimney can be at the origin when it's plainly across the map. It isn't at the origin. It's at (0, 2.5, 0) *relative to its roof*, and the roof has a parent, and so on up the tree until the world answer emerges. Every engine gives you functions to convert between the two spaces (they're in the dictionary, section 7); this week you mostly need to know which space you're reading.

Which brings us to the **pivot**, the spot an object rotates and scales around, and the single most common source of Week 2 pain. Rotate a windmill blade and it rotates around *its own origin*, wherever that happens to be. If the model's origin is at the blade tip instead of the hub, your windmill doesn't spin; it flails. You can't always move a model's origin, but you can always give it a new parent: create an empty object exactly where the rotation should happen, parent the visuals to it, and rotate the empty. The empty's origin becomes the pivot, and the flailing stops.

Write this down somewhere you'll find it in Week 8: **the empty parent is the universal fix.** Wrong pivot, wrong scale, model imported facing backward at the wrong size: don't fight the asset, wrap it in an empty and correct it one level up. This trick is most of what "rigging up a prefab" means in practice, and you'll use it every week for the rest of the semester.

---

## 4. Rotations without tears

Rotation is stored differently than you'd guess, and knowing *of* this fact (not the math, just the fact) will save you real confusion.

The human-friendly version is **Euler angles**: three numbers, degrees around X, Y, and Z. That's what the inspector shows you, that's what you type, and for everything in this course, that's what you'll use. Under the hood, though, every engine actually stores rotation as a **quaternion**: four numbers with no visual intuition whatsoever, and the reason is a failure mode called **gimbal lock**, which is not trivia. Stack three rotation axes and there are orientations where two of them line up and you lose a degree of freedom: pitch a camera straight up and suddenly yaw and roll are the same motion, and there are directions you simply cannot turn from there without backing out first. The name comes from real gyroscope gimbals (Apollo 11's navigation computer had a warning light for it), and you can reproduce it today with a free-look camera and thirty seconds of effort. The struggle is real; quaternions exist because four numbers dodge it entirely.

Your working policy, this week and probably for years: **read and write Euler angles, let the engine keep quaternions, and never edit a quaternion's four numbers by hand.** When code needs to combine rotations, use the engine's rotation functions rather than adding angle numbers together; rotations compose by multiplication, not addition, and the engine's functions know that even when we forget. That's the entire quaternion section. You're welcome, and possibly for the second week in a row.

---

## 5. The camera is just an object

The camera feels like it should be something special: a viewport, a window, a magical eye. It's not. It's a node in the tree with a transform like everything else, plus a couple of lens properties (field of view, near/far clipping). It can be moved, rotated, and, most usefully, *parented*.

Two consequences to absorb now:

- **Camera placement is a decision, not a default.** Every engine spawns the camera somewhere arbitrary, and a scene shot from the default camera position looks exactly like nobody decided anything. A1 asks for a deliberately placed camera and a sentence of narration about the choice, because "what does the player see" is the first design question of every scene you will ever build.
- **A parented camera inherits motion.** Park the camera on a moving object (strap it to the cart) and it rides along, filming. That one idea, plus damping, is the whole third-person camera rig, and Week 7 builds it. This week, place the camera by hand and frame the shot on purpose.

---

## 6. The Standard Prefab: house style, starting now

A prefab is a reusable object: build once, stamp copies everywhere, edit the original and every copy updates. Every engine has some version of this (the dictionary has the names), and it's the single biggest lever for not doing the same work forty times.

In this course, every visible thing is a prefab, and every prefab has the same skeleton. This is house style. It's also parenting with a purpose, which is why it's introduced this week and not later:

```
ThingName          <- the parent: logic components and physics colliders
├── Visuals        <- models and materials, scaled to fit within the colliders
├── Effects        <- particle systems, line and trail renderers
└── Audio          <- the object's sound manager
```

**The parent is the truth.** Its collider defines the object's real footprint in the world, and its scale stays at (1, 1, 1), which section 2 already told you to want. The children are presentation, and children are replaceable: that's the snack-cart property again, working for your production pipeline instead of your physics. Swap the pretzels for peanuts and the cart neither knows nor cares.

What this buys, concretely:

- **Bottom-Up Asset Replacement.** Your house is gray cubes this week. When real art arrives, open the prefab, delete the cubes inside Visuals, drop the model in, scale it to fit the collider, done. No script changes, no scene edits, nothing else even notices. In Week 8 we perform exactly this swap on the demo game's player character, live, and it takes five minutes *because the skeleton was here in Week 2*.
- **The Collaboration Seam.** On a team, the artist owns Visuals, Effects, and Audio; the programmer owns the parent. Same object, no collisions, and the prefab is the contract between them.
- Effects and Audio sit empty for a few weeks. That's fine and intentional: they're reserved parking. Week 7 fills both, and you'll be glad the spots were waiting.

There's a deeper pattern hiding inside this structure. I'm not going to name it yet; Week 9 does, and it's better as a reveal. For now: separate what a thing *is* from how it *looks*, and put the split in the hierarchy where everyone can see it.

---

## 7. Cross-Engine Dictionary

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| The object | GameObject | Node (Node3D) | Actor | Object3D |
| The transform | Transform component | Node3D transform | RootComponent / SceneComponent | .position / .rotation / .scale |
| Parenting | drag in Hierarchy | drag in Scene dock | attach in Outliner / components | parent.add(child) |
| The empty parent | Create Empty | plain Node3D | empty SceneComponent / child Actor | new THREE.Group() |
| Reusable object | Prefab | PackedScene (save branch as scene) | Blueprint class | clone(), or a function that builds one |
| Local → world | transform.TransformPoint() | to_global() | GetActorTransform().TransformPosition() | localToWorld() |
| World → local | transform.InverseTransformPoint() | to_local() | InverseTransformPosition() | worldToLocal() |

Same anatomy, different spellings, exactly as promised in Week 1. Godot users get one culture note: Godot treats "scene" and "prefab" as the same idea (a scene is a saved branch of nodes you instance anywhere), which is arguably the cleanest version of the concept on this table.

---

## Check yourself

1. The cart rolls thirty feet down the aisle while the plane crosses a state line. Describe the pretzels' motion in local space, then in world space, one sentence each.
2. Your windmill blade orbits wildly instead of spinning in place. What's wrong, and what's the universal fix?
3. Why does the Standard Prefab keep the parent's scale at (1, 1, 1) and put all stretching inside Visuals?
4. The inspector says your chimney is at (0, 2.5, 0) but it's visibly across the map. Reconcile these facts.
5. What's the policy on quaternions, in one sentence?

---

## Going deeper

- **The math under the transforms:** the *3D Math Primer for Graphics and Game Development* (Dunn and Parberry) is free in full at [gamemath.com](https://gamemath.com/). Vectors, matrices, and coordinate spaces at real depth, and the quaternion chapter is where "never edit the four numbers" gets its mathematical why.
