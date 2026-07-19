# The Side-Scroller

> **Supplemental** · deepens [[input-held-vs-pressed|Input: Held vs. Pressed]] · a whole game, built to make three functions visible

This is a minimalist platformer, but the game is a decoy. The real content is the row of flags under it. Click the scene and play: **A / D** to move, **W** to jump, **Space** to attack. Crates you can destroy with an attack; stone blocks you have to jump. Push to the right edge of your third of the screen and the world scrolls to meet you.

{{widget:sidescroller}}

Now stop looking at the stick figure and watch the flags while you play. Every control on this character is wired to one of two functions, and choosing the wrong one would break the game in a specific, nameable way.

## Movement is GetKey

Hold **D**. The green **GetKey** flag lights and stays lit, and its counter climbs fast, because [[input-held-vs-pressed|GetKey]] is a **state**: true every single frame the key is held. That is exactly what continuous movement needs. You want a nudge every frame, so you ask every frame. Wire movement to the *other* function and your character would lurch one step per keypress, like a sewing machine, which is the classic Week 3 bug you can now feel the shape of.

## Jump and attack are GetKeyDown

Press **W** or **Space** and the gold **GetKeyDown** flag blips once, for a single frame, and its counter ticks up by exactly one. Hold the key down as long as you like: still one. [[input-held-vs-pressed|GetKeyDown]] is an **edge**, the instant of the press, and nothing after. That is exactly what a jump and an attack need, because they are discrete: one press, one jump, one ball. Wire *these* to GetKey instead and holding W would re-fire the jump every frame (an infinite rocket) and holding Space would spray a ball per frame (the thirty-swords bug from the concepts doc, in projectile form).

## The one honest counter

Here is the whole lesson in one experiment. Hold **D** for two seconds and watch the GetKey counter add a hundred-plus. Hold **W** for the same two seconds and watch GetKeyDown add exactly one. Same duration, same held key, wildly different counts, because they are answering different questions: *is it down?* versus *did it just go down?* [[a2-spec|Assignment 2's Requirement 2]] asks you to ship one of each and say why they are not interchangeable. You just felt why in your hands.

One implementation footnote for the curious, and a callback to the [[cross-engine-dictionary|dictionary]]: a keyboard fires repeat events while a key is held, so this widget ignores repeats and only counts a fresh press as an edge. That little guard *is* GetKeyDown, hand-built. In [[w01:threejs|Three.js]] you would write exactly this, which is the browser teaching you what the other engines hand you for free.
