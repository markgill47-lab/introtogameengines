# Week 4 Concepts: Design Vocabulary, or What Makes Games Games

> **How to use this module:** This document is the complete concept material for Week 4. No assignment is paced this week (it's a catch-up week for A1 and A2), but nothing here is optional filler: this vocabulary is the rubric for A12 (Game Deconstruction), the language of your final project's design doc, and the way we'll talk about every game we touch for the rest of the semester. `Week04_Practice.md` has the workshop and a full worked example.

---

## Start with a joke

A comedian writes a joke. What they actually write is *words*: a setup, a turn, a punchline, in a specific order. What they're trying to produce is a *laugh*. And here's the thing every comedian knows and every new game designer has to learn: **you cannot write a laugh.** There is no notation for it. You can only write words that, delivered in the right order at the right speed to the right room, reliably *cause* one. When the room doesn't laugh, you don't yell at the room. You rewrite the words.

Game design is this exact predicament, formalized. You cannot build "fun." There's no fun slider in Unity; I've looked. You can only build *rules* (this button jumps, enemies take three hits, gold buys arrows) that, when a player pushes against them, reliably produce an experience: tension, mastery, curiosity, triumph, panic. When players are bored, you don't yell at the players. You rewrite the rules.

This week is the vocabulary for talking about that gap between what you can build and what you're trying to cause. It's a code-free week, and it is not a soft week: bad vocabulary produces bad design docs, bad design docs produce unbuildable projects, and I've read enough of both to make this week mandatory with a clear conscience.

---

## 1. The Core Loop

Every game has a small cycle of actions the player repeats, over and over, for the entire runtime of the experience. It usually fits in 5 to 30 seconds. It's called the **core loop**, and it's the single most load-bearing sentence in any design doc.

- **Tetris:** a piece appears, you shift and rotate it, you place it. Seven seconds, forever.
- **Vampire Survivors:** move toward gems, avoid the swarm, level up, pick an upgrade. Fifteen seconds.
- **Minecraft (early game):** venture, mine, return, craft something that lets you venture farther.
- **The demo game this semester:** explore, take a quest, fight or sneak, loot cards, equip, explore deeper.

Why it's load-bearing: the player runs this loop *thousands of times*. If the loop is satisfying, the game survives a lot of other flaws (Tetris has no story, no characters, and no ending, and it outsold most things with all three). If the loop is dull, nothing bolted on top rescues it: no cutscene, no skill tree, no open world is beautiful enough to save a boring seven seconds repeated four thousand times.

Loops also **nest**. The seconds-scale loop (place a piece) sits inside a minutes-scale loop (survive this level) which sits inside an hours-scale meta loop (unlock the next character, finish the quest line, beat your high score). Big games are loops inside loops, and when a big game feels aimless, the diagnosis is almost always a missing or broken loop at one specific scale. Learn to name which one.

When you write your final project design doc, the core loop is the first sentence I read. Not the setting, not the story: the loop. Practice writing it now, in one sentence, for games you know. It's harder than it looks, and the practice guide makes you do it.

---

## 2. MDA: the designer's side and the player's side

The framework this course leans on is **MDA: Mechanics, Dynamics, Aesthetics**. Three layers, and the important part is who owns which end.

- **Mechanics** are the rules as written: jump height, enemy hit points, card costs, gravity. This is the layer you can actually type into an engine. The comedian's words.
- **Dynamics** are what happens when players push on the mechanics: kiting enemies, hoarding gold, rocket-jumping, camping the spawn. Nobody typed these in. They *emerge*, and half of them will surprise you.
- **Aesthetics** are the feelings the dynamics produce: tension, power, discovery, fellowship, panic, flow. The laugh.

The designer works at the mechanics end. The player lives at the aesthetics end. **Neither of you can touch the other's layer directly**, and dynamics is the misty middle where your rules and their behavior negotiate. That's why playtesting is not optional and why "it's fun in my head" is the most dangerous sentence in this field: your head is not where the dynamics happen.

The practical use of MDA is diagnostic, and it runs backward. The player says "it feels grindy" (aesthetic). You trace it: they're repeating the same safe action because it pays too well (dynamic). The gold reward on the safe action is a number in a file (mechanic). You change the number. That trace, feeling to behavior to rule, is the fundamental move of game design, and A12 will grade whether you can perform it on someone else's game.

---

## 3. Verbs, resources, and feedback loops

Three vocabulary tools that do most of the analytical work:

**Verbs.** What can the player actually *do*? Mario: run, jump. Doom: move, shoot. Stardew: plant, water, harvest, gift. Count a game's verbs and you know its shape: a tight game has few verbs, deeply explored (Tetris has three), while a sprawling game has many verbs, loosely explored. Neither is wrong, but a design doc that lists fourteen verbs for a one-semester project has already failed, and now you know the word for why.

**Resources.** What does the player accumulate, spend, and convert? Gold, health, ammo, time, space, *information*. Resource analysis reveals structure that themes hide: Tetris's real resource is board space, and every piece placed is a spend. A stealth game's resource is information asymmetry (they don't know where you are; that's the currency, and getting spotted is going broke). Follow the resources and you find the actual game under the art.

**Feedback loops.** When winning makes winning easier, that's a **positive loop**: Monopoly's rich-get-richer spiral, an RTS economy snowball. Positive loops create momentum and blowouts, and they end games. When falling behind gives you help (Mario Kart's blue shell, rubber-band AI), that's a **negative loop**: it creates comebacks and tension, and it keeps games close. Most balance complaints you will ever hear ("this snowballs," "losing feels hopeless," "why bother leading") are feedback-loop complaints, and once you have the words, you can hear the underlying loop through the complaint. Tetris runs a quiet positive loop of *doom*: mistakes consume space, which makes placement harder, which causes mistakes. That loop is why your heart rate climbs, which is to say: that loop is the aesthetic.

---

## 4. The genre tour: one vocabulary, five games

The claim of this week is that this vocabulary spans the whole range of games, so let's spend it across five genres in five paragraphs.

**Platformer (Celeste).** Two verbs that matter (jump, dash), explored to exhaustion. Core loop: attempt a screen, die, instantly retry; the loop is fifteen seconds and death costs almost nothing, which is a mechanic (instant respawn, checkpoints every screen) deliberately chosen to produce a dynamic (relentless retrying) that yields the aesthetic (mastery, and the specific pride of a hard thing finally done). Change one mechanic (death sends you back three screens) and the same game produces frustration instead. That's MDA in one knob.

**Roguelike (Slay the Spire).** Loops nested three deep: play a card (seconds), win a fight (minutes), complete or fail a run (an hour), unlock and learn across runs (forever). Resources everywhere: health as the currency you quietly spend to gain cards and gold. The genre's trick is making the *meta loop* the real game: individual runs are allowed to end in disaster because disaster feeds the outer loop. Your card system this semester borrows from this playbook.

**RTS (StarCraft).** The purest positive-feedback economy in games: workers gather minerals that buy workers. Verbs split across two skill domains (macro: economy; micro: unit control), and the negotiation between them *is* the game. Watch how the design fights its own snowball: expansions are fragile, armies trade, information is a resource you buy with scouting. An RTS is a feedback-loop management seminar with explosions.

**Sim (Stardew Valley).** Loops nested by *calendar*: the day loop (water, work, sleep), the season loop (plant, harvest), the year loop (upgrade, unlock). Resource conversion chains everywhere: time becomes crops becomes gold becomes tools becomes time-efficiency. Notice there's no fail state worth mentioning: the aesthetics being produced (calm, progress, ownership) don't need one, so the design didn't add one. Knowing what to *leave out* is also this vocabulary.

**Puzzle (Tetris).** Fully deconstructed in the practice guide as your worked example, using every term on this page. Read it after this document and the vocabulary should click into place.

Five genres, one toolkit. That's the pitch for this week, delivered.

---

## 5. Scope: small, finished, and polished

The last piece of vocabulary is the one that saves your semester, so it goes last, where you'll remember it.

Every student project proposal I have ever read is too big. Not most: all of them, including the ones whose authors read this paragraph first. The gravitational pull of "open world, crafting, multiplayer, three biomes" is real, and the correction is a design value you should adopt now: **small, finished, and polished beats big and broken. Every time.** A tiny game with a tight loop, juiced feedback, and an actual ending is a portfolio piece and a shipped product. A sprawling half-game is a folder.

The working method: design the smallest version of your idea that still produces the aesthetic you're chasing, and build *that*. If the tension you want comes from being chased in the dark, you need one dark hallway and one chaser, not a mansion. You can always add the mansion; nobody has ever successfully subtracted one in finals week.

You'll hear this again in Week 9 when the Micro-Game asks you to ship something complete, again at the capstone proposal, and once more, gently, when I read a design doc with fourteen verbs in it.

---

## Check yourself

1. Write the core loop of a game you played this week, one sentence, 5-to-30-second scale.
2. A playtester says your game "feels unfair." Walk the MDA trace: what do you look for at each layer?
3. Name one positive and one negative feedback loop from games you know that aren't already on this page.
4. What is Tetris's central resource, and what does spending it look like?
5. Your dream game has fourteen verbs. What's the move, and which section told you?

---

## Going deeper

- **The primary source:** [MDA: A Formal Approach to Game Design and Game Research](https://users.cs.northwestern.edu/~hunicke/MDA.pdf) (Hunicke, LeBlanc, Zubek). Five pages, free, and the actual paper this module's framework comes from. Read it before A12; cite it in A12.
