# Assignment 3: Physics & Collision

**Tier:** 3 (C tier)
**Paced:** Week 5
**Prerequisites for grading:** A1 and A2 passed.

---

## Goal

The student will build a scene where the physics simulation does real work: bodies with correct citizenships (static, kinematic, dynamic), motion driven by applied forces rather than transform manipulation, physical collision response, a non-physical trigger event, and layer-based control over which categories of objects interact.

## Description

Every object in a scene answers one question: who has authority over its placement? Your code, explicitly, every frame (scripted transforms, which is everything you've built so far), or the physics engine (place it, apply forces, let it go). This assignment proves you can manage the handoff: declare each object's authority arrangement, influence surrendered objects through forces instead of grabbing their transforms, distinguish a wall from a tripwire, and administrate the collision matrix. The scene can extend your valley (the demo game builds a target range; feel free to be inspired) or stand alone.

Any engine, including Three.js with a physics library, which is more work and proportionally more impressive. Graded from your narrated video, source as the audit trail.

---

## Requirements (all must pass)

**R1: Three Citizenships.**
The scene contains and the narration identifies at least one **static** body (environment), at least one **dynamic** body (fully simulated: falls, collides, topples), and at least one **kinematic** body (code- or animation-driven, pushes dynamics, unpushable itself). A moving platform, an Atlas-crate, a sweeping arm: anything that visibly demonstrates "the hand of god" behavior qualifies as the kinematic.

**R2: Force-Driven Motion.**
At least one dynamic object is set in motion by an applied force or impulse (thrown, launched, shoved), and the code walkthrough shows the application call. **No dynamic body in the project is moved by writing to its transform**, and the narration states the rule and why it exists. An impulse (one-shot) is expected; if you also apply a continuous force, it lives on the fixed clock, and saying so out loud earns you nothing on the checklist and some respect from me.

**R3: Physical Collision Response.**
Collision doing visible work: a stack toppling, an object knocked from a pedestal, a ball deflecting. The simulation resolves it; no scripted animation faking it. (I can tell. Faked physics moves too smoothly.)

**R4: A Trigger Event.**
A non-physical trigger zone that objects pass through freely, firing a visible game event on entry (color change, counter, sound, spawned object; a console log alone is too easy to fake and too hard to see). The video demonstrates both halves of the concept: free passage *and* the event firing, and the narration contrasts it with R3's physical response: one changes motion, the other changes state.

**R5: The Collision Matrix.**
At least two layers (or your engine's channels/groups) with a deliberately disabled interaction, demonstrated: e.g., projectiles that ignore the player while striking everything else, shown point-blank on camera. The narration names the layers and states that the filtering is configuration, not code.

**R6: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R5, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

- The silent trigger: a zone with no rigid body anywhere in the pair, firing nothing, demonstrated confidently anyway. The practice guide walks you into this trap and out of it; walk both directions before recording.
- A dynamic body shepherded around by `transform.Translate` or position assignment. This fails R2 even if it looks fine in the video, because the source is the audit trail and I do read it.
- An impulse multiplied by delta time (Week 3's rule, physics edition), or continuous force applied per-frame in the variable update so the push strength rides the framerate.
- A "kinematic" object that's actually static (never moves on camera) or actually dynamic (visibly shoved by something). R1 wants the citizenship *demonstrated*, not labeled.
- A "trigger" with isTrigger unchecked, physically blocking the player while also firing events. That's a wall with opinions, not a tripwire.
- Colliders sized by scaling the prefab parent instead of sizing the collider, shearing the physics world away from the visual one. Week 2's (1, 1, 1) rule was also a physics rule; now you know.

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
