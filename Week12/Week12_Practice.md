# Week 12 Practice Guide: Building the Command Layer

> **How to use this guide:** This is the hands-on half of Week 12. It walks the Unity version step by step, then sketches the same build in Godot, Unreal, and Three.js. Work in whatever engine you've chosen; the architecture is identical everywhere, and A10 is graded on the architecture, not the engine. Read `Week12_Concepts.md` first or none of this will feel motivated.

---

## What you're building

A small scene with one controllable actor, refactored in three passes:

- **Pass 1: The Weld.** Direct input, the way you've done it since Week 3. (Starter code below; five minutes.)
- **Pass 2: The Refactor.** Same behavior, but input flows through command objects.
- **Pass 3: The Superpower.** Rebinding, replay, or undo, built on top of Pass 2.

Keep Pass 1 in your project on a separate scene or a disabled script. Your A10 video will show the before and after, and the contrast is the point.

---

## Pass 1: The Weld (starter)

New scene. A ground plane, a cube named `Player`, a camera that can see it. Attach:

```csharp
using UnityEngine;

public class WeldedController : MonoBehaviour
{
    public float speed = 5f;

    void Update()
    {
        if (Input.GetKey(KeyCode.W)) transform.Translate(Vector3.forward * speed * Time.deltaTime);
        if (Input.GetKey(KeyCode.S)) transform.Translate(Vector3.back * speed * Time.deltaTime);
        if (Input.GetKey(KeyCode.A)) transform.Translate(Vector3.left * speed * Time.deltaTime);
        if (Input.GetKey(KeyCode.D)) transform.Translate(Vector3.right * speed * Time.deltaTime);
        if (Input.GetKeyDown(KeyCode.Space)) GetComponent<Renderer>().material.color = Random.ColorHSV();
    }
}
```

Press play. WASD moves, Space recolors. Now interrogate it with the four questions from the concepts doc (rebind? replay? AI-drive? undo?) and confirm the answer is no four times. Good. Motivation acquired.

A note before someone emails me: this is the legacy input API, used deliberately. It shows the weld in one line, and the weld is the lesson. Concepts doc, section 6, covers where the new Input System fits, and the optional build path below shows how to use it here. Passes 2 and 3 stay on the legacy API so the command layer is the *only* new idea on screen at a time.

---

## Pass 2: The Refactor

### Step 1: The Actor

The actor exposes verbs and knows nothing about input:

```csharp
using UnityEngine;

public class Actor : MonoBehaviour
{
    public float speed = 5f;

    public void Move(Vector3 direction)
    {
        transform.Translate(direction * speed * Time.deltaTime);
    }

    public void Recolor()
    {
        GetComponent<Renderer>().material.color = Random.ColorHSV();
    }
}
```

Rule for this class, and it's a hard rule: **the word `Input` never appears in Actor.** If it does, you've re-welded.

### Step 2: The Commands

```csharp
using UnityEngine;

public interface ICommand
{
    void Execute(Actor actor);
}

public class MoveCommand : ICommand
{
    private readonly Vector3 direction;
    public MoveCommand(Vector3 direction) { this.direction = direction; }
    public void Execute(Actor actor) { actor.Move(direction); }
}

public class RecolorCommand : ICommand
{
    public void Execute(Actor actor) { actor.Recolor(); }
}
```

Note that `MoveCommand` carries its direction as data. One command class, four directions. This matters for replay later: a command that carries its data is a command you can write to a file.

### Step 3: The Input Layer

```csharp
using System.Collections.Generic;
using UnityEngine;

public class CommandInput : MonoBehaviour
{
    public Actor actor;

    private Dictionary<KeyCode, ICommand> held = new Dictionary<KeyCode, ICommand>();
    private Dictionary<KeyCode, ICommand> pressed = new Dictionary<KeyCode, ICommand>();

    void Awake()
    {
        held[KeyCode.W] = new MoveCommand(Vector3.forward);
        held[KeyCode.S] = new MoveCommand(Vector3.back);
        held[KeyCode.A] = new MoveCommand(Vector3.left);
        held[KeyCode.D] = new MoveCommand(Vector3.right);
        pressed[KeyCode.Space] = new RecolorCommand();
    }

    void Update()
    {
        foreach (var pair in held)
            if (Input.GetKey(pair.Key)) Dispatch(pair.Value);
        foreach (var pair in pressed)
            if (Input.GetKeyDown(pair.Key)) Dispatch(pair.Value);
    }

    protected virtual void Dispatch(ICommand command)
    {
        command.Execute(actor);
    }
}
```

Wire `actor` in the inspector, press play, and confirm the behavior is *identical* to Pass 1. That's the checkpoint: same game, different architecture. The `Dispatch` method looks pointless right now (it just calls Execute). It is the single seam every superpower plugs into, which is why it exists and why it's `virtual`.

**Why the dictionaries instead of a switch?** Because a dictionary is data and a switch is code. You can edit data at runtime. You just built the rebinding superpower's foundation without noticing.

---

## Pass 3: Pick Your Superpower

### Option A: Rebinding

Add to `CommandInput`:

```csharp
public void Rebind(KeyCode oldKey, KeyCode newKey)
{
    if (held.ContainsKey(oldKey))    { held[newKey] = held[oldKey];    held.Remove(oldKey); }
    if (pressed.ContainsKey(oldKey)) { pressed[newKey] = pressed[oldKey]; pressed.Remove(oldKey); }
}
```

Then give yourself a way to trigger it at runtime: a debug key, or two UI buttons ("swap W and S", "move Recolor to R"). For the A10 video you will demonstrate a binding working, change it *while the game runs*, and demonstrate both the new binding working and the old key doing nothing. A rebind that requires restarting the game is a config file, not a superpower.

### Option B: Replay

Two new pieces. A recorder that hooks the dispatch seam:

```csharp
public struct TimedCommand
{
    public int frame;
    public ICommand command;
}

public class RecordingInput : CommandInput
{
    public List<TimedCommand> tape = new List<TimedCommand>();
    private int frame = 0;

    void LateUpdate() { frame++; }

    protected override void Dispatch(ICommand command)
    {
        tape.Add(new TimedCommand { frame = frame, command = command });
        base.Dispatch(command);
    }
}
```

And a player that reads the tape with input disabled:

```csharp
public class ReplayInput : MonoBehaviour
{
    public Actor actor;
    public List<TimedCommand> tape;
    private int frame = 0;
    private int index = 0;

    void Update()
    {
        while (index < tape.Count && tape[index].frame == frame)
        {
            tape[index].command.Execute(actor);
            index++;
        }
        frame++;
    }
}
```

Flow for the demo: play for ten seconds while recording, reset the actor to its exact starting position and state, disable `RecordingInput`, enable `ReplayInput` with the tape, and watch the actor repeat your run untouched. Reset discipline is where this assignment is usually lost: if the starting state differs, the ghost drifts, and the video will show it. Keyboard hands-off during replay, and say so out loud in your narration, because that's the proof.

### Option C: Undo

Extend the interface (movement gets an inverse; recolor needs to remember what it overwrote):

```csharp
public interface ICommand
{
    void Execute(Actor actor);
    void Unexecute(Actor actor);
}
```

For clean undo semantics, make movement discrete: one keypress, one tile-sized step. Continuous held-key movement makes "undo one action" meaningless, and the concepts doc already warned you. Then:

```csharp
public class UndoingInput : CommandInput
{
    private Stack<ICommand> history = new Stack<ICommand>();

    protected override void Dispatch(ICommand command)
    {
        history.Push(command);
        base.Dispatch(command);
    }

    void Update()
    {
        base.Update();
        if (Input.GetKeyDown(KeyCode.Z) && history.Count > 0)
            history.Pop().Unexecute(actor);
    }
}
```

Demo: perform at least three distinct actions, then undo all three in reverse order, on camera, narrating what each undo restores. A `RecolorCommand` that can't restore the *previous* color is the classic bug here (it has to save the color it overwrote when it executes). Finding that bug yourself is half the education.

---

## Optional: building A10 on Unity's new Input System

If you'd rather order through DoorDash than walk to the table (concepts doc, section 6), here's the wiring. This path is fully legitimate for A10 and pairs especially well with the rebinding superpower. It does not shorten the assignment: the engine gives you device-to-action, and you still build action-to-command-to-actor.

1. **Install:** Window → Package Manager → Input System. Say yes when it asks to switch backends (this disables the legacy `Input` class, so keep this in a separate project or scene from Passes 1 and 2).
2. **Author the actions:** create an Input Actions asset. Action map `Gameplay`, with `Move` (Value / Vector2, bound to WASD *and* left stick, because two bindings on one action is the whole sales pitch) and `Recolor` (Button, bound to Space).
3. **Generate the C# class** from the asset, or add a `PlayerInput` component and use its events.
4. **The command layer stays yours.** In the action callbacks, do not touch the actor. Produce commands and dispatch them, same seam as before:

```csharp
public class NewInputCommandSource : MonoBehaviour
{
    public Actor actor;
    private GameControls controls;   // the generated class

    void Awake()
    {
        controls = new GameControls();
        controls.Gameplay.Recolor.performed += _ => Dispatch(new RecolorCommand());
        controls.Gameplay.Enable();
    }

    void Update()
    {
        Vector2 move = controls.Gameplay.Move.ReadValue<Vector2>();
        if (move != Vector2.zero)
            Dispatch(new MoveCommand(new Vector3(move.x, 0, move.y)));
    }

    protected virtual void Dispatch(ICommand command)
    {
        command.Execute(actor);
    }
}
```

Notice what survived the migration untouched: `ICommand`, `MoveCommand`, `RecolorCommand`, `Actor`, and the `Dispatch` seam that the superpowers plug into. Only the front of house changed. That's the proof the layers were cut in the right place, and it's worth saying out loud in your video.

Two cautions for this path. If your superpower is rebinding, the Input System's `PerformInteractiveRebinding` is fair game, but your video must still walk the command objects (R1 through R3 don't evaporate because the engine handled the keys; the same caveat applies to Godot's InputMap below). And demo both bindings on camera: WASD, then the gamepad, same actor, no code change. It's the best free 15 seconds of video this assignment offers.

---

## Other Engines

The architecture translates one-to-one. What changes is spelling.

- **Godot (GDScript):** No interfaces, so use duck typing or a base `Command` class with `execute(actor)` / `unexecute(actor)`. Read input in `_process` or `_unhandled_input`, keep bindings in a `Dictionary`. Godot's own `InputMap` is a built-in half of the rebinding superpower; using it is legitimate, but your video must still show the command objects, because InputMap alone maps keys to *action names*, not to command objects.
- **Unreal (C++/Blueprints):** In C++, a `UCommand` base class or a plain C++ interface works. Unreal's Enhanced Input system already separates device from action (it's Command-flavored out of the box), so the real assignment in Unreal is building the command layer *between* Enhanced Input's action events and your actor, plus your superpower. In Blueprints, command objects can be Blueprint classes implementing a BP interface.
- **Three.js (JavaScript):** JavaScript makes this almost unfairly easy: a command can be an object literal `{ execute(actor) {...}, unexecute(actor) {...} }` or a class. Listen for `keydown`/`keyup` events, map `event.code` through a plain object or `Map` to commands, dispatch in your animation loop. The replay tape serializes to JSON in one line, which makes Three.js arguably the best engine in the class for the replay superpower.

If you're in another engine entirely, the test is unchanged: input layer produces command objects, actor consumes them, one superpower works on camera. That spec is engine-proof by design.

---

## Recording your A10 video

Structure that works (and fits in 2–5 minutes):

1. **The weld (30 sec):** show Pass 1 running and its script. "Here's the problem."
2. **The refactor (60–90 sec):** show the Actor, a command class, and the input layer. Say out loud where the input layer ends and the actor begins, and show that Actor contains no input code.
3. **The superpower (60–90 sec):** demonstrate it live per the option-specific demo notes above.
4. **The wrap (15 sec):** which superpower you chose and why, one sentence.

Then write your build note: what AI generated, what you fixed, what you'd change. One paragraph. Done.
