# The Loop

Strip any engine to its skeleton and you find the same four beats, repeating until the program dies:

1. **Read input.** What are the devices saying right now?
2. **Update.** Every script gets its nudge: move things, decide things, react to input.
3. **Render.** Photograph the scene from the camera and present it.
4. **Repeat.** Immediately. Forever.

In [[w01:threejs|Three.js]] you write this loop yourself with `requestAnimationFrame`, which is why I keep saying Three.js students will understand this week in their bones. In Unity, Godot, and Unreal, the loop is hidden inside the engine, and what you get is a *callback*: a function of yours the loop promises to call once per frame. Unity's is `Update()`. Godot's is `_process(delta)`. Unreal's is `Tick(DeltaTime)`. Different names, same contract: "I will call this every frame; do your nudging inside." (You met this contract in [[w01:unity-lifecycle|The Unity Lifecycle]]: the engine calls you.)

## The consequence that deserves its own sentence

**Your `Update` must finish fast.** The loop can't take the next photo until every script's nudge is done, so a script that dawdles (loads a file, loops a million times, waits for a network) doesn't slow itself down; it slows the *entire universe* down. Frames-per-second is just how many trips through this loop your machine completes per second, and every script in the scene is standing between one photo and the next.

*Next: [[delta-time|Delta Time]], the size of the nudge.*
