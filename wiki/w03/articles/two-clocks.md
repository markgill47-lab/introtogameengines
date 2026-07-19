# Two Clocks: The Variable Frame and the Fixed Step

So far, one loop, variable-length frames. But there's a second clock ticking in your engine, and it beats like a metronome.

Rendering *wants* to run as fast as possible: more photos, smoother motion. Physics wants the opposite: identical, predictable time slices, every single step, because simulation math accumulates error when the step size jitters, and enough jitter means objects tunneling through walls and stacks of crates exploding for no reason. Engines resolve the argument by running **two update streams**:

- **The frame update** (`Update`, `_process`, `Tick`): once per rendered frame, variable length, dt provided. Your input reading, your gameplay logic, your visuals.
- **The fixed update** (`FixedUpdate`, `_physics_process`, physics sub-stepping): a steady metronome (Unity defaults to 50 beats per second) that the physics engine marches to, regardless of framerate. On fast machines it runs less often than rendering; on slow machines the engine runs it multiple times between photos to keep the metronome truthful.

You saw both callbacks in [[w01:unity-lifecycle|The Unity Lifecycle]]; this is why they both exist. Week 5 is when you start writing physics code and this split starts costing you real decisions (forces in FixedUpdate, input in Update, and the classic bug where a keypress read in FixedUpdate gets missed between beats). This week you just need the map: **two callbacks, two clocks, and "which clock does this belong to?" is a question you'll ask for the rest of the course.**

## The throttle

One more inhabitant of this section, met briefly now and properly in Week 6: the engine's clock has a throttle. Unity calls it `Time.timeScale`. Set it to 0 and delta time reports zero: everything multiplied by dt freezes, which is to say, *the game pauses itself* as a side effect of you having written frame-rate-independent code all along. Set it to 0.5 and you've built slow motion. Good discipline this week buys superpowers later; it's a theme around here.

*The two-clocks argument, one level deeper: [[res:gaffer|Fix Your Timestep!]] in the library. Next: [[input-held-vs-pressed|Input]].*
