# Forces, Impulses, and the Handoff

How do you move a dynamic body, if not by transform? You ask the simulation. There are two grammatical tenses for asking.

## The two tenses

- **Continuous force** ("keep pushing"): applied every physics step, accumulating into acceleration. Thrust, wind, a conveyor. Lives in the fixed update, because it is a per-step conversation with the metronome.
- **Impulse** ("shove, once"): an instantaneous kick that changes velocity right now. Throwing a rock, a jump, an explosion. Fired once at the moment of the event, no delta time anywhere near it.

That second one is [[w03:delta-time|Week 3's rule]] wearing a physics jacket: **continuous gets dt, instantaneous does not.** Engines mark the difference explicitly (Unity's `ForceMode.Impulse`, Godot's `apply_impulse`, Unreal's `AddImpulse`), which is the engine telling you the distinction matters enough to put in the API.

## The supporting cast

- **Mass:** same shove, heavier object, smaller result.
- **Gravity:** a standing force the engine applies for free, toggleable per body.
- **Drag:** velocity leakage. Useful for making things settle instead of sliding forever.
- **Velocity** itself, which you can read anytime and write when you know why. Setting velocity directly is legal and blunt: legitimate uses include jump mechanics and arrow-straight projectiles. It overrides the simulation's opinion, so use it on purpose or not at all.

## The timing rule, with its full punchline

Week 3 left you with two clocks and a warning. Here is the rest of it:

**Input is read in the frame update. Forces are applied in the fixed update.**

The two clocks do not beat together, so a `GetKeyDown` polled inside `FixedUpdate` can fall between beats and vanish. The clean pattern is a handshake: read in `Update`, set a flag, act on the flag in `FixedUpdate`, clear it.

```csharp
bool jumpQueued;

void Update()                     // the frame clock: where edges live
{
    if (Input.GetKeyDown(KeyCode.Space)) jumpQueued = true;
}

void FixedUpdate()                // the metronome: where forces live
{
    if (jumpQueued)
    {
        body.AddForce(Vector3.up * jumpPower, ForceMode.Impulse);
        jumpQueued = false;
    }
}
```

Eight lines, and it is the canonical handshake between the two clocks. Read it against [[w03:two-clocks|Two Clocks]] and notice that nothing here is new; it is Week 3's problem finally getting its solution.

**One exception worth knowing:** a single impulse triggered by a single press (our [[the-throw|rock throw]]) is fine to fire from `Update` directly. The engine queues it sensibly. It is *continuous* force application that must live on the metronome.

*Next: [[layers-and-masks|Layers and Masks]], the last tool, and the most bureaucratic.*
