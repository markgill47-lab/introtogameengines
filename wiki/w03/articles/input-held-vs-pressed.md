# Input: Polling vs. Events, Held vs. Pressed

The other thing the loop does every frame is ask the devices what's happening. Two philosophies exist:

- **Polling:** your code asks, every frame. "Is W down *right now?*" Simple, visible, and perfect for continuous controls like movement, because you re-ask every nudge anyway.
- **Events:** the system tells you when something changes. "W just went down." No asking, no per-frame cost; the natural fit for discrete actions, UI, and everything Week 11 and Week 12 will build.

This week we poll, because polling keeps the whole mechanism on one visible line. But inside polling hides the distinction that causes more Week 3 bugs than everything else combined, and it's three functions that look like siblings and behave like strangers:

- `Input.GetKey(KeyCode.W)`: true *every frame the key is held*. This is a **state**. Use it for movement.
- `Input.GetKeyDown(KeyCode.Space)`: true *only on the single frame the key went down*. This is an **edge**, a moment. Use it for jumps, toggles, purchases.
- `Input.GetKeyUp(KeyCode.Space)`: the other edge: the frame of release. Use it for charge-and-release mechanics.

## Feel the difference

Hold Space for half a second at 60 fps: `GetKey` was true about thirty times, `GetKeyDown` exactly once, `GetKeyUp` exactly once. Wire a purchase to `GetKey` and one press buys thirty swords. Wire movement to `GetKeyDown` and your character moves one nudge per press, like a sewing machine. [[a2-spec|Assignment 2]] requires one continuous input and one discrete input precisely so you have to feel this difference in your own hands.

(Housekeeping note, consistent with what we did in Week 2: this is Unity's legacy input API, used because it makes every mechanism visible in one line. The modernized input systems every engine now ships are a Week 12 story, and it's a good one, but it's built on top of exactly these ideas. The churn was promised in [[w01:input-system|Week 1's anatomy]].)

*Next: [[cross-engine-dictionary|the dictionary]], then [[gotchas|the gotchas]].*
