# Week 8 Concepts: Animation

> **How to use this module:** This document is the complete concept material for Week 8. You do not need the lectures to complete A6. Read this, then work through `Week08_Practice.md` in your engine, then check `A6_Spec.md` before you record. This is also the week the Standard Prefab's Week 2 promise gets kept, ceremonially.

---

## Start at the animation desk, 1930s

At the old Disney studio, the senior animator did not draw the film. The senior animator drew the *key poses*: Mickey at the top of the jump, Mickey landing. A whole department of junior artists (job title, really: **inbetweeners**) then drew every frame between the keys, dozens of drawings interpolating one pose into the next. The senior animator's skill was choosing the right moments; the inbetweeners' job was the arithmetic of getting from one to the other.

That division of labor never went away. It got automated. In your engine, *you* are the senior animator: you set a **keyframe** ("at 0.0 seconds the door's rotation is 0°; at 1.5 seconds it's 110°"), and the engine is a tireless, instantaneous inbetweening department, computing every intermediate value at whatever framerate the loop is running. That's the entire foundation of this week: **animation is data over time**. A keyframe is a value with a timestamp, a clip is a table of them, and playback is interpolation. No motion is stored anywhere, just values and times, which should sound familiar: it's the stop-motion insight from Week 3 wearing a nicer jacket, and it's a sentence about *data* that Week 13 will want back.

---

## 1. Keyframes and curves

A **keyframe** pins a property to a value at a time. Between keyframes, the engine interpolates, and the *shape* of that interpolation is a **curve**. Linear interpolation reads as mechanical (fine for a conveyor belt, wrong for almost anything alive); ease-out reads as weight settling; ease-in-then-out reads as intention. Same two keyframes, different curve, completely different personality. If Week 7 taught that feedback is a language, curves are its accent.

The part that expands the concept beyond characters: **anything with a property can be animated.** Position, rotation, scale, obviously, but also a light's intensity (flicker), a material's color (heat glow), a particle rate, a UI panel's transparency. The keyframe editor is a general-purpose "change values over time" tool, and treating it as only a character thing is leaving most of it on the table. Your gate, your doors, and your drawbridge are property animation, and they're this week too.

---

## 2. Two kinds of clips

A **clip** is a named table of keyframes: "DoorOpen," "Idle," "SwordSwing." They arrive in your project two ways:

- **Authored in-engine:** you open the animation editor, scrub the timeline, and set keys yourself. This is how doors, gates, platforms, blinking lights, and UI flourishes get made, and it's genuinely pleasant work: five keyframes and a good curve is a professional door.
- **Imported:** characters are different. A walking human is dozens of bones with keyframes on every one, and nobody hand-keys that in a game engine. Character clips are made elsewhere (motion capture, professional animators) and arrive as files. You are the *director* of imported clips, not the author, and directing is the actual skill: which clip, when, blended how.

Which raises the question that owns the rest of this module: your character now has an Idle clip, a Walk clip, a Run clip, and an Attack clip. *Something* has to decide which one is playing right now, and what happens when the answer changes.

---

## 3. The thing that decides: an animation state machine

Every engine answers this the same way. You get a graph editor. You drop your clips in as boxes. You draw arrows between the boxes. You define **parameters** (a Speed number, an Attack trigger), and you put conditions on the arrows: "when Speed > 0.1, go from Idle to Walk." At runtime, exactly one box is in charge at a time (per layer), the arrows fire when their conditions are met, and your gameplay code's whole job shrinks to *setting parameters*: it never says "play the walk clip," it says "Speed is 4.2" and the graph does the rest.

Boxes that are in charge one at a time. Arrows with conditions. A current box, transitions between boxes, decisions driven by inputs. I want you to notice the *shape* of this thing you're about to spend a week inside, notice that it feels like a fundamentally good way to organize "what is this object doing right now," and then notice that your engine's designers thought so too, since they built a whole visual editor for it. This structure has a name, it is not an animation-specific idea, and it gets its own week, two weeks from now, at which point you will realize you've already shipped one. Receipt filed. It's becoming a genre around here.

---

## 4. Blending, transitions, and one paragraph on root motion

Why all the machinery instead of just switching clips? Because **bodies don't teleport between poses.** Cut instantly from mid-stride Walk to standing Idle and the character *pops*: every bone jumps to a new position in one frame, and the eye reads it as broken. The fix is the **crossfade**: for a short window (a tenth of a second or two), both clips play and the engine interpolates between them, bone by bone. Inbetweening again, between whole animations.

**Blend trees** extend the idea from moments to a dimension: instead of Idle *or* Walk *or* Run as separate boxes with transitions, one box holds all three, arranged along the Speed parameter, and the character is continuously *somewhere* on the idle-walk-run spectrum: 30% walk at low speed, a walk-run mixture at a jog. Feed it the actual speed from your Week 3 mover and locomotion stops being a decision and becomes a readout.

**Root motion, one paragraph, as promised:** some imported clips don't animate in place; they *travel* (the mocap actor actually walked forward). Root motion means letting the animation's travel drive the character's world position. It looks fantastic and it hands authority over placement to the animation data, which should ring the Week 5 bell: *who has authority over where this object is?* This course's answer stays consistent: **your code moves the character; animations pose the body in place.** The Week 3 mover keeps authority, the collider stays where physics thinks it is, and the visuals play their poses inside the Standard Prefab where they belong. Root motion is a legitimate professional choice, and it's a different authority arrangement than the one this course builds on; know it exists, use it on purpose someday, not accidentally this week. (Mixamo offers "in place" versions of locomotion clips. Take them.)

---

## 5. Where characters come from (still not a modeling class)

- **Mixamo** (free, Adobe): the course's character pantry. Pick a character, pick from thousands of animations, download rigged and ready. The practice guide has the exact settings, because the defaults are wrong in educational ways.
- **Kenney, itch.io, the asset stores:** stylized characters, often with clip sets, frequently free.
- The Week 1 prophecy comes due here: your character will arrive T-posing, sideways, gray, or at forty times the correct scale, and possibly all four. This is the asset pipeline's rite of passage, everyone goes through it, and the universal fix is the one Week 2 told you to write down: *wrap it in an empty parent and correct it one level up.* Which is exactly what the Standard Prefab's Visuals child is.

And that's the setup for the ceremony. **The Bottom-Up Swap:** open the Player prefab. Delete the capsule inside Visuals. Drop in the Mixamo character. Scale it to the collider. Press play. Movement still works, physics still works, the camera still follows, the HUD still reads, because *nothing outside Visuals changed*: the collider is still the capsule shape physics always used, the mover still owns position, and the visuals were always just riding along. Week 2 made a promise about this moment; the demo game performs it live this week, and your A6 starts the same way. Six weeks of discipline, five minutes of payoff, zero breakage. That's what architecture is *for*.

---

## 6. Cross-Engine Dictionary

| Concept | Unity | Godot | Unreal | Three.js |
|---|---|---|---|---|
| Clip | Animation Clip | Animation resource | Animation Sequence | AnimationClip (in the GLB) |
| Authoring editor | Animation window | AnimationPlayer (excellent) | Sequencer / timeline | keyframe tracks in code |
| The state machine | Animator Controller | AnimationTree (StateMachine node) | Animation Blueprint | your own switch + mixer |
| Blend by parameter | Blend Tree | BlendSpace1D/2D in AnimationTree | Blend Space | crossFade weights |
| Crossfade | transition duration | xfade_time | blend settings / montage blend | AnimationAction.crossFadeTo |
| Set a parameter | animator.SetFloat("Speed", v) | animation_tree.set("parameters/...", v) | Anim BP variables | your variables |
| Character source | Mixamo FBX, Humanoid rig | Mixamo via GLB/Blender | Mixamo FBX, retarget | Mixamo → Blender → GLB |
| Melee hit timing | Animation Event | method call track | Anim Notify | time-check in your loop |

Culture notes. Godot's `AnimationPlayer` is the best in-engine property-animation authoring tool in this table (keyframe *any* property of *any* node, trivially), so Godot students should do the gate with unreasonable confidence. Unreal's Animation Blueprint is the state machine idea at industrial scale, plus **Anim Notifies**, which are the "fire an event at this frame of the clip" tool your sword swing wants. Three.js students: your GLB arrives with clips inside; `AnimationMixer` plays and crossfades them, and the state machine is code you write yourself, which after Week 10 you'll realize was a preview of the assignment.

---

## 7. Gotchas and judgment calls

- **Exit time, the sluggish-attack bug.** Engines default transitions to "finish the current clip first." For ambient flourishes, fine. For anything input-driven, it's why your attack fires half a second late and feels like mud. Reactive transitions interrupt immediately (in Unity: uncheck Has Exit Time on that arrow). The practice guide makes you feel the before and after.
- **The traveling clip.** A locomotion clip with baked travel makes the visuals walk out of the collider, and your character's body strolls away from its own physics. The "in place" checkbox exists for this; so does the authority paragraph above.
- **Timing damage to the swing.** The sword should hurt when it *lands*, not when the button was pressed. The tool is the animation event (a marker on a clip frame that calls a method), and it's the professional answer to melee timing. The practice guide uses one.
- **Parameters, not Play calls.** Gameplay code that directly commands specific clips grows into a second, invisible state machine fighting the real one. Code sets facts ("Speed is 4.2," "Attack happened"); the graph owns the decisions. One decider.
- **Scale and rig import settings** cause 90% of character-import misery, and the fixes are boring checkboxes, enumerated in the practice guide. The remaining 10% is the wrong-facing model, and you already own that fix: it's an empty parent.

---

## Check yourself

1. What did the senior animator draw, what did the inbetweeners draw, and which one are you when you keyframe a door?
2. Why does instantly switching clips look broken, and what are the two tools (moment-scale and dimension-scale) that fix it?
3. Your character's Attack fires noticeably after the click. Name the default setting responsible and the fix.
4. Root motion, in authority terms: who gains authority over position, and what does this course's arrangement keep true about the collider?
5. Why does the Bottom-Up Swap break nothing, mechanically? Name what stayed constant while the visuals changed.

---

## Going deeper

- **Zucconi's [procedural animation](https://www.alanzucconi.com/2017/04/17/procedural-animations/) and [inverse kinematics](https://www.alanzucconi.com/tag/inverse-kinematics/) series:** free, readable, and the path from this week's state-driven clips to legs that place their own feet on stairs. If any animation topic tempts you toward the tutorial lane, it's this one.
