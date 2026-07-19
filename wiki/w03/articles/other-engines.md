# Other Engines

Same four exercises, different spellings. The [[cross-engine-dictionary|dictionary]] has the terminology; these are the notes beyond it.

## Godot

Everything above, with `delta` handed to you: `position += dir.normalized() * speed * delta` in `_process(delta)`. Held vs. pressed is `Input.is_action_pressed` vs. `Input.is_action_just_pressed` (define actions in the Input Map; it takes two minutes and is the idiomatic path). Frame cap for [[the-proof|the proof]]: `Engine.max_fps = 15`.

## Unreal

Movement in `Tick(DeltaSeconds)`, or via a Character's movement component if you started from the Third Person template (in which case *find* where DeltaSeconds flows; it's instructive). Console command `t.MaxFPS 15` for the proof. Discrete actions via Enhanced Input's Triggered events.

## Three.js

You own the loop, so instantiate `const clock = new THREE.Clock()` and read `const dt = clock.getDelta()` each frame; move with `mesh.position.z += speed * dt`. Track held keys in a plain object updated by `keydown`/`keyup` listeners (mind auto-repeat: set a flag, don't stack movement in the event itself). For the proof, throttle your loop with `setTimeout(() => requestAnimationFrame(loop), 1000/15)`.
