# Week 11 Concepts: The Observer Pattern

> **How to use this module:** This document is the complete concept material for Week 11. You do not need the lectures to complete A9. Read this, then work through `Week11_Practice.md` in your engine, then check `A9_Spec.md` before you record. Two receipts come due this week: Week 6's polling HUD and Week 7's crate that gropes across the scene for the camera. Both get paid, on camera, in your own code.

---

## Start with the restaurant pager

You order at the counter of a busy lunch place, and they hand you a plastic puck with blinking lights. You find a table. You talk to your friend. You check your phone. Eleven minutes later the puck buzzes, you walk up, and your food is there.

Now run the same lunch *without* the pager. You order, and because you have no way of knowing when the food's ready, you walk to the counter and ask. Not ready. You sit, wait thirty seconds, walk up, ask again. Not ready. Again. Again. Twenty-two trips, twenty-one of them wasted, the counter staff learning your face and hating it, and you never actually got to talk to your friend because your whole lunch became *checking*.

The second lunch is your Week 6 HUD. `Update()` walks to the counter sixty times a second and asks "did health change? did health change? did health change?" and fifty-nine-plus times a second the answer is no. It works, we said so at the time, and it should have bothered you a little, and now we fix it. The pager is the **Observer pattern**: you register interest once, you go live your life, and *the thing that knows* tells *the things that care* at the exact moment there's something to know. And notice one more property of the pager, because it's the deep one: the kitchen has no idea who you are. It doesn't know your name, your table, or how many of you there are. It fires the pager. Whoever holds a pager, buzzes. That anonymity is about to do a lot of architectural work.

---

## 1. The problem, measured in couplings

Line up this week's patients:

- **The polling HUD (Week 6's receipt):** the display grips the state permanently, asking every frame. Multiply it: achievements poll the score, the quest tracker polls objectives, audio polls everything. N interested systems times M interesting facts, checked every frame, forever.
- **The groping crate (Week 7's receipt):** `FindFirstObjectByType<CameraShake>()` inside `ImpactJuice`: a crate that *personally knows* the camera exists and rummages through the scene to poke it. Add a hit-sound manager and a damage-number spawner and the crate needs to know three strangers by name.
- **The direction problem underneath both:** in each case, the thing that *cares* about a change has wired itself to the thing that *has* the information. Every new interested party means editing the source, or gripping it from outside. The knowing flows the wrong way.

Week 9 gave you the word: coupling, in the exact "if I change this, what else breaks" sense. The pattern this week reverses the direction of knowing: sources announce; interested parties subscribe; **the source never learns who's listening.**

---

## 2. The pattern: subjects, observers, subscribe and notify

Four pieces of vocabulary and one inversion:

- The **subject** is the thing with information: `Health`, the score, a trigger zone. It exposes an *event*: a named thing-that-happens ("damage was taken," "gold changed," "zone was entered").
- The **observers** are the interested parties: the HUD, the shake, the achievement system.
- **Subscribe:** an observer registers interest, once, at setup. Getting handed the pager.
- **Notify:** when the fact changes, the subject fires the event, and every current subscriber runs its reaction. The buzz.

In C#, the mechanism is built into the language:

```csharp
public class Health : MonoBehaviour
{
    public float current, max;

    public event Action<float, float> OnChanged;   // (current, max)
    public event Action OnDied;

    public void TakeDamage(float amount)
    {
        current = Mathf.Max(0, current - amount);
        OnChanged?.Invoke(current, max);
        if (current <= 0) OnDied?.Invoke();
    }
}
```

And the HUD's polling grip becomes a one-time registration:

```csharp
public class HudController : MonoBehaviour
{
    public Health playerHealth;
    public Image healthFill;

    void OnEnable()  => playerHealth.OnChanged += UpdateBar;
    void OnDisable() => playerHealth.OnChanged -= UpdateBar;

    void UpdateBar(float current, float max) => healthFill.fillAmount = current / max;
}
```

Read what happened to the coupling. `Health` contains the words `OnChanged` and `OnDied` and *nothing else*: no UI types, no audio, no camera, no idea whether zero or forty things are listening. The HUD knows about `Health` (someone has to hold the pager), but the knowing now flows in exactly one direction, and it's the *cheap* direction: adding a listener costs the subject nothing. The `Update()` method that asked sixty times a second is simply gone.

---

## 3. The payoff proof: the bolt-on

Here's the demonstration that sells the pattern, and A9 requires it because it's the whole argument in one move. Your `Health` subject exists. The HUD listens, a damage sound listens, the death sequence listens. Now, *without opening Health.cs*, add a fourth reaction: an achievement toast when the player first drops below 25%.

```csharp
public class CloseCallAchievement : MonoBehaviour
{
    public Health playerHealth;
    bool earned;

    void OnEnable() => playerHealth.OnChanged += Check;
    void OnDisable() => playerHealth.OnChanged -= Check;

    void Check(float current, float max)
    {
        if (!earned && current > 0 && current / max < 0.25f) { earned = true; Toast("Close Call!"); }
    }
}
```

New file, new component, zero edits to the subject, zero edits to the other observers, and the feature is live. Compare the pre-pattern cost: open the god script, find the damage function, add a call, hope you didn't break the other three things it was already doing. The bolt-on is what low coupling *buys*: features become additions instead of surgeries. When people say a codebase is "extensible," this move is usually what they mean.

The same anonymity pays the Week 7 receipt: `ImpactJuice` stops rummaging for the camera and instead *announces* (`OnHardImpact?.Invoke(point, force)`); the shake subscribes, the sound subscribes, and next month's slow-motion-on-big-hits feature subscribes, and the crate knows none of them. The crate's job shrank to being a crate that tells the truth loudly.

---

## 4. The costs, because there are always costs

The pattern trades visible coupling for invisible control flow, and pretending otherwise produces the next generation of debugging stories. The ledger:

- **The forgotten unsubscribe.** Subscriptions are references: a subject holding a dead observer's callback will either crash (destroyed object, still registered) or quietly keep it alive (a leak). The discipline is *lifecycle pairing*: subscribe in OnEnable, unsubscribe in OnDisable, mechanically, every time, like closing files. The practice guide makes you cause the crash once so you respect it.
- **"Who fired this?"** With direct calls, the stack trace reads like a story. With events, the story fragments: something buzzed, and finding *why* means finding the invoke. Name events well (`OnDied`, not `OnEvent2`), keep them few, and this stays manageable.
- **Ordering surprises.** Three observers of one event run in subscription order, which you don't control and shouldn't rely on. If observer B needs observer A to have run first, they aren't independent observers; that's a sequence wearing an event costume, and it wants explicit code.
- **When polling is right.** Here's the judgment call that separates pattern-users from pattern-victims: events are for *occurrences* (died, entered, leveled up, hit hard); polling is for *continuous readouts* (speed feeding the animator's blend tree, a needle tracking a value). The animator parameter you set every frame in Week 8 was correct then and stays correct now: a Speed *event* firing sixty times a second is the pager buzzing continuously, which is just polling with extra steps and worse debugging. Occurrences announce; readouts get read.

---

## 5. The bus, briefly, and its temptations

For subjects with many distant listeners (game-wide facts: "the player died," "a zone was entered"), a small static event hub is common and useful:

```csharp
public static class GameEvents
{
    public static event Action<string> OnZoneEntered;
    public static void ZoneEntered(string zone) => OnZoneEntered?.Invoke(zone);
}
```

Your Week 5 trigger arch fires `GameEvents.ZoneEntered("VillageGate")`, and anything anywhere can care: today a log line, next week a quest objective. This is the demo game's quest-system backbone, built this week: quest objectives are *observers of gameplay events* (`EnemyDefeated`, `ItemPickedUp`, `ZoneEntered`), which is why quests bolt on without touching gameplay code, and it's the cleanest industrial use of the pattern you'll see this semester.

The temptation to police: once the bus exists, *everything* wants to ride it, and a project where all communication is global anonymous events has traded spaghetti coupling for spaghetti *causality*: nobody knows what happens when anything fires. The rule of thumb: direct events for local relationships (HUD watches this Health), the bus for genuinely game-wide announcements, and if two components on the *same object* are talking via the global bus, they've forgotten they're roommates.

---

## 6. Cross-Engine Dictionary

| Concept | Unity / C# | Godot | Unreal | Three.js / JS |
|---|---|---|---|---|
| Event on a subject | `event Action<...>` | **signal** (declared on the node) | delegate / event dispatcher | EventTarget, or a tiny emitter |
| Subscribe | `+=` | `connect()` (editor or code) | Bind | `addEventListener` |
| Unsubscribe | `-=` | `disconnect()` | Unbind | `removeEventListener` |
| Inspector wiring | UnityEvent (serialized) | editor signal connections | Blueprint event binding | n/a |
| Game-wide bus | static event class | an autoload with signals | GameInstance dispatchers | a shared emitter module |

Culture notes. **Godot students, this is your home game:** signals are the Observer pattern as a first-class language feature, they're the idiomatic way to do nearly everything in the engine, and the editor's connect panel makes the subscription visible as *data*. You've been using them since `body_entered` in Week 5; this week you finally get told what they are. Unity's `UnityEvent` (the inspector-wired kind) trades performance and type strictness for designer-visible wiring, a real tradeoff both directions; C# events are the course default. Three.js students: the DOM taught you this pattern years ago; `addEventListener` was the pager all along, and building a five-line emitter of your own this week closes the loop on how it works inside.

---

## Check yourself

1. Twenty-two trips to the counter: which Week 6 code is that, and what single line replaced the trips?
2. The kitchen doesn't know who holds the pagers. What does that anonymity buy, concretely, when the design asks for a fourth reaction to damage?
3. Recite the lifecycle-pairing discipline and what happens to the project that skips it.
4. Speed feeding a blend tree: event or poll? A death: event or poll? State the rule that decides.
5. When does the global bus stop being a tool and start being spaghetti causality? Give the roommate test.

---

## Going deeper

- **Nystrom, [Observer](https://gameprogrammingpatterns.com/observer.html):** the same pattern with an engine-internals eye, including the performance questions we waved past. His [Event Queue](https://gameprogrammingpatterns.com/event-queue.html) chapter is the natural sequel: what happens when announcements need to wait in line.
