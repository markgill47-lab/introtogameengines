# Check Yourself

Before you record Assignment 3, see if you can answer these without looking:

1. The windmill blades, the sun pivot, and a thrown rock: for each, who has authority over its placement, and what granted that authority? *([[bowling-alley|hint]])*
2. Static, kinematic, dynamic: assign citizenships to a house, an elevator, and a thrown rock, and state who can push whom. *([[body-types|hint]])*
3. Why is teleporting a dynamic body by its transform a bug even when it looks like it worked? *([[body-types|hint]])*
4. Your trigger zone fires no events as the player walks through. What is the first thing you check, and why is the failure silent? *([[collision-vs-trigger|hint]])*
5. Throwing a rock: force or impulse, which update does it fire from, and where did delta time go? *([[forces-and-impulses|hint]])*
6. You hand a moving object to the simulation and it drops straight down instead of continuing on its way. What did the engine not inherit, and whose job was it to supply it? *([[bowling-alley|hint]])*

## Or let the wiki quiz you

Nine questions, instant feedback, nothing recorded anywhere: this is a mirror, not a gradebook.

{{widget:quiz}}

## Going deeper

- **Fiedler, [game physics series](https://gafferongames.com/categories/game-physics/):** free articles on integration, timesteps, and simulation by [[res:gaffer|a veteran of the field]]. The natural next step if [[bowling-alley|the authority handoff]] made you curious what the simulation is actually doing between your fixed updates.
- **Nystrom, [Game Loop](https://gameprogrammingpatterns.com/game-loop.html):** worth a re-read now from [[res:nystrom|the course's favorite free book]]. You read it in Week 3 for the loop itself; read it again knowing that [[what-physics-sees|the fixed clock has a passenger]].
