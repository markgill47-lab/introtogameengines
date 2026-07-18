# SE 266 D2L Interactive Content: Build Spec for Claude Code

**What this is:** the implementation spec for converting the SE 266 weekly materials into interactive HTML experiences deployed as D2L Brightspace content topics, using the `d2l-activity-builder` and `d2l-activity-deployer` skills and the SCSU D2L Design System ("Game Design Toolkit" language). Code should read this spec, the two skills, and `scsu-d2l-design-system/project/Game Design Toolkit.dc.html` before building anything.

**Content sources (already written, in this folder):** `WeekNN/WeekNN_Concepts.md`, `WeekNN/WeekNN_Practice.md`, `WeekNN/ANN_Spec.md`, `CourseResources.md`, `Week16_Guide.md`, `FinalProject_Spec.md`. The text in these files is final course voice; transcribe it, don't rewrite it. Any *new* text (button labels, captions, feedback strings) follows `marks-voice-guide.md`: no em-dashes, ever, and no filler "honest X" phrasings.

---

## 1. Hard Constraints (non-negotiable, from the sandbox and the room)

1. **The Stage is 960 × 720.** The topic renders in a nested iframe that cannot be resized and auto-sizes to content height, so viewport units are unreliable. Every page of every topic is laid out inside one fixed root container: `width:960px; height:720px; margin:0 auto; overflow:hidden;` (4:3). No page-level scrolling, ever: if content doesn't fit, it becomes another page (see the Pager, section 3). Internal panels may scroll only when the design calls for it (a code panel, a long list), never the stage itself.
2. **Script loading per the builder skill:** engine CSS/JS inline in `index.html`; content loaded from a sibling `data.js` via the dynamic-injection bootstrap (never a static `<script src>` tag, which is silently inert in this sandbox); assets by relative path.
3. **No CDN dependence.** The design system prototype references Google Fonts; the live topics must not depend on that request succeeding. Vendor WOFF2 files for Archivo (700/900), Public Sans (400/600), and JetBrains Mono (400/700) beside the shared assets and load via `@font-face` with system fallbacks (`Archivo, Arial Black, sans-serif` / `Public Sans, Segoe UI, sans-serif` / `JetBrains Mono, Consolas, monospace`). Layouts must survive the fallback fonts without breaking the 720px height budget: leave 5% slack in every page's vertical layout.
4. **localStorage is shared LMS-wide.** All keys namespaced `se266:w<NN>:<topic>:<key>`. Storage is device-local UX nicety only (page position, sandbox settings, self-check state): never authoritative, never referenced in grading language.
5. **Every topic sets a verification global** at the end of successful init: `window.SE266_W<NN>_<TOPIC>_READY = true` (e.g. `SE266_W05_LAB_READY`). The deployer checks it.
6. **Final names before deploy.** D2L's rename path corrupts inline JS. File/topic names are locked in section 6's manifest; do not deploy under working titles.
7. **Milestone 0 first.** Run the builder skill's validation topic in the live SE 266 course shell before building Week 1, per `references/milestone-0-validation.md`. The findings above are from the same tenant, but confirm; it's five minutes against a semester of content.
8. **No external calls, no audio autoplay, no browser dialogs** (alert/confirm/prompt). Sound, where an interactive wants it (Week 7), is user-triggered, synthesized via WebAudio (no audio files needed for beeps/thunks), and always accompanied by a visual equivalent.

---

## 2. Structure: Units, Topics, Pages

- **One D2L Unit per week** (16 units), named `Week NN: <Title>` matching the weekly outline titles.
- **Three Topics per unit**, one HTML file each (exceptions noted in the manifest):
  - **T1 · Concepts:** the reading, paginated, with small inline interactives embedded where they teach.
  - **T2 · Lab:** the week's signature interactive demonstrator (section 5). This is the star of each unit.
  - **T3 · Assignment:** practice-guide highlights plus the spec rendered as an interactive checklist (self-audit, not graded; A-less weeks 1, 4, 16 vary per manifest).
- **Pages within a topic:** each topic is internally paginated. One Stage, N pages, a Pager. Target 4 to 9 pages for T1, 1 to 3 for T2, 2 to 4 for T3.
- **Manage Files layout:**

```
/se266/
  shared/            fonts/ (woff2), tokens.css content baked into each engine at build time
  w01/ … w16/        one folder per week: the topic HTML files + their data.js siblings
```

Topics reference only their own siblings and `/content/<year>/<ou>/se266/shared/...` by absolute content path (per the skill's multi-page rule). Note: each topic still *inlines* its engine; "shared" holds only fonts and any cross-week data. Duplication of the engine per topic is deliberate: it makes every topic self-contained and immune to a shared-file edit breaking sixteen units at once.

---

## 3. The Page Template (every topic, every page)

Visual language is the **Game Design Toolkit**, applied exactly: read the .dc.html and match it. The load-bearing tokens:

- **Colors:** page `#131210`; card `#1C1915`; card border `#2E2A20`; inset panel `#0F0E0C` with border `#2A261E`; accent red `#B11226` (SCSU); gold `#D8A24A`; cream text `#FAF7F2`; body text `#C9C0B2`; muted `#9D9284` / `#8A8072`; success green `#6FBF73`; red tint `#F0B8C0`.
- **Type:** Archivo 800/900 uppercase for headings; Public Sans for body (16px/1.55 on reading pages); JetBrains Mono for kickers (11px, letter-spacing .12em, uppercase, gold), code, and data readouts.
- **Idioms to reuse from the toolkit:** the editor-window chrome (traffic dots + filename tab) as each topic's cover page header; the section-header row (red triangle, Archivo title, rule, mono annotation); kicker-labeled cards; pill chips; `.gdt-btn` buttons (red primary, dark-bordered secondary); range sliders with `accent-color:#B11226`; the FSM diagram style, scene-tree text style, tilemap grid, stick-figure poses, and hitbox visual (green `#6FBF73` clear / red `#B11226` overlap) wherever those concepts appear.

**Stage chrome, fixed on every page:**

- **Header strip (56px):** left: mono kicker `WEEK NN · <TOPIC>`; center: page title (Archivo); right: page indicator `3 / 7` (mono).
- **Content region (~600px):** the page's material. Layouts: single column reading (max 640px measure, centered), two-column card grid, or full-bleed canvas for labs.
- **Pager strip (64px):** Prev / dot-per-page / Next, toolkit button styling. Keyboard: left/right arrows page too (when no interactive has focus). Last page's Next reads "Done" and links to the unit's next topic where known (plain `<a>`, target `_top` not required; test in Milestone 0).
- **Cover page (page 1 of every topic):** editor-window hero per the toolkit: filename tab shows e.g. `w05-lab.html · ready` with the green ready arrow bound to the init check, title, one-sentence description pulled from the module's header note, and chips listing the pages.

**Persistence:** last-viewed page per topic in localStorage (`se266:wNN:t1:page`), restored on load with a subtle "resumed" note. Reset link in the footer of the cover page.

---

## 4. Content Conversion Rules (T1 Concepts topics)

The markdown modules convert to pages under these rules:

1. **The opening analogy is always its own page** (or two), designed, not just text: each analogy gets a simple SVG illustration in toolkit style (the plane and snack cart, the bowling lane, the radar... use judgment, keep them flat and geometric like the toolkit's art). These openers are the course's signature; give them room.
2. **~180 to 250 words per reading page.** Split at the module's section boundaries first, then at paragraph seams. Never split a paragraph across pages.
3. **Code blocks** render in the inset-panel style (`#0F0E0C`, mono 13px, syntax tinting: keywords gold, strings green, comments muted). A code block taller than ~20 lines scrolls internally; prefer trimming to the teaching lines with an ellipsis comment.
4. **Cross-Engine Dictionary tables become tab strips:** one tab per engine (Unity default), showing that engine's column as labeled rows. All tabs, one card, no 5-column table squeezed into 960px.
5. **Check Yourself sections become click-to-reveal self-checks:** question card, "Show answer" button, concise answer (write these from the module content; they exist in spirit in each section). State per-question in localStorage. Completing all reveals a small "section complete" flourish (toolkit green, no confetti).
6. **Going Deeper sections become link cards** (title, one-line description from the text, external-link glyph), opening in a new tab.
7. **Receipts and callbacks** (the course's running IOU jokes) render as a small recurring visual: a mono "RECEIPT" chip in gold. Use it wherever the text files/pays a receipt; it's a course motif by now.
8. **Inline mini-interactives:** where a T1 page's concept has a cheap interactive equivalent already specced in the toolkit (HUD counters, dialogue box, collision slider, inventory grid), embed it on the relevant reading page rather than describing it. Bigger interactives stay in T2.

**T3 Assignment topics:** page 1 is the assignment header (tier chip, paced week, prerequisites); middle pages carry the requirement checklist as interactive check items (each R with its full text, a checkbox, and where applicable a "common failure" expandable underneath); the last page is the video-shape timeline from the practice guide (segment bars with durations) plus the deliverables list. Checklist state is localStorage self-audit; label it as such ("your checklist, not my gradebook").

---

## 5. The Labs: signature interactive per week

Each T2 is one focused, canvas-or-DOM interactive that *demonstrates the week's concept* rather than decorating it. All run inside the Stage; all controls use toolkit widgets; all have a one-line "what to notice" caption and a Reset. 2D canvas (or DOM/SVG) only: no WebGL dependency. Specs, in build order of the concepts they serve:

- **W01 · The Anatomy Board.** The five-station tour as an interactive board: click a subsystem card (Renderer, Scene, Scripting, Physics, Input, UI, Animation, Audio, Pipeline) to light its station, show its one-liner, and its "your week" pointer. Second page: a four-question engine chooser (hardware, language, lane, support) that ends on a recommendation card with the course's caveats. Data-driven from data.js.
- **W02 · The Scene Graph Playground.** Split view: left, a live tree (World → Plane → Cart → Pretzels, plus a windmill); right, a 2D canvas rendering it. Drag any node's position/rotation sliders and watch children ride. Readout panel shows the selected node's LOCAL and WORLD numbers diverging live. Page 2: the pivot demo: windmill blades with pivot at tip (flail) vs. an empty-parent pivot at hub (spin), one toggle. This is the deepest lab; it teaches the whole week.
- **W03 · The Framerate Rig.** Two lanes, two movers (BrokenMove vs. dt-move), a framerate slider (15/30/60/144) and a Go button: race to the flag, elapsed wall-clock shown. The broken mover wins or loses by framerate; the dt mover ties itself forever. Page 2: input timeline: hold and tap a key (or on-screen button) and watch GetKey paint a solid bar while GetKeyDown ticks single pixels. The strobe test, visualized.
- **W04 · The MDA Sorter.** Drag statement chips ("enemies take three hits," "players hoard gold," "the boss fight feels tense," etc.) into Mechanics / Dynamics / Aesthetics columns; self-checking with gentle corrections. Page 2: a loop-nesting diagram (seconds/session/meta rings) with genre examples on click. Page 3: the A12 template as a copyable reference card.
- **W05 · The Authority Sandbox.** 2D physics toy (hand-rolled: gravity, AABB/circle collision, impulses: no library). Spawn crates (stack), throw rocks with a power slider (impulse), a gate trigger zone that lights green on pass-through without deflecting, and a layer matrix (2×2 checkboxes: Player/Projectile × collide?) that visibly changes behavior. A toggle marks one ball "scripted" (follows a sine path, ignores physics) vs. "released": the authority question, live. Collision states use the toolkit's green/red hitbox language.
- **W06 · The Scoreboard.** GameState panel (the facts, mono) beside two views (bar + number). Buttons: damage, gold, and crucially "kill the scoreboard" (view unmounts; facts keep changing; remount shows truth resumed: the ballpark opener, playable). Page 2: time-scale slider (1 → 0.5 → 0) freezing a moving scene while the UI stays live, plus the pause-then-restart trap: restart while paused and the new scene arrives frozen until the student clicks the fix.
- **W07 · The Juice Mixer.** A ball bounces in a canvas court. Channel toggles: particles, flash, screen shake (trauma model with a live decaying trauma meter), hitstop, and WebAudio thunk (user-enabled, volume scaled by impact). A master DRY/JUICED switch for the A-B. Sliders: trauma per hit, decay. The etiquette is the lesson: shake without decay is available and immediately self-punishing.
- **W08 · The Inbetweener.** Two keyframes of a door (0° and 110°) with a draggable ease curve between; scrub or play and watch the door swing with the curve's personality. Page 2: the toolkit's stick figures as a blend-tree: a Speed slider crossfades idle/walk/run poses (opacity/interpolated limbs). Page 3: exit-time toggle: an Attack button that queues politely vs. interrupts, with a latency readout. Feel the mud, then the fix.
- **W09 · The Coupling Web.** The god-script as a node graph: one fat node with edges to HUD, audio, camera, input, physics. Click "extract Motor/Combat/Health" stepwise and watch the web reorganize into a bundle with narrow edges; an edge-count and a "what breaks if I change the HUD?" highlighter make coupling visible. Page 2: MVC sorter (drag features to Model/View/Controller, self-checking; controller column teases Week 12).
- **W10 · The Dial.** Left: the boolean traffic light: four toggles, a big intersection graphic, and a counter of representable vs. meaningful states; set red+green and watch the crash flag. Right: the FSM version in the toolkit's state-machine style: one current state, legal arrows clickable, illegal transitions refuse with a shake. Page 2: the guard on the toolkit tilemap: Patrol/Suspicious/Chase/Return running live with state tints (white/yellow/red), player token draggable. The A8 diagram, animated.
- **W11 · The Pager Board.** A Health subject and four observer cards (HUD, sound, death, achievement). Fire damage events; watch notification pulses travel subject→subscribers. Toggle any observer's subscription; unplug one entirely and the others keep working. A polling-vs-events call counter races at the top (60/sec vs. on-change). The bolt-on button adds a fifth observer card with a "Health.cs untouched" badge.
- **W12 · The Ticket Window.** On-screen keys (or real keyboard) emit command tickets onto a visible queue feeding a tilemap actor. Tabs: REBIND (swap the key→command mapping live), RECORD/REPLAY (tape the tickets, reset actor, replay hands-off with a "no input" badge), UNDO (discrete grid moves, undo stack popping visibly). The diner metaphor rendered literally: tickets on a wheel.
- **W13 · The Card Forge.** An inspector-style form authors a card (name, buff type, magnitude, flavor); it renders as a toolkit-styled card into a binder; equip 3 slots and watch a stats panel change. Page 2: SAVE writes the state and *shows the JSON* in an inset panel, live and readable; LOAD restores; a "quit" button blanks the runtime state first to sell the round trip. Page 3: version drift: add a field, load the old save, watch the default fill in (sane default vs. zero default toggle).
- **W14 · The Seed Machine.** The drunkard's-walk mine generator on canvas: seed input, Generate, Walk-again-same-seed (identical, badge confirms), New Seed (different). Sliders from a config panel (steps, chest count): parameters as data. AUDIT button runs 100 seeds against the reachability check with a results bar; a "break it" toggle adds the second disconnected walker so the audit visibly catches failures.
- **W15 · The Sentry.** Top-down canvas: guard with a rendered vision cone (range + angle + line-of-sight rays that walls actually block), patrol route, and the full brain (FSM/BT toggle showing the active branch/state). Drag the player to sneak: skirt the cone, break LOS behind a crate. Throw-rock button drops a noise ping the guard investigates (last-known-position marker + give-up timer visible). Every A14 requirement, playable in one scene.
- **W16 · The Launch Console.** The submission checklist per lane (lane selector, five artifacts, per-lane bar items), the demo-shape timeline with a practice timer (start it and rehearse against the segment bars), and a postmortem scaffold (three movements, text areas, COPY button producing clean markdown: localStorage-backed, explicitly device-local).

**Reuse mandate:** the tilemap, guard, and player tokens (W10, W12, W15), the physics toybox (W05, W07), and the stick figures (W08) are shared modules within the build (source-level reuse; still inlined per topic at build time). Build them once, well.

---

## 6. Naming Manifest (final, per the rename rule)

Files: `wNN-concepts.html`, `wNN-lab.html`, `wNN-assignment.html` (+ `-data.js` siblings). D2L topic titles: `Concepts: <Week Title>`, `Lab: <Lab Name>`, `Assignment N: <Name>` (e.g. `Lab: The Seed Machine`, `Assignment 10: Input as Commands`). Exceptions: W01 T3 is `Setup Checklist`; W04 T3 is `Deconstruction Workshop`; W16 topics are `Ship It: The Guide`, `Lab: The Launch Console`, `The Final Project`. Verify titles against this manifest before deploy; deviations are a spec change, not a judgment call.

---

## 7. QA Checklist (every topic, before deploy)

- [ ] Stage is exactly 960×720; no scrollbars at default zoom; survives font-fallback rendering
- [ ] No static `<script src>`; data loads via bootstrap; init sets the READY global; a visible (styled) failure message renders if data.js fails
- [ ] All localStorage keys namespaced; topic works with storage cold, warm, and disabled
- [ ] No CDN or external requests; fonts load from shared/ with fallbacks
- [ ] Keyboard accessible (tab order, arrow paging, focus states in toolkit gold); all color-coded states carry a text label too (the hitbox says CLEAR/COLLISION, not just green/red)
- [ ] Text transcribed from the md sources verbatim where used; any new strings voice-checked (no em-dashes)
- [ ] File and topic names match the manifest exactly
- [ ] Post-deploy: READY global confirmed in the live topic per the deployer skill, not just "it rendered"

## 8. Build Order

1. **Milestone 0** validation in the live course shell.
2. **Week 2 as the pilot** (hardest T1 conversion + deepest lab: it calibrates page density, the template, and the tree/canvas module the way the Week 12 pilot calibrated the written materials). Review with Mark before proceeding.
3. **Weeks 1, 3 through 9** (Tier 3 arc), then **10 through 16**, deploying per week so real units exist early.
4. The shared modules (tilemap, physics toybox, figures) get built inside the W05/W08/W10 work and back-ported where reused.

## 9. Open Decisions (defaults chosen; flag to Mark if changing)

- **Practice guides:** T3 carries the video-shape and checklist, but the full practice walkthrough stays in D2L as the markdown-derived document (attach the .md-rendered content as a separate plain topic per unit, or link the file). Default: a fourth, non-interactive topic `Practice Guide` per unit, plain reading template, same Stage. Cheap to build, keeps everything in one place.
- **Sound:** WebAudio-synthesized, opt-in, W07 only by default.
- **Progress flourishes:** section-complete states are visual only; no gamification beyond the course's own aesthetic. The queue is the queue, even in the chrome.
