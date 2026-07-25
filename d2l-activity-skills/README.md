# D2L Activity Skills — for building, illustrating & deploying content in D2L Brightspace

Three Claude skills, distilled from real builds at SCSU. Together they let Claude
**build** a self-contained interactive HTML/JS/SVG activity (maps, timelines, calculators,
self-checking quizzes, decision trees, interactive diagrams — anything custom), **illustrate**
it with generated infographics, and **deploy** it into a D2L Brightspace course as a content topic.

| Skill | What it does | Needs the browser/login? |
|---|---|---|
| **d2l-activity-builder** | Builds the activity as local file(s), following D2L's non-obvious sandbox rules so it works the first time | **No** — pure local file generation |
| **d2l-infographic-generator** | Generates explanatory figures as images, verifies every string, and iterates with you through edits/regenerations while keeping every revision | **No** — needs an image-generation tool |
| **d2l-activity-deployer** | Uploads the finished activity into your D2L course and wires it up as a topic | **Yes** — see requirements below |

They're independent: you can build with one and deploy by hand, or use all three together.

---

## What you need

### To build (d2l-activity-builder)
- A Claude client that supports **skills** (e.g. Claude Code). Nothing else — building is just Claude writing files on your machine.

### To deploy with Claude (d2l-activity-deployer)
Deployment drives a real, logged-in browser, so **you** must supply these — Claude can't and won't do them for you:

1. **Google Chrome** installed and open.
2. The **"Claude in Chrome" extension** installed and **connected** to your Claude session (this is how Claude drives the browser).
3. **You signed in to D2L Brightspace** in that Chrome via your institution's SSO, with the target course open. *Claude never performs the login or handles your password — log in yourself first.*
4. A D2L **role that can manage course files and edit content** (instructor / course designer / TA-with-rights).

> Prefer not to wire up the browser? You can still deploy by hand — the deployer skill will give Claude the exact click-path to hand you (upload the file, add it as a Course File topic).

---

## Installing the skills

A `.skill` file is just a zip of a skill folder. Install whichever way your Claude client supports:

- **If your client has a "add/import skill" action**, point it at the `.skill` file.
- **Otherwise, unzip it into your client's skills directory.** For Claude Code that's typically
  `~/.claude/skills/` — unzip so you end up with
  `~/.claude/skills/d2l-activity-builder/SKILL.md` (and the same for `d2l-activity-deployer`).
- Easiest of all: open the `.skill` files with Claude and ask it to help you install them.

Once installed, the skills trigger automatically when you describe the relevant task — you don't
have to name them.

---

## Using them

**Build** — just describe what you want, mentioning D2L/Brightspace:
> "Build an interactive campus dining directory for our D2L course — filterable by meal plan, each spot with hours and a map link."

Claude follows the builder skill: it can first run a tiny **validation test** in your D2L
tenant (recommended — behaviors vary slightly by school), then builds a self-contained activity
with the right architecture.

**Illustrate** — describe the figure you want; Claude takes a first stab rather than interviewing you:
> "I need a diagram showing how the three moats erode over time — scale, data, distribution."

Claude follows the infographic skill: generates candidates, **verifies every rendered string
character-by-character** (generated figures invent titles and even fake "SOURCE:" lines — that's the
real failure mode, not spelling), tells you what it found, and then iterates with you. It scores each
change request to advise whether a targeted **edit** or a full **regeneration** is the better move, and
keeps every revision so you can always fall back.

**Deploy** — once you've met the requirements above:
> "Deploy it to the Orientation course under the Welcome unit, titled 'Dining Guide'."

Claude follows the deployer skill: it checks the prerequisites, uploads the file, adds the topic,
and verifies it actually initialized.

---

## Three rules worth knowing up front

These are baked into the skills, but they save the most grief, so know them:

1. **Never edit or rename a deployed activity inside D2L's HTML/WYSIWYG editor.** Saving there
   re-serializes the markup and silently breaks the interactivity (it'll still *look* fine).
   Edit the file locally and re-upload (Overwrite) instead. **Pick the final name before you
   deploy** — name the file to the title you want (D2L drops the `.html`), so you never rename.
2. **"It rendered" ≠ "it works."** Always confirm the activity actually initialized after
   deploying, not just that something appeared. The deployer skill does this for you.
3. **If the activity has internal views, give it its own Back/Forward buttons.** The activity
   runs inside D2L's page shell, so the *browser's* back button navigates D2L, not your activity —
   a reader who follows a few internal links gets bounced out of the topic with no way back. Any
   multi-page thing (a wiki, a drill-down map, a stepped exercise) needs an internal history stack
   and on-screen nav controls. Easy to overlook until a reader hits it. Details in the builder
   skill's `references/sandbox-rules.md` → "In-topic navigation."
4. **A generated figure is not done until every string in it has been read.** Image models spell
   reliably now; what they do instead is *invent* — unrequested titles, and fabricated
   "SOURCE: …" attribution lines that look exactly like real citations. Verify character-by-character
   against source, and check that the picture still makes the argument (a figure can be perfectly
   labelled and still show the opposite of your point). Details in the infographic skill's
   `references/failure-modes.md`.
5. **A complex figure needs three texts, not one.** An infographic or diagram ships with a short `alt`, a
   visible caption, and a **full long description** behind a visible "Describe this figure" button — because
   `longdesc=` is obsolete and a screen-reader-only block misses sighted readers who can see the figure fine
   but can't decode what the encoding *means*. Write the description only once the figure is final, or it
   drifts out of sync with the image. Modal pattern (focus trap, Escape, focus return) is in the builder
   skill; the writing standard is in the infographic skill.

---

## Notes & limits
- These behaviors were **verified on a MinnState / SCSU D2L Brightspace** tenant. Other tenants are
  probably the same, but the builder skill includes a quick "validate first" test to confirm in yours.
- Activities are self-contained and **device-local** — great for interactive content and "remember
  where I left off" UX, but **not** a substitute for D2L's real completion tracking or gradebook.
- Questions or improvements? These were built collaboratively with Claude — open one of the
  `.skill` files with Claude and ask.
