# The Frozen Clock

Pause, the free way. Plus both traps that come with it, live, so you can spring them here instead of in your submission video.

{{widget:pauselab}}

## What to do

1. **Watch the gold dot at timeScale 1.** It moves at ninety units per second, multiplied by delta time, exactly like [[w03:real-mover|your Week 3 mover]].
2. **Drop to 0.5.** Half speed, and you changed nothing about the mover. That is the dividend: [[w03:delta-time|dt]] was already doing the work.
3. **Drop to 0.** The world stops. Notice the two clocks in the readout: the world clock has stopped counting, and the UI clock has not. That is why you can still click buttons in a paused game, and it is why engines ship an unscaled time.
4. **Turn on the ghost.** A second mover appears that never multiplied by delta time. Now pause again and watch it sail straight through the freeze, pink and unbothered.
5. **Pause, then press Restart.** Read what the note says.

## The ghost is a Week 3 audit

The pink dot is not a physics bug or a pause bug. It's a Week 3 bug that was invisible until pause existed to reveal it.

That's worth naming as a general fact about this course: features you add later frequently audit the code you wrote earlier. A pause menu is a delta-time linter. A save system (Week 13) is a state-hygiene linter. A second display is a single-source-of-truth linter. None of them were built to catch bugs, and all of them do.

If a mover survives your pause, you do not fix the pause. You go fix the mover.

## The restart trap

Press Restart while paused and the fresh scene arrives frozen solid.

Everything about the scene rebuilt correctly. The dots went back to their starting positions, the world clock reset to zero. What did *not* reset is the time scale, because the time scale is not part of the scene. It's a global, and globals survive scene loads.

The fix is one line at the top of your restart: set the time scale back to one. [[the-circuit|The practice guide]] has you write it after you have felt the bug.

I keep calling this "the bug every student ships once," and I mean it literally. It arrives in submissions every single semester. Now yours arrives here instead.

*Next: the practice exercises, starting with [[official-scorer|The Official Scorer]].*
