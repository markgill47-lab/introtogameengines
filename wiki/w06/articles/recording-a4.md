# Recording Your Assignment 4 Video

A shape that fits 2–5 minutes:

1. **The scorer and the scoreboard (60 sec):** code walkthrough of [[official-scorer|GameState]] (facts and legal changes, zero UI) and [[scoreboard-hud|HudController]] (pixels, zero logic). Say the direction of the street. Deliver the Week 11 debt line, because it's part of the story. *(Covers Requirements 1 and 2.)*
2. **The circuit, twice (60–90 sec):** start → play (bars and gold moving) → death → restart → play again, on camera, with the second lap proving clean reset. *(Requirement 3.)*
3. **Pause (30 sec):** world frozen, menu alive. Bonus points: show [[the-circuit|the pause-restart trap]] and its fix, since you built both anyway. *(Requirement 4.)*
4. **The floating bar (30 sec):** [[floating-bar|dummy bar]] draining in the world, your HUD on the glass, one sentence on whose information lives where, billboard doing its job as the dummy turns. *(Requirement 5.)*
5. **Wrap (15 sec):** what fought you, what fixed it.

Then the build note: what AI produced, what you fixed, what you would change. One paragraph. Done.

## The narration note for this week specifically

Requirement 1 is the one students lose on while showing a scene that works perfectly.

A HUD that displays health correctly does not prove your state is separate. It looks identical on camera whether the health lives in a `GameState` object or in the text label itself. The only thing that distinguishes them is **the code walkthrough and what you say over it.**

So show the state file, and say out loud what is not in it. Then show the HUD file, and say out loud that it reads and never writes. Twenty seconds, and it converts an ambiguous demo into a passing one.

Requirement 3's second lap is the other cheap loss. Restarting and ending the video looks like a finished circuit and proves nothing about reset. Play the second lap.

*Recording setup lives in [[w01:recording-setup|Week 1's wiki]] if you skipped it: OBS, display capture, audio input, 1080p.*
