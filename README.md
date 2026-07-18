# SE 266: Intro to Game Engines

**Working title:** Game Design & Engine Architecture (Fall 2026)

This repository holds the course materials for SE 266 at St. Cloud State University: the syllabus, the sixteen-week arc, every assignment spec, a free resource library, and the supporting D2L tooling used to build the course shell.

The organizing principle of the F26 redesign: **every assignment is specified by concept, not by engine feature.** Concepts are lectured engine-agnostically, demoed in Unity, and implemented by students in the engine of their choice (Unity, Godot, Unreal, Three.js, whatever they live in). See [SE266_F26_Course_Structure.md](SE266_F26_Course_Structure.md) for the full rationale.

---

## How the Course Is Graded

Tiered specification, pass/fail per assignment. A fail means missing spec items: fix and resubmit. Higher tiers are not evaluated until lower tiers are complete.

- **Tier 3 → C: Core Mechanics.** Scenes, the loop, physics, UI, game feel, animation, and a capstone Micro-Game. The concepts every game in every engine is built from.
- **Tier 2 → B: Thinking in Patterns.** State, Observer, and Command as named assignments, plus data-driven design and a game deconstruction. MVC is the framing lecture holding the tier together.
- **Tier 1 → A: Synthesis.** Procedural generation, game AI, and a final project in one of four equal lanes: game, scientific/engineering visualization, simulation, or in-depth technical tutorial.

Every assignment ships the same three deliverables regardless of engine: a **narrated demo video**, **source**, and a **one-paragraph build note**. Grading happens primarily from the video against a checklist of engine-neutral observable behaviors. This is also what makes the course hyflex: remote and in-person deliverables are identical.

---

## Repository Layout

| Path | What's in it |
|---|---|
| [`SE266_F26_Course_Structure.md`](SE266_F26_Course_Structure.md) | The full course design: the reframe, tier system, sixteen-week arc, deadline philosophy |
| [`SE266_F26_Syllabus.docx`](SE266_F26_Syllabus.docx) | The F26 syllabus (prior-year syllabi included for reference) |
| [`CourseResources.md`](CourseResources.md) | The Free Library: every assigned and supplementary resource, all legally free |
| [`OpenTexts_Research.md`](OpenTexts_Research.md) | Research notes behind the resource list |
| `Week01/` … `Week16/` | Per-week modules: `_Outline`, `_Concepts`, `_Practice`, and the assignment `_Spec` files |
| [`DemoGame_Plan.md`](DemoGame_Plan.md) | Plan for the running Unity demo game used across sessions |
| [`marks-voice-guide.md`](marks-voice-guide.md) | Style guide all course documents follow (register by content type, and no em-dashes, ever) |

### Weekly modules

Each `WeekNN/` folder follows the same shape:

- **`WeekNN_Outline.md`:** the session plan (Session A concept, Session B practice).
- **`WeekNN_Concepts.md`:** the engine-agnostic concept lecture material.
- **`WeekNN_Practice.md`:** the Unity demo and studio/lab activity.
- **`AN_Spec.md`:** the assignment spec, where that week introduces one (engine-neutral checklist of observable behaviors).

### D2L tooling

Two supporting subprojects build and deploy the course shell in Brightspace/D2L:

- [`scsu-d2l-design-system/`](scsu-d2l-design-system/README.md): the SCSU-branded design system (the "Husky Course Kit") for D2L content pages.
- [`d2l-activity-skills/`](d2l-activity-skills/README.md): skills for building and deploying D2L activities.
- [`D2L_Build_Spec.md`](D2L_Build_Spec.md): the spec tying the shell together.

---

## The AI Thread

AI use is expected and unremarkable, like using a compiler or Stack Overflow. Not using it is also fine. Accountability comes from the per-assignment build note (what did AI produce, what did you fix, do you understand what shipped) and from the narrated video, where a student who prompted their way to code they don't understand has to explain it out loud anyway.

---

## A Note on Voice

All documents in this repository follow [`marks-voice-guide.md`](marks-voice-guide.md). Register is matched to content type: teaching voice for concept material, structural voice for specs, evaluative voice for feedback. And there are no em-dashes, anywhere, ever.
