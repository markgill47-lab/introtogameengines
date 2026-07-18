# Week 2: Scene Graphs, Transforms, and Coordinate Spaces

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** The first universal concept. Everything on screen lives in a tree, and every object's position is relative to its parent. A passenger walking to the lavatory moves relative to the plane; the salty snacks on the cart don't move relative to the cart, and yet they're crossing a continent. That's most of this week.

## Learning objectives
- Explain the scene graph and parent/child relationships.
- Distinguish local vs. world coordinate spaces, and convert between them conceptually.
- Compose position, rotation, and scale, and predict what happens when a parent transforms.
- Place and aim a camera.

## Concept material (to be written)
1. **The Scene Graph:** why engines organize everything as a tree.
2. **Transforms:** position, rotation, scale, and why order matters.
3. Local vs. world space: what "moving the parent" does to children.
4. Rotations without tears: Euler angles vs. quaternions (conceptual, not mathematical).
5. Cameras as scene objects: position, look direction, field of view.
6. **The Standard Prefab:** house style for every visible object, introduced here because it IS parenting with a purpose. Logic and colliders on the parent; Visuals, Effects, and Audio as children. The parent is the truth; the children are replaceable. Greybox now, swap in real art later, and nothing breaks. Also the collaboration seam: artist owns the children, programmer owns the parent.
7. **Cross-Engine Dictionary:** GameObject/Transform (Unity), Node/Node3D (Godot), Actor/SceneComponent (Unreal), Object3D (Three.js). The Standard Prefab translates too: Godot scene composition and Unreal component hierarchies support the identical split.

## Practice guide (to be written)
- Unity walkthrough: hierarchy, parenting, transform inspector, camera placement.
- Building your first Standard Prefab from primitives, with the Visuals/Effects/Audio skeleton in place even where layers sit empty for now.
- Equivalent steps sketched for Godot / Unreal / Three.js.

## Assignment paced this week: A1, Scenes & Transforms
Build a scene demonstrating hierarchy, parented motion, and a deliberately placed camera. Objects will follow the Standard Prefab structure (or your engine's equivalent split of logic from visuals). Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
