# Week 15: Game AI, and Deconstructions

> **How to use this module:** Everything you need to complete this week's work is in this module. The live lectures walk the same ground off script, so treat them as a bonus, not a requirement. Read the concept material, follow the practice guide in your engine, and check the assignment spec before you build.

**Role in the course:** Making non-player entities behave: steering, pathfinding, and decision-making. Also the week A12 deconstructions are presented, live or by video.

## Learning objectives
- Implement steering behaviors: seek, flee, arrive, wander (and smooth turning toward a target).
- Use pathfinding (navmesh or grid/A*) to move agents through a world with obstacles.
- Structure decision-making with an FSM or simple behavior tree. (Week 10 callback: your enemy is a state machine.)
- Combine the three layers: deciding (brain), pathing (route), steering (motion).

## Concept material (to be written)
1. **The Three Layers of Game AI:** decision, path, motion, and how they stack.
2. **Steering:** seek/flee/arrive/wander, plus smooth rotation toward a moving target.
3. **Pathfinding:** A* intuition (no proofs), navmeshes vs. grids, dynamic obstacles in one paragraph.
4. **Decision-Making:** FSM brains (guard, chase, attack, retreat), then behavior trees as the industry step up.
5. Game AI optimizes for interesting, not optimal. An enemy that plays perfectly is a bad enemy.
6. **Cross-Engine Dictionary:** NavMeshAgent (Unity), NavigationAgent (Godot), NavMesh/Behavior Trees built in (Unreal), pathfinding libs (Three.js).

## Practice guide (to be written)
- Unity walkthrough: a patrol/chase/attack enemy with navmesh movement and an FSM brain.
- Equivalent sketches for the other engines.

## Assignments paced this week
- **A14, Game AI:** an agent with at least two decision states, pathfinding through obstacles, and smooth steering. Full spec checklist in the assignment file. Standard deliverables: narrated demo video (2–5 min), source, and a one-paragraph build note.
- **A12, Game Deconstruction:** presented this week, live in studio or as a submitted video.
