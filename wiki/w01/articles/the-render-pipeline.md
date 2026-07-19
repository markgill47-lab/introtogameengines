# The Render Pipeline

> **Supplemental** · deepens [[renderer|The Renderer]] · nothing here is on a quiz

[[renderer|The Renderer]] article made a promise: you'll configure it constantly and think about it rarely. This page is the thinking, done once, so the configuring makes sense.

Every frame, your scene goes down a pipeline. Five stages, always in this order, top to bottom. Each stage's output is the next stage's input, and by the bottom of the stack a tree of objects has become a picture.

{{widget:renderpipeline}}

Two things worth noticing once you've read all five:

- **The order is the explanation.** Sorting happens before shading because there's no point lighting a pixel that loses the depth test. Color is separate from Shade because the surface's own look and the light falling on it are different questions, which is exactly the [[res:pbr|PBR]] idea.
- **You already own the top of the pipeline.** Logic is fed by the scene tree, which is Week 2's whole subject. The rest belongs to the engine, and that's the [[start-with-2002|2002 story]] again: a semester of work per stage, absorbed, so you can think about what's in the scene instead of how it becomes pixels.

*Deeper water in the library: [[res:shaders|Shaders]] for writing the Shade stage yourself, [[res:pbr|PBR Materials]] for what the Color and Shade sliders mean.*
