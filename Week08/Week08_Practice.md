# Week 8 Practice Guide: The Swap, the Stride, and the Swing

> **How to use this guide:** The hands-on half of Week 8, mirroring the demo game's `W08_Alive` session: the capsule retires with honors, locomotion becomes a readout, the sword learns timing, and the gate finally opens. Read `Week08_Concepts.md` first, and have `A6_Spec.md` open before you record. Budget note: this is the week the asset pipeline takes its toll from everyone once; the import ritual below exists to make the toll cheap.

---

## What you're building

- **Exercise 1: The Ceremony.** The Bottom-Up Swap, performed with witnesses (your recorder).
- **Exercise 2: The Stride.** An idle/walk/run blend tree fed by your actual mover.
- **Exercise 3: The Swing.** A responsive attack with damage timed to the blade.
- **Exercise 4: The Gate.** Property animation authored in-engine, triggered by the world.

## Exercise 1: The Ceremony (30 minutes, half of it Mixamo)

**The Mixamo run:**

1. mixamo.com, free Adobe login. Pick a character (Y Bot is the course's unofficial mascot). Download as **FBX for Unity** if offered, T-pose, with skin.
2. Grab clips: Idle, Walking, Running, and a sword swing (search "slash"). For Walking and Running, check **In Place** before downloading. (The concepts doc's authority paragraph is why; if the checkbox is missing on a clip, the import settings can bake it later, but prefer the checkbox.)
3. Import into Unity. The ritual checkboxes, in the model's import settings: **Rig tab → Animation Type: Humanoid** (for the character and for each clip download, so they share a skeleton language), Apply. If the model is tiny or gray: **Model tab → Scale Factor** (Mixamo often needs 100... or 1; check against your collider, don't trust defaults), and **Materials tab → Extract Textures/Materials** if it came in colorless.
4. Something will still be wrong. It always is: T-pose, sideways, floating, gray. Do not fight the asset. This is the Week 1 prophecy and the Week 2 fix: it goes *inside* Visuals, and Visuals (or an empty inside it) absorbs the corrective rotation and scale.

**The Swap itself:** open your Player prefab. Note for the camera what currently works: movement, camera follow, physics, HUD. Delete the capsule mesh inside Visuals. Drag the character in its place; scale and rotate until it stands inside the capsule collider (gizmos on: the green capsule outline is your fitting room). Press play. Everything still works, and *say so out loud in your video*: the mover never knew about the capsule, physics still runs the same collider, and Visuals did the only thing Visuals has ever done: ride along. Six weeks of the Standard Prefab, cashed.

(Your character now slides around in a T-pose like a haunted mannequin. Correct. That's what "we haven't done Exercise 2 yet" looks like.)

## Exercise 2: The Stride (25 minutes)

1. Create an **Animator Controller** (`PlayerAnimator`), assign it to the character's Animator component.
2. Add a float parameter **Speed**. Create a **Blend Tree** state (1D, on Speed): Idle at 0, Walking at your walk speed's value, Running at sprint speed. Using the *actual numbers* from your Week 3 mover is the point: the tree's thresholds and your gameplay speeds are the same facts.
3. Feed it from the mover, which now does exactly one animation-related thing:

```csharp
    // in PlayerMove, after computing movement:
    animator.SetFloat("Speed", dir.magnitude * speed);
```

(Wire the `animator` reference to the character in Visuals. The mover sets a fact; the graph makes every decision. That division is the concepts doc's "one decider" rule, live.)

4. Play. Walk, sprint, stop. The character strides, jogs, settles, and blends continuously between them because locomotion is now a *readout* of speed, not a set of commands. Nudge the walk threshold while playing to feel what the blend tree is doing.

## Exercise 3: The Swing (25 minutes)

1. Add a **Trigger** parameter `Attack` and an Attack state (your slash clip) with transitions: Any State → Attack (condition: Attack trigger), Attack → back to the blend tree when finished.
2. First, the deliberate bug: leave the Any State → Attack transition's **Has Exit Time** checked. Click to attack (`if (Input.GetMouseButtonDown(0)) animator.SetTrigger("Attack");` in the mover, or better, a small `PlayerCombat` script: Week 9 will thank you). Feel the mud: the swing waits politely for the current clip. Now **uncheck Has Exit Time** on that arrow and feel the difference. That's the sluggish-attack bug, experienced and cured in ninety seconds, and it belongs in your video.
3. Time the damage to the blade with an **Animation Event**: open the slash clip, scrub to the frame where the blade crosses center, add an event calling `OnSwingConnect`. Then:

```csharp
using UnityEngine;

public class PlayerCombat : MonoBehaviour
{
    public float reach = 1.6f;
    public float damage = 25f;

    // called by the animation event, at the exact frame the blade lands
    public void OnSwingConnect()
    {
        Vector3 center = transform.position + transform.forward * reach * 0.6f + Vector3.up;
        foreach (Collider hit in Physics.OverlapSphere(center, reach * 0.6f))
        {
            hit.GetComponent<DummyHealth>()?.TakeDamage(damage);
        }
    }
}
```

(The script with the event handler must live on the same object as the Animator: put `PlayerCombat` on the character inside Visuals, or relay it. `OverlapSphere` is Week 5's machinery asking "who's in front of me right now": a physics query, no projectile needed.) Swing at your Week 6 dummy: its world-space bar drains *when the blade lands*, not when the mouse clicked. That beat of correctness is the entire difference between combat that feels tight and combat that feels random, and your Week 7 juice hooks in here for free if you call it from the same event.

## Exercise 4: The Gate (20 minutes)

In-engine property animation, no imported anything:

1. Build a `Gate` Standard Prefab if you don't have one: frame in Visuals, a door slab child on a hinge-positioned empty (Week 2's pivot lesson, again, forever).
2. Select the door pivot, open the **Animation window**, create clip `GateOpen`: keyframe rotation at 0:00 (closed, 0°) and at 1:30 (open, 110°). Click between the keys and drag the curve toward ease-out so the door decelerates into place like it weighs something. Create `GateClose` the same way, or one clip played in reverse if you're feeling economical.
3. Trigger it from the world: an Animator with Closed/Open states and an `Open` trigger, fired by your Week 5 trigger zone (`OnTriggerEnter` → `animator.SetTrigger("Open")`) or a keypress. A door that opens *because you walked up to it* is three weeks of your own tech shaking hands: trigger zone (5), event (6-ish), animation (8).
4. While you're here, animate one more property that isn't a transform (a light's intensity flickering on a torch, a material color): thirty seconds of work, and it plants the "keyframes drive *any* property" flag where you'll remember it.

---

## Other Engines

- **Godot:** import Mixamo via GLB (Blender does the FBX→GLB hop; or grab GLB-format characters from Kenney/itch and skip Mixamo entirely, an entirely legitimate dodge). Locomotion: `AnimationTree` with a StateMachine or BlendSpace1D, fed by `animation_tree.set("parameters/Speed/blend_position", speed)`. The gate is where Godot shines: `AnimationPlayer` keyframes any property of any node with the little key icons next to every field in the inspector; do the light flicker, it's thirty seconds. Melee timing: a **Call Method track** on the animation itself, which is the animation-event idea as a first-class track type.
- **Unreal:** Mixamo FBX imports as a skeletal mesh; retarget to the template skeleton or use the Mixamo character directly. Locomotion: a **Blend Space** (speed on one axis) inside an **Animation Blueprint** whose state machine is this module's section 3 at industrial scale. Attack: an **Anim Montage** triggered from gameplay, with an **Anim Notify** at the blade-lands frame calling your damage logic: notify = animation event, montage = interruptible clip playback, and the sluggish-attack lesson lives in the montage's blend settings. The gate: keyframe the door in a **Level Sequence** or a simple timeline in Blueprint.
- **Three.js:** load a GLB with clips; `AnimationMixer` owns playback. Locomotion: keep `idleAction`, `walkAction`, `runAction` running with weights you set from speed (a hand-rolled blend tree in ten lines), or `crossFadeTo` between them for the moment-scale version. Attack: play the slash action once (`LoopOnce`), and time damage with a check on `action.time` crossing your impact timestamp: the animation event, hand-rolled, like everything in Three.js, instructively. The gate: a keyframe track on the door group's quaternion, or just lerp the rotation in code and admit the whole week is data over time.

---

## Recording your A6 video

A shape that fits 2–5 minutes:

1. **The Ceremony (45 sec):** the before-list (what works), the swap inside Visuals, the after-proof (everything still works). Say why nothing broke; that sentence is the Standard Prefab's whole argument.
2. **The Stride (45 sec):** idle → walk → run → stop with visible blending. Show the blend tree and the one line in the mover that feeds it. Name the division: code sets facts, the graph decides.
3. **The Swing (60 sec):** the exit-time mud, then the responsive version; the dummy's bar draining on blade contact, with the animation event shown in the clip. This is R2 and R4's best evidence in one beat.
4. **The Gate (30 sec):** walk up, door opens with weight. Show the two keyframes and the eased curve, and the non-transform property you animated.
5. **The graph (20 sec):** your animator graph on screen: states, arrows, parameters, one sentence about the shape of the thing. (You're leaving a breadcrumb for Week 10, whether you know it or not.)
6. **Wrap (15 sec):** what fought you (the import ritual has stories), what fixed it.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
