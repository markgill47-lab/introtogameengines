# Week 12 Concepts: The Command Pattern

> **How to use this module:** This document is the complete concept material for Week 12. You do not need the lectures to complete A10. Read this, then work through `Week12_Practice.md` in your engine, then check `A10_Spec.md` before you record.

---

## Start with a restaurant

You sit down at a diner and order a burger. The waiter doesn't sprint to the grill and start cooking. He writes your order on a ticket, clips the ticket to the wheel, and the cook pulls tickets off the wheel in order.

Stop and look at what that ticket is doing, because it's doing a lot:

- The ticket can sit in a queue. Orders wait their turn.
- The ticket can be handed to any cook. You don't care who makes it.
- The ticket can be read back later. "Table 6 ordered the burger at 12:14."
- The ticket can be voided before it's cooked.
- The waiter and the cook never have to speak. The ticket is the whole conversation.

The ticket is a *request turned into an object*. That's the entire Command pattern. When a request becomes a thing, you can store it, queue it, delay it, hand it to someone else, log it, replay it, or throw it away. A shouted order can't do any of that.

Now let's go break your input code.

---

## 1. The Problem: your keyboard is welded to your player

Here's the input handling you've probably been writing all semester. I know, because it's the input handling I demoed in Week 3:

```csharp
void Update()
{
    if (Input.GetKey(KeyCode.W)) player.MoveForward();
    if (Input.GetKey(KeyCode.Space)) player.Jump();
    if (Input.GetKeyDown(KeyCode.E)) player.Interact();
}
```

This works. It shipped a thousand games. And it welds three things together that have no business being welded: *which key was pressed*, *what the player should do about it*, and *the fact that it should happen right now*.

(Yes, that's Unity's legacy input API, and yes, I'm using it on purpose. It makes the weld visible in a single line, which makes it the perfect teaching villain. If you're already asking "what about the new Input System?", good instinct. Section 6 is for you, and the short version is: the new Input System exists precisely because of everything this section is about to complain about.)

Ask this code some reasonable questions and watch it fail:

- Can the player rebind Jump to a different key? No. The key IS the jump, in source code.
- Can I record last night's playthrough and watch it again? No. The inputs evaporated the frame they happened.
- Can an AI drive this character for an attract mode or a tutorial ghost? No. The character only listens to the keyboard.
- Can I undo a move in my turn-based game? No. The move was never a thing. It was a side effect of a key.

Every one of those failures has the same root cause: the request ("jump, please") was never made into an object. It was a function call that fired and vanished.

---

## 2. The Command Pattern: requests as objects

The fix is almost insultingly small. We define a command as a thing:

```csharp
public interface ICommand
{
    void Execute(Actor actor);
}

public class JumpCommand : ICommand
{
    public void Execute(Actor actor) { actor.Jump(); }
}

public class MoveForwardCommand : ICommand
{
    public void Execute(Actor actor) { actor.MoveForward(); }
}
```

And the input handler stops *doing things* and starts *producing tickets*:

```csharp
public class InputHandler
{
    public ICommand HandleInput()
    {
        if (Input.GetKeyDown(KeyCode.Space)) return new JumpCommand();
        if (Input.GetKey(KeyCode.W))        return new MoveForwardCommand();
        return null;
    }
}
```

Somewhere else, something decides what to do with the tickets:

```csharp
void Update()
{
    ICommand command = inputHandler.HandleInput();
    if (command != null) command.Execute(player);
}
```

Read that flow again, because the important part is what's *not* there. The input handler never touches the player. It has no reference to the player. It reads hardware and emits objects. The player, meanwhile, has no idea a keyboard exists. Commands arrive; the actor obeys. Waiter, ticket, cook.

**Three separated concerns, each with a name:**

- **The Input Layer** reads devices and produces commands. It knows about keys and buttons and nothing else.
- **The Command** carries the request. It knows what should happen, not who asked or when.
- **The Actor** executes. It exposes verbs (Jump, MoveForward, Interact) and doesn't care who's calling them.

If Week 9's MVC discussion left the "controller" feeling abstract, here it is in the flesh. Commands ARE the controller layer: the thing standing between raw input and your simulation.

One clarification before you ask: last week's Observer pattern and this week's Command pattern are mirror twins, and mixing them up is the classic mistake. Observer is how the model announces things *outward* ("my health changed, react if you care"). Command is how requests flow *inward* ("jump, please, whenever you're ready"). Events look backward at what happened. Commands look forward at what should happen.

---

## 3. The Three Superpowers

Turning requests into objects felt like bureaucracy. Ten more lines of code to do the same thing. Here's the payoff. Each of these features is somewhere between painful and impossible with direct input, and nearly free with commands. A10 requires you to build one of them.

### Superpower 1: Rebinding (the easy one)

If keys map to commands through a dictionary instead of a switch statement, rebinding is just editing the dictionary:

```csharp
Dictionary<KeyCode, ICommand> bindings = new Dictionary<KeyCode, ICommand>
{
    { KeyCode.Space, new JumpCommand() },
    { KeyCode.E,     new InteractCommand() },
};

public void Rebind(KeyCode key, ICommand command)
{
    bindings[key] = command;
}
```

The player wants Jump on the mouse? Swap an entry at runtime. No other code in the entire project changes, because no other code in the entire project ever knew what a KeyCode was. Every accessibility remapping menu you've ever seen is this dictionary with a UI in front of it.

### Superpower 2: Replay (the fun one)

A command is data, and data can be written down. Record each command with the frame it happened on:

```csharp
public struct TimedCommand
{
    public int frame;
    public ICommand command;
}

List<TimedCommand> recording = new List<TimedCommand>();
```

During play, every command that executes also gets appended to the list. To replay: reset the scene, then feed the recorded commands to the *same actor* on the *same frames*, with the keyboard ignored entirely. The actor cannot tell the difference, because the actor never knew about the keyboard in the first place. That's the whole trick.

One warning: replay assumes your game is deterministic. Same commands, same starting state, same result. If your gameplay leans on `Random` without a fixed seed, or on physics quirks that vary run to run, your ghost will drift off course. (Week 14 makes the same point about seeds from the other direction. This is not a coincidence.)

### Superpower 3: Undo (the classy one)

Give commands a second method:

```csharp
public interface ICommand
{
    void Execute(Actor actor);
    void Unexecute(Actor actor);   // do the opposite
}
```

A `MoveCommand` that moves one tile north unexecutes by moving one tile south. Keep every executed command on a stack; undo pops the stack and calls Unexecute. That's the entire undo system in every editor you've ever used, including the one you're building your game in right now. Ctrl+Z is a command stack. It always was.

Fair warning on scope: undo shines when actions are discrete (turn-based moves, grid placement, menu operations). "Undo the last 0.4 seconds of analog joystick input" is a research problem, not an assignment. If you pick undo for A10, build something with discrete actions. Your future self will thank you.

### Choosing your superpower for A10

Blunt guidance: **rebinding** is the least code and the least drama. **Replay** is the most satisfying to demo and the best video. **Undo** is the most intellectually complete, because writing Unexecute forces you to truly understand what each command does to the world. Pick the one that fits your game, not the one that sounds easiest. They're all easier than they sound once the command layer exists, which is sort of the point of the week.

---

## 4. Worked example: one actor, two masters

The proof that your architecture is right is this test: *the player and a replay file can drive the same actor through the same interface, and the actor can't tell which one is talking.*

```
                 +------------------+
  keyboard --->  |  InputHandler    | ---+
                 +------------------+    |     +-----------+      +--------+
                                         +---> | ICommand  | ---> | Actor  |
                 +------------------+    |     +-----------+      +--------+
  file ------->  |  ReplaySource    | ---+
                 +------------------+
```

Both sources produce `ICommand` objects. The actor consumes them. Swap the source at runtime and the actor keeps walking. The full buildable version of this diagram, with every script, is in `Week12_Practice.md`, and it is exactly the architecture A10 asks you to demonstrate.

This diagram is also secretly a networking diagram. Replace "file" with "socket" and you've drawn how multiplayer games send player actions across the wire. Nobody streams keyboard hardware states over the internet. They stream commands.

---

## 5. Where you've already met this pattern

You have been on the receiving end of Command your whole gaming life:

- **Fighting games:** the input buffer that makes a quarter-circle-forward come out as a fireball is a queue of command objects with timestamps.
- **RTS games:** click a unit, queue up move-move-build-attack. That order queue on screen is literally a visible list of command objects. Shift-click is `queue.Add()`.
- **Roguelikes and turn-based games:** each turn is a command. That's why they can have replays, seeds, and undo, and why turn-based games were doing this pattern decades before it had a name.
- **Every editor you use:** Unity's undo, Photoshop's history panel, your IDE's Ctrl+Z. Command stacks, all the way down.
- **Netcode:** commands are what actually travels between machines in most multiplayer architectures.

Once you see the tickets, you can't unsee them.

---

## 6. What about the new Input System? (Your engine already ships this pattern)

Back to the restaurant, because the restaurant has been busy.

The legacy input system meant you had to go into the joint, sit at a specific table, and order there. The order only existed at that table. That's `Input.GetKey(KeyCode.W)`: the request is fused to one physical entry point, and if you want to order from somewhere else (a gamepad, a touch screen, an accessibility device), tough. Walk to the table.

But the joint has modernized. The menu is on DoorDash and GrubHub now. They've installed a drive-through. They're also running a Mr. Beast ghost kitchen out the back, so you don't even have to order off their regular menu. Same kitchen, same cooks, same tickets on the wheel. What changed is the *front of house*: orders now arrive from anywhere, in any format, and the kitchen neither knows nor cares which door they came through.

That modernization is Unity's **Input System package** (the "new Input System"), and it is the front half of the Command pattern built directly into the engine:

- An **Action** ("Jump," "Move," "Interact") is the order, defined on its own, with no device attached. The kitchen's menu item, not the table.
- **Bindings** attach any number of physical inputs to one action: keyboard W, gamepad stick, touch drag, XR controller. That's DoorDash, GrubHub, and the drive-through: many ways in, one order out.
- **Runtime rebinding and control schemes** let the player rewrite the bindings without the game caring. That's the ghost kitchen: orders the regular menu never listed, fulfilled by the same cooks.
- Your gameplay code subscribes to *action* callbacks and never mentions a key. The word `KeyCode` disappears from your project.

And this is not a Unity quirk. **Godot's InputMap** and **Unreal's Enhanced Input** are the same modernization at the same layer. Every serious engine looked at the welded-input problem and shipped the same answer, which should tell you something about how real the problem is.

So why does A10 make you build a command layer by hand? Two reasons, and they're both load-bearing:

1. **The engine systems stop at the action.** They turn devices into named requests ("Jump happened"), but they hand you a *callback*, not a *command object* you can put on a queue, write to a tape, or push onto an undo stack. The back half of the pattern (action to command object to actor) is still yours to build, and the back half is where replay and undo live.
2. **You keep patterns you've built once.** Use Enhanced Input without ever building the layer yourself and it's magic. Build the layer once by hand and every engine's input system becomes obvious for the rest of your career: oh, it's tickets.

Using the new Input System *in front of* your command layer is allowed and encouraged, especially if rebinding is your superpower. The practice guide has the wiring. Just know that pointing at the Actions asset and saying "the engine did it" doesn't pass the assignment, for the same reason that having a DoorDash account doesn't make you a cook.

---

## 7. Gotchas and judgment calls

- **Command allocation:** creating a `new MoveForwardCommand()` sixty times a second makes the garbage collector cry. For stateless commands, create each one once and reuse it (one `JumpCommand` instance can serve forever). Commands that carry data (which tile, how far) need instances, and that's fine. Don't optimize this until it matters, but know where the cost lives.
- **Not everything needs to be a command.** Camera movement, UI hover states, debug keys: welding those directly is fine. The pattern earns its keep on *gameplay-meaningful actions*, the ones you'd want to rebind, replay, or undo. Applying Command to literally every input in a game jam project is how you lose the jam.
- **Continuous input is the awkward case.** "Jump" is a clean command. "The stick is tilted 63% left" is a stream. The standard answer is to sample the stream into per-frame movement commands carrying the values. It works, it's what A10 expects if your game is movement-based, and yes, it feels a little verbose. The superpowers are still worth it.
- **Naming:** call your commands what they do to the game (JumpCommand, PlaceTowerCommand), not what the hardware did (SpacebarCommand). The moment a key name shows up in a command class, the weld is back.

---

## Check yourself before you build

If you can answer these without scrolling up, you're ready for the practice guide:

1. In the diner story, what are the waiter, the ticket, and the cook in your input system?
2. Why does the replay superpower require that the actor holds no reference to input APIs?
3. What two methods does an undoable command need, and why is undo a bad fit for analog movement?
4. Observer vs. Command, one sentence each: which direction does each one flow?
5. Unity's new Input System (or Godot's InputMap, or Unreal's Enhanced Input) gives you which half of the Command pattern for free, and which half is still yours to build?

---

## Going deeper

- **Nystrom, [Command](https://gameprogrammingpatterns.com/command.html):** the chapter this module grew up admiring, free online. He goes deeper on undo stacks and on treating actor-binding as a first-class decision; read it after your A10 and enjoy recognizing every move.
