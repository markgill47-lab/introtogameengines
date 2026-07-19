# Other Engines

Same four exercises, different spellings. The [[cross-engine-dictionary|dictionary]] has the terminology; these are the notes beyond it.

## Godot

Node3D is your empty, and the Scene dock's drag-to-parent works like Unity's Hierarchy. For the [[standard-prefab|Standard Prefab]], build the skeleton and use "Save Branch as Scene" on the `House` node: instancing that saved scene is Godot's prefab workflow, and editing the saved scene updates every instance. Blades: a Node3D pivot with the spin in `_process(delta)`, `rotate_z(deg_to_rad(45) * delta)`.

## Unreal

Build the house as a Blueprint class: the Blueprint *is* the prefab. Components in the Blueprint editor form the hierarchy (a SceneComponent as pivot, StaticMesh cubes under it). Rotation via a Rotating Movement component, which is Unreal handing you the Spin script for free. The empty-parent trick is "add a SceneComponent and nest the meshes under it."

## Three.js

`THREE.Group()` is your empty; `group.add(mesh)` is parenting; a `makeHouse()` function returning a group is your prefab, and calling it five times is your village. The pivot fix is verbatim: put blade meshes in a group positioned at the hub, rotate the group in the render loop. You're also about to appreciate why engines have editors, because placing a village numerically builds character.
