# Week 15 Practice Guide: The Guard's Upgrade

> **How to use this guide:** The hands-on half of Week 15, mirroring the demo game's `W15_Inhabited` session: the navmesh gets baked, the Week 10 guard gets real senses and a better brain, and the valley finally pushes back. Read `Week15_Concepts.md` first, and have `A14_Spec.md` open before you record. Deconstruction presentations (A12) also land this week; its spec has the delivery details, and the studio schedule has your slot if you're presenting live.

---

## What you're building

- **Exercise 1: The Bake.** Navmesh over the valley (and the mine, if you kept it), agent on the guard.
- **Exercise 2: The Eyes.** A vision cone with a real line-of-sight ray, and its failure cases.
- **Exercise 3: The Ears.** Hearing as an event subscription; the distraction mechanic goes live.
- **Exercise 4: The Brain.** The Week 10 FSM upgraded: attack, flee, investigate, memory. FSM extended or BT swap, your call, on paper first.

## Exercise 1: The Bake (20 minutes)

1. Mark your static geometry (ground, houses, walls) navigation-static and bake. Look at the result with the navmesh display on: the blue surface is the middle layer's entire worldview, pre-shrunk by agent radius so paths never hug walls into clipping. If your Week 14 mine is around, bake it too and enjoy agents pathing through generated space.
2. Retrofit the Week 10 guard: remove any hand-rolled waypoint translation, add a **NavMeshAgent**, and route the states' movement through `agent.SetDestination(...)`: Patrol sets the next waypoint, Chase sets the player's position, Return sets home. Set the agent's speed from the state's Enter (walk vs. run: the Week 10 handshake, now driving the agent).
3. Watch what you got free: he routes *around* the well instead of through it, he decelerates into waypoints (arrive is built into the agent), and he does it in the mine you generated last week. The engine took layers two and three; confirm the seam by noting your states now output only *destinations*.
4. The Week 5 checkup: the agent moves the transform, so the guard's body should be kinematic (or collider-only). If he has a dynamic Rigidbody from some ancient experiment, you'll see the wrestling match; settle the authority question and say so in the video.

## Exercise 2: The Eyes (25 minutes)

Replace the omniscient distance check with the three-clause fair vision test:

```csharp
using UnityEngine;

public class GuardSenses : MonoBehaviour
{
    public Transform eyes;                 // an empty at head height. Week 2 says hello.
    public float sightRange = 12f;
    public float sightAngle = 70f;         // half-cone, degrees
    public LayerMask sightBlockers;        // walls, not triggers, not the guard himself

    public bool CanSee(Transform target)
    {
        Vector3 toTarget = target.position + Vector3.up - eyes.position;
        if (toTarget.magnitude > sightRange) return false;                       // clause 1: range
        if (Vector3.Angle(transform.forward, toTarget) > sightAngle) return false; // clause 2: cone
        if (Physics.Raycast(eyes.position, toTarget.normalized,                  // clause 3: line of sight
                out RaycastHit hit, toTarget.magnitude, sightBlockers))
            return false;                                                        // something's in the way
        return true;
    }
}
```

Wire the states (or tree) to `CanSee` instead of the inspector cheat, then **demonstrate all three failure cases on camera**, because they are the stealth game: stand far (range), stand behind him (cone), and the money shot: stand close, in front, *behind a crate*, unseen (the ray, earning its keep). Draw the cone with a couple of `Debug.DrawRay` lines while developing; leaving a subtle visualization on for the video makes your narration effortless.

## Exercise 3: The Ears (20 minutes)

1. Add to your Week 11 bus: `public static event Action<Vector3, float> OnNoise;` with a `Noise(pos, loudness)` raiser. Fire it from your rock's `ImpactJuice` (it's already computing impact strength; loudness is that number, reused).
2. Give the guard ears: subscribe (lifecycle-paired, as always), and on a noise within `loudness`-scaled range, hand the brain an *investigate* stimulus: the position, remembered.
3. **Play the distraction.** Guard on patrol, you crouched by the gate, rock hurled across the plaza: he turns, investigates the impact point, and you slip through the space he vacated. Then say the composition sentence from the concepts doc out loud with the weeks numbered, because five systems from five different weeks just played a stealth beat together, and none of them knows the others exist.

## Exercise 4: The Brain (40 minutes)

**Paper first, as always.** The upgraded behavior set: Patrol, Suspicious, Chase, **Attack** (in range: reuse your Week 8/9 combat against the player's Health), **Investigate** (go to remembered noise/last-seen position, look around, give up), **Flee** (own Health low: run for the far waypoint), plus **memory** (last known position + a give-up timer) so losing you looks like losing you.

Then choose your implementation, and either is a full-credit A14 answer:

- **Extend the Week 10 FSM.** Honest work, and you will *feel* the arrow count climbing as Investigate negotiates with everything. That feeling is data; report it in the video.
- **Swap in a behavior tree.** Four small classes (`Node` with `Tick() → Success/Failure/Running`, `Sequence`, `Selector`, `Condition`/`Action` leaves: ~50 lines total) and the tree from the concepts doc assembled in code, conditions reading `GuardSenses` and memory, actions setting agent destinations and animator facts. The transitions you'd have negotiated become branch order, written once.

The demo game does the swap on camera with the Week 10 guard specifically so both diagrams (the FSM with its new arrows, the BT with its priorities) can be held up side by side: same behavior, different scaling story. Whichever you build, **the diagram is drawn before the code and shown in the video**, per house rules since Week 10.

Optional flourishes if the clock is kind, each cheap and each loud in a demo: villager routines (a three-stop daily loop keyed to the Week 3 sun: the valley starts *living*), guard barks (a Week 7 one-shot on state entry: "Huh?" on Suspicious is fifty cents of audio for five dollars of readability), and the mine's skeletons running a simpler tree in generated space.

---

## Other Engines

- **Godot:** bake with `NavigationRegion3D`; `NavigationAgent3D` gives `set_target_position` plus its own arrive behavior (mind its next-position polling pattern: the docs' template is the way). Vision: a `RayCast3D` node from the head, cone math identical. Hearing: signals, obviously, and it'll be the most idiomatic version in the class. BT: LimboAI if you want an editor, hand-rolled nodes if you want the understanding (recommendation: the hour of hand-rolling).
- **Unreal:** this is the tour-the-showroom week: AIController + `MoveTo` for the agent, **AI Perception** with Sight and Hearing configs (report noise via `ReportNoiseEvent`: their bus, same shape as yours), and the **Behavior Tree editor** with a Blackboard for memory. Build the same guard with stock parts and appreciate that every concept mapped one-to-one; that mapping *is* the lesson. Diagram still drawn first; the BT editor just makes it executable.
- **Three.js:** pathfind on your Week 14 grid with a hand-rolled A* (the concepts paragraph is your spec; a priority queue and a heuristic and you've built the middle layer yourself, which is the flex) or three-pathfinding on exported geometry. Vision: `THREE.Raycaster` from head height. Hearing: your emitter. The BT nodes are plain classes and yours will be the cleanest in the course. You've hand-built all three layers by the end, which is either a badge or a warning, and by Week 15 you know which you signed up for.

---

## Recording your A14 video

A shape that fits 2–5 minutes:

1. **The layers (30 sec):** the guard routing around obstacles to a destination the brain chose, narrated as decision/path/motion with a finger pointing at each.
2. **The eyes (60 sec):** all three vision clauses failing on camera: range, cone, and the crate that makes walls real. Cone visualization on.
3. **The ears (45 sec):** the distraction beat, end to end, with the composition sentence.
4. **The brain (60 sec):** the diagram (before-code, per house rules), then the behavior loop live: patrol → investigate or chase → attack or flee → give up → resume. If you did the FSM-vs-BT comparison, ten seconds of both diagrams side by side is the best evidence in the whole video.
5. **The fairness beat (20 sec):** name your designed flaw (reaction delay, memory limit, cone edges) and what the player gets to do because of it.
6. **Wrap (15 sec):** what fought you, what fixed it.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done. And if you're presenting your A12 this week: the studio slot list is on D2L, recordings due the same week either way.
