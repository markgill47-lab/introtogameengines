# Other Engines

Same four exercises, different spellings. The [[cross-engine-dictionary|dictionary]] has the terminology; these are the notes beyond it.

## Godot

The crate is a `RigidBody3D` with a `CollisionShape3D` **child**. The shape is a child node, not a property: different furniture, same room.

Throw with `apply_impulse()`. The gate is an `Area3D`, and its `body_entered` *signal* is the event: connect it in the editor and enjoy the fact that you are using Week 11's pattern early.

Player: `CharacterBody3D` is the purpose-built player citizenship, and it registers with Areas properly, so Godot students mostly skip [[silent-gate|the silent-gate trap]]. Read step 3 anyway so you recognize the disease when you meet it in another engine.

Layers and masks live as checkboxes right on each body, which is arguably a better home for them than a global matrix screen.

## Unreal

The crate: any actor with a primitive component, **Simulate Physics** on.

Throw with `AddImpulse`, and mind the units. Unreal's are big. Expect comedy on the first try, and treat the first absurd result as calibration rather than a bug.

The gate: a Box Collision component with response set to **Overlap** for Pawn, firing `OnComponentBeginOverlap`.

Layers are **collision channels + presets**: make a `Projectile` object channel and set its response to Pawn to Ignore. More setup than Unity's matrix, and it scales better once you have a dozen object types.

## Three.js + rapier

This week you build the wire between the worlds yourself, which is the most work of any engine here and the deepest understanding per line of code on the page.

1. Create a rapier `World`.
2. Step it on a fixed timestep: accumulate frame dt, step in fixed slices. That is [[w03:two-clocks|Week 3's two clocks]], hand-implemented, and you should recognize the accumulator when you write it.
3. After each step, copy each body's translation and rotation onto its mesh.

Crates: dynamic bodies with cuboid colliders. Throw: `applyImpulse`. The gate: a collider with `setSensor(true)` and intersection events. Collision groups filter who hits whom.

When you write step 3, stop and look at it. Every other engine in this course is doing exactly that, once per frame, out of sight. You are the only student who gets to read it.
