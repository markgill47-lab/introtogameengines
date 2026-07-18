# Assignment 13: Procedural Generation

**Tier:** 1 (A tier)
**Paced:** Week 14
**Prerequisites for grading:** All Tier 3 and Tier 2 assignments passed.

---

## Goal

The student will build a seeded generator that produces meaningfully varied, valid, playable content from prefab instantiation (or generated geometry), reproduces identically from the same seed, carries a stated guardrail against pathological output, and exposes its parameters as data.

## Description

Content as computation: `world = generate(seed)`. This assignment proves you can run that equation responsibly: a private random stream so the world doesn't depend on what the torches are doing, clean regeneration so the generator is a system rather than a one-shot script, and a reachability story so the player never meets the seed where the exit doesn't exist.

Any engine (Three.js students: generated geometry is explicitly welcome as the content). A dungeon, a terrain, a scattered forest, a level layout: the noun is yours. Graded from your narrated video, source as the audit trail.

---

## Requirements (all must pass)

**R1: Seeded and Reproducible.**
The generator uses a **private seeded RNG** (not the engine's global random state), shown in the walkthrough. On camera: generate with seed A, regenerate with seed B (different world), then **return to seed A and get the identical world**. The round trip is the claim; two-thirds of it proves nothing.

**R2: Real Content, Cleanly Regenerable.**
Output is real game content (instantiated prefabs or generated geometry the player can traverse/interact with), parented under a generated root, with regeneration that leaves **no orphans and no duplicates** (hierarchy shown after several regenerations). Playability demonstrated: the player walks the generated space or interacts with the generated things.

**R3: A Technique, Owned.**
At least one classic technique implemented and named (random walk, rooms-and-corridors, coherent noise, weighted placement, or a defensible combination), with one sentence on why it fits the content. **Meaningful variation** is graded here: different seeds produce structurally different results, not the same arrangement reshuffled; and variation within a world (sizes, variants, densities) shows deliberate use of the randomness, not uniform confetti.

**R4: The Guardrail.**
A stated, demonstrated answer to "how do you know the output is usable?": either a **constructive guarantee** (explained: why the algorithm cannot produce the failure) or **validation with re-roll** (shown catching or measuring failures). An audit across many seeds (the practice guide's hundred-seed loop) with its result narrated is the expected evidence. "I generated it a bunch and it looked fine" names the failure mode, not the guardrail.

**R5: Parameters as Data.**
Generator tuning (counts, sizes, densities, steps) externalized per Week 13 (data asset, resource, config object), with one parameter changed and the world regenerated **with zero code edits** on camera.

**R6: Standard Deliverables.**
Narrated demo video (2–5 minutes) covering R1 through R5, source (repo link or zip), and a one-paragraph build note (what AI produced, what you fixed, what you'd change).

---

## Common failure modes (read this before you record)

- The bathtub: `UnityEngine.Random` (or your engine's global stream) inside the generator, so unrelated effects reorder the world and seed A stops meaning anything. R1 is checked in source.
- Regeneration that piles duplicates under the old ones, or leaves last run's chests floating in the new run's walls. The generated-root rule is one line; R2 looks at the hierarchy.
- Generation spread across frames in Update, or re-running every frame. Generators run once, on demand.
- Unreachable or unusable output shrugged off as bad luck. R4 exists because your players don't reroll; they refund.
- Uniform confetti: identical prefabs scattered at identical scales with dice-per-decision randomness everywhere, including where coherence belongs. R3's variation clause is where "random" gets distinguished from "interesting."
- A seed that exists only as a hardcoded field nobody can see or set. Display it, log it, or expose it; a seed you can't read back is a bug report you can't file. (Not an automatic fail; it will be named, and your future self will thank the requirement.)

## Pass / Fail

Pass requires all six requirements. A failed submission comes back with the specific requirement(s) that missed. Fix and resubmit. The queue is the queue.
