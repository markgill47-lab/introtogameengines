# Cross-Engine Dictionary

Same anatomy, different spellings, as always.

| Concept | Unity | Godot | Unreal | Three.js (+ rapier/cannon-es) |
|---|---|---|---|---|
| Dynamic body | `Rigidbody` | `RigidBody3D` | Simulate Physics: on | `RigidBody` (dynamic) |
| Static | collider, no Rigidbody | `StaticBody3D` | Static mesh, no sim | fixed body |
| Kinematic | `Rigidbody`, `isKinematic` | `AnimatableBody3D` / `CharacterBody3D` | interpolated movement, sim off | kinematic body |
| Collider | Box/Sphere/CapsuleCollider | `CollisionShape3D` | Collision in Static Mesh / shapes | `ColliderDesc` |
| Trigger | `isTrigger` checkbox | `Area3D` | Overlap (vs. Block) response | `sensor: true` |
| Collision event | `OnCollisionEnter` | `body_entered` signal | `OnComponentHit` | contact events |
| Trigger event | `OnTriggerEnter` | `Area3D` `body_entered` | `OnComponentBeginOverlap` | intersection events |
| Impulse | `AddForce(…, ForceMode.Impulse)` | `apply_impulse()` | `AddImpulse` | `applyImpulse` |
| Layers | Layers + collision matrix | `collision_layer` / `collision_mask` | Collision channels + presets | collision groups |

## Culture notes

**Godot** reports `Area3D` events through *signals*, which is the Observer pattern again, hiding in plain sight. Week 11 students in Godot keep winning: you will spend that week learning the name of a thing you have been using since Week 5.

**Unreal** replaces the matrix with per-object *channels and responses* (Block, Overlap, Ignore). Same idea with more knobs, and the knobs are genuinely better once there are enough object types to justify them. Mind the units when you first `AddImpulse`: Unreal's are big, and expect comedy on the first try.

**Three.js** students: your engine ships no physics at all. So you will install one (rapier is the modern pick), step it manually on a fixed timestep, and copy body positions to your meshes every frame.

That copy loop you are about to write *is* the wire between the two worlds that [[what-physics-sees|What the Simulation Sees]] described. Everyone else has to take the two-worlds model on faith. You get to type it, which is more work and a deeper understanding per line of code on the page.

*Next: [[gotchas|Gotchas and Judgment Calls]].*
