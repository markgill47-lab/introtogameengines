# Week 14 Practice Guide: The Drunkard and the Mine

> **How to use this guide:** The hands-on half of Week 14, mirroring the demo game's `W14_TheMine` session: the valley gets seeded scatter, the mine gets carved, loot gets placed on the carve, and the whole thing regenerates on a keypress. Read `Week14_Concepts.md` first, and have `A13_Spec.md` open before you record.

---

## What you're building

- **Exercise 1: The Scatter.** Seeded rock-and-tree placement across the valley.
- **Exercise 2: The Mine.** A drunkard's-walk cave, carved and instantiated.
- **Exercise 3: The Payout.** Loot chests placed on carved floor, rolling Week 13's tables.
- **Exercise 4: The Audit.** Your guardrail, checked across a hundred seeds.
- **Exercise 5: The Config.** Generator parameters as data, because Week 13 is standing right there.

## Exercise 1: The Scatter (25 minutes)

Warm up with placement before tackling structure:

```csharp
using UnityEngine;

public class ValleyScatter : MonoBehaviour
{
    public int seed = 42;
    public int rockCount = 40;
    public GameObject[] rockPrefabs;      // 2-3 variants
    public Vector2 areaSize = new Vector2(60, 60);

    private Transform root;

    void Start() => Generate();

    public void Generate()
    {
        if (root != null) Destroy(root.gameObject);
        root = new GameObject("GeneratedRoot_Scatter").transform;

        var rng = new System.Random(seed);          // private stream. not the bathtub.
        for (int i = 0; i < rockCount; i++)
        {
            var prefab = rockPrefabs[rng.Next(rockPrefabs.Length)];
            var pos = new Vector3(
                (float)(rng.NextDouble() - 0.5) * areaSize.x, 0,
                (float)(rng.NextDouble() - 0.5) * areaSize.y);
            var rock = Instantiate(prefab, pos,
                Quaternion.Euler(0, (float)rng.NextDouble() * 360f, 0), root);

            float noise = Mathf.PerlinNoise(pos.x * 0.05f, pos.z * 0.05f);   // coherent size regions
            rock.transform.localScale = Vector3.one * Mathf.Lerp(0.6f, 1.8f, noise);
        }
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.G)) Generate();
        if (Input.GetKeyDown(KeyCode.H)) { seed++; Generate(); }
    }
}
```

Play it and perform the week's core demonstration for your recorder: **G, G, G** (same seed: the identical valley, three times), then **H** (new seed: a different valley). Notice the Perlin touch while you're here: rock sizes vary *in regions* (big-boulder country, gravel flats) instead of dice-rolling per rock, because neighbors agree under coherent noise. Dice for the *which*, noise for the *how big*: both families, one exercise.

## Exercise 2: The Mine (40 minutes)

The drunkard carves a grid; the grid becomes prefabs:

```csharp
public class MineGenerator : MonoBehaviour
{
    public int seed = 7;
    public int width = 40, height = 40;
    public int steps = 800;
    public GameObject floorPrefab, wallPrefab, entrancePrefab, exitPrefab;

    private bool[,] carved;
    private Transform root;

    public void Generate()
    {
        if (root != null) Destroy(root.gameObject);
        root = new GameObject("GeneratedRoot_Mine").transform;
        carved = new bool[width, height];

        var rng = new System.Random(seed);
        int x = width / 2, z = height / 2;
        int startX = x, startZ = z;
        int lastX = x, lastZ = z;

        for (int i = 0; i < steps; i++)
        {
            carved[x, z] = true;
            lastX = x; lastZ = z;
            switch (rng.Next(4))                    // stumble
            {
                case 0: x = Mathf.Clamp(x + 1, 1, width - 2); break;
                case 1: x = Mathf.Clamp(x - 1, 1, width - 2); break;
                case 2: z = Mathf.Clamp(z + 1, 1, height - 2); break;
                case 3: z = Mathf.Clamp(z - 1, 1, height - 2); break;
            }
        }

        for (int i = 0; i < width; i++)
            for (int j = 0; j < height; j++)
            {
                var pos = new Vector3(i * 2f, 0, j * 2f);
                if (carved[i, j]) Instantiate(floorPrefab, pos, Quaternion.identity, root);
                else if (HasCarvedNeighbor(i, j)) Instantiate(wallPrefab, pos + Vector3.up, Quaternion.identity, root);
            }

        Instantiate(entrancePrefab, new Vector3(startX * 2f, 0, startZ * 2f), Quaternion.identity, root);
        Instantiate(exitPrefab, new Vector3(lastX * 2f, 0, lastZ * 2f), Quaternion.identity, root);
    }
    // HasCarvedNeighbor: check the 8 surrounding cells; walls only where they face the cave.
}
```

Wander your mine (drop your player in at the entrance; your Week 7 camera makes it surprisingly atmospheric with a couple of generated torches). Then the narration moment that A13's R4 wants: **the exit is reachable by construction.** The drunkard placed it on the last tile he carved, and he *walked* every tile he carved, so a path exists, provably, without a validation pass. Say the principle: constructive guarantees beat checking, when you can get them.

## Exercise 3: The Payout (15 minutes)

Chest placement, on the carve: collect every carved cell during generation into a list, then place 3-ish chests at cells drawn from the *same private rng* (so chest positions are part of the seed's identity: seed 7 always hides the rare card in the same alcove: speedrunners are built from this). Wire the chests to last week's `LootTable`. Two weeks of systems just composed: generated space, data-driven treasure, and neither knew about the other.

## Exercise 4: The Audit (15 minutes)

Prove the guardrail like an engineer instead of a tourist:

```csharp
    [ContextMenu("Audit 100 Seeds")]
    void Audit()
    {
        int failures = 0;
        for (int s = 0; s < 100; s++)
        {
            // regenerate the CARVE ONLY (skip instantiation) with seed s,
            // then flood-fill from entrance; count reachable vs carved.
            if (!AllCarvedReachable(s)) failures++;
        }
        Debug.Log($"Audit: {failures} failures in 100 seeds");
    }
```

For the drunkard, the audit should report zero (that's what "constructive" means, verified anyway, which is exactly the right amount of paranoia). Then make it *fail* on purpose: add a second, unconnected drunkard who starts in a far corner, re-run the audit, and watch failures appear. Now you've seen both worlds: a guarantee, and the check that would catch its absence. Either one satisfies A13; knowing which one you have is the requirement.

## Exercise 5: The Config (10 minutes)

Move `steps`, `width`, `height`, chest count, and rock density into a `GeneratorConfig` ScriptableObject. Author a second config ("Deep Mine": more steps, more chests) and regenerate from it with zero code changes. Week 13's printing press, now printing *spaces*. One sentence in your video covers A13's R5, and your final project just inherited a level-design workflow.

---

## Other Engines

- **Godot:** identical structure: `RandomNumberGenerator` with `.seed` as the private stream, `scene.instantiate()` under a root Node3D, `queue_free()` to regenerate. Use built-in `FastNoiseLite` for the scatter's coherent sizing. The grid, the drunkard, and the audit are engine-free code and translate line for line.
- **Unreal:** `FRandomStream(seed)` is the private stream as a type; `SpawnActor` under a folder/parent; the carve grid lives in a plain C++ array or Blueprint array. Consider the audit as an editor utility. Unreal's PCG framework exists and is industrial-strength; hand-roll first for the same reason we hand-rolled cameras before Cinemachine.
- **Three.js:** your flex week, as promised. Do the mine as instanced meshes for the walls (one draw call, thousands of cells), or skip prefab-placement entirely and generate *geometry*: a terrain heightmap from `simplex-noise` fed into a `PlaneGeometry`'s vertices is thirty lines and genuinely beautiful with a Week 7 camera drifting over it. Seeded RNG via `seedrandom` or a ten-line mulberry32. The audit is a plain function over your grid; no engine required, which by Week 14 is your whole brand.

---

## Recording your A13 video

A shape that fits 2–5 minutes:

1. **The equation (30 sec):** G-G-G then H on the scatter: same seed same world, new seed new world, narrated as `content = generate(seed)`.
2. **The mine (60–90 sec):** a walk through one seed's mine, then regeneration to a different mine, then *back to the first seed* on camera: the reproducibility claim, demonstrated round-trip. Show the private RNG in the walkthrough and say why it isn't the global one.
3. **The guardrail (45 sec):** your reachability story: constructive (and the audit that confirms zero failures) or validation-and-reroll (and the audit catching a bad seed). Show the audit number.
4. **The payout and the config (30 sec):** a chest found where the seed put it; a config swap regenerating a different-shaped mine with zero code.
5. **Wrap (15 sec):** what fought you, what fixed it, and one arrangement your generator produced that you wouldn't have drawn.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
