# Cross-Engine Dictionary

Same anatomy, different spellings, as always.

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| Frame update | `Update()` | `_process(delta)` | `Tick(DeltaSeconds)` | your `requestAnimationFrame` loop |
| Fixed update | `FixedUpdate()` | `_physics_process(delta)` | physics sub-stepping | you call your physics lib at a fixed step |
| Delta time | `Time.deltaTime` | the `delta` argument | the `DeltaSeconds` argument | `THREE.Clock.getDelta()` |
| Held key (state) | `Input.GetKey` | `Input.is_action_pressed` | `IsInputKeyDown` | track via `keydown`/`keyup` listeners |
| Pressed (edge) | `Input.GetKeyDown` | `Input.is_action_just_pressed` | key event / Enhanced Input Triggered | the `keydown` event itself |
| Time throttle | `Time.timeScale` | `Engine.time_scale` | global time dilation | scale your own dt |

Two footnotes worth their ink. [[w01:godot|Godot]] hands you `delta` as a function argument instead of a global, which is arguably the better design: you can't forget it exists when it's sitting in your parameter list. And [[w01:threejs|Three.js]] students: the browser gives you the loop but not the stopwatch, so `THREE.Clock` is your first stop; the `keydown` event's auto-repeat behavior is your first trap (hold a key and the browser fires repeats; track key state yourself in a little object, and you've just hand-built polling, which is illuminating).
