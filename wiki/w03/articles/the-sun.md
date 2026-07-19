# Exercise 3: The Sun (10 minutes)

Time-driven motion with no input proves you understand dt as "per second," not "per keypress."

1. Create an empty at the origin named `SunPivot`. Parent your scene's Directional Light to it ([[w02:the-pivot|Week 2 skill]], already paying rent).
2. Attach the Week 2 `Spin` script to the pivot, or write the one-liner fresh: rotate around X at, say, 6 degrees per second. That's a 60-second day/night cycle.
3. Play. The valley's shadows crawl. Notice what you built: the windmill spins, the sun wheels, the player walks, and every one of them is the same idea (rate × `Time.deltaTime`) wearing three costumes.

*If this pivot-with-a-light move feels familiar, it should: it's [[w02:solar-system|the Solar System supplemental]] with one planet and better lighting. Next: [[the-proof|Exercise 4: The Proof]].*
