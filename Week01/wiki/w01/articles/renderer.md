# The Renderer

> **Covered:** constantly, all semester · **Organ of:** [[common-anatomy|the Common Anatomy]]

Turns your scene into pixels, sixty-ish times a second. Cameras, lights, materials. You'll configure it constantly and think about it rarely, which is the sign of a subsystem doing its job.

> **Meanwhile, in 2002:** *If I wanted light to fall off across a surface, I decided how, mathematically, and then implemented it.*

The renderer draws whatever the [[scene-system|scene]] contains — it doesn't decide what exists or where it is, and it doesn't simulate anything. The [[physics-engine|physics engine]] runs a parallel simulation; the renderer takes pictures of it.

One engine-specific note you'll hit early: [[unity|Unity]] ships **two render pipelines** and leaves both alive — an example of the churn described in its profile. I'll tell you which one we're using whenever it comes up.
