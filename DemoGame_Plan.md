# SE 266 Demo Game Plan: "Greybox Vale" (working title)

**What this is:** the semester-long demo project. One Unity project, one scene saved per week, each scene the game as it exists after that week's live build. Students watch an open world RPG grow from an empty scene to a shipped build, one concept at a time. Rename the game whenever a better name shows up; the working title is at least truthful, because this thing will be gray cubes for half the semester, and greyboxing is a real practice worth teaching anyway.

---

## The Pitch

A small open-world fantasy valley. One village, one castle gate, a forest, and a mine that goes deeper than it should. The player takes quests from villagers, fights with melee and ranged weapons, sneaks past what they can't fight, and loots treasure. The treasure system pays out **Cards**: collectable buffs the player equips into a limited number of slots for powers and defenses. Win more cards from NPCs in a mini-game, find them in chests, choose which three define your build.

**Design pillars (also the scope police):**

- **One valley, not a continent.** Open world means "you can walk anywhere you can see," not square kilometers. The whole map is one Unity scene.
- **Every system exists to teach a week.** If a feature doesn't map to a course concept, it doesn't go in. This rule will be broken exactly once, for something fun, and that will also be a lesson.
- **Primitives until proven otherwise.** Cubes and capsules until Week 8, when Mixamo characters arrive. Free assets only. This is not a modeling class, and the Standard Prefab (below) makes swapping cubes for art a five-minute job instead of a rebuild.

---

## The Standard Prefab

Everything visible in this game exists as a prefab, and every prefab has the same skeleton. This is house style, it is taught in Week 2, and every object built live all semester follows it:

```
ThingName          <- the parent: logic components and physics colliders
├── Visuals        <- models and materials, scaled to fit within the colliders
├── Effects        <- particle systems, line and trail renderers
└── Audio          <- the object's sound manager
```

The parent is the truth. Colliders and logic define what the thing *is*: its footprint in the world, its behavior, its physics. The children define how it looks and sounds, and the children are replaceable. That one design decision buys three things the course will cash in repeatedly:

- **Bottom-Up Asset Replacement.** The windmill is cubes in Week 2. When art arrives, you open the prefab, delete the cubes inside Visuals, drop in a model, scale it to the colliders, and walk away. Nothing else changes: not the scripts, not the physics, not a single scene that placed the prefab. The gameplay never knew what it looked like. Week 8's capsule-to-Mixamo swap is this exact move performed on camera, and it works because the structure was there from Week 2.
- **The Collaboration Seam.** The artist owns Visuals, Effects, and Audio. The programmer owns the parent. They work on the same object without touching each other's files, and the prefab is the contract between them. Students who go on to team projects will use this the rest of their careers.
- **MVC in Miniature.** Colliders and logic are the model. Visuals is the view. Nobody says this out loud until Week 9, when the architecture lecture pulls back the curtain on a pattern the students have been building since Week 2. It's the same trick as the Week 8 Animator reveal, and it's the best kind of lesson: one they already believe.

Lecture materials carry this thread explicitly: Week 2 introduces the skeleton as an application of parenting, Weeks 5 through 8 fill in each child layer as its subsystem arrives (colliders in 5, Effects in 7, Audio in 7, the big Visuals swap in 8), and Week 9 names what it was all along. Assignment specs recommend the same structure in engine-neutral terms (Godot's scene composition and Unreal's component hierarchy support the identical split), and the A1 materials present it as the way to build.

---

**The card system in one paragraph:** a Card is a data asset (ScriptableObject) defining a buff: +damage, +stealth, fire resistance, double jump, vendor discount. The player collects many, equips few (three slots to start). Cards arrive through the **Treasure System** (chests, quest rewards, loot tables) and through **Card Duel**, a dead-simple mini-game played against NPCs. Mechanically, cards are the Week 13 data-driven design showcase, and the equip screen is a Week 6 UI callback that finally gets its payoff.

---

## The Semester Arc at a Glance

| Wk | Scene | Course concept | What the game gains |
|---|---|---|---|
| 1 | `W01_Anatomy` | Engine anatomy | Project setup, subsystem tour scene |
| 2 | `W02_Valley` | Scene graph & transforms | The valley blockout, a working windmill |
| 3 | `W03_FirstSteps` | Game loop, dt, input | A player who walks, a sun that moves |
| 4 | `W04_Design` | Design vocabulary | The design: core loop, quest map, scope |
| 5 | `W05_Ranged` | Physics & collision | Ranged combat, physical props, triggers |
| 6 | `W06_Interface` | UI & game state | HUD, inventory v1, menus, death & respawn |
| 7 | `W07_Feel` | Cameras & juice | Third-person camera, hit feedback, torchlight |
| 8 | `W08_Alive` | Animation | Real characters, melee combat, animated props |
| 9 | `W09_Refactor` | MVC & composition | Clean architecture, first complete quest loop |
| 10 | `W10_States` | State pattern | Game flow FSM, guard FSM, stealth seed |
| 11 | `W11_Quests` | Observer pattern | The quest system, event-driven UI |
| 12 | `W12_Commands` | Command pattern | Rebindable input, replay ghost, cutscenes |
| 13 | `W13_Treasure` | Data & persistence | Cards, loot tables, equip slots, save/load |
| 14 | `W14_TheMine` | Procedural generation | The procgen mine dungeon |
| 15 | `W15_Inhabited` | Game AI | Behavior-tree NPCs, stealth proper, routines |
| 16 | `W16_Ship` | Wrap | The build. Play it in class. |

Melee and ranged combat, stealth, quests, inventory, levels, and behavior trees (the full RPG wish list) each land on the week whose concept powers them. Nothing waits for the end.

---

## Scene-by-Scene Outlines

### W01_Anatomy: the tour scene
**Demonstrates:** what an engine provides before you write anything.
**In the scene:** five labeled stations on a plane. A lit rotating cube (rendering), a stack of cubes that falls on play (physics), a cube that changes color on keypress (input/scripting), a cube that hums (audio), a floating text label (UI). Each station is a one-script, one-subsystem exhibit.
**Built live:** the whole thing, from File → New Project. The point is watching a project get created, not the exhibits.
**Carries forward:** the project itself, version control initialized on camera.

### W02_Valley: the blockout
**Demonstrates:** scene graph, parenting, transforms, coordinate spaces, camera placement.
**In the scene:** a terrain-sized ground plane. A village of primitive houses, each built as a **Standard Prefab** (logic-and-collider parent, Visuals child holding the cubes), so duplicating a house duplicates the contract, not just the geometry. A castle gate. A **Windmill** whose blade assembly is a child pivot rotating on its own axis while the tower stays put: parenting and local rotation in one prop, visible from across the map. A capsule named `Player`, not yet movable, already wearing the same skeleton. A deliberately placed vista camera.
**Built live:** one house from cubes as the first Standard Prefab, then duplicated into a village; the windmill pivot mistake (rotating around the wrong point) made on purpose, then fixed with an empty parent. The Standard Prefab skeleton introduced here as house style, with the promise stated plainly: "these cubes get replaced in Week 8 and nothing will break."
**Carries forward:** the entire valley layout, permanently.

### W03_FirstSteps: the walk
**Demonstrates:** update loop, delta time, frame independence, input.
**In the scene:** the Player capsule walks the valley with WASD and sprints with Shift, all `* Time.deltaTime`. A **Day/Night Sun**: the directional light parented to a pivot rotating slowly by dt, so the valley has mornings now. A deliberately broken no-dt movement script kept in the project, toggled on camera at different framerates.
**Built live:** movement script written wrong first (no dt), shown misbehaving, fixed.
**Carries forward:** player locomotion, the sun cycle.

### W04_Design: the plan
**Demonstrates:** core loops, MDA, scope.
**In the scene:** no new systems. A camera dolly flythrough of the valley with floating labels marking what will exist where: quest giver here, mine entrance here, duel table here. The design doc made walkable.
**Built live:** nothing. This session plays and deconstructs shipped RPGs, then walks this flythrough while writing the game's core loop on the board: *explore → quest → fight or sneak → loot cards → equip → explore deeper.*
**Carries forward:** the plan, and the labels stay until each one becomes real, which is quietly motivating.

### W05_Ranged: first blood
**Demonstrates:** rigid bodies, collision vs. trigger, forces, layers.
**In the scene:** a **Target Range** behind the village: the player throws rocks (Rigidbody projectiles, impulse force) at crates that topple and targets that count hits. A trigger arch at the village gate that logs entry (the future quest-zone tech, nobody tells the students yet). Collision layers so player projectiles ignore the player.
**Built live:** the throw, from spawn to impulse to impact; a trigger vs. collision comparison with the same arch.
**Carries forward:** projectile tech (future ranged weapons), the trigger-zone tech (future quest objectives), physics props scattered through the village.

### W06_Interface: the pause that ships
**Demonstrates:** HUD, menus, game state vs. display, screen space vs. world space.
**In the scene:** health and stamina bars, gold counter. **Inventory v1:** a grid panel listing picked-up items (rocks count; loot is loot). Main menu, pause menu, and a death → respawn flow (fall off the map, respawn at the village well). A world-space health bar over one training dummy, to show the contrast.
**Built live:** the HUD polling game state every frame, with the words "this polling will offend us in Week 11" said out loud and meant.
**Carries forward:** the entire UI shell, inventory data structure, game flow (which Week 10 will formalize).

### W07_Feel: the valley wakes up
**Demonstrates:** camera rigs, damping, particles, audio, screen shake.
**In the scene:** a proper **Third-Person Camera**: damped follow with orbit, replacing the static chase view. Rock impacts get dust particles, thunk audio, and a modest screen shake. Torches in the village with fire particles and looping crackle, which read beautifully at night thanks to Week 3's sun. One "dry vs. juiced" toggle on the target range.
**Built live:** the camera rig, then juicing one impact end to end. All juice lands in the prefabs' **Effects** and **Audio** children, which have been sitting empty since Week 2 waiting for exactly this session.
**Carries forward:** the camera everyone uses for the rest of the semester, the juice pipeline, and Standard Prefabs with all four layers finally occupied.

### W08_Alive: people-shaped people
**Demonstrates:** animation states, blending, imported clips, property animation.
**In the scene:** the capsule replaced by a Mixamo character with idle/walk/run blended locomotion. **Melee combat v1:** a sword swing animation triggered on click, dealing damage in a short arc (ranged now has a sibling). Three villager NPCs standing in idle (they get brains in Week 15; today they get bodies). The castle gate animated open/closed; village doors on property animation.
**Built live:** the **Bottom-Up Swap**, first and ceremonially: open the Player prefab, delete the capsule inside Visuals, drop in the Mixamo character, scale to the colliders, press play, and everything still works, because nothing outside Visuals changed. Then the import ritual details (this trips everyone), locomotion blend, and the swing.
**Carries forward:** animated player and NPCs, melee combat, animated props, and proof that the Week 2 promise was kept.

### W09_Refactor: pay the debt
**Demonstrates:** MVC, composition over inheritance, coupling, AI code review.
**In the scene:** nothing new on screen, and that's the point. The player object's one giant script becomes components: `PlayerMotor`, `PlayerCombat`, `PlayerInventory`, `PlayerHealth`. Game state separates from UI. Then the valley's systems get glued into the **First Quest**: the village elder wants five crates cleared from the well; clearing them pays gold. One complete loop: accept, do, deliver, reward.
**Built live:** the refactor of the god-script, guided partly by an LLM code review critiqued on camera; then the quest, assembled from tech that already exists (triggers, inventory, HUD). And the curtain-pull: the Standard Prefab the class has used since Week 2 gets its real name. Colliders and logic are the model, Visuals is the view, and the students have been doing MVC for seven weeks without being told.
**Carries forward:** the architecture everything else hangs on. This scene is the Micro-Game week's mirror: students assemble their Tier 3 pieces while watching the demo game do the same.

### W10_States: guards with rules
**Demonstrates:** the State pattern at both scales.
**In the scene:** game flow (menu/playing/paused/dead) rebuilt as an explicit FSM, replacing Week 6's boolean soup. Player combat states: idle/attacking/blocking, with illegal transitions actually illegal (no attacking while dead: the classic, fixed by design). One **Guard** at the castle gate running a hand-rolled FSM: patrol → suspicious (sees player nearby) → chase → return. The guard's suspicion is the stealth system's opening note.
**Built live:** the guard FSM, drawn as a diagram first, then coded to match the diagram exactly.
**Carries forward:** flow FSM, combat states, the guard (Week 15 upgrades his brain from FSM to behavior tree, on camera, same guard).

### W11_Quests: the valley starts talking
**Demonstrates:** the Observer pattern.
**In the scene:** the **Quest System** proper: quest objectives subscribe to gameplay events (`ItemPickedUp`, `EnemyDefeated`, `ZoneEntered`, courtesy of Week 5's trigger tech). A quest tracker HUD that updates when notified, never by polling: the Week 6 promise, paid. Three quests live: the crate quest rebuilt event-driven, a "reach the mine entrance" scouting quest, a "defeat the training dummies" combat quest. An achievement toast nobody registered for, added late in the session to prove new observers bolt on without touching existing code.
**Built live:** one gameplay event end to end, then the tracker, then the toast.
**Carries forward:** the quest and event backbone of the entire game.

### W12_Commands: tickets, ghosts, and cutscenes
**Demonstrates:** the Command pattern.
**In the scene:** player input refactored through a command layer (the A10 architecture at full scale). A settings screen with **runtime rebinding**. A **Replay Ghost** on the target range: beat your own last run, which is the determinism lesson wearing a fun hat. And a **Cutscene**: the village elder walks to the well, gestures, and speaks, driven by a queued sequence of the same command objects the player uses. Cutscenes are commands with a script; students find this out the same moment the elder starts walking.
**Built live:** the rebinding screen, then the cutscene queue.
**Carries forward:** command-driven input, the cutscene tool (Week 16's finale uses it).

### W13_Treasure: the cards arrive
**Demonstrates:** data-driven design and persistence.
**In the scene:** the **Card System**: Cards as ScriptableObjects (name, art placeholder, buff type, magnitude, flavor text). An **Equip Screen** with three slots; equipped cards visibly change gameplay (+damage swings, quieter footsteps, a double jump). The **Treasure System**: chests with data-driven loot tables paying gold, items, and cards. **Save/Load**: position, inventory, gold, equipped cards, quest states. Save, quit to desktop, relaunch, restore, on camera.
**Built live:** one card authored in the inspector with zero code changes (the whole argument for data in one moment), then the save file opened in a text editor and read aloud.
**Carries forward:** cards, loot, persistence. *Stretch, if the schedule is kind:* **Card Duel v1**, a three-round high-card mini-game against a villager, wagering cards. If not now, Week 15's NPCs make it worth the wait.

### W14_TheMine: it goes deeper
**Demonstrates:** procedural generation.
**In the scene:** the mine entrance (labeled since Week 4) finally opens. Inside: a **Procgen Mine**: seeded room-and-corridor generation, torch and prop placement, loot chests (Week 13's tables, now with placement logic), a guaranteed-reachable exit validated by the generator. Same seed, same mine, shown twice on camera; new seed, new mine. Surface procgen too: seeded rock and tree scatter across the valley, replacing hand-placed set dressing.
**Built live:** the generator's core loop, then seed demonstrations, then the "is the exit reachable" guardrail.
**Carries forward:** the dungeon (stealth and AI's proving ground next week), scatter tech.

### W15_Inhabited: the valley pushes back
**Demonstrates:** steering, navmesh pathfinding, behavior trees, stealth.
**In the scene:** navmesh baked across valley and mine. The Week 10 guard upgraded from FSM to a **Behavior Tree**: patrol, investigate sounds, chase on sight, attack in range, flee at low health, all readable in the tree. **Stealth proper:** vision cones, hearing radii (rocks thrown as distraction: Week 5 pays off again), tall grass that lowers detection, and a quiet-footsteps card that suddenly matters. Mine skeletons with simpler trees. Villagers on daily routines: well, market, home at dusk, obeying Week 3's sun. *Stretch:* Card Duel lands here if it didn't in Week 13, because now NPCs can react to losing.
**Built live:** the guard's tree, node by node, against the FSM diagram from Week 10; then one stealth takedown of the mine's back entrance.
**Carries forward:** a living valley. This is the scene that finally looks like the Week 4 flythrough promised.

### W16_Ship: play it
**Demonstrates:** finishing.
**In the scene:** the build. A title screen, the cutscene tool running an opening beat, five-ish quests, two combat styles, stealth routes, cards to collect and equip, a mine to delve, a save file that remembers. Played live in class, bugs and all, followed by the same postmortem format the students owe: architecture as built, where it bent, what AI did well and badly.
**Built live:** nothing. Ship it. The queue is the queue.

---

## Production Notes (for August You)

- **Scene-per-week mechanics:** one project, `Scenes/W02_Valley` through `Scenes/W16_Ship`, each week saved as a copy before the next week's changes. Students can open any week and see the game at that moment. Shared scripts live in versioned folders only when a week's change would break earlier scenes; otherwise let earlier scenes inherit fixes.
- **Asset budget:** primitives through Week 7. Mixamo characters Week 8. Kenney (or similar free packs) for props/audio, whenever they're faster than cubes. Card art is AI-generated placeholder, which is on-theme for this course.
- **The wish-list ledger:** levels (W2, W14), quests (W11), inventory (W6, W13), behavior trees (W15), stealth (W10, W15), ranged (W5), melee (W8), cards (W13), card mini-game (W13/W15 stretch). Everything on your list has an address.
- **Known risks:** Week 8 (Mixamo import always eats time), Week 13 (three systems in one week; equip UI can be pre-built and refactored live rather than built from zero), Card Duel (explicitly a stretch goal twice, so its absence is a schedule decision, not a failure).
