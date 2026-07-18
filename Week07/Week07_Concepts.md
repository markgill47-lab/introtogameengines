# Week 7 Concepts: Cameras and Game Feel

> **How to use this module:** This document is the complete concept material for Week 7. You do not need the lectures to complete A5. Read this, then work through `Week07_Practice.md` in your engine, then check `A5_Spec.md` before you record. This is also the week the Standard Prefab's Effects and Audio children stop being empty parking spots.

---

## Start with a car door

Luxury automakers employ acoustic engineers whose job is the sound of a door closing. Not the door. The *sound* of the door. They tune latch mechanisms, add damping material, and adjust panel resonance until shutting the door produces a deep, solid *thunk* instead of a tinny clank, because decades of research say customers unconsciously judge the entire car by that half-second. The thunk does not make the door work better. Both doors keep out rain. But one door *feels* engineered, and the other feels cheap, and buyers who could not tell you why will pay thousands of dollars for the difference.

Games have the same physics. Two versions of the same mechanic (identical code paths, identical rules, identical outcomes) can feel completely different depending on the feedback wrapped around the moment of action. The industry's word for that wrapping is **juice**: the particles, sounds, camera movement, and visual punctuation that tell the player's hands and ears *that mattered, and here's how much*. Juice does not make your game work better. It makes your game feel engineered instead of cheap, and players who could not tell you why will keep playing the juiced one.

This week has two halves that belong together: the **camera**, which decides what the player sees, and **feedback**, which decides what the seeing feels like. Together they're the difference between a tech demo and a game people want to touch, and by the end of the practice guide you'll have a toggle that switches between those two things on one keypress.

---

## 1. The camera is a designed object (and a budget)

Week 2 established that the camera is just a node with a transform. This week's upgrade: the camera is the *information budget* of your game. Whatever it frames, the player knows; whatever it excludes, they don't; and both halves of that sentence are design tools. Horror games run tight, low cameras because *not seeing* is the mechanic. Strategy games run high and wide because seeing everything is the promise. A stealth game's camera pulls back to sell you the guard layout you're about to defeat.

Nintendo took this idea literally: in Super Mario 64, the camera is an actual character (a cameraman on a cloud, with a name), because the designers understood the camera performs a *job* in the fiction of play, and jobs get assigned to somebody. You're the somebody now. Every scene you build for the rest of the semester has a second design pass in it: not "where is the action" but "who is watching it, from where, and why."

---

## 2. Rigs: fixed, follow, orbit, and the smoothing idea

A **camera rig** is a structure (usually just a small hierarchy and a script) that gives the camera a behavior. The taxonomy is short:

- **Fixed:** placed and left, like your A1 vista. Still legitimate: security-camera angles, puzzle rooms, dramatic reveals.
- **Follow:** the camera maintains a relationship to a target: behind and above the player, riding along. The third-person staple, and the demo game adopts one this week, retiring the static view.
- **Orbit:** follow, plus the player's mouse or stick rotates the viewpoint around the target. Follow with a steering wheel.

And the single idea that turns all of them from nauseating to professional: **damping**. A camera rigidly welded to its target transmits every bump, twitch, and correction straight to the player's eyeballs, which is how a game gives people headaches. A damped camera *pursues* its target instead: each frame it closes a fraction of the remaining distance, arriving quickly when far, gently when near. The target darts; the camera breathes. That's the entire trick, and once you see it you'll notice every camera in every game you play is slightly, deliberately late.

One implementation warning, because it's a Week 3 lesson wearing new clothes: the naive version ("move 10% of the distance each frame") is *secretly frame-dependent*: 10% per frame closes faster at 240 fps than at 30. You already know how to smell this bug. Engines ship dt-correct smoothing functions (Unity's `SmoothDamp` is the one we use; the dictionary has the others), and the practice guide uses them so your camera behaves on every machine, like everything else you build.

Second warning, also a callback: cameras update in **LateUpdate** (or your engine's equivalent end-of-frame slot), after every object has finished moving, for the same reason the Week 6 billboard did: pursue where the target *ended up*, not where it was mid-frame. Follow code in plain `Update` produces a jitter that looks like a hardware problem and is actually an ordering problem.

---

## 3. Juice: the case study

Here's the same mechanic twice. A thrown rock hits a crate.

**Dry:** the crate topples. Physics did its job. Technically complete, emotionally inert: the moment happens and slides past unmarked, like a light switch that doesn't click.

**Juiced:** the rock hits, a burst of dust kicks off the impact point, a *thunk* proportional to the impact speed lands in your ears, the camera flinches almost imperceptibly, and the crate topples. Same physics, same code path, same crate. But the moment now has *punctuation*: three channels of feedback all agreeing that something physical just happened, and the player's nervous system files it as real.

That's the whole theory, so let's name the channels like components, because that's what they're about to become:

- **Visual:** particles, flashes, squash-and-stretch. Answers *where* and *what kind*.
- **Audio:** the thunk. Answers *how hard*, faster than vision can.
- **Camera:** shake, punch, a beat of hitstop. Answers *how much it matters*.
- **Interface:** damage numbers, pickup toasts (your Week 6 world-space tech, already juice-capable).

The craft is not piling on all channels at maximum. It's **matching feedback to meaning**: a coin pickup gets a chirp and a sparkle; a boss hit gets all four channels; a footstep gets almost nothing. Feedback is a currency, and if everything shouts, nothing does. The practice guide's master toggle exists so you can *feel* the dry/juiced difference in your own build, which is worth a semester of me asserting it.

---

## 4. Particles: decorative vs. communicative

A **particle system** is an emitter that spawns lots of tiny short-lived sprites (particles), each with a birth, a velocity, a lifetime, and a death. Configuration, not code: you set ranges and curves; the system does the rest. Two shapes of use, and knowing which you're making tells you how to set every knob:

- **Communicative** particles mark an event: a dust burst on impact, sparks on a parry. They run in **burst** mode (everything at once, then done), live briefly, and their job is *saying where and what kind*. These live in a prefab's **Effects** child, which has been waiting since Week 2 for exactly this tenant.
- **Decorative** particles establish place: torch fire, drifting snow, dust motes in a light shaft. They run in **continuous** mode (steady emission rate), loop forever, and their job is making a space feel inhabited. The demo game's torches get these this week, and they read beautifully at night because the Week 3 sun made night exist.

One craft note that sorts beginners from everyone else: fewer, better-shaped particles beat more particles, every time. Twelve dust puffs with a good size-over-lifetime curve read as an impact; three hundred white squares read as a screensaver.

---

## 5. Audio: the fastest channel

Sound reaches the player's brain faster than any pixel, which makes it the highest-value juice per unit of effort. The working vocabulary is four decisions:

- **One-shot vs. loop.** One-shots fire once per event (the thunk, the chirp) and can overlap freely. Loops run continuously (torch crackle, wind) and belong to places, not moments.
- **2D vs. 3D.** 2D audio ignores position: UI sounds, music. 3D audio lives at a point in the scene, attenuating with distance and panning with direction: the torch is quiet across the plaza and crackling in your ear beside it. In the Standard Prefab, an object's 3D sounds live in its **Audio** child, right where the structure said they would.
- **Scale by meaning.** The single cheapest professional touch in game audio: scale one-shot volume by impact velocity, so a dropped rock taps and a hurled rock bangs. One multiply, and your physics becomes audible.
- **Vary or fatigue.** The same clip at the same pitch forty times becomes wallpaper, then becomes annoying. Randomize pitch a few percent per play, and the same clip stays alive indefinitely. This is a two-line trick every shipped game uses.

---

## 6. Screen shake, done politely

Screen shake is the strongest spice on the rack, which is why it's the one with etiquette rules. The implementation that behaves is the **trauma model**: events add *trauma* (a number from 0 to 1); every frame the camera offsets by a small random amount scaled by trauma squared; trauma decays toward zero on delta time. Squaring matters: it makes small events barely perceptible and big events sharp, instead of everything rumbling equally. Decay matters more: shake that doesn't decay isn't feedback, it's an earthquake with a UI.

Structural note, and it's the Week 2 empty-parent trick one more time: the shake offset and the follow behavior must not fight over the same transform. The rig root *follows*; a camera child *shakes* in local space around it. Two concerns, two nodes, zero fighting. If your follow and your shake are writing to one transform, they'll wrestle, and the camera loses.

And the etiquette clause, which is not optional in this course: **shake needs an off switch.** Camera motion genuinely nauseates a meaningful fraction of players; every professional title ships an intensity slider or toggle, and A5 requires at least an exposed control. Accessibility isn't a bonus topic we do if there's time; it's a spec requirement this week and a habit thereafter.

---

## 7. Cross-Engine Dictionary

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| Follow/orbit rig | script + SmoothDamp (or Cinemachine) | Camera3D + script; SpringArm3D | Spring Arm component + Camera | lerped camera in your loop |
| dt-correct smoothing | Vector3.SmoothDamp | lerp with delta-scaled factor | spring arm handles it | exp-decay lerp with dt |
| End-of-frame slot | LateUpdate() | _process after movement / deferred | camera update stage | order calls in your loop |
| Particles | ParticleSystem | GPUParticles3D / CPUParticles3D | Niagara | three-nebula, or points + shaders |
| Burst vs. continuous | emission bursts vs. rate | one_shot vs. emitting | burst vs. spawn rate | your emitter config |
| One-shot audio | AudioSource.PlayOneShot | AudioStreamPlayer3D.play() | Play Sound at Location | Web Audio / THREE.PositionalAudio |
| 3D audio | spatialBlend = 1 | AudioStreamPlayer3D | attenuation settings | THREE.PositionalAudio |
| Pitch variance | source.pitch | pitch_scale | Pitch Multiplier | playbackRate |

Culture notes. Unity's **Cinemachine** package is a whole camera department in a box (follow, orbit, collision-avoidance, shake), and using it is legitimate; we hand-roll first because a rig you've built once makes Cinemachine's forty knobs legible instead of magical. Unreal's **Spring Arm** is the follow rig as a stock part, damping included, which tells you how universal the pattern is: it got promoted to hardware. Three.js students: `THREE.PositionalAudio` gives you 3D sound cheaply, and your shake is an offset added after your follow logic in your own loop, which by now is just Tuesday for you.

---

## Check yourself

1. What is the car-door thunk, in game terms, and what does it change about how the door works?
2. Why is "move 10% closer each frame" a bug you already know how to diagnose, and what's the correct tool?
3. Why do cameras update in LateUpdate, and what does it look like when they don't?
4. Burst or continuous, communicative or decorative: classify the impact dust, the torch fire, and a level-up sparkle.
5. In the trauma model, why square the trauma, why decay it, and why does the shake write to a different transform than the follow?

---

## Going deeper

- **The two talks this module is quietly built on,** free on YouTube: *Juice it or lose it* (Jonasson and Purho) and Vlambeer's *The Art of Screenshake* (Nijman). Twenty minutes each, and they will permanently change how you see every game you touch. Search the titles; accept no summaries.
- **Where visual effects lead:** when particles stop being enough, [The Book of Shaders](https://thebookofshaders.com/) is the gentle, in-browser introduction to writing the GPU's own visual language. Tutorial-lane material, previewed.
