# Week 6: Interface and Game State

> **How to use this module:** Everything you need to complete this week's work is in these articles. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept articles, follow the practice exercises in your engine, and check [[a4-spec|the Assignment 4 spec]] before you record.

**Role in the course:** The part of the game that is not the world. HUDs, menus, score, and the start-play-end flow every game has. It is also the week we quietly plant the seed of an architecture, and the week we take on two debts on purpose and write the payoff dates down.

## Learning objectives

- Keep the game's facts in one owned place, separate from anything that draws them: [[game-state|Game State]].
- Build a HUD that reads live state and never writes it: [[hud-anatomy|Anatomy of a HUD]].
- Build the full flow: start, play, end, restart, plus a pause that works: [[menus-and-flow|Menus and Flow]].
- Decide where a piece of interface belongs: [[screen-vs-world|Screen Space vs. World Space]].

## Where to start

1. [[ballpark|Start at the Ballpark]]: the metaphor that carries the whole week.
2. [[game-state|Game State]] → [[hud-anatomy|Anatomy of a HUD]] → [[menus-and-flow|Menus and Flow]] → [[screen-vs-world|Screen Space vs. World Space]].
3. Two things to play with: [[the-scoreboard|The Scoreboard]] and [[frozen-clock|The Frozen Clock]].
4. The four practice exercises: [[official-scorer|The Official Scorer]], [[scoreboard-hud|The Scoreboard]], [[the-circuit|The Circuit]], [[floating-bar|The Floating Bar]].
5. [[a4-spec|Assignment 4: Interface & Game State]]: paced this week. Requires [[w05:a3-spec|Assignment 3]] passed before grading.

## A note about this week specifically

Two things you build this week are deliberately not the final version, and I am telling you now rather than letting you discover it later.

The HUD will ask the game whether anything changed sixty times a second, which is a strange way to catch a change that happens twice a minute. And the flow will be run by a couple of booleans and some if-statements, which works fine at four states and becomes a swamp at nine.

Both are correct choices for this week, both have a scheduled replacement (Week 11 and Week 10), and both come with a receipt printed in the article that introduces them. Building the thing that is about to be outgrown, and knowing that while you build it, is a normal engineering week. Getting that feeling in your hands is half of what Week 6 is for.
