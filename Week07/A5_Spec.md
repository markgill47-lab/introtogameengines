# Assignment 5: Cameras & Game Feel

**Tier:** 3 (C tier)
**Paced:** Week 7
**Prerequisites for grading:** A1 through A4 passed.

---

## Goal

The student will build a damped camera rig that follows a moving target, and wrap gameplay events in at least three distinct channels of event-driven feedback (visual, audio, camera), implemented with professional etiquette: thresholds, decay, meaning-scaled intensity, and an accessibility control.

## Description

The same mechanic feels cheap or engineered depending on the feedback wrapped around it, and the camera decides what the player sees it through. This assignment proves you can build the pursuing camera every third-person game uses, punctuate events with juice that scales to their meaning, and show the difference on demand: a dry/juiced comparison is part of the deliverable, because the argument of this week is best made by your own build.

Any engine. Your existing scene with its physics range is the natural host. Graded from your narrated video, source as the audit trail.

---

## Requirements (all must pass)

**R1: The Damped Follow Camera.**
A camera that follows a moving player/target with visible smoothing, implemented frame-rate-correctly (an engine smoothing function or dt-scaled decay, not a fixed per-frame fraction) and updated in the end-of-frame slot. The video demonstrates the damping by contrast: a moment of the welded (near-zero smoothing) version against the damped one, with narration naming what changed. An orbit control is welcome and not required.

**R2: Three Channels on Real Events.**
At least **three distinct feedback channels** tied to gameplay events (not ambient): a particle effect at the event location, an event sound, and camera shake (a fourth channel, like damage numbers or a screen flash, may substitute for shake if shake genuinely doesn't fit your scene, but the substitution needs a sentence of justification). Feedback must be **event-driven**: fired by collisions, pickups, or actions, not looping in the background.

**R3: Etiquette.**
The feedback demonstrates at least three of the four professional touches, named in narration: an intensity **threshold** (small contacts stay silent), **meaning-scaled intensity** (harder events produce proportionally stronger feedback), **pitch or variation** on repeated sounds, and **decaying shake** (trauma-style: returns to calm within about a second). A permanent earthquake or a machine-gun of resting-contact thunks fails this requirement by demonstration.

**R4: The Off Switch.**
Camera shake (or your substituted strongest effect) has an exposed control to disable or reduce it, flipped on camera. Accessibility is a requirement, not a flourish.

**R5: Dry vs. Juiced.**
The same gameplay moment shown both ways: feedback off, then on (a master toggle is the clean mechanism; before/after builds are acceptable). One sentence of narration on what the feedback is *communicating*, not just that it exists.

**R6: One Decorative Effect.**
At least one looping, place-establishing effect (a torch, a fountain, weather, ambience) with a looping element and, if audio, 3D attenuation demonstrated by approach. The narration contrasts it with the event-driven kind: one marks moments, the other makes places.

**R7: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R6, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

- The welded camera: no damping, or "damping" via a fixed per-frame lerp fraction that runs differently at different framerates. Week 3 taught you to smell this; R1 checks that you did.
- Follow code in the regular update slot, jittering against the moving target. The comparison in the practice guide exists so you've seen the artifact and its cure.
- Shake and follow fighting over one transform, producing a camera that drifts off its target after every impact. Two concerns, two nodes; the rig structure in the practice guide is the fix.
- Shake without decay, or resting contacts thunking sixty times a second. R3 fails loudly on both, and so do your players.
- Feedback that's all ambient: torches and music but nothing tied to events. R2's word is *event-driven*; the decorative kind is R6's separate job.
- The missing off switch, or one that exists in code but never gets flipped on camera. R4 is graded from the video.
- Every effect at maximum on every event: uniform shouting instead of meaning-scaled feedback. Juice is a currency; R3 checks you're spending it deliberately.

## Pass / Fail

Pass requires all seven requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
