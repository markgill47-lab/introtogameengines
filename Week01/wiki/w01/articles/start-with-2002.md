# Start with 2002

I've been a software engineer longer than software engineering was a thing. My first job out of grad school was writing scientific visualizations in C++ and OpenGL, and I mean *writing* them. If I wanted light to fall off across a surface, I decided how, mathematically, and then implemented it. If I wanted to bring in a 3D model, I wrote the loader, and then the material system that put a surface on it. If I wanted physics, I came up with the physics. None of that was the visualization. That was the machinery that had to exist before the visualization could.

Games worked the same way, at scale. In those days a new video game started with roughly half a million 2002 dollars, a team of twenty engineers, and six months, and what all of that bought you was the *engine*. Not the game. Before anyone made a single decision about what kind of game it was, twenty people spent half a year building the triangle-drawing, model-loading, physics-integrating machinery that made a game possible.

Working in Unity, I work on the behavior layer. The lighting falloff is a dropdown. The model loader is drag-and-drop. The physics is a checkbox. Six months, half a million dollars, and twenty engineers now boil down to "pick one."

## Elevation of cognitive labor

There's a name for what happened, and it's the most important idea in this module: a game engine is an **elevation of cognitive labor**. The engine didn't remove the work; it absorbed a whole layer of it, so your thinking moves up a floor. You stop deciding how photons attenuate and start deciding how a guard behaves when he hears a footstep.

Hold on to that phrase, because it's happening again right now: AI tools are doing to the behavior layer what engines did to the machinery layer, and [[llm-tutor|Using an LLM to Learn an Engine]] picks up that thread. So will the rest of your career.

## Why this course uses one

One consequence worth sitting with before we move on: without an engine, this course would be a course on *writing* an engine. That's a real and noble course. It's also three semesters long, and you spend the first one drawing a triangle. We have sixteen weeks, and I'd rather you spend them making things move, collide, glow, and think.

*Next: [[what-is-a-game-engine|What is a game engine, actually?]]*
