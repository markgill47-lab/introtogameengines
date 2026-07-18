# Week 14 Concepts: Procedural Generation

> **How to use this module:** This document is the complete concept material for Week 14. You do not need the lectures to complete A13. Read this, then work through `Week14_Practice.md` in your engine, then check `A13_Spec.md` before you record. Tier 1 opens here: content from algorithms, reproducible on demand.

---

## Start with a number strangers trade like treasure

Somewhere right now, two people who have never met are exchanging a string of digits on a forum, and both of them will spawn into *the same Minecraft world*: same mountains, same cave mouth behind the waterfall, same village two hills east. Nobody uploaded a world file. Nothing was copied. The world was never *stored* anywhere: it's **derived**, computed from that number, and anyone holding the number can derive it again, identically, forever.

Sit with what that means: billions of explorable worlds, effectively zero storage, because content became a *function*. `world = generate(seed)`. Change the seed, new world; keep the seed, same world, every time, on every machine. That one equation is this entire week: **procedural generation** is content as computation, and the **seed** is the whole recipe compressed into a number small enough to trade like a baseball card.

Your valley gets its mine this week: rooms and corridors that are different every run and identical every time you ask them to be. The second half of that sentence is the half beginners skip, and it's the half that makes the first half debuggable.

---

## 1. Why procgen, and the tradeoff nobody escapes

Three legitimate reasons to generate content, and one price:

- **Replayability.** A roguelike's dungeon is new every run, so the *systems* stay fresh long after any authored layout would be memorized. Generation multiplies your content by infinity, in one specific dimension.
- **Scale.** No team hand-places a galaxy. When the design calls for more space than authoring hours exist, generation is how the space gets made.
- **Surprise, for the developer too.** A good generator produces arrangements you didn't foresee, and some of them are better than what you'd have drawn.

The price: **generated content is typical; authored content is intentional.** Celeste's levels teach, escalate, and land jokes because a human placed every spike with a thought about you. A generator produces the *average* of its rules, forever: it will never once set up a moment three rooms in advance. The mature position isn't choosing sides; it's the mix: generate the terrain, author the landmarks; generate the dungeon, author the boss room. Know which parts of your design need intention, and spend your authoring hours exactly there. (Week 4's scope lecture, wearing a lab coat.)

---

## 2. Seeds: the debugging superpower

A computer's "random" is a lie you can rely on: a **pseudo-random number generator** is a deterministic sequence that merely *looks* chaotic, and the seed is where the sequence starts. Same seed, same sequence, same rolls, same world. That determinism is not a limitation to work around; it's the tool:

- **The bug that reproduces.** "The mine generated with no exit" is unfixable if every run is new. With a seed, it's *seed 4172, every time*, and you can watch the failure happen in a debugger until you understand it. A procgen bug without a seed is a ghost; with a seed it's a specimen.
- **Sharing and dailies.** The Minecraft forum trade; every roguelike's daily challenge (everyone plays seed-of-the-day, compare scores). Features, free, falling out of determinism.
- **The Week 12 receipt, closed.** The replay superpower warned you: unseeded randomness makes ghosts drift. Now you hold the other half: seed the generator, and *replayed inputs meet identical worlds*. Determinism composes.

The implementation rule that makes it all work: **your generator owns a private RNG.** `new System.Random(seed)`, held by the generator, consulted only by the generator. The global `UnityEngine.Random` is a shared bathtub: anything anywhere (a particle burst, a pitch variance from Week 7) draws from it, which means *the order of unrelated events changes your world*. One private stream per purpose, seeded at the top, and your mine stops caring what the torches are doing.

---

## 3. The technique tour: pick your weapon

Four families cover most of what ships. A13 asks you to implement one *well*, not all four politely:

- **Weighted tables** (you built one last week): discrete choices with tuned odds. Loot, enemy variants, which prefab this tree is. The gateway technique, already in your pocket, and A13 will happily count it *in combination with* placement logic.
- **The random walk** (a.k.a. the drunkard): a digger starts in the middle of a grid of solid rock and stumbles, carving as it goes. Stupid, ten lines, and it produces organic caves with one glorious property for free: **everything the drunkard carved is connected**, because he walked there. Constructive guarantees beat validation when you can get them, and this is the cleanest example you'll ever meet.
- **Rooms and corridors:** scatter rectangular rooms (reject overlaps), then connect them with L-shaped corridors, classically by walking room-to-room in sequence. More structured than the drunkard, still simple, and the shape of every roguelike floor since 1980. The connection step *is* the reachability guarantee if you connect every room to the chain.
- **Noise** (Perlin/simplex): the previous techniques roll dice per decision; noise gives you *coherent* randomness: a smooth function over space where neighboring points agree. Sample it per position and you get rolling terrain heights, forest density, moisture maps: anything that should vary *gradually*. One line in Unity (`Mathf.PerlinNoise(x * scale, z * scale)`), and the scale factor is the whole art: zoom out for continents, in for gravel.

(Grammars, wave-function collapse, and friends exist beyond these, and the tutorial lane of the final project is where they live in this course. The four above are the load-bearing classics.)

---

## 4. Instantiation: the part that's already built

Here's the pleasant surprise of Week 14: the *hard* half of generation, for you, is already done, because generation output is just **prefab instantiation with computed transforms**, and you've owned prefabs since Week 2. The generator's loop is: decide (technique above), then `Instantiate(floorPrefab, position, rotation, generatedRoot)`. All your discipline pays at once: prefabs mean the generator composes *finished things* (a torch that already crackles, a chest that already rolls loot), and the Standard Prefab means generated content is swappable-art content like everything else.

One structural rule, non-negotiable and cheap: **everything generated goes under one parent** (`GeneratedRoot`, created by the generator). Regeneration is then `Destroy` the root, make a new one, run again: clean slate, no orphans, no duplicates piling up in the hierarchy. A generator that can't cleanly regenerate isn't a generator; it's a one-shot script with ambitions, and the pile of duplicate mines it leaves behind is the second-most-common A13 failure. (The first is the bathtub.)

---

## 5. Guardrails: generate, then guarantee

A generator's rules produce the *typical*; your players will find the *pathological*. The seed where the loot chest spawns inside a wall. The layout where the exit is sealed. Guardrails are how generated content earns the right to ship, in two flavors:

- **Constructive guarantees:** design the algorithm so the bad thing can't happen. The drunkard's connectivity; corridors connecting every room by construction; spawning loot only on carved floor tiles. Free correctness, always preferred when available.
- **Validation and re-roll:** when construction can't promise, *check*: after generating, walk the grid (a flood fill from the entrance answers "is the exit reachable?" in a dozen lines), and if the check fails, reject and regenerate with the next seed. Validation costs milliseconds; a softlocked player costs a refund.

And the testing habit that makes procgen professional: **run the generator across many seeds, in a loop, and look at the results** (or better, assert your validation over seeds 0 through 500 and read the failure count). A generator you've seen five outputs from is a demo; one you've audited five hundred from is a system. A13's narration asks what your guardrail is and how you know it holds; "I generated it a bunch and it seemed fine" is an answer, just not a good one.

---

## 6. Cross-Engine Dictionary

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| Private seeded RNG | `new System.Random(seed)` | `RandomNumberGenerator`, `.seed` | `FRandomStream(seed)` | mulberry32 or seedrandom (npm) |
| Spawn a prefab | `Instantiate(prefab, pos, rot, parent)` | `scene.instantiate()`, `add_child` | `SpawnActor` | `makeThing()`, `scene.add` |
| Generated root | empty Transform parent | a Node3D | an actor folder / attach parent | a `THREE.Group` |
| Coherent noise | `Mathf.PerlinNoise(x, y)` | `FastNoiseLite` (built in, excellent) | noise material/functions, or a lib | `simplex-noise` (npm) |
| Regenerate | destroy root, rebuild | `queue_free()` root, rebuild | destroy attached, rebuild | remove group, rebuild |

Culture notes. Godot ships `FastNoiseLite` in the box, which is the best out-of-the-box noise story on this table. Unreal's `FRandomStream` is the private-RNG rule as a first-class type, which tells you how load-bearing the bathtub lesson is. Three.js students: this is your week to run up the score: procedural *geometry* (not just placement, but computed meshes: terrain from a heightmap of noise, in a few dozen lines of BufferGeometry) is where your engine genuinely outclasses the others, and A13 will happily accept generated geometry as generated content.

---

## Check yourself

1. Nothing was copied, both strangers stand in the same world: what is actually being traded, and what equation makes it work?
2. The bathtub: why does a torch's pitch variance change your mine layout if you use the global RNG, and what's the rule that stops it?
3. The drunkard guarantees something the room-scatter approach has to check for. Name both halves and the general principle.
4. Dice-per-decision versus coherent noise: which generates a loot table's payout, and which generates a hillside, and why can't they swap jobs?
5. Your generator ran once and looks great. What two habits separate that from a system you'd ship?

---

## Going deeper

- **The [PCG Book](https://www.pcgbook.com/):** all chapters free from the authors. Chapter 3 (constructive generation) is this module with a graduate degree; the dungeon chapter is your mine's family history.
- **Red Blob Games, [terrain from noise](https://www.redblobgames.com/maps/terrain-from-noise/):** the best interactive noise explanation on the internet. Slide the sliders; understand coherence forever.
- **Sebastian Lague's procedural series** (YouTube, free): terrain, caves, and planets, built on camera. The visual companion to everything in this module.
