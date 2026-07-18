# Week 9 Practice Guide: The Refactor and the Assembly

> **How to use this guide:** The hands-on half of Week 9, in two acts matching the demo game's `W09_Refactor` session: first the god script gets broken into components (the worked refactor), then the Micro-Game gets assembled from six weeks of your own parts. Read `Week09_Concepts.md` first, and have `A7_Spec.md` open before you build, because A7 is the assignment this guide assembles.

---

## Act I: The Worked Refactor (45 minutes)

### The patient

By now your player script probably looks something like this (abridged; yours may be worse, which is fine and normal):

```csharp
public class Player : MonoBehaviour   // the god script
{
    public float walkSpeed, sprintSpeed;
    public float health, maxHealth;
    public int gold;
    public Image healthBar;            // UI reference in the player. hm.
    public TMP_Text goldLabel;         // and another one.
    public AudioSource hurtSound;
    public Animator animator;
    public float damage, reach;

    void Update()
    {
        // 30 lines: movement + sprint + attack input + animator params
        // + a debug damage key + updating both UI elements
    }
    void OnSwingConnect() { /* melee overlap + damage */ }
    public void TakeDamage(float amt) { /* health math + sound + UI + death */ }
    public void AddGold(int amt) { /* gold math + UI */ }
}
```

Run the coupling test from the concepts doc: *if I change the HUD layout, why am I editing the Player? If I want a destructible crate with health, why can't I reuse any of this?* The script works. The arrangement is the cabin.

### The operation

**A refactor changes structure without changing behavior.** That definition is the safety rail: after every step below, press play and confirm the game plays *identically*. If behavior changed, you didn't refactor, you broke something politely.

1. **Extract `PlayerMotor`.** Movement, sprint, and the animator's Speed parameter. Nothing else. Cut those lines into a new component on the same object; wire its references; play; identical.
2. **Extract `PlayerCombat`.** Attack input, the Attack trigger, `OnSwingConnect`, reach and damage numbers. Play; identical.
3. **Extract `Health`.** And here's the payoff move: name it `Health`, not `PlayerHealth`. Current, max, `TakeDamage`, a death flag, the hurt sound hook. No UI. No player-specific anything. Play; identical. Now drag that same component onto a crate and a training dummy: *destructible scenery, zero new code.* This is composition paying out on day one, and it belongs in your A7 video.
4. **Evict the UI.** The health bar and gold label references leave the player entirely; your Week 6 `HudController` polls `Health` and `GameState` the way it always should have. The player no longer knows the HUD exists. (Still polling. Still scheduled debt. Two more weeks.)
5. **What remains** in `Player.cs` is either nothing (delete it, enjoy the feeling) or a thin coordinator holding what's genuinely player-specific. Your object is now a *bundle*: Motor + Combat + Health + the engine's own components, sitting on the Standard Prefab parent where logic always lived.

### The inspection

Three questions to close Act I, answers out loud for your future video: What does each component know about the others? (As little as possible; Combat asks `Health` politely, nobody touches the HUD.) What's now reusable that wasn't? (`Health`, on anything.) What would the Week 6 you have had to do to add a poison effect, versus now? (Edit the god script and pray, versus: touch `Health`, done.)

---

## Act II: The Micro-Game Assembly (the rest of the week)

A7 is not new tech. It's your A1-through-A6 parts, assembled into one small, complete, playable loop with a win, a loss, and a restart. The demo game does the same thing this week with the crate-clearing quest; yours will be smaller and yours.

### Step 0: One sentence, first

Write your core loop in one sentence, Week 4 style, before you touch the editor: *verb, goal, threat, under 30 seconds per cycle.* Three shapes that assemble almost entirely from parts you already have:

- **Crate Crusher:** throw rocks (A3) to smash crates (Health!) for points (A4) against a timer. Win: clear the yard. Lose: clock hits zero.
- **The Gauntlet:** sprint (A2) through the valley to the gate (A3's trigger) past hazards (physics, kinematic sweepers) with three hit points (Health). Win: arrive. Lose: three hits.
- **Dummy Duel:** melee (A6) five training dummies before the timer; dummies "fight back" via a damage aura you must dodge. Win: five down. Lose: you are.

Pick one, or invent at this size. **The scope police from Week 4 are on patrol:** one verb (two if one is "move"), one threat, one goal, one screen-ish of space. Anything you cut now, you can add after it works. Nobody has ever successfully subtracted a mansion in finals week.

### Step 1: The assembly checklist

Walk your own tier, in order, wiring as you go. This list is also A7's R3, so treat it as the video's tour route:

- **A1:** your scene is prefab-built, hierarchies deliberate, camera placed (then immediately overruled by the rig, which is fine: the vista camera becomes your game-over shot if you're feeling cinematic).
- **A2:** dt movement, one continuous and one discrete input doing gameplay work.
- **A3:** physics doing real work (projectiles, hazards, toppling) and at least one trigger zone doing state work (the goal gate, a pickup).
- **A4:** GameState owns the facts; HUD shows score/health/timer; the full circuit runs: start → play → **win or lose** → restart. The win state is the new muscle: Tier 3 games so far only knew how to die. Wire victory through GameState like any other fact (`isVictory`), with its own panel.
- **A5:** the damped camera follows; at least two juice channels fire on your game's central event (with etiquette: thresholds, decay, the off switch still works).
- **A6:** your character animates through its states; one animation event does gameplay timing; the gate or a door still opens with weight.

### Step 2: The passes, in order

1. **Gray pass:** the loop works, ugly. Win reachable, loss reachable, restart clean *twice* (Week 6's second-lap rule; A7 checks it too).
2. **Juice pass:** feedback on the central event, dry/juiced toggle still functional. Thirty minutes, transforms the build.
3. **Playtest pass:** hand it to one human (roommate, Discord, sibling on a call). Watch them play without narrating. Where they get confused is your missing feedback; where they get bored is your loop timing. One round of fixes from one playtest is worth three of self-testing, and their reaction is legal material for your video's wrap.

### Step 3: The chatbot review (30 minutes, required by A7)

Run the concepts doc's section 5 on your own code: context first, worst script pasted, *three worst couplings ranked*, then the counter-prompt ("argue against your own suggestion for a project this size"). Accept one critique and act on it. Reject one critique with a reason. Both go in the build note, and the rejection is graded with more interest than the acceptance, because judging is the skill and agreeing isn't judging.

---

## Other Engines

Act I translates directly: Godot's node-as-component idiom (child nodes with scripts as your Motor/Combat/Health, or Resources for shared logic), Unreal's Actor Components (a `HealthComponent` is idiomatic and drag-on reusable exactly as described), Three.js as plain composition (a `makePlayer()` that assembles `motor`, `combat`, `health` objects; you've been composing functions all along and Act I is just naming the practice). Act II is engine-agnostic by construction: it's your own parts list.

---

## Recording your A7 video

A7 allows 3–6 minutes (the capstone gets more room). A shape that works:

1. **The loop (60 sec):** your core-loop sentence, then one full cycle to a win, one to a loss, restart proven clean on the second lap.
2. **The tour (90 sec):** the R3 checklist, briskly: point at each tier skill doing its job in *this* game. This is inventory, not drama; keep it moving.
3. **The architecture (60–90 sec):** the before/after of your refactor. Show the god script (git history or a kept copy makes this easy), then the bundle. Demonstrate `Health` on something that isn't the player. Name model and view out loud, and point at where each lives.
4. **The judgment (30 sec):** the chatbot's best critique and your verdict on it, both directions.
5. **Wrap (15 sec):** what the playtest taught you, what you cut, what survived.

Then the build note, A7 edition: the standard paragraph, *plus* the accepted critique, the rejected critique, and the reasons. Done. Tier 3 complete: whatever else happens this semester, you have shipped a game.
