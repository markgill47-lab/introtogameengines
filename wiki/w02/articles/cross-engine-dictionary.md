# Cross-Engine Dictionary

Same anatomy, different spellings, exactly as promised in Week 1.

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| The object | GameObject | Node (Node3D) | Actor | Object3D |
| The transform | Transform component | Node3D transform | RootComponent / SceneComponent | .position / .rotation / .scale |
| Parenting | drag in Hierarchy | drag in Scene dock | attach in Outliner / components | parent.add(child) |
| The empty parent | Create Empty | plain Node3D | empty SceneComponent / child Actor | new THREE.Group() |
| Reusable object | Prefab | PackedScene (save branch as scene) | Blueprint class | clone(), or a function that builds one |
| Local → world | transform.TransformPoint() | to_global() | GetActorTransform().TransformPosition() | localToWorld() |
| World → local | transform.InverseTransformPoint() | to_local() | InverseTransformPosition() | worldToLocal() |

Godot users get one culture note: Godot treats "scene" and "prefab" as the same idea (a scene is a saved branch of nodes you instance anywhere), which is arguably the cleanest version of the concept on this table.

*The [[standard-prefab|Standard Prefab]] translates too: Godot scene composition and Unreal component hierarchies support the identical split: engine-specific steps in [[other-engines|Other Engines]].*
