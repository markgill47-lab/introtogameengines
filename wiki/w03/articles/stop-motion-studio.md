# Start in a Stop-Motion Studio

Picture how a stop-motion film gets made. The set is frozen. An animator walks in, nudges every character a tiny bit (an arm here, a foot there), steps out, and a camera takes one photo. Then they do it again. And again. Twenty-four photos per second of finished film, each one a frozen world nudged slightly forward from the last. Play the photos fast enough and the nudges disappear into motion.

Your game is a stop-motion studio that runs itself. Sixty-ish times a second, the engine freezes the world, lets your scripts walk in and nudge whatever they own, then photographs the result and throws it at the screen. That photo is a **frame**. The nudge session is an **update**. And the whole arrangement (check what the player did, let every script nudge, take the photo, repeat forever) is the **game loop**, the first of [[w01:what-is-a-game-engine|Week 1's three promises]] and the one that makes the other two matter.

The reason this metaphor is worth keeping in your head: nothing in your game ever actually *moves*. There's no motion, anywhere. There are only positions that differ slightly between photos, and your scripts are the animators deciding how big each nudge is.

This week is about two questions every animator on that set has to answer: *how big should my nudge be?* (that's [[delta-time|time]]) and *what did the player just do?* (that's [[input-held-vs-pressed|input]]).

*Next: [[the-loop|The Loop]], the skeleton under every engine.*
