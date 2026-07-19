# Check Yourself

Before you record Assignment 2, see if you can answer these without looking:

1. In [[stop-motion-studio|the stop-motion studio]], what are the frame, the update, and delta time?
2. Why did the Turbo button exist, and what one-line code change makes it unnecessary? *([[delta-time|hint]])*
3. A jump wired to `GetKey` and a walk wired to `GetKeyDown`: describe how each misbehaves and why. *([[input-held-vs-pressed|hint]])*
4. Which clock does physics march to, and why does it refuse to march to the other one? *([[two-clocks|hint]])*
5. Your movement code is `transform.Translate(Vector3.forward * 6f * Time.deltaTime)`. What are the units of each factor, and what changes on a machine three times faster?

## Or let the wiki quiz you

Eight questions, instant feedback, nothing recorded anywhere: this is a mirror, not a gradebook.

{{widget:quiz}}

## Going deeper

- **Nystrom, [Game Loop](https://gameprogrammingpatterns.com/game-loop.html) and [Update Method](https://gameprogrammingpatterns.com/update-method.html):** this module's material from [[res:nystrom|the course's favorite free book]], with the engine-internals view of what your callbacks hang from.
- **Fiedler, [Fix Your Timestep!](https://gafferongames.com/post/fix_your_timestep/):** the classic article behind [[two-clocks|the two-clocks section]], by [[res:gaffer|the person who made the argument famous]]. Short, and it goes one level deeper than we did (interpolation between fixed steps).
