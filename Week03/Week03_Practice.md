# Week 3 Practice Guide: Movement, Time, and the Broken Twin

> **How to use this guide:** The hands-on half of Week 3, and it mirrors the demo game's `W03_FirstSteps` session: the player learns to walk, the sun learns to move, and a deliberately broken script earns its keep as evidence. Read `Week03_Concepts.md` first, and have `A2_Spec.md` open before you record, because Exercise 4 *is* the A2 proof.

---

## What you're building

- **Exercise 1: The Broken Twin.** Frame-dependent movement, written on purpose, kept forever.
- **Exercise 2: The Real Mover.** Delta-time movement with a sprint, plus one discrete action.
- **Exercise 3: The Sun.** Time-driven motion with no input at all.
- **Exercise 4: The Proof.** Demonstrating frame-rate independence on camera at two framerates.

Work in the Week 2 scene if you like (the valley gets a walking player out of it, same as the demo game) or a fresh scene. A2 doesn't care; A2 cares about the checklist.

---

## Exercise 1: The Broken Twin (10 minutes)

Yes, we're writing the bug on purpose. You need to *see* frame dependence once while it's cheap, and you need the broken version on hand for Exercise 4's comparison.

1. Create a cube named `BrokenMover`. Attach:

```csharp
using UnityEngine;

public class BrokenMove : MonoBehaviour
{
    public float step = 0.1f;   // units per FRAME. That's the bug.

    void Update()
    {
        if (Input.GetKey(KeyCode.W)) transform.Translate(Vector3.forward * step);
    }
}
```

2. Play. Hold W. Feels fine, probably. That's what makes this bug dangerous: it *passes the vibe check* on the machine that wrote it.
3. Leave this cube and script in the project, disabled when you don't need it. It's your control group, and it has a starring role in your video.

## Exercise 2: The Real Mover (20 minutes)

1. Create your player object (capsule, or your Week 2 scene's player) and attach:

```csharp
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    public float walkSpeed = 4f;     // units per second. Real units now.
    public float sprintSpeed = 8f;

    void Update()
    {
        float speed = Input.GetKey(KeyCode.LeftShift) ? sprintSpeed : walkSpeed;

        Vector3 dir = Vector3.zero;
        if (Input.GetKey(KeyCode.W)) dir += Vector3.forward;
        if (Input.GetKey(KeyCode.S)) dir += Vector3.back;
        if (Input.GetKey(KeyCode.A)) dir += Vector3.left;
        if (Input.GetKey(KeyCode.D)) dir += Vector3.right;

        transform.Translate(dir.normalized * speed * Time.deltaTime);
    }
}
```

Two details worth noticing out loud: the speeds are in *units per second*, numbers you can reason about, and `dir.normalized` stops diagonal movement from being faster than straight movement (W and D together sum to a longer vector; normalizing fixes the oldest movement bug in games).

2. Now add one **discrete** action, because A2 requires an edge, not just a state:

```csharp
        if (Input.GetKeyDown(KeyCode.Space))
            GetComponent<Renderer>().material.color = Random.ColorHSV();
```

A jump, a color change, a dropped marker, a horn honk: anything that happens *once per press*. While you're here, run the experiment from the concepts doc: change `GetKeyDown` to `GetKey`, hold Space, watch it strobe, feel the difference in your teeth, change it back.

## Exercise 3: The Sun (10 minutes)

Time-driven motion with no input proves you understand dt as "per second," not "per keypress."

1. Create an empty at the origin named `SunPivot`. Parent your scene's Directional Light to it (Week 2 skill, already paying rent).
2. Attach the Week 2 `Spin` script to the pivot, or write the one-liner fresh: rotate around X at, say, 6 degrees per second. That's a 60-second day/night cycle.
3. Play. The valley's shadows crawl. Notice what you built: the windmill spins, the sun wheels, the player walks, and every one of them is the same idea (rate × `Time.deltaTime`) wearing three costumes.

## Exercise 4: The Proof (15 minutes)

This is the demonstration A2's R3 asks for on camera: same code, two framerates, same real-world speed.

1. Add this tiny utility somewhere in the scene:

```csharp
using UnityEngine;

public class FrameCap : MonoBehaviour
{
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Alpha1)) Application.targetFrameRate = 15;
        if (Input.GetKeyDown(KeyCode.Alpha2)) Application.targetFrameRate = -1;  // uncapped
    }
}
```

(If vSync is on, turn it off in Quality settings, or the cap won't take. This is the most common reason "the demo didn't work.")

2. Pick a landmark run: village gate to windmill, or between two objects a known distance apart.
3. Run it uncapped with `PlayerMove` and count seconds. Cap to 15 fps with the 1 key, run it again, count again. Same duration, visibly chunkier picture. That's the whole proof: *choppier, not slower.*
4. Now the kicker for your video: do the same two runs with `BrokenMover`. At 15 fps it crawls; uncapped it rockets. Same scene, same key, honest code versus dishonest code, side by side. This contrast is the best 45 seconds your A2 video can contain.

---

## Other Engines

- **Godot:** everything above, with `delta` handed to you: `position += dir.normalized() * speed * delta` in `_process(delta)`. Held vs. pressed is `Input.is_action_pressed` vs. `Input.is_action_just_pressed` (define actions in the Input Map; it takes two minutes and is the idiomatic path). Frame cap for the proof: `Engine.max_fps = 15`.
- **Unreal:** movement in `Tick(DeltaSeconds)`, or via a Character's movement component if you started from the Third Person template (in which case *find* where DeltaSeconds flows; it's instructive). Console command `t.MaxFPS 15` for the proof. Discrete actions via Enhanced Input's Triggered events.
- **Three.js:** you own the loop, so instantiate `const clock = new THREE.Clock()` and read `const dt = clock.getDelta()` each frame; move with `mesh.position.z += speed * dt`. Track held keys in a plain object updated by `keydown`/`keyup` listeners (mind auto-repeat: set a flag, don't stack movement in the event itself). For the proof, throttle your loop with `setTimeout(() => requestAnimationFrame(loop), 1000/15)`.

---

## Recording your A2 video

A shape that fits 2–5 minutes:

1. **The code (45 sec):** walk the movement expression. Say the units: speed per second, times seconds. Point at `normalized` and say why.
2. **Continuous + discrete (45 sec):** walk and sprint (held), then the Space action (edge). Say which function backs each and why they're different.
3. **The Proof (60–90 sec):** landmark run uncapped, then at 15 fps: same seconds, chunkier picture. Then the Broken Twin at both framerates, misbehaving on cue. Narrate the *why*, not just the what.
4. **The Sun or equivalent (20 sec):** something moving on dt with no input, as evidence "per second" means per second everywhere.
5. **Wrap (15 sec):** what fought you, what fixed it.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
