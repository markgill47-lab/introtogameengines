# The Scoreboard

[[ballpark|The ballpark]], playable. One pile of facts on the left, two displays of those facts on the right, and a button that kills the display while the game keeps going.

{{widget:scoreboard}}

## What to do

1. **Press the buttons and watch both sides move.** Damage changes a fact; the bar and the number are just reading it. Two displays, one fact, which is the arrangement [[game-state|the whole article]] is arguing for.
2. **Kill the scoreboard.** The right side goes dark. Nothing else happens, because nothing else depended on it.
3. **Keep pressing the buttons with the display dead.** The facts move. Health drops. Gold accumulates. The game is completely fine; it simply has nobody watching.
4. **Repair the scoreboard.** It does not need to be told what happened while it was out. It reads the current facts and shows them, correct on the first frame, because it never owned the truth to begin with.

That last step is the one worth sitting with. A display that can be destroyed and rebuilt mid-game, and comes back correct with no recovery logic, is the observable proof that your state and your display are actually separate. If rebuilding your HUD would lose data, your HUD is holding data, and [[gotchas|that is this week's most expensive mistake]].

## Try to break it

Two things you cannot do in this widget, on purpose:

- There is no button that makes the *display* change the facts. The arrows only point one way, because that is the rule.
- There is no way for the bar and the number to disagree. They cannot drift, because neither one keeps a copy.

Both of those are easy to violate in a real project, and this page is what it feels like when you haven't.

## Pull back the curtain

This is about forty lines of ordinary code, and the shape of it is the lesson.

There's an object holding `health`, `max`, and `gold`, and a `render()` function that reads that object and writes HTML. The buttons change the object and then call `render()`. Killing the display sets a flag that makes `render()` draw a dark panel instead of the bar and number.

Notice what is *not* in there. The buttons never touch the bar. The bar never touches the gold. There is no code that runs "when the display is repaired" to catch it up, because there is nothing to catch up. Every frame of the display is computed fresh from the facts.

That is the entire trick, and it scales from this widget to a shipped game.

*Next: [[frozen-clock|The Frozen Clock]], which is the other half of this week you can play.*
