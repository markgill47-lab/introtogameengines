# Week 13 Practice Guide: The Binder and the File

> **How to use this guide:** The hands-on half of Week 13, mirroring the demo game's `W13_Treasure` session: cards get authored, slots apply them, a chest pays out from a loot table, and the game learns to survive a quit-to-desktop. Read `Week13_Concepts.md` first, and have `A11_Spec.md` open before you record.

---

## What you're building

- **Exercise 1: The Binder.** CardDefinitions and equip slots that visibly change gameplay.
- **Exercise 2: The Printing Press Moment.** A new card authored with zero code, on camera.
- **Exercise 3: The Chest.** A data-driven loot table paying out gold and cards.
- **Exercise 4: The File.** Save, quit to desktop, relaunch, restore. The full round trip.
- **Exercise 5: The Break.** Version drift, caused on purpose.

## Exercise 1: The Binder (30 minutes)

1. Create `CardDefinition` (concepts doc, section 2) and the `BuffType` enum (`Damage`, `Speed`, `MaxHealth` to start). Author two cards in the inspector: a damage card ("Bull's Strength," +10) and a speed card (name it better than "Speed Card"; flavor text is not graded but it is noticed).
2. Add `CardSlots` to the player bundle (it's a component; Week 9's composition keeps paying). Wire the consultations: `PlayerMotor` adds `slots.TotalBuff(BuffType.Speed)` to its speed, `PlayerCombat` adds the damage buff, `Health` folds MaxHealth in on initialization.
3. Equip via inspector for now and verify each buff *visibly* works: sprint timing across the valley with and without the speed card, dummy-smashing count with and without the damage card. A11 wants measurable change, so measure: same run, timed, twice.
4. A minimal equip UI if you want one (three slot images on the Week 6 canvas, populated from `equipped`): satisfying, not required this week. The demo game builds its equip screen here; yours can wait for your final project if the clock is tight.

## Exercise 2: The Printing Press Moment (10 minutes, the important ten)

Close your code editor. On camera, in one take: right-click → Create → Game → Card. Name it something with personality. Set MaxHealth +25. Write one line of flavor text. Drag it into a slot. Press play. More health. **Say the claim while it happens:** new content, zero compiles, and the person doing it never needed to be a programmer. This is the whole argument of data-driven design in forty-five seconds, and it's the anchor clip of your A11 video.

## Exercise 3: The Chest (25 minutes)

1. One more definition type, because loot tables are the pattern's second-best showcase:

```csharp
[CreateAssetMenu(menuName = "Game/LootTable")]
public class LootTable : ScriptableObject
{
    [System.Serializable]
    public class Entry
    {
        public CardDefinition card;    // null = gold instead
        public int goldAmount;
        public float weight;
    }
    public Entry[] entries;

    public Entry Roll(System.Random rng)
    {
        float total = 0f;
        foreach (var e in entries) total += e.weight;
        float pick = (float)rng.NextDouble() * total;
        foreach (var e in entries)
        {
            pick -= e.weight;
            if (pick <= 0f) return e;
        }
        return entries[entries.Length - 1];
    }
}
```

2. Build a `Chest` Standard Prefab: box in Visuals, trigger zone, a `chestId` string field (set uniquely per placed chest: "village_well_chest"), and an `opened` flag. On player entry, if unopened: roll the table, grant gold to GameState or the card to a collection list on `CardSlots`, fire a `GameEvents.ChestOpened(chestId)` announcement (Week 11 working for Week 13), and swing the lid (Week 8 working for Week 13).
3. Author the table in the inspector: mostly gold, one rare card at low weight. Note the shape of what you built: *drop rates are now design data.* Rebalancing your economy is inspector work, forever.

## Exercise 4: The File (30 minutes)

1. Create the `SaveData` class (concepts doc, section 3) and a `SaveSystem` component: `Save()` gathers facts (player position, health, gold, equipped card **names**, collected card names, opened chest IDs, quest progress) into a SaveData, `JsonUtility.ToJson(data, true)`, write to `Application.persistentDataPath + "/save.json"`. `Load()` reads, parses, and *restores*: reposition the player, set the facts, resolve card names through a dictionary built from all CardDefinitions (`Resources.LoadAll` or a registry asset), and walk the chests setting `opened` by ID. Bind Save and Load to keys, and put both on the pause menu because that's where they live in real games.
2. **The round trip, on camera:** play, collect, equip, open the rare chest, walk somewhere distinctive. Save. **Quit to desktop.** Relaunch. Load. You're standing in the distinctive spot, buffed, rich, and the chest stays open. That sequence is A11's R3 verbatim.
3. **Read the file aloud.** Open save.json in a text editor on camera and narrate it: here's the game, twelve lines, and here's everything that *isn't* in it (no camera, no particles, no panels) because the view rebuilds from the model. The Week 6 discipline, the Week 9 vocabulary, and this file are the same lesson at three ages.

## Exercise 5: The Break (10 minutes)

Version drift, experienced while it's cheap: add a new field to SaveData (`public int arrowCount = 20;`), rebuild, and load your *old* save. JsonUtility fills the missing field with the default. If the default is sane (20 arrows), the old save survives gracefully, and you just learned why save-file fields get *designed* defaults. Now make the default 0 and imagine it was maxHealth: that's silent data loss, the failure real products version-stamp against. One sentence about this in your video covers A11's versioning clause; the scar tissue is for you.

---

## Other Engines

- **Godot:** `CardDefinition` as a custom Resource (`class_name CardDefinition extends Resource` with `@export` fields); author .tres files in the inspector; the printing-press moment works identically. Loot table as another Resource. Saves: build a Dictionary, `JSON.stringify`, write to `user://save.json` with FileAccess; resolve cards by resource path or a name dictionary. The runtime-mutation gotcha exists here too (Resources are shared): same rule, touch instances not plates.
- **Unreal:** definitions as DataAssets (or a DataTable with a CSV, the spreadsheet workflow, worth trying once for the cultural experience). Saves: a SaveGame object with your fields, `SaveGameToSlot` / `LoadGameFromSlot` handles the file; store card row names / asset IDs, resolve via the asset registry. Quit-relaunch test unchanged.
- **Three.js:** your cards were always JSON; load them at startup into a definitions object keyed by id. Saves: `JSON.stringify` your model to localStorage (two lines) or offer a download/upload of the file for the full desktop-app feel. The ID-resolution lesson is identical, and the model-view payoff is loudest for you: your save is *literally* the state object you've been keeping clean all semester.

---

## Recording your A11 video

A shape that fits 2–5 minutes:

1. **The binder (45 sec):** two cards shown as assets, the slot consultation code in one glance, and a measured buff (the timed sprint, the smash count).
2. **The printing press (45 sec):** the zero-code card authored, equipped, and working, one take, claim narrated.
3. **The chest (30 sec):** a roll paying out, and the sentence "drop rates are design data now."
4. **The round trip (60–90 sec):** save, quit to desktop (actually quit; the taskbar counts), relaunch, load, restored. Then the file read aloud, including what isn't in it.
5. **The drift (15 sec):** the new-field experiment and its lesson, one sentence.
6. **Wrap (15 sec):** what fought you, what fixed it.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
