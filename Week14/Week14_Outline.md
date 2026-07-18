# Week 14: Procedural Generation

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** Content from algorithms: levels, terrain, and loot that are different every run, but reproducible on demand. Same seed, same world. That sentence is a debugging superpower and we will treat it like one.

## Learning objectives
- Generate content algorithmically at runtime (instantiate from code, not hand-placement).
- Use seeded randomness, and explain why reproducibility matters (debugging, sharing, daily runs).
- Apply at least one classic technique: noise-based terrain, room/corridor dungeons, weighted loot tables, or rule-based placement.
- Tune generators with data. (Week 13 callback: generator parameters are tuning data.)

## Concept material (to be written)
1. **Why ProcGen:** replayability, scale, and the tradeoff (authored vs. generated).
2. **Randomness and Seeds:** same seed, same world.
3. **Technique Tour,** pick your weapon: noise (Perlin/simplex) for terrain, BSP/random-walk for dungeons, weighted tables for loot, grammar/rule systems briefly.
4. **Instantiation at Runtime:** spawning, positioning, and parenting generated content (Week 2 callback).
5. **Guardrails:** validating generated content. Is the exit reachable?
6. Cross-engine notes: prefab instantiation (Unity), scene instancing (Godot), spawning (Unreal), procedural geometry (Three.js, where it truly shines).

## Practice guide (to be written)
- Unity walkthrough: seeded random level from prefabs, noise-driven variation, regenerate-on-demand.
- Equivalent sketches for the other engines.

## Assignment paced this week: A13, Procedural Generation
A seeded generator producing meaningfully varied, valid content; the same seed must reproduce the same result. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
