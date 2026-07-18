# Week 10 Concepts: The State Pattern

> **How to use this module:** This document is the complete concept material for Week 10, the first week of the patterns tier. You do not need the lectures to complete A8. Read this, then work through `Week10_Practice.md` in your engine, then check `A8_Spec.md` before you record. One receipt gets paid in full this week: the Week 8 footage of your animator graph is about to become personally significant, as promised.

---

## Start with a traffic light built out of booleans

Suppose you were asked to program a traffic light and, having just finished Programming 2, you reached for what you know:

```csharp
bool isRed;
bool isYellow;
bool isGreen;
bool isFlashing;
```

Four booleans. Sixteen possible combinations. How many are meaningful? Three, maybe five with flashing modes. The other eleven combinations (red *and* green; yellow, green, *and* flashing; all four at once) are nonsense, and here's the part that matters: **your program can represent every one of them.** Nothing in the type system, nothing in the compiler, nothing anywhere prevents `isRed = true; isGreen = true;` from happening at 2 AM via two functions that each did something reasonable. You will write guard conditions (`if (isRed && !isGreen && ...)`), the guards will multiply with every new flag, and one day an intersection shows both colors and somebody's insurance company gets involved.

Now the actual traffic light: a dial with three positions. It is *physically incapable* of being red and green, not because a guard checks, but because **the representation cannot express the nonsense.** One value, three legal options, transitions between them and nowhere else.

That's the whole pattern. "Why is my player jumping while dead?" has the same answer as the two-color intersection: because its behavior is a pile of booleans that can express jumping-while-dead, and a pile that *can* express a state *will*, eventually, at the worst moment, in front of the person grading it. This week we stop guarding against impossible states and start making them unrepresentable.

---

## 1. The flag-pile failure, in your own project

You already own one of these. Week 6's flow controller: `isPaused`, `isGameOver`, `started`, three booleans guarding each other in an if-thicket, and I told you to sit with the feeling that it was about to stop scaling. Here's the arithmetic behind the feeling: every new boolean *doubles* the state space while adding maybe one meaningful state. Add a settings screen, a cutscene flag, and a victory flag to the pile and you have 64 representable combinations, six or seven of which mean anything, and every function that touches the flags has to defensively navigate the other fifty-something. The guards *are* the bug surface. This is not a style complaint; it's combinatorics, and combinatorics always wins.

The diagnostic worth memorizing: **when you find yourself writing `if (a && !b && (c || !d))` to figure out what the object is currently doing, the object is begging to be a state machine.** The flags were never independent facts. They were a bad encoding of one fact: *what mode is this thing in right now?*

---

## 2. The anatomy: states, transitions, events

A **finite state machine** (FSM) is that one fact, made explicit, plus the rules for changing it:

- **States:** the modes. Exactly one is active at a time. Menu, Playing, Paused, GameOver. Patrol, Chase, Return.
- **Transitions:** the legal arrows between states. Paused can go to Playing; GameOver cannot go to Paused, and now it *structurally* can't, rather than being guarded against.
- **Events and conditions:** what fires a transition. A keypress, health hitting zero, a player entering a radius, a timer expiring.

The discipline that makes FSMs pay off, and A8 grades it: **draw the diagram before you write the code.** Circles for states, arrows for transitions, labels for what fires each arrow. The drawing takes five minutes, and it's where design bugs die cheaply: an arrow you can't justify on paper is a transition that shouldn't exist in code, and a state with no exit arrow is a softlock you just caught with a pencil. Your code's job is then merely to *match the drawing*, and "matches the drawing" is a spec you can check at a glance.

And the payoff of exactly-one-state: every "what should I do this frame?" question collapses from an if-thicket to a single dispatch: *ask the current state.* The impossible combinations don't need guards because they don't exist.

---

## 3. Two implementations, one pattern

**The enum-and-switch.** One enum field holds the current state; a switch dispatches behavior:

```csharp
public enum FlowState { Menu, Playing, Paused, GameOver }
FlowState state = FlowState.Menu;

void Update()
{
    switch (state)
    {
        case FlowState.Playing:
            if (Input.GetKeyDown(KeyCode.Escape)) EnterPause();
            break;
        case FlowState.Paused:
            if (Input.GetKeyDown(KeyCode.Escape)) EnterPlaying();
            break;
        // ...
    }
}
```

This is a real state machine, it fixes the flag pile completely, and for small machines (game flow, a door, a chest) it's the right amount of machinery. Its weakness appears at scale: as states grow behavior, the switch swells, and the enter/exit bookkeeping (pause the world *when entering* Paused, show the panel, then undo both *when leaving*) smears across the transition functions.

**The State pattern proper.** Each state becomes an object with three methods, and the machine shrinks to a pointer:

```csharp
public abstract class GuardState
{
    public abstract void Enter(Guard guard);
    public abstract void Update(Guard guard);
    public abstract void Exit(Guard guard);
}

public class Guard : MonoBehaviour
{
    private GuardState current;

    public void ChangeState(GuardState next)
    {
        current?.Exit(this);
        current = next;
        current.Enter(this);
    }

    void Update() => current?.Update(this);
}
```

Now `PatrolState` owns everything about patrolling: `Enter` picks the next waypoint and sets the animator walking, `Update` moves and watches for the player, `Exit` cleans up. The bookkeeping that smeared across the switch version has a *home*, symmetric by construction: whatever Enter sets up, Exit tears down, and the `ChangeState` method guarantees the ceremony happens in order, every transition, forever. Adding a state means adding a class, not renovating a switch.

**Which one, when:** enum-and-switch for machines with few states and light enter/exit ceremony; state objects when states have real behavior, real setup/teardown, or you can feel the switch swelling. A8 asks for one of each, at two scales, so you'll own both ends of the tradeoff by Friday. What it never asks for: apologizing for the switch version. A small machine in a switch is correct engineering, not a lesser pattern.

---

## 4. Two scales: the flow and the brain

The same pattern runs at two altitudes in every game, and this week you build both:

**Game flow.** Week 6's boolean soup becomes an explicit Menu → Playing ⇄ Paused, Playing → GameOver → (restart) machine. The panels, the time scale, and the input routing all become enter/exit ceremony instead of scattered if-guards. The demo game performs this refactor on its own Week 6 controller, and the diff is the argument: fewer lines, zero impossible states, and the settings screen you'll inevitably add later becomes *one more circle on the diagram* instead of a fifth boolean squaring the state space.

**A character's brain.** The demo game's gate guard gets the course's first real AI: Patrol (walk waypoints) → Suspicious (player seen nearby: stop, look) → Chase (player confirmed: pursue) → Return (lost them: walk back). Four states, five arrows, and suddenly the guard has legible *behavior*: you can watch him and narrate which circle he's in, which is exactly what makes state-machine enemies readable to players, and readable enemies are what make stealth games fair. (This guard is not done with us. Week 15 upgrades his brain to a behavior tree, on camera, same guard, and gives him real senses. Today his "vision" is a distance check, and that's fine; the *decisions* are this week's cargo.)

---

## 5. The receipt from Week 8, paid

Pull up your A6 footage: the animator graph, states in boxes, arrows with conditions, exactly one box in charge. You built and operated a finite state machine two weeks before learning its name, and your engine considered the pattern so essential it shipped a visual editor for it. That's the pattern-vocabulary lesson of Week 9 landing with receipts: patterns aren't exotic; they're the shapes underneath tools you already trust.

One clarification now that you're running *two* state machines on one character: they are colleagues, not twins. **Your FSM decides behavior; the animator's FSM decides pose.** The brain says "we are now Chasing" and sets `animator.SetFloat("Speed", runSpeed)`; the animator graph hears the fact and blends to the run. Neither reaches into the other's states directly, and the parameter interface between them is the same facts-not-commands discipline you learned in Week 8. Two machines, one conversation, held through parameters.

---

## 6. Gotchas and judgment calls

- **Flags smuggled back in.** A `PatrolState` with `bool isWaiting` inside it is fine (state-local detail). A machine that still consults `isGameOver` alongside `current` has two sources of truth, and they *will* disagree. The enum or the pointer IS the fact; the old flags get deleted, not shadowed.
- **Transitions from everywhere.** If every state can jump to every state, you've drawn a fully-connected graph, which is the flag pile wearing a diagram. Sparse arrows are the value; "you can only get here from there" is the machine doing its job.
- **States coupling to each other.** `PatrolState` should request `ChangeState(chase)`, not reach into `ChaseState`'s fields. States talk to the machine and the owner, never to each other's internals.
- **Work in the wrong slot.** Setup in Update instead of Enter means it runs every frame; teardown forgotten entirely means Paused leaks its time scale into Playing (you shipped exactly this bug in Week 6, on purpose; now you know its true name: a missing Exit).
- **Machine fever.** A door that's open or closed is a bool, and that's fine. The pattern earns its keep at three-plus states with real transition rules. Week 9's warning stands: patterns treat wounds you actually have.

---

## Check yourself

1. Sixteen combinations, three meaningful: what does the boolean traffic light permit that the dial cannot express, and why do guards not fix the difference in kind?
2. Your flow controller gains a settings screen. Compare the cost in the flag-pile version versus the FSM version, in one sentence each.
3. What ceremony does `ChangeState` guarantee, and which Week 6 bug was a missing half of it?
4. Enum-and-switch or state objects: pick for (a) a chest that's Locked/Closed/Open, (b) a boss with six behaviors and elaborate entrances. Defend each in a sentence.
5. Your guard's FSM and his animator graph: who decides behavior, who decides pose, and what passes between them?

---

## Going deeper

- **Nystrom, [State](https://gameprogrammingpatterns.com/state.html):** this exact pattern, in the free book, with extensions we didn't need this week (hierarchical machines, pushdown automata for "return to what I was doing"). Read it after building yours; it lands differently once you've drawn the diagrams.
