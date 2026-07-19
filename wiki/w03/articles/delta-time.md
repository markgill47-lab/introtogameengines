# Delta Time: How Big Is a Nudge?

Here's the bug you're going to write this week (everyone does; [[broken-twin|the practice guide has you write it on purpose]]):

```csharp
void Update()
{
    transform.Translate(Vector3.forward * 0.1f);   // move forward a bit each frame
}
```

Looks fine. Runs fine, on your machine. The object moves 0.1 units *per frame*. And that's the bug, because a frame is not a unit of time. A gaming rig pushing 240 fps takes 240 nudges a second and the object screams ahead at 24 units per second. A laptop grinding at 30 fps manages 3 units per second on identical code. Your game's actual speed is now a hardware benchmark.

## The Turbo button

This is not a hypothetical. Old PCs shipped with a physical **Turbo button** whose real purpose was to *slow the machine down*, because a generation of games nudged per frame, and on newer, faster hardware they became unplayable. An entire industry put a "make my expensive computer worse" button on the front of the case rather than fix this bug. You get to just fix the bug.

## The road-trip question

The fix is the road-trip question. If you're driving 60 miles per hour, how far did you go? No idea, until I tell you *how long you drove*. Distance is speed times time, and a frame is just a very short drive of slightly unpredictable length. The engine measures each frame's duration and hands it to you: **delta time**, the seconds (usually a small fraction of one) since the last photo.

```csharp
void Update()
{
    transform.Translate(Vector3.forward * 6f * Time.deltaTime);   // 6 units per SECOND
}
```

Read the units out loud: 6 units per second, times deltaTime seconds, equals a distance. The 240 fps machine takes 240 tiny nudges; the 30 fps machine takes 30 bigger ones; after one second of wall-clock time, both objects are exactly 6 units along. Same game, every machine. That's **frame-rate independence**, it's what [[a2-spec|Assignment 2]] grades first, and the rule compresses to one line: **anything continuous gets multiplied by delta time.** Movement, rotation, timers, fading, filling: if it happens *over time*, dt is in the expression. (The [[w02:the-windmill|windmill from last week]] now makes complete sense: 45 degrees per second, times seconds. Faith replaced, as promised.)

## The equally important flip side

Anything *instantaneous* does not get delta time. A jump impulse, a purchase, a door unlocking: those happen once, not per-second, and multiplying them by dt turns a jump into a twitch. Knowing which of the two you're writing is most of this week's skill.

*Next: [[two-clocks|Two Clocks]], because there's a second heartbeat in the engine.*
