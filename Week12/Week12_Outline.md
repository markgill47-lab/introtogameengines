# Week 12: The Command Pattern

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** The pattern that unlocks superpowers. Input should not directly move the character; input should create command objects. Do that, and rebinding, replay, and undo fall out almost for free.

## Learning objectives
- Explain the Command pattern: requests as objects.
- Decouple input devices from actions (the controller layer of MVC, made real).
- Implement one superpower: key rebinding, input replay, or undo.
- Recognize commands in the wild: input buffers, netcode, turn queues, editor undo stacks.

## Concept material (to be written)
1. **The Problem:** `if (Input.GetKey(W)) player.MoveForward()` welds the keyboard to the player.
2. **Command:** wrap the request in an object, and let something else decide when (or whether) to execute it.
3. **The Three Superpowers,** each derived on paper: rebinding (swap the mapping), replay (record the stream), undo (execute/unexecute).
4. Worked example: a command-driven actor that the player AND a replay file can drive identically.
5. Where you've already met this: fighting-game input buffers, RTS orders, roguelike turns, every editor's undo stack.
6. Engine-neutral by nature, with per-engine notes on input APIs feeding a command layer.

## Practice guide (to be written)
- Unity walkthrough: refactor direct input to commands, then add one superpower end-to-end.
- Notes for the other engines.

## Assignment paced this week: A10, Input as Commands
Input as command objects, plus ONE of: key rebinding, replay, or undo, demonstrated working. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
