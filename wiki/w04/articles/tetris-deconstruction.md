# Worked Example: Deconstructing Tetris

What follows is the level of analysis [[a12-template|Assignment 12]] asks for, performed on the most-shipped game in history. Use it as a benchmark: this took about ninety minutes of play-and-notes, and it fits on two pages.

**Game / genre / where I played it:** Tetris (Guideline-standard modern version), puzzle, twenty minutes on a phone and twenty in a browser.

**Core loop (one sentence):** A known piece falls and a next piece is previewed; I shift, rotate, and drop the falling piece into the stack, trying to complete horizontal lines, which clear. Five to eight seconds per piece, forever.

**Verbs:** shift, rotate, drop (soft/hard), hold. Four verbs. That is the entire interface to a forty-year phenomenon, and it is a masterclass in the [[verbs-resources-feedback|few-verbs-deeply-explored]] school.

**Resources:**

- **Board space** is the central resource, and almost nobody names it on the first try. Every placement spends space; every cleared line refunds it. You are managing a shrinking budget the whole game.
- **Time** is the pressure resource: fall speed converts "think as long as you like" into "think in the next two seconds," and the level curve is just the exchange rate worsening.
- **Information** is the quiet third: the next-piece preview and the hold slot are information mechanics. They exist to let you plan, and the difference between a beginner and an expert is almost entirely how far ahead they spend this resource.

**Feedback loops:** one positive loop of doom, and it is the engine of the whole aesthetic: mistakes consume space, which constrains placement options, which causes more mistakes. There is no rubber-banding, no mercy mechanic, no negative loop at all. The only relief valve is *player skill* (clearing lines), which means every escape from the doom spiral is one you earned. That single design decision produces the game's entire emotional signature.

**MDA trace, run on my own play session:** at minute 16 I felt panic (aesthetic). The behavior: I was dropping pieces into bad positions faster than I needed to, rushing placements the timer did not actually demand (dynamic). The rule underneath: fall speed had crossed the threshold where my planning horizon collapsed from three pieces to one (mechanic: the level-9 gravity value). Feeling, to behavior, to a number in a table. [[mda|The trace works.]]

**What holds it together (dynamics worth naming):** the T-spin and combo systems are dynamics that emerged from the rotation mechanics and were later *canonized into rules*, which is a fascinating pattern: the designers watched players discover behavior and then made it official. Also note the "bag" randomizer (all seven pieces, shuffled, guaranteed each cycle): a hidden mechanic whose entire purpose is protecting the player from the true randomness that made the 1989 version occasionally hopeless. Modern Tetris is fair *on purpose*, invisibly.

**Likely architecture (best guess, one paragraph):** a grid data structure for the board; the falling piece as state (position, rotation index) validated against the grid every move; a game-state machine (spawning, falling, locking, clearing, game over); the renderer drawing the grid each frame. I would bet money the board is a 2D array and the pieces are data tables, and Week 13 of this course explains why that bet is safe. (Assignment 12 note: by Week 15 you will have the pattern vocabulary of Weeks 9 through 13, and your architecture paragraph is expected to use it: name the state machines, the observers, the data-driven parts.)

**Scope lesson:** four verbs, one screen, no story, no characters, no ending. Shipped on more platforms than any game ever made. [[scope|Small, finished, polished.]]

*Next: [[a12-template|The Assignment 12 Template]], the reusable skeleton.*
