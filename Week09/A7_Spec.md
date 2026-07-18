# Assignment 7: The Micro-Game (Tier 3 Capstone)

**Tier:** 3 (C tier), capstone
**Paced:** Week 9
**Prerequisites for grading:** A1 through A6 passed. This is the assignment that closes the tier: pass it and you have shipped a complete game.

---

## Goal

The student will assemble the six Tier 3 skills into one small, complete, playable game with a stated core loop, reachable win and loss states, a clean restart, a componentized architecture, and a documented act of judgment over an LLM's architecture critique.

## Description

No new technology. That's the point: this assignment is proof the parts were real. One verb or two, one threat, one goal, a loop under thirty seconds, playable start to finish by a stranger. Small, finished, and polished beats big and broken, and this is the week that stops being a slogan and becomes your deliverable.

Any engine. Build on your semester scene or a fresh one assembled from your prefabs. Graded from your narrated video (3–6 minutes for this one; the capstone gets more room), source as the audit trail.

---

## Requirements (all must pass)

**R1: A Complete Loop, Both Endings.**
The game runs the full circuit: start screen → play → a reachable **win** state and a reachable **loss** state (both demonstrated on camera) → restart, with the second lap proving a clean reset. Tier 3 games so far only knew how to die; victory wired through game state like any other fact is the new muscle, and both endings are equal citizens of the circuit.

**R2: The Core Loop, Stated and True.**
The narration opens with the game's core loop in one Week 4 sentence (verb, goal, threat, cycle length), and the game visibly *is* that sentence. Scope discipline is graded here: one verb (two if one is "move"), one threat, one goal. A second system you didn't need fails this faster than a missing one you did.

**R3: The Tier Tour.**
The video briskly demonstrates each tier skill doing real work in this game: deliberate hierarchy and prefabs (A1), frame-rate-independent movement with continuous and discrete input (A2), physics doing gameplay work plus a state-changing trigger (A3), owned game state with a live HUD (A4), the damped camera plus at least two event-driven juice channels with their etiquette intact (A5), and animation states with one animation-timed gameplay event (A6). Point and name; inventory, not drama.

**R4: A Bundle, Not a God.**
Player logic is decomposed into at least **three single-purpose components** (motor, combat, health, or your equivalent), shown in a brief code tour that names each component's one job. At least one component is demonstrated **reused on a non-player object** (health on a crate is the classic). The narration names where the model lives and where the view lives, in those words, and the player object contains no UI references. The refactor's before state (git history or a kept copy) shown for contrast is recommended and persuasive.

**R5: The Judgment.**
The build note documents an LLM architecture review of your own code: one critique you accepted and acted on, one you rejected, and a reason for each. The rejection is read with more interest than the acceptance. "It suggested nothing wrong" means your prompt was too polite; the practice guide's prompt shape fixes that.

**R6: Standard Deliverables, Capstone Edition.**
Narrated demo video (3–6 minutes) covering R1 through R4, source (repo link or zip), and the expanded build note per R5 (the standard paragraph plus the two verdicts).

---

## Common failure modes (read this before you record)

- Only one ending. A timer that kills you is a loss state; where's the win? R1 requires both, on camera, because "complete" means the player can succeed.
- The mansion: three verbs, two enemy types, a shop. The scope police are in the rubric. Cut it, ship the hallway, add the mansion after the pass if you love it.
- The god script, surviving. "I'll refactor after it works" is how every cabin got wired. R4 is checked in source, and a 300-line Player.cs fails it regardless of how the video is edited.
- A tier skill missing from the tour because it's not in the game: no trigger doing state work, juice with the etiquette stripped out, animation with no timed event. The checklist in the practice guide is the tour route; walk it before recording.
- The chatbot's review pasted wholesale as the build note, verdicts absent. R5 grades your judgment, not the model's prose.
- Restart shown once. Second lap or it didn't happen; this has been the rule since Week 6 and it has caught someone every semester since deadlines were invented.

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.

And for the record: a passing A7 means you have designed, built, juiced, and shipped a complete game, alone, in nine weeks, using an architecture you can defend. The C in this course is not a consolation prize.
