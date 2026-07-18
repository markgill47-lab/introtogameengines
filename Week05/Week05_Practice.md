# Week 5 Practice Guide: The Target Range

> **How to use this guide:** The hands-on half of Week 5, mirroring the demo game's `W05_Ranged` session: crates learn to fall, rocks learn to fly, a gate learns to notice you, and a checkbox makes you unhittable by your own ammunition. Read `Week05_Concepts.md` first, and have `A3_Spec.md` open before you record; the four exercises cover A3's checklist almost one-for-one.

---

## What you're building

- **Exercise 1: Gravity On.** Body types, demonstrated by a tower of crates.
- **Exercise 2: The Throw.** An impulse-driven projectile, built as a Standard Prefab.
- **Exercise 3: The Silent Gate.** The trigger, including the famous gotcha, suffered on schedule.
- **Exercise 4: The Matrix.** Layers, so your rocks stop assaulting their thrower.

Build in your valley scene or fresh; a ground plane, your player mover from Week 3, and some open space is all this needs.

---

## Exercise 1: Gravity On (10 minutes)

1. Confirm your ground is **static**: collider, no Rigidbody. It was all along; now it's a decision you can name.
2. Build a crate as a Standard Prefab: `Crate` parent with a Box Collider, cube in Visuals, empty Effects/Audio. Add a **Rigidbody** to the parent. Press play: it falls. That component is the crate's citizenship papers.
3. Stack five crates into a tower. Play. They settle with a tiny shuffle (the simulation negotiating rest), and if you stacked them sloppy, they topple. You now have physical comedy for free, and A3's R1 on tape.
4. Two experiments while you're here, thirty seconds each: crank one crate's **mass** to 50 and watch the tower treat it differently; toggle one crate to **kinematic** mid-stack and note that it becomes the hand of god (nothing moves it, it holds the tower up like Atlas).

## Exercise 2: The Throw (20 minutes)

1. Make a `Rock` Standard Prefab: parent with Sphere Collider + Rigidbody, sphere in Visuals scaled to fit. Make it small; make it dense-feeling (mass ~2).
2. Attach a thrower to your player or camera:

```csharp
using UnityEngine;

public class RockThrower : MonoBehaviour
{
    public Rigidbody rockPrefab;
    public float throwPower = 12f;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.F))
        {
            Rigidbody rock = Instantiate(rockPrefab,
                transform.position + transform.forward,
                Quaternion.identity);
            rock.AddForce(transform.forward * throwPower, ForceMode.Impulse);
        }
    }
}
```

Read it against the concepts doc before you run it: `GetKeyDown` because throwing is an edge, not a state; `ForceMode.Impulse` because it's a shove, not a thrust; no delta time anywhere, because instantaneous things don't get dt; and it's legal in `Update` because it's a one-shot handed to the simulation, not a continuous push. Four decisions from three different weeks, one function.

3. Throw rocks at your crate tower until it stops being research. It takes a while. That's game feel doing its job two weeks early.
4. One deliberate bug for your education: comment out the `AddForce`, and instead try to fling the rock by setting its transform position forward each frame from a coroutine or Update. Watch it stutter through crates without properly hitting them. That's the cardinal rule (never move dynamic bodies by transform) demonstrated in the wild. Restore the impulse.

## Exercise 3: The Silent Gate (15 minutes)

The trigger, and the gotcha you're hitting on purpose.

1. Build a `GateZone`: an empty with a Box Collider sized like a doorway, **isTrigger checked**. Put it somewhere the player walks through. No Rigidbody yet: that's the trap, set knowingly.
2. Attach:

```csharp
using UnityEngine;

public class GateZone : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        Debug.Log("Entered gate: " + other.name);
        GetComponentInChildren<Renderer>().material.color = Color.green;
    }
}
```

(Give the zone a translucent cube in Visuals so the color change is visible. A trigger you can see is a trigger you can debug.)

3. Walk your player through it. If your player is a bare collider with no Rigidbody: *silence*. Nothing fires. No error, no warning, nothing. Sit in that silence for a second, because this is the most-Googled physics failure in Unity's history and you are currently reproducing it in laboratory conditions.
4. The fix: add a Rigidbody to the player, check **isKinematic** (input still drives it; the simulation just needs to know it exists). Walk through again: log fires, gate goes green. At least one body in the pair. Forever.
5. Narration material for your video, because A3's R4 wants the concept and not just the effect: walk through the gate (passes through freely, event fires), then throw a rock at a crate (bounces, physical). One tripwire, one wall. Say which is which and why.

## Exercise 4: The Matrix (10 minutes)

1. Your rocks currently spawn in front of the player and occasionally clip the player's own collider on the way out, which is at best untidy and at worst a self-inflicted physics event. Create two layers: `Player` and `Projectile`. Assign accordingly (the prefab makes assignment a one-time job; Week 2 keeps paying rent).
2. Open the physics settings' **collision matrix** and uncheck Player × Projectile.
3. Demonstrate for the camera: stand point-blank against a wall of crates and throw. Rocks ignore you, murder the crates. One checkbox, zero code, and say that sentence in the video because it's R5's whole point.

---

## Other Engines

- **Godot:** crate is `RigidBody3D` with a `CollisionShape3D` child (the shape is a child node, not a property: different furniture, same room). Throw with `apply_impulse()`. The gate is an `Area3D`, and its `body_entered` *signal* is the event: connect it in the editor and enjoy the fact that you're using Week 11's pattern early. Player: `CharacterBody3D` is the purpose-built player citizenship and it registers with Areas properly, so Godot students mostly skip the silent-gate trap; read step 3 anyway so you recognize the disease in other engines. Layers/masks live as checkboxes right on each body.
- **Unreal:** crate: any actor with a primitive component, **Simulate Physics** on. Throw with `AddImpulse` (mind the units: Unreal's are big; expect comedy on the first try). The gate: a Box Collision component with response set to **Overlap** for Pawn, firing `OnComponentBeginOverlap`. Layers are **collision channels + presets**: make a Projectile object channel and set its response to Pawn to Ignore.
- **Three.js + rapier:** this week you build the wire between the worlds yourself: create a rapier `World`, step it on a fixed timestep (accumulate frame dt, step in fixed slices: Week 3's two clocks, hand-implemented), and after each step copy each body's translation/rotation onto its mesh. Crates: dynamic bodies with cuboid colliders. Throw: `applyImpulse`. The gate: a collider with `setSensor(true)` and intersection events. Collision groups filter who hits whom. It's the most work of any engine this week and the deepest understanding per line of code on the page.

---

## Recording your A3 video

A shape that fits 2–5 minutes:

1. **Citizenships (45 sec):** the crate tower settling and toppling; point at ground (static), a crate (dynamic), and name the kinematic experiment if you kept it.
2. **The throw (60 sec):** code walkthrough of the thrower hitting the four decisions (edge input, impulse, no dt, why it's allowed in Update), then rocks doing damage on camera.
3. **Tripwire vs. wall (60 sec):** walk the gate (through it, event fires), rock the crates (off them, physics fires). If you're brave, show the silent version first and add the Rigidbody live; the fix landing on camera is excellent evidence you understand it.
4. **The matrix (30 sec):** point-blank throw, rocks ignoring you, one sentence about the checkbox.
5. **Wrap (15 sec):** what fought you, what fixed it.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
