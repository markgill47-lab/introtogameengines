# Start at the Ballpark

Bottom of the seventh, and the scoreboard in center field goes dark. Total electrical failure.

Question: what's the score?

Whatever it was before the lights went out, obviously. Nobody has to replay the inning. Nobody's home run is revoked. The score was never *in* the scoreboard. The score is a fact about the game, kept by the official scorer, and the scoreboard is a large, glowing **display of that fact**. When it dies, the fact survives. When it's fixed, it gets told the fact and resumes glowing.

And notice the direction of the relationship. The scorer never once consults the scoreboard to find out what the score is. Information flows from the game to the board, always, and never back.

*You can play this exact situation: [[the-scoreboard|The Scoreboard]] lets you kill the display and watch the facts carry on without it.*

## Every UI bug you will ever write

Every UI bug you will ever write comes from violating some clause of the paragraphs above.

- **Storing the score in the scoreboard.** State living inside a text label. The number exists in exactly one place, and that place is a piece of presentation you are going to restyle three times this semester.
- **Letting the scoreboard decide the score.** Game rules running in button handlers. The display grows opinions.
- **Having two scoreboards disagree.** The HUD says 3 gold, the shop says 5, because each kept its own copy. Players screenshot this one.

This week is about building the ballpark correctly: the game keeps its facts, the interface displays them, and the line between those two jobs stays visible in your project structure.

Not in your head. In your project structure. A rule you can only see by squinting at the code is a rule you will break at 2am in week fourteen.

*Next: [[game-state|Game State]], which is the pile of facts the scorer is keeping.*
