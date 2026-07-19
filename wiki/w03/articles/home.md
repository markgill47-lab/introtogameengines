# Week 3: The Game Loop, Time, and Input

> **How to use this module:** Everything you need to complete this week's work is in these articles. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept articles, follow the practice exercises in your engine, and check [[a2-spec|the Assignment 2 spec]] before you record. Also: last week you copied `Time.deltaTime` into the windmill script on faith. This module is where the faith gets replaced.

**Role in the course:** The heartbeat of every game: a loop that reads input, updates the world, and draws a frame, sixty-ish times a second, forever. Every engine hides this loop from you. This week we drag it into the light.

## Learning objectives

- Describe the update/render loop and what happens each frame: [[the-loop|The Loop]].
- Write frame-rate-independent movement using [[delta-time|delta time]].
- Handle input: polling vs. events, [[input-held-vs-pressed|held vs. pressed]].
- Explain why physics runs on a fixed timestep: [[two-clocks|Two Clocks]].

## Where to start

1. [[stop-motion-studio|Start in a Stop-Motion Studio]]: the metaphor that carries the whole week.
2. [[the-loop|The Loop]] → [[delta-time|Delta Time]] → [[two-clocks|Two Clocks]] → [[input-held-vs-pressed|Input]].
3. The four practice exercises: [[broken-twin|The Broken Twin]], [[real-mover|The Real Mover]], [[the-sun|The Sun]], [[the-proof|The Proof]].
4. [[a2-spec|Assignment 2: The Loop & Input]]: paced this week. Requires [[w02:a1-spec|Assignment 1]] passed before grading.
