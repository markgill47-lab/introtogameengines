# Open Texts for SE 266: Research Findings

**The question:** is there one open-source textbook on game engines that covers the course's full arc (engine anatomy, scene graphs, the loop, physics, UI/state, cameras/feel, animation, MVC and patterns, data-driven design, procgen, game AI, design vocabulary)?

**The short answer:** no single open text covers it all. The canonical comprehensive book (Gregory's *Game Engine Architecture*) is commercial, and nothing in the OER world matches its scope. But the course's topics map remarkably well onto a small stack of genuinely free texts, one of which is practically the patterns tier in book form. The realistic model is a companion-texts stack, linked per week, with your materials as the connective tissue.

---

## The Stack (free, verified, mapped to the course)

### 1. Game Programming Patterns, Robert Nystrom
- **What:** the closest single match to the course's heart. Full text free at gameprogrammingpatterns.com. Chapters include **Command, Observer, State** (the entire Tier 2, by name), plus **Game Loop** (Week 3), **Update Method**, **Component** (Week 9's composition argument), Prototype, Event Queue, and performance patterns.
- **License:** prose is **CC BY-NC-ND 4.0** (link and assign freely; do not remix into your own materials or redistribute modified copies); code samples are **MIT**. Source repo on GitHub.
- **Course fit:** Weeks 3, 9, 10, 11, 12. Written in exactly the register the course uses: motivating problem first, pattern second, opinionated throughout. Assigning his Command chapter alongside Week 12 would be complementary rather than redundant (he goes deeper on undo and flexibility; the course goes deeper on engine wiring and the demo).
- **Caveat:** it is a patterns book, not an engine book. No physics, UI, cameras, animation, or asset pipeline.

### 2. Procedural Content Generation in Games, Shaker/Togelius/Nelson
- **What:** the academic-but-readable standard. **Full author-version PDFs free** at pcgbook.com (publication agreement explicitly allows it), 12 chapters: constructive methods, fractals/noise, grammars, dungeons and levels, rules, evaluation. Bonus: the authors' course slides are posted too.
- **Course fit:** Week 14, and the tutorial lane for students who want to go deep. Chapters 1, 3 (constructive generation), and the dungeon chapter align directly with the mine.
- **Caveat:** 2016 author versions; solid for fundamentals, predates the neural-generation era (which the course doesn't teach anyway).

### 3. Artificial Intelligence and Games, Yannakakis/Togelius
- **What:** a full Springer textbook with the **complete PDF free** at gameaibook.org (book.pdf, with an updated 2024 copy also posted). Covers behavior authoring (FSMs, behavior trees), pathfinding, and far beyond (player modeling, generation, ML).
- **Course fit:** Week 15's decision/path layers, and the deep end for A-tier students. Heavier and more academic than the course's register; assign sections, not chapters.

### 4. MDA: A Formal Approach to Game Design and Game Research, Hunicke/LeBlanc/Zubek
- **What:** the original 5-page workshop paper, free PDF (hosted at Northwestern, also via AAAI).
- **Course fit:** Week 4's backbone, direct primary source. Short enough to assign whole, and students citing the actual paper in A12 is a good look.

### 5. 2D Game Development: From Zero To Hero (community compendium)
- **What:** 500+ page engine-agnostic community book, **CC BY-NC-SA**, free PDF/EPub, code in multiple languages. Covers loops, collision, algorithms, general design.
- **Course fit:** a supplementary reference, especially for students in code-first engines. 2D-focused and community-authored, so depth varies chapter to chapter. The ShareAlike license permits adaptation (unlike Nystrom's), if you ever wanted to excerpt-and-modify.

### Honorable mentions
- **Godot's official documentation** (CC BY 3.0): genuinely excellent conceptual coverage of engine anatomy (scene tree, physics, signals, UI), openly licensed and adaptable, but engine-specific by nature. Best "second dictionary" for the cross-engine tables.
- **Red Blob Games** (Amit Patel): the best free interactive explanations of A*, pathfinding, and hex/grid math anywhere. Week 15's pathfinding section, illustrated.
- **3D Math Primer for Graphics and Game Development** (Dunn/Parberry): full text free at gamemath.com. Weeks 2's transforms and rotations, at whatever depth a curious student wants.
- **Game Engine Architecture, Jason Gregory:** the book the question was really about, and the honest verdict: it's the comprehensive engine text, it is not open or free (commercial; an Internet Archive lending copy exists), and it's also a 1,200-page AAA-engine-internals book aimed well above a first-course-after-Programming-2 audience. Good instructor bookshelf material; wrong assigned text for SE 266.

---

## What no open text covers (the course's remaining moat)

- **Game feel / juice** (Week 7): the canonical materials are GDC talks, free on YouTube ("Juice it or lose it," Vlambeer's "The Art of Screenshake"), not texts. Worth linking as viewing, not reading.
- **UI and game state discipline** (Week 6), **data-driven design and persistence as a teaching unit** (Week 13), **the engine-agnostic assignment structure**, and the **Standard Prefab** house style: scattered across blog posts at best. This is the material the course's own modules exist for, and the research didn't turn up anything that replaces them.

## Recommendation

Adopt the stack as **named companion texts, linked per week from D2L** (all are link-legal; only Nystrom's prohibits modification, and linking is all you need). The one-line course-text story becomes: "There is no textbook. There are five excellent free ones, each assigned where it's strongest, and the course modules are the map between them." Nystrom in particular is worth naming in the syllabus for the patterns tier: it's the book your B-tier students will keep reading after the semester ends.

| Week | Companion reading |
|---|---|
| 3 | Nystrom: Game Loop, Update Method |
| 4 | MDA paper (whole) |
| 9 | Nystrom: Component; intro chapters |
| 10 | Nystrom: State |
| 11 | Nystrom: Observer |
| 12 | Nystrom: Command |
| 14 | PCG Book: ch. 1, 3, dungeon chapter |
| 15 | AI & Games: behavior-authoring sections; Red Blob for A* |
