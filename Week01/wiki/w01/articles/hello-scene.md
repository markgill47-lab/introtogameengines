# Hello Scene: The Verification Ritual

Same test in every engine: make a project, put an object in the world, press play, see it render. Five minutes, and it proves the whole toolchain end to end.

- **[[unity|Unity]]:** New 3D project in the Hub → GameObject → 3D Object → Cube → press Play. A cube in a void, softly lit. That void is where the semester happens.
- **[[godot|Godot]]:** New project → 3D scene → add a `MeshInstance3D` child, assign a BoxMesh → add a `Camera3D` and a `DirectionalLight3D` → press Play. Godot makes you add your own camera and light, which is a better first lesson than getting them free.
- **[[unreal|Unreal]]:** New project → Games → Third Person template → press Play. You get a whole playable character for free, which feels like cheating because it slightly is. For the truer test: drag a cube from the shapes panel into the level first.
- **[[threejs|Three.js]]:** the classic ~15-line starter: scene, camera, renderer, `BoxGeometry` with a basic material, a render loop. Run the dev server, open the browser, behold the cube. You just hand-wrote the loop every other engine hides. Remember this moment in Week 3.

If your cube renders, your install works. If it doesn't, this is the ideal week to hit the problem: nothing is due, and my Discord is open. Paste the actual error, not a description of the vibes. (The same rule applies to [[llm-tutor|chatbots]].)

*Next: [[recording-setup|record thirty seconds of it]].*
