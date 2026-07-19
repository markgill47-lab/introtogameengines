# The Unity Lifecycle

> **Supplemental** · deepens [[scripting-runtime|The Scripting Runtime]] · Unity-specific, on purpose

Here is the point of an engine, made concrete. Look at the methods below and notice what's missing: **you never call any of them.** There is no main() with your name on it. You write Awake, Start, Update; the engine calls them, at the right moment, in the right order, forever. Old-timers call this the Hollywood principle: don't call us, we'll call you. It's the first of the [[what-is-a-game-engine|three promises]] wearing its Unity costume.

The industry word for these is **callbacks**: functions you write but never call, handed to a system that calls you back when the moment is right. The term is not retro trivia; it's load-bearing vocabulary from JavaScript to every engine's documentation, and it names the deal precisely. You hand the engine your code. The engine owns the phone.

Every script you write this semester is a set of appointments with this machine. Startup callbacks run once when an object arrives. Then the loop spins, and keeps spinning, until the scene ends.

{{widget:unitylifecycle}}

Three things to take away once you've opened all seven:

- **The ring is the engine.** That spinning circle is promise number one from Week 1, running about sixty times a second. Week 3 is entirely about it, and after that it never stops mattering.
- **The two arrows tell time differently.** The ring laps in a hundredth of a second; the coroutine arrow crawls. A task bigger than a frame doesn't block the loop, it borrows a slice of many loops. Feel that difference now and Week 3's two-clocks discussion will land softly.
- **This is the dictionary's first real entry.** Godot spells these _ready and _process(delta); Unreal spells them BeginPlay and Tick. Same appointments, different names, exactly as the [[engine-policy|engine policy]] promised. The [[w02:cross-engine-dictionary|cross-engine dictionary]] grows one of these tables every week.

*Deeper: the two-clocks argument behind FixedUpdate is [[res:gaffer|Fix Your Timestep!]] in the library.*
