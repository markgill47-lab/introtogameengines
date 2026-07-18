# Week 13: Data-Driven Design and Persistence

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** Data in both directions: behavior and tuning defined in data going in, game state serialized out for save/load. The week your game stops being hard-coded.

## Learning objectives
- Externalize tuning and content into data assets/files, and rebalance without touching code.
- Explain serialization: what state is worth saving, and what it means to restore it.
- Implement save/load for meaningful game state.
- Articulate what "state" even is. (Weeks 6 and 10 come home to roost.)

## Concept material (to be written)
1. **Why Hard-Coded Numbers Rot:** the designer/programmer loop, and the case for data.
2. **Data-Driven Behavior:** definitions in data, behavior in code. Enemies, items, and waves as data.
3. **Formats:** engine-native assets (ScriptableObjects, Resources, DataAssets) vs. portable files (JSON), and the tradeoffs.
4. **Serialization:** choosing what to save. Player state, world state, progress. Not the whole scene.
5. **Save/Load Mechanics:** write, read, restore, and the "did it really restore?" test.
6. Versioning in one paragraph: what happens when you save with v1 and load with v2.
7. **Cross-Engine Dictionary:** ScriptableObject/JsonUtility (Unity), Resource/JSON (Godot), DataAsset/SaveGame (Unreal), JSON/IndexedDB-or-file (Three.js).

## Practice guide (to be written)
- Unity walkthrough: enemy types as ScriptableObjects, then save/load of position, score, and world state.
- Equivalent sketches for the other engines.

## Assignment paced this week: A11, Data & Persistence
At least two behaviors/entities defined purely in data, plus working save/load that demonstrably restores state. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
