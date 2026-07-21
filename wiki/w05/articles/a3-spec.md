# Assignment 3: Physics & Collision

> **Tier:** 3 (C tier) · **Paced:** Week 5 · **Prerequisites for grading:** [[w02:a1-spec|Assignment 1]] and [[w03:a2-spec|Assignment 2]] passed.

## Goal

Build a scene where the physics simulation does real work: bodies with correct citizenships, motion driven by applied forces rather than transform manipulation, physical collision response, a non-physical trigger event, and layer-based control over which categories of objects interact.

## Description

Every object in a scene answers one question: [[bowling-alley|who has authority over its placement?]] Your code, explicitly, every frame (scripted transforms, which is everything you have built so far), or the physics engine (place it, apply forces, let it go).

This assignment proves you can manage the handoff: declare each object's authority arrangement, influence surrendered objects through forces instead of grabbing their transforms, distinguish a wall from a tripwire, and administrate the collision matrix.

The scene can extend your valley (the demo game builds a target range; feel free to be inspired) or stand alone. Any engine, including Three.js with a physics library, which is more work and proportionally more impressive. Graded from your narrated video, source as the audit trail.

## Requirements (all must pass)

**Requirement 1: Three Citizenships.**
The scene contains and the narration identifies at least one **static** body (environment), at least one **dynamic** body (fully simulated: falls, collides, topples), and at least one **kinematic** body (code- or animation-driven, pushes dynamics, unpushable itself). A moving platform, an Atlas-crate, a sweeping arm: anything that visibly demonstrates [[body-types|"the hand of god"]] behavior qualifies as the kinematic.

**Requirement 2: Force-Driven Motion.**
At least one dynamic object is set in motion by an applied force or impulse (thrown, launched, shoved), and the code walkthrough shows the application call. **No dynamic body in the project is moved by writing to its transform**, and the narration states the rule and why it exists. An impulse (one-shot) is expected; if you also apply a continuous force, it lives on the fixed clock, and saying so out loud earns you nothing on the checklist and some respect from me.

**Requirement 3: Physical Collision Response.**
Collision doing visible work: a stack toppling, an object knocked from a pedestal, a ball deflecting. The simulation resolves it; no scripted animation faking it. (I can tell. Faked physics moves too smoothly.)

**Requirement 4: A Trigger Event.**
A non-physical trigger zone that objects pass through freely, firing a visible game event on entry (color change, counter, sound, spawned object; a console log alone is too easy to fake and too hard to see). The video demonstrates both halves of the concept: free passage *and* the event firing, and the narration contrasts it with Requirement 3's physical response: [[collision-vs-trigger|one changes motion, the other changes state]].

**Requirement 5: The Collision Matrix.**
At least two layers (or your engine's channels/groups) with a deliberately disabled interaction, demonstrated: e.g., projectiles that ignore the player while striking everything else, shown point-blank on camera. The narration names the layers and states that [[layers-and-masks|the filtering is configuration, not code]].

**Requirement 6: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering Requirements 1 through 5, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you would change).

## Track your build

{{widget:checklist}}

## Common failure modes

Read [[gotchas|Gotchas and Judgment Calls]] before you record. The short version of the ones that fail this assignment most often: the silent trigger demonstrated confidently anyway, a dynamic body shepherded around by `transform.Translate`, an impulse multiplied by delta time, and a "kinematic" object that is actually static because it never moves on camera.

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.

*Next: [[recording-a3|Recording Your Assignment 3 Video]].*
