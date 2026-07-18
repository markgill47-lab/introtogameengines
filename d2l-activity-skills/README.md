# D2L Activity Skills — for building & deploying interactive activities in D2L Brightspace

Two paired Claude skills, distilled from real builds at SCSU. Together they let Claude
**build** a self-contained interactive HTML/JS/SVG activity (maps, timelines, calculators,
self-checking quizzes, decision trees, interactive diagrams — anything custom) and **deploy**
it into a D2L Brightspace course as a content topic.

| Skill | What it does | Needs the browser/login? |
|---|---|---|
| **d2l-activity-builder** | Builds the activity as local file(s), following D2L's non-obvious sandbox rules so it works the first time | **No** — pure local file generation |
| **d2l-activity-deployer** | Uploads the finished activity into your D2L course and wires it up as a topic | **Yes** — see requirements below |

They're independent: you can build with one and deploy by hand, or use both together.

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

**Deploy** — once you've met the requirements above:
> "Deploy it to the Orientation course under the Welcome unit, titled 'Dining Guide'."

Claude follows the deployer skill: it checks the prerequisites, uploads the file, adds the topic,
and verifies it actually initialized.

---

## Two rules worth knowing up front

These are baked into the skills, but they save the most grief, so know them:

1. **Never edit or rename a deployed activity inside D2L's HTML/WYSIWYG editor.** Saving there
   re-serializes the markup and silently breaks the interactivity (it'll still *look* fine).
   Edit the file locally and re-upload (Overwrite) instead. **Pick the final name before you
   deploy** — name the file to the title you want (D2L drops the `.html`), so you never rename.
2. **"It rendered" ≠ "it works."** Always confirm the activity actually initialized after
   deploying, not just that something appeared. The deployer skill does this for you.

---

## Notes & limits
- These behaviors were **verified on a MinnState / SCSU D2L Brightspace** tenant. Other tenants are
  probably the same, but the builder skill includes a quick "validate first" test to confirm in yours.
- Activities are self-contained and **device-local** — great for interactive content and "remember
  where I left off" UX, but **not** a substitute for D2L's real completion tracking or gradebook.
- Questions or improvements? These were built collaboratively with Claude — open one of the
  `.skill` files with Claude and ask.
