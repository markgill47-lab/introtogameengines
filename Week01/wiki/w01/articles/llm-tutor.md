# Using an LLM to Learn an Engine

The [[start-with-2002|2002 story]] has a sequel, and you're living in it. Engines absorbed the machinery layer so developers could work at the behavior layer. AI is the same move, one floor up: it's starting to absorb the behavior layer's routine labor (the boilerplate, the syntax, the first draft) so you can work at the level of intent and design. Elevation of cognitive labor, again.

And notice what survived the first elevation, because it's what survives the second: the engineers who thrived when engines arrived weren't the ones who missed writing loaders. They were the ones who knew what they wanted to build and could tell when the machinery underneath was lying to them. Same skills, new floor.

So you're going to use an LLM this semester the way you use a compiler: constantly and without ceremony. A scoping note before the list: everything in this section is about working with an LLM through a chatbot (Copilot, Claude, ChatGPT, whichever), because that's the tool you have. There are more capable ways to wire an LLM into a development workflow, and they come with their own sharp edges, but they're a conversation for later in your career, not for Week 1. The chatbot is plenty. Week 1 is the right time to learn its sharp edges, because "teach me an engine" is simultaneously the thing an LLM is best at and the thing it fails at most confidently.

## Where it's excellent

- **Concept explanations**, at any level of depth, with infinite patience. "Explain a scene graph like I know Java but have never used an engine" produces gold.
- **Translation between engines.** "This is Unity C#; what's the idiomatic Godot 4 equivalent?" This one sentence makes the whole [[engine-policy|engine-of-your-choice policy]] workable, and you should wear it out.
- **Reading error messages.** Paste the full error, not a summary of your feelings about it.
- **Generating a first-draft script** you then read line by line. Emphasis on *read*.

## Where it will burn you

- **Version drift.** The model learned from years of tutorials spanning many engine versions. It will confidently hand you Unity's legacy input in a new Input System project, Godot 3 syntax in Godot 4 (this one is constant; the API renamed heavily), or a deprecated Unreal node. Always tell it your engine *and version*, and treat any API name it gives you as a claim to verify, not a fact.
- **Invented APIs.** Sometimes the function it calls simply doesn't exist. It sounds exactly as confident as when the function does exist. The compiler is the referee.
- **Oversized answers.** Ask for a movement script, receive a character controller framework with wall-running. Ask for the smallest version that works. You're building understanding, not accepting deliveries.

The build note on every assignment asks what AI produced and what you had to fix. Week 1 is where you start noticing the second half of that sentence exists.

*Test yourself on these failure modes in [[check-yourself|Check Yourself]].*
