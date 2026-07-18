# Week 11 Practice Guide: Paying the Receipts

> **How to use this guide:** The hands-on half of Week 11, mirroring the demo game's `W11_Quests` session: the polling HUD converts to events, the crate stops groping for the camera, an achievement bolts on without surgery, and the trigger arch becomes the seed of a quest system. Read `Week11_Concepts.md` first, and have `A9_Spec.md` open before you record.

---

## What you're building

- **Exercise 1: The Pager.** `Health` becomes a subject; the HUD trades its grip for a subscription.
- **Exercise 2: The Bolt-On.** Three reactions to one event, then a fourth added without touching the subject.
- **Exercise 3: The Crash.** The forgotten-unsubscribe bug, caused on purpose, then disciplined away.
- **Exercise 4: The Bus.** Game-wide announcements, and the first quest objective listening to them.

## Exercise 1: The Pager (25 minutes)

1. Open your `Health` component (Week 9 made it reusable; today it learns to speak). Add the two events from the concepts doc (`OnChanged`, `OnDied`) and invoke them inside `TakeDamage`. Add an invoke wherever healing or initialization changes the values too; a subject that only announces *some* changes is a pager that sometimes doesn't buzz, and you'll chase that "bug" for an hour someday if you don't build the habit now.
2. Refactor `HudController`: delete the polling `Update()` entirely; subscribe in `OnEnable`, unsubscribe in `OnDisable`, update the bar in the handler. Play: behavior identical (the Week 9 refactor rail, again). The bar moves only when health does, and nothing asks anything sixty times a second.
3. The moment for your video: show the HUD script's Update method. There isn't one. Week 6's receipt, paid in full, and say so.

## Exercise 2: The Bolt-On (25 minutes)

1. Wire three observers to the player's `Health`: the HUD (done), a hurt sound (a small component subscribing `OnChanged` and playing when health *decreased*: keep the previous value locally to tell), and the death sequence (your flow FSM subscribing `OnDied` to enter GameOver: notice the Week 10 machine consuming a Week 11 event, patterns cooperating like adults).
2. Now the demonstration A9 is built around, performed exactly: **close Health.cs. Do not reopen it.** Create `CloseCallAchievement` from the concepts doc in a new file, wire it, play, drop below 25%, toast fires. Narrate the claim precisely: *a new feature, reacting to damage, with zero edits to the damage system and zero edits to the other three observers.*
3. Then the independence proof: disable the HUD object entirely and play. Sound still plays, death still works, toast still fires. Nobody knew the HUD existed, including the other observers. Observers are strangers holding pagers; unplugging one lamp doesn't dim the porch. (Week 9's cabin, rewired correctly.)

## Exercise 3: The Crash (15 minutes)

Respect for the unsubscribe is earned, not lectured, so:

1. Comment out the `OnDisable` unsubscribe in your achievement observer. Play, then *destroy* the achievement object mid-game (a debug key calling `Destroy(gameObject)` is fine). Take damage. Enjoy the `MissingReferenceException` as `Health` faithfully buzzes a pager whose owner left the restaurant.
2. Restore the unsubscribe. Repeat the destruction. Silence, correctly. Say the discipline out loud for the video: *every subscribe has a paired unsubscribe on the opposite lifecycle edge, mechanically, like closing files.*
3. Optional but instructive: put a `Debug.Log` in the handler, comment out the unsubscribe again, but this time just *disable* (not destroy) the observer. It keeps logging while disabled: the quieter cousin of the crash, the zombie subscription, doing work nobody asked for. Same fix.

## Exercise 4: The Bus (25 minutes)

1. Create the static `GameEvents` class from the concepts doc with two events to start: `OnZoneEntered(string)` and `OnEnemyDefeated(string)` (or crates-smashed if your Micro-Game has no enemies; the noun matters less than the announcement).
2. Convert your Week 5 trigger arch to fire `GameEvents.ZoneEntered("VillageGate")` instead of (or alongside) its local reaction. Have your dummy/crate `Health` deaths fire `OnEnemyDefeated`.
3. Build the first **quest objective** as a pure observer:

```csharp
public class SmashQuest : MonoBehaviour
{
    public int required = 5;
    int count;

    void OnEnable()  => GameEvents.OnEnemyDefeated += Count;
    void OnDisable() => GameEvents.OnEnemyDefeated -= Count;

    void Count(string id)
    {
        count++;
        QuestToast($"Smashed {count}/{required}");
        if (count >= required) QuestToast("Quest complete!");
    }
}
```

4. Stand back and look at the shape, because it's the week's biggest idea wearing quest clothes: the crates don't know quests exist. The trigger arch doesn't know quests exist. You could add three more quests tomorrow, delete this one, or ship a DLC of them, all without touching a single gameplay script. That's why every quest system in every RPG you've played is built on exactly this pattern, and yours now is too.
5. Bus etiquette check before you close the editor: is anything on the bus that should be a direct subscription? (Two components on the same prefab chatting via `GameEvents` is the roommate violation from the concepts doc; fix it if you find one, mention it in the video if you did.)

---

## Other Engines

- **Godot:** this is your victory lap. Declare `signal changed(current, max)` and `signal died` on your health script, `emit_signal` in the damage path, and connect the HUD, sound, death, and achievement in the editor or code. The bolt-on exercise works identically, and the editor's Node→Signals panel *shows* the observer list as data, which no other engine on this table does. The bus is an autoload node carrying game-wide signals.
- **Unreal:** dynamic multicast delegates on your Health component (`OnHealthChanged`, `OnDied`); Blueprints bind to them with event nodes, which makes the bolt-on a designer-visible operation. Game-wide bus: dispatchers on the GameInstance. The lifecycle discipline translates as unbinding on EndPlay.
- **Three.js:** write the emitter yourself, it's ten lines (`on`, `off`, `emit`, a Map of arrays), and then the whole guide translates directly. You'll internalize the pattern harder than anyone, because you built the pager, the buzzer, and the front desk.

---

## Recording your A9 video

A shape that fits 2–5 minutes:

1. **The receipt (45 sec):** the HUD's missing Update method, the subscription in its place, one sentence on trips-to-the-counter versus the pager.
2. **The bolt-on (60 sec):** Health.cs on screen, visibly unedited, while the achievement fires in-game. Then the independence proof: HUD disabled, everything else still reacting.
3. **The crash and the discipline (45 sec):** the MissingReferenceException caused, then cured, and the lifecycle-pairing rule stated.
4. **The quest seed (45 sec):** the bus event firing from gameplay, the quest counting it, and the sentence about crates not knowing quests exist.
5. **Wrap (15 sec):** what fought you, what fixed it, and whether the bus tempted you into any roommate violations.

Then the build note: what AI produced, what you fixed, what you'd change. One paragraph. Done.
