# Week 13 Concepts: Data-Driven Design and Persistence

> **How to use this module:** This document is the complete concept material for Week 13. You do not need the lectures to complete A11. Read this, then work through `Week13_Practice.md` in your engine, then check `A11_Spec.md` before you record. Data flows both directions this week: definitions in, saves out, and the week your game stops being hard-coded.

---

## Start with a trading card

Magic: The Gathering has printed over twenty-seven thousand distinct cards since 1993. Here's the question worth sitting with: how many times do you suppose they've rewritten the rules of the game? A handful of revisions in thirty years. Twenty-seven thousand cards, one rulebook. Every new set that ships (hundreds of new cards, new abilities, new interactions) ships *without changing how the game is played*, because a card isn't a rule. A card is **data**: a name, a cost, some numbers, and text that plugs into machinery the rulebook already defined. The designers' superpower is that inventing content and engineering rules became *different jobs*, done by different people, on different schedules, and the content people never need the rules people's permission to print something new.

That split (behavior in code, definitions in data) is **data-driven design**, it's the front half of this week, and if it sounds familiar, it should: this course's demo game has a collectable card system, and this is the week it gets built, as cards, because the pattern and the product are the same thing here. The back half is the same idea pointed the other direction: if definitions can flow *into* the game as data, the game's state can flow *out* as data, and that's what a save file is. One week, one concept, both arrows.

---

## 1. Why hard-coded numbers rot

Right now your goblin's speed lives in a field on a script, your rock's damage in another, your quest's crate-count in a third. It works, and here's the loop it creates: the designer (also you, but wearing a different hat) wants the goblin slower and the reward richer. So the programmer-you opens code, edits numbers, recompiles, replays, hands it back to designer-you, who says "more." Four more times. Every balance pass is a *code change*, every code change risks a code bug, and every iteration costs a compile.

Now scale the ache: ten enemy types as ten scripts that differ only in numbers is the Week 9 inheritance collapse arriving by copy-paste. And notice who's locked out entirely: a designer who isn't a programmer *cannot touch the game at all*. The teammate split the Standard Prefab gave you for art (artist owns Visuals, programmer owns logic) has no equivalent for tuning, until this week. Data-driven design is that same collaboration seam, cut through the middle of game design itself: **code defines what a thing *can do*; data defines each thing that *exists*.** One goblin script; ten goblin definitions. One card-resolution system; a whole binder of cards.

---

## 2. Definitions in: the data asset

Unity's tool for authorable data is the **ScriptableObject**: a class that holds fields but lives as an *asset file* in your project, editable in the inspector, no scene required:

```csharp
[CreateAssetMenu(menuName = "Game/Card")]
public class CardDefinition : ScriptableObject
{
    public string cardName;
    [TextArea] public string flavorText;
    public Sprite art;
    public BuffType buff;        // enum: Damage, Speed, MaxHealth...
    public float magnitude;
}
```

Right-click in the project window, create a card, fill in the fields. **You just authored game content with zero code.** Create nine more: a binder. The gameplay side reads whatever's equipped:

```csharp
public class CardSlots : MonoBehaviour
{
    public CardDefinition[] equipped = new CardDefinition[3];

    public float TotalBuff(BuffType type)
    {
        float total = 0f;
        foreach (var card in equipped)
            if (card != null && card.buff == type) total += card.magnitude;
        return total;
    }
}
```

And components *consult* the data instead of owning the numbers: `PlayerMotor` asks `slots.TotalBuff(BuffType.Speed)` and adds it to base speed; `PlayerCombat` asks for damage. The moment that sells the whole pattern, which A11 stages on camera: **author a brand-new card in the inspector (say, +3 speed, named something great) with the code editor closed, equip it, and watch gameplay change.** New content, no compile, no programmer. That's the Magic printing press, and now you own one.

When to reach for JSON or other portable text formats instead: when the data needs to leave the engine (mods, external tools, a spreadsheet-wielding designer, downloads). ScriptableObjects author beautifully but live inside Unity; JSON travels anywhere and reads in any editor. The course position: **ScriptableObjects for authored definitions, JSON for the save file**, which conveniently is the next section, and between them you'll have touched both ends of the tradeoff.

---

## 3. State out: what a save file actually is

Week 9 said it as a promise: *saves are the model, serialized.* Time to cash it. **Serialization** is converting live objects into a storable format and back; a save file is your game state, serialized, written to disk; loading is reading it back and *restoring the situation*. The entire discipline of Week 6 was preparation for this paragraph: if your facts live in owned state objects, saving is `Save(theFacts)`. If your facts are smeared through UI labels and component fields, this is the week that misery arrives, as scheduled.

The design question that matters more than any API: **what's worth saving?** The test is Week 6's, verbatim: *what would you need to reconstruct the situation?* Player position, health, gold, inventory, equipped cards, quest progress, which chests are opened: yes. The camera's damping velocity, the current particle positions, which panel is showing, anything in Visuals: no. You save the *model*. The view rebuilds itself from the model on load, the same way it always has every frame: that's what the separation was *for*.

```csharp
[System.Serializable]
public class SaveData
{
    public float[] playerPos = new float[3];
    public float health;
    public int gold;
    public string[] equippedCardIds;
    public string[] openedChests;
    public int questProgress;
}
```

Write it with `JsonUtility.ToJson(data, true)` to a file under `Application.persistentDataPath`; read and `FromJson` to load. The `true` gives you pretty-printing, and you should **open your save file in a text editor and read it**, because a save you can read is a save you can debug, and because seeing your game reduced to twelve plain lines of JSON is the model-view lesson complete: *that's the game. Everything else was presentation.*

And the test that separates a real save system from a demo: **quit to desktop. Relaunch. Load.** In-session restore proves almost nothing (everything was still in memory). The full round trip through the filesystem is the claim, and A11 requires it on camera.

---

## 4. IDs, not references (the classic serialization lesson)

Try to serialize the equipped cards *themselves* and you'll hit the week's deepest lesson: **you can't put an object reference in a file.** A reference is a memory address; tomorrow's launch has different addresses. What goes in the file is an **identity**: the card's name or ID string, and loading means *looking the definition back up* (a dictionary of all CardDefinitions by name, built once) and rewiring the reference. Save the ID, resolve on load. The same rule handled `openedChests` above: chests get stable ID strings, the file lists which IDs are open, and load walks the scene setting chest states to match.

This one idea (identity in the file, resolution at load) is most of what's hard about serialization anywhere, in any career: databases store foreign keys, not objects; network protocols send IDs, not pointers. You're learning it with trading cards, which is the gentlest version on offer.

Two smaller citizens of this section: **versioning**, one paragraph as promised: the day you add a field, old saves lack it. `JsonUtility` quietly defaults missing fields, which is survivable if defaults are sane (design them to be) and silent data loss if they're not; real products stamp a version number in the file and migrate. Know the failure exists; the practice guide has you cause it. And **the runtime-mutation gotcha**, Unity's classic: a ScriptableObject is a shared asset, so `equippedCard.magnitude += 1` at runtime edits *the asset itself*, for every user of it, permanently in the editor. Definitions are read-only at runtime; live modifications belong on instances or in your own state. Touch the binder, not the printing plates.

---

## 5. Cross-Engine Dictionary

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| Authorable data asset | ScriptableObject | custom Resource (`@export` fields) | DataAsset / DataTable | JSON files (imported or fetched) |
| Author a new one | Create menu, inspector | New Resource, inspector | Content browser | edit the JSON |
| Serialize | JsonUtility / JsonSerializer | JSON class, `store_string` | SaveGame object, `SaveGameToSlot` | `JSON.stringify` |
| Save location | Application.persistentDataPath | `user://` | slot system handles it | localStorage / download / server |
| The ID lookup | dictionary of definitions by name | ResourceLoader paths or a dict | asset registry / row names | object keyed by id |

Culture notes. Godot's custom Resources are ScriptableObjects with a different accent, and the `user://` path abstraction is tidier than anyone's. Unreal's **DataTable** (rows of structs, importable from CSV) is the designer-with-a-spreadsheet workflow shipped as a feature, and worth seeing once even if you don't use it. Three.js students: your definitions were always going to be JSON, so the two halves of this week collapse into one format for you; localStorage gives you persistence in two lines, with the caveat that it's per-browser, which is a fine thing to note in your video as a real deployment tradeoff.

---

## Check yourself

1. Twenty-seven thousand cards, a handful of rules revisions: restate that ratio in terms of your goblin problem.
2. Author a new card with the code editor closed: what changed in the project, what didn't, and who could have done it?
3. The save-worthiness test: apply it to player position, camera damping velocity, opened-chest IDs, and the currently-showing panel.
4. Why can't a reference go in a file, what goes instead, and what happens at load?
5. You buffed a card at runtime and now it's permanently buffed in the editor. Name the gotcha and the rule that prevents it.

---

## Going deeper

- **Nystrom, [Type Object](https://gameprogrammingpatterns.com/type-object.html) and [Prototype](https://gameprogrammingpatterns.com/prototype.html):** the pattern-book formalization of "definitions in data": what your CardDefinition is, named, with the tradeoffs mapped for when definitions need behavior, not just numbers.
