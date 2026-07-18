# Assignment 6: Animation

**Tier:** 3 (C tier)
**Paced:** Week 8
**Prerequisites for grading:** A1 through A5 passed.

---

## Goal

The student will drive character animation from game state through an animation state machine with smooth blending, author a property animation in-engine, time a gameplay effect to a specific animation frame, and keep authority over position in code while animation owns the pose.

## Description

Animation is data over time, and the skill this week is *directing* it: a state machine decides which clip is in charge, parameters carry facts from gameplay to the graph, blending covers the seams, and events fire gameplay at the exact frame it should land. The assignment also includes this course's signature maneuver: if your visible character is still a primitive, it gets replaced through the Visuals child with nothing else changing, and that nothing-else-changing is part of what's graded.

Any engine. Imported characters from Mixamo or equivalent; primitives remain fine for everything that isn't the animated character. Graded from your narrated video, source as the audit trail.

---

## Requirements (all must pass)

**R1: Three States, Driven by the Game.**
An animated character (or equivalent rigged object) with at least **three animation states** (e.g., idle / walk / run, or idle / walk / attack) whose changes are driven by input or game events, through **parameters feeding a state machine**, not direct play-this-clip calls from gameplay code. The code walkthrough shows the parameter writes; the graph walkthrough shows the decisions living in the graph.

**R2: Smooth Transitions.**
No pops. Transitions blend (crossfade or blend tree), and at least one pair of locomotion states blends **continuously along a parameter** (a speed-driven blend tree or blend space). The video shows the character moving through the blend, and the narration says why the instant switch looks broken.

**R3: One Authored Property Animation.**
At least one non-character animation authored in-engine (a door, gate, platform, light, material), with visible easing (not default linear unless linear is the right call, defended in one sentence), triggered by the world or the player rather than playing on loop from scene start.

**R4: An Animation-Timed Event.**
One gameplay effect synchronized to a specific frame of a clip via the engine's animation-event mechanism (event, notify, method track, or hand-rolled time check in code-first engines): a melee hit landing with the blade, a footstep sound on the footfall, a door latch on the close. Demonstrated, and the event marker shown in the clip.

**R5: Pose vs. Position.**
Code retains authority over the character's world position (Week 5's authority question, answered on camera): the character animates *in place* while your mover translates it, and the collider visibly stays with the body (gizmos or equivalent shown once). Root motion is off unless you defend the alternative arrangement in narration, in which case it must actually work.

**R6: The Graph, Shown.**
The animator graph on screen with states, transitions, and parameters named aloud. One sentence describing its structure. (No further commentary required. Two weeks from now this footage becomes personally significant.)

**R7: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R6, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

- Gameplay code calling clips directly (`Play("Walk")` sprinkled through the mover): a second, invisible state machine fighting the real one. R1's division is code sets facts, graph decides.
- The sluggish attack: an input-driven transition left on the finish-the-clip default (exit time), so actions fire late and feel like mud. The practice guide has you experience both settings; the spec expects the responsive one.
- The traveling clip: locomotion animation with baked travel walking the visuals out of the collider, so the body and its physics quietly divorce. "In place" clips, or a defended root-motion setup, but not the accidental middle.
- Damage or effects timed to the button press instead of the animation frame. R4 exists because the difference is visible, feelable, and the entire point of animation events.
- A pop between states shrugged off as style. R2 says blend; a hard cut needs to be a defended choice, and "I ran out of time" is not a defense, it's a resubmission.
- The property animation looping ambiently from scene start instead of being triggered. R3's trigger clause is what makes it a *game* animation instead of a screensaver.
- Character imported at the wrong scale and "fixed" by scaling the prefab parent. Week 2's rule hasn't moved: corrections live inside Visuals; the parent stays (1, 1, 1).

## Pass / Fail

Pass requires all seven requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
