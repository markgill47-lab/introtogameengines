# Week 1 Concepts: Engines, Anatomy, and Choosing Yours

> **How to use this module:** This document is the complete concept material for Week 1. You do not need the lectures. Read this, then work through `Week01_Practice.md` to get your engine installed and verified. There is no paced assignment this week; the deliverable is a working development environment and a decision.

---

## Start with 2002

I've been a software engineer longer than software engineering was a thing. My first job out of grad school was writing scientific visualizations in C++ and OpenGL, and I mean *writing* them. If I wanted light to fall off across a surface, I decided how, mathematically, and then implemented it. If I wanted to bring in a 3D model, I wrote the loader, and then the material system that put a surface on it. If I wanted physics, I came up with the physics. None of that was the visualization. That was the machinery that had to exist before the visualization could.

Games worked the same way, at scale. In those days a new video game started with roughly half a million 2002 dollars, a team of twenty engineers, and six months, and what all of that bought you was the *engine*. Not the game. Before anyone made a single decision about what kind of game it was, twenty people spent half a year building the triangle-drawing, model-loading, physics-integrating machinery that made a game possible.

Working in Unity, I work on the behavior layer. The lighting falloff is a dropdown. The model loader is drag-and-drop. The physics is a checkbox. Six months, half a million dollars, and twenty engineers now boil down to "pick one."

There's a name for what happened, and it's the most important idea in this module: a game engine is an **elevation of cognitive labor**. The engine didn't remove the work; it absorbed a whole layer of it, so your thinking moves up a floor. You stop deciding how photons attenuate and start deciding how a guard behaves when he hears a footstep. Hold on to that phrase, because it's happening again right now: AI tools are doing to the behavior layer what engines did to the machinery layer, and section 6 picks up that thread. So will the rest of your career.

One consequence worth sitting with before we move on: without an engine, this course would be a course on *writing* an engine. That's a real and noble course. It's also three semesters long, and you spend the first one drawing a triangle. We have sixteen weeks, and I'd rather you spend them making things move, collide, glow, and think.

---

## 1. What is a game engine, actually?

Strip the marketing and an engine is three promises:

1. **A loop.** The engine runs your world many times a second: read input, update everything, draw the frame. You write the "update everything" part. (Week 3 is entirely about this loop, and it's a better week than that sentence makes it sound.)
2. **A scene.** The engine gives you a structured world to put things in: a tree of objects with positions, parents, and children. (Week 2.)
3. **A toolbox of subsystems** so that physics, audio, UI, animation, and input are things you *configure and script* rather than things you *derive from mathematics*.

Everything else, the editors, the asset stores, the build pipelines, exists in service of those three promises.

And one definitional footnote that matters for this course: an engine doesn't care whether you're making a game. A physics simulation, a data visualization, an architectural walkthrough, a meteorology demo: same loop, same scene, same subsystems. That's why the final project has four lanes and only one of them says "game."

---

## 2. The Common Anatomy

Every engine you will ever touch ships some version of the following organs. Every one of them is something 2002 Me wrote by hand, which is how I can promise you each is a semester of work you're not doing. Learn the organ, not the menu, because menus change every version and organs haven't changed in twenty years. This list is also a map of your semester: each subsystem gets its week.

- **The Renderer.** Turns your scene into pixels, sixty-ish times a second. Cameras, lights, materials. You'll configure it constantly and think about it rarely, which is the sign of a subsystem doing its job.
- **The Scene System.** The tree of everything: objects, their transforms, their parent/child relationships. *(Week 2.)*
- **The Scripting Runtime.** Where your code runs, hooked into the loop. C# in Unity, GDScript or C# in Godot, C++ or Blueprints in Unreal, JavaScript in Three.js. *(Week 3 and then every week forever.)*
- **The Physics Engine.** A parallel simulation of forces, bodies, and collisions that the renderer takes pictures of. *(Week 5.)*
- **The Input System.** Devices in, actions out. Every engine has modernized this layer recently, and Week 12 explains why that happened everywhere at once.
- **The UI System.** The part of the picture that isn't the world: menus, health bars, buttons. *(Week 6.)*
- **The Animation System.** Data that changes properties over time, with state machines to decide which data plays. *(Week 8, with a callback in Week 10 you'll enjoy.)*
- **The Audio System.** One-shots, loops, mixers, 3D positioning. *(Week 7.)*
- **The Asset Pipeline.** Imports models, textures, sounds, and fonts into engine-usable form. (In 2002 this was me, writing loaders by hand. You're welcome.) You'll fight it exactly once, in Week 8, when a Mixamo character comes in T-posing sideways at forty times the correct scale. Everyone does. It's a rite of passage.

Ten engines, one anatomy. When you switch engines (and over a career, you will, several times), you are not learning a new anatomy. You are learning new names for organs you already know. This course hands you the anatomy; the names are the cheap part.

---

## 3. Engine Profiles

Opinions follow. They're mine, they're stated plainly, and reasonable professionals disagree with every one of them.

### Unity
The course default and the one I teach in. C# scripting, a mature editor, and the largest tutorial-and-answers ecosystem in existence, which matters more than students think: at 11 PM, your error message has already been solved on some forum, in Unity's case usually eleven times. The Personal license is free below a revenue threshold you do not need to worry about yet. Its weakness is churn: Unity has a habit of shipping two or three ways to do the same thing (two render pipelines, two input systems, two UI systems) and leaving both alive. I'll tell you which one we're using whenever it comes up.

### Godot
Open source, free forever, no licensing asterisks, and refreshingly small: it downloads in seconds and runs on hardware that would make Unreal laugh. GDScript is a Python-flavored language you'll pick up in an afternoon, and C# is supported if you'd rather stay close to the Unity demos. Godot's signals are the Observer pattern as a first-class engine feature, which will make Week 11 feel like home turf. The ecosystem is smaller than Unity's; your 11 PM error has been solved maybe twice, not eleven times. A very good choice for this course.

### Unreal
The AAA engine, and it looks like it: the prettiest defaults in the business. C++ for real work, Blueprints (visual scripting) for a great deal of legitimate work, and Enhanced Input that ships half of Week 12 in the box. The costs are real: the largest install, the heaviest hardware demands, the slowest iteration loop, and C++ is the least forgiving language in this paragraph. Choose Unreal if you already have a machine that can carry it and a reason to want it. "It looks cool" is a reason; just budget the hours.

### Three.js
The asterisk on the list, and I include it deliberately. Three.js is not a full engine; it's a rendering library for the browser, and you assemble the rest (physics via a library like rapier or cannon-es, UI via HTML/CSS, your own loop via requestAnimationFrame). Choosing it means building small versions of subsystems the other engines hand you, which is more work and, for the right student, more education. It is unbeatable for two things: procedural geometry (Week 14 will be your show-off week) and shipping, because your final project is a URL anyone can open. Best suited to students already comfortable in JavaScript.

### Honorable mentions
Phaser (2D, browser, lovely for a 2D final project), MonoGame (C#, code-only, no editor: the "I want to feel the loop myself" option). If you have another candidate, come talk to me. The answer is usually yes.

---

## 4. How to Choose

Four questions, in order of how much they should weigh:

1. **What does your hardware say?** Unreal on a five-year-old laptop is a bad semester. Godot runs on anything. Be realistic before you be ambitious.
2. **What language do you want to live in?** You'll write a lot of it. C# (Unity, Godot, MonoGame), GDScript (Godot), C++ (Unreal), JavaScript (Three.js, Phaser).
3. **What's your final project lane, roughly?** A browser-shippable visualization points at Three.js. A gorgeous 3D showpiece points at Unreal. A "I want maximum help available" semester points at Unity. Nothing is locked; directionally it matters.
4. **How much support do you want?** I demo in Unity. Unity students get their exact problem solved on screen. Everyone else translates, which is a skill this course explicitly values, but it is a tax, and you should choose it on purpose rather than discover it in Week 5.

When in doubt: Unity. It's the most-supported path in this course and the VizLab machines have it installed. And decide *this week*. Switching engines in Week 3 costs a weekend. Switching in Week 9 costs the micro-game.

---

## 5. The Engine Policy, in practice

The syllabus version: I teach the concepts and demo them in Unity; your engine is your responsibility. Here is what that means on an ordinary Tuesday:

- Ask me "how do I decouple my UI from my player?" in any engine, and we'll have a great conversation. That's a concept question, and concepts are the course.
- Ask me "why does my Godot export template fail on Windows?" and I will sympathize, and maybe even be useful, but you own that problem. That's a tooling question, and your tooling is yours.
- Every assignment spec is written in engine-neutral, observable-behavior terms. Nothing you're graded on requires Unity. The demo videos I grade don't care what's rendering them.
- The demo game I build in class all semester is a Unity project. Watching a concept get built in Unity and then building it in your engine is not a workaround; it's the actual pedagogy. Translation is how you prove you learned the concept and not the menu.

---

## 6. Using an LLM to learn an engine

The 2002 story has a sequel, and you're living in it. Engines absorbed the machinery layer so developers could work at the behavior layer. AI is the same move, one floor up: it's starting to absorb the behavior layer's routine labor (the boilerplate, the syntax, the first draft) so you can work at the level of intent and design. Elevation of cognitive labor, again. And notice what survived the first elevation, because it's what survives the second: the engineers who thrived when engines arrived weren't the ones who missed writing loaders. They were the ones who knew what they wanted to build and could tell when the machinery underneath was lying to them. Same skills, new floor.

So you're going to use an LLM this semester the way you use a compiler: constantly and without ceremony. A scoping note before the list: everything in this section is about working with an LLM through a chatbot (Copilot, Claude, ChatGPT, whichever), because that's the tool you have. There are more capable ways to wire an LLM into a development workflow, and they come with their own sharp edges, but they're a conversation for later in your career, not for Week 1. The chatbot is plenty. Week 1 is the right time to learn its sharp edges, because "teach me an engine" is simultaneously the thing an LLM is best at and the thing it fails at most confidently.

**Where it's excellent:**

- Concept explanations, at any level of depth, with infinite patience. "Explain a scene graph like I know Java but have never used an engine" produces gold.
- Translation between engines. "This is Unity C#; what's the idiomatic Godot 4 equivalent?" This one sentence makes the whole engine-of-your-choice policy workable, and you should wear it out.
- Reading error messages. Paste the full error, not a summary of your feelings about it.
- Generating a first-draft script you then read line by line. Emphasis on *read*.

**Where it will burn you:**

- **Version drift.** The model learned from years of tutorials spanning many engine versions. It will confidently hand you Unity's legacy input in a new Input System project, Godot 3 syntax in Godot 4 (this one is constant; the API renamed heavily), or a deprecated Unreal node. Always tell it your engine *and version*, and treat any API name it gives you as a claim to verify, not a fact.
- **Invented APIs.** Sometimes the function it calls simply doesn't exist. It sounds exactly as confident as when the function does exist. The compiler is the referee.
- **Oversized answers.** Ask for a movement script, receive a character controller framework with wall-running. Ask for the smallest version that works. You're building understanding, not accepting deliveries.

The build note on every assignment asks what AI produced and what you had to fix. Week 1 is where you start noticing the second half of that sentence exists.

---

## Check yourself

1. What are the three promises every engine makes, and which week covers each of the first two?
2. Name five organs in the Common Anatomy and one sentence of what each does.
3. Which engine would you pick for a browser-shippable data visualization, and what are you agreeing to build yourself by picking it?
4. The chatbot hands you a Godot script and it errors on the first line. What are the two most likely explanations, and what's your first move?

---

## Going deeper (free, like everything on the course resource list)

- **The engine docs themselves:** whichever you chose, its official documentation is your first stop all semester. Godot's ([docs.godotengine.org](https://docs.godotengine.org/)) is openly licensed and conceptually excellent even for non-Godot students.
- **The map of everything:** [awesome-learn-gamedev](https://github.com/dawdle-deer/awesome-learn-gamedev) is a maintained index of free game-development learning material. Bookmark it; the course's own `CourseResources.md` is the curated shortlist.
