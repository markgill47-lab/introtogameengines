# Check Yourself

Before you record Assignment 4, see if you can answer these without looking:

1. The scoreboard dies mid-game. In your project's terms: what object survived, what object didn't, and why does the direction of information flow make recovery trivial? *([[ballpark|hint]])*
2. Give the save-file test for deciding whether something is state or display, and apply it to: current health, the health bar's red color, the paused flag, which panel is visible. *([[game-state|hint]])*
3. Why does setting time scale to zero pause a well-built game for free, and what kind of object sails straight through the pause? *([[menus-and-flow|hint]])*
4. The pause-then-restart freeze: what causes it, and where's the fix? *([[frozen-clock|hint]])*
5. Your enemy's world-space health bar disappears when it turns. Name the problem and the one-line cure. *([[screen-vs-world|hint]])*

## Or let the wiki quiz you

Eight questions, instant feedback, nothing recorded anywhere: this is a mirror, not a gradebook.

{{widget:quiz}}

## Going deeper

- **A second angle:** [[res:2dgd|2D Game Development: From Zero To Hero]] covers game state, UI, and flow from an engine-agnostic direction. Useful if you want the same ideas in different words before Week 9 puts an architecture name on them.
- **Worth knowing the destination:** the separation you built this week is most of the way to a pattern you'll meet formally in Week 9, and the polling you accepted is the thing Week 11 replaces. If you're impatient, [[res:nystrom|Game Programming Patterns]] has both chapters waiting.
