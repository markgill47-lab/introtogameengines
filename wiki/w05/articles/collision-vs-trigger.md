# Collision vs. Trigger

Every collider makes one more declaration: is it *solid*, or is it a *tripwire*?

- A **collision** is physical. Two solid colliders meet, the simulation resolves it (bounce, stop, topple, push), and your code gets an event ("these two hit, this hard, at this point") in case gameplay cares. The wall stops the rock *and* tells you about it.
- A **trigger** (Unity's term; Godot says Area, Unreal says overlap) is non-physical. Objects pass through freely, and the *only* thing that happens is the event. Nothing bounces. Something *notices*. A checkpoint, a pickup radius, a pressure plate, the village gate that logs your arrival: all triggers.

## The design question underneath

The distinction maps exactly onto one question:

**Does this thing exist to change motion, or to change game state?**

Walls change motion. Checkpoints change state.

When it is both (a locked door that stops you *and* shows a message), that is a solid collider whose collision event does gameplay. Still one declaration, just a solid one. You do not need a trigger to get an event; you need a trigger to *skip the physics*.

## The famous gotcha

Most engines only generate collision and trigger events when **at least one object in the pair has a rigid body**.

A trigger arch and a player who is just a collider-on-a-capsule will pass through each other in *total silence*. No error. No warning. No log line saying "you probably meant to add a rigid body." Nothing.

This exact silence is the most-Googled physics problem in Unity's history. [[silent-gate|The practice guide walks you into it deliberately]], because you will hit it eventually and I would rather you hit it in a week where it is the lesson instead of at 2am in your final project.

The rule to memorize: **at least one body in the pair. Forever.**

## Aim events at game state, not at visuals

`OnTriggerEnter` firing "the player entered the gate zone" is a fact about the *game*.

What reacts to that fact (a log line today; a quest objective in Week 11) should not be hard-wired inside the trigger. Right now it will be, because you do not have the pattern for doing this properly yet.

You will. This trigger arch is on the shortlist of things Week 11 renovates, when [[w03:the-loop|the thing that fires the event]] and the thing that cares about it stop being the same object. File it and move on.

*Next: [[forces-and-impulses|Forces, Impulses, and the Handoff]], which is how you move a body you no longer own.*
