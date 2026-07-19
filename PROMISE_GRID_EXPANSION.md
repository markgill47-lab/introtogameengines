# Task Spec: Expand the Promise Grid corpus

**Scope: one file, data only.** You are adding game entries to an existing array. Do not modify the widget code, the article, the axes, or any other file in this repository.

---

## 1. What this is

`wiki/w04/wiki-data.js` contains a widget config named `promisegrid`. It powers an interactive in a course wiki: a student picks one "promise" from each of four rows, and the widget lists the games that keep all of those promises at once.

The grid is 4 x 4 x 4 x 4 = **256 possible combinations**. The corpus currently holds **109 games** occupying only **59 of 256** combinations.

That sparsity is the bug you are fixing. The widget asks students to decide whether an empty combination is a *contradiction* (two promises that fight each other) or a *market gap* (a game nobody built). Right now many empty cells are neither. They are just games missing from the list. Those false gaps teach students a wrong conclusion, so the corpus has to get dense enough that emptiness means something.

**Target: about 400 games total.** You are adding roughly 290.

---

## 2. The data format

Inside `wiki/w04/wiki-data.js`, find `promisegrid.games`. Each entry is a flat object:

```js
{ n: "Elden Ring",  d: "fight",  w: "solo",  s: "persistent",  f: "mastery" },
```

- `n` = display name. Keep new entries **at or under 30 characters**; it renders as a small chip. Use recognizable short forms (the corpus already uses `"The Legend of Zelda: BOTW"`). Two existing entries sit at 29 characters and render correctly. **Do not rename existing entries** to satisfy this rule; it applies to what you add.
- `d` / `w` / `s` / `f` = one value from each of the four rows below. **All four are required. There is no "none" or "mixed" value.**

Append new entries inside the existing array, before the closing `]`. Match the existing column alignment. The file must remain valid JavaScript.

---

## 3. The tagging rubric

This is the whole job. Tag by the game's **loudest, most-advertised** identity, not by edge cases. Every game gets exactly one value per row even when it spans two. The tie-break rules are not optional; they exist so that 400 games tagged over many sessions stay consistent.

### Row `d` — What you do (the core verb, the thing the hands repeat)

| Value | Use when |
|---|---|
| `fight` | Direct combat is the moment-to-moment activity. Shooters, action games, fighting games, ARPGs, hack-and-slash, beat-em-ups. |
| `command` | You direct units, systems, or resources rather than one avatar's body. Strategy, tactics, city/colony/management sims, deckbuilders, tower defense, sports, auto-battlers, farming and life sims whose loop is managing. |
| `explore` | Traversal and discovery of space is primary. Open-world, adventure, metroidvania, platformers, walking sims, survival-crafting, MMO questing. |
| `solve` | Working out a solution is primary: pattern, logic, deduction. Puzzle games, match-3, word games, deduction games, physics puzzlers. |

**Tie-break:** ask which activity, if removed, would destroy the game. Metroidvanias with combat are `explore` (the map is the promise). ARPGs with exploration are `fight` (the combat is the promise).

### Row `w` — Who with (the default, advertised mode)

| Value | Use when |
|---|---|
| `solo` | Single-player is the intended experience. |
| `coop` | Players work together against the game. |
| `versus` | Players compete directly in a bounded lobby or match. |
| `massive` | Many players share one world or one match at once. MMOs, battle royale, 100-player modes. |

**Tie-break:** use the mode the marketing leads with. Halo has a campaign but sells on multiplayer, so it is `versus`.

### Row `s` — How it is shaped (the container around a session)

| Value | Use when |
|---|---|
| `campaign` | Authored, finite, has an ending and credits. |
| `persistent` | One continuing world or save that accumulates indefinitely, with no designed end. |
| `runbased` | Discrete attempts that reset on failure; progress carries as knowledge or meta-unlocks. Roguelikes and roguelites. |
| `match` | Short bounded rounds, minutes long, fully reset each time. |

**Tie-break:** `campaign` vs `persistent`, ask whether it ends. `runbased` vs `match`, ask whether failure destroys a run you invested in (runbased) or merely ends a round (match).

### Row `f` — How it feels (the promised aesthetic)

**This row requires the most judgment and is the one no database contains. Take it seriously.**

| Value | Use when |
|---|---|
| `mastery` | The pleasure is getting good. Difficulty is the point and failure is instructive. |
| `cozy` | Low stakes, low pressure, warmth and safety. You cannot really lose much. |
| `tension` | Dread, risk, scarcity, fear of loss. The feeling is being under threat. |
| `power` | Escalation and the fantasy of strength. The game makes you feel overwhelming. |

**Tie-break: what does the trailer sell?** Dark Souls sells "you will get good" (`mastery`). Doom sells "you are a force" (`power`). Resident Evil sells "you are not safe" (`tension`). Stardew Valley sells "relax" (`cozy`).

If a game escalates from weak to godlike, that is `power`. If it stays demanding throughout, that is `mastery`.

### Awkward fits (apply these rules; do not improvise)

| Kind of game | Tag as |
|---|---|
| Pure racing sim (Forza, Gran Turismo) | `d: explore` (the verb is traversal), usually `f: mastery` |
| Kart racer with combat (Mario Kart) | `d: fight` |
| Sports (FIFA, NBA, Madden) | `d: command` |
| Rhythm games (Beat Saber, Guitar Hero) | `d: solve`, `f: mastery` |
| Card games and deckbuilders | `d: command` |
| Visual novels, narrative adventure | `d: explore` |
| Idle and clicker games | `d: command`, `f: cozy` or `power` |
| Horror | usually `f: tension` regardless of verb |

---

## 4. Constraints

1. **No duplicates.** Read all 109 existing names first and never repeat one. Watch for near-duplicates under different names.
2. **Cap each franchise at about 3 entries**, and only when the entries are genuinely different games. Do not add six Call of Duty titles.
3. **Recognizability is the point.** Prefer games a college student in 2026 would plausibly recognize, plus historically canonical titles. A student who selects four promises and receives three games they have never heard of learns nothing. Obscure titles that exist only to fill a cell are worse than an empty cell.
4. **Exclusions.** No pornographic games. No games whose notoriety rests on bigotry or sexual violence (Custer's Revenge and its kind are deliberately excluded from this course corpus). No unreleased or vaporware titles.
5. This is a **course-facing corpus for a university class.** Mature and violent games are fine (Doom, Dark Souls, Grand Theft Auto). Gratuitously offensive ones are not.

---

## 5. Work plan

### Phase 1 — Read first
Read `wiki/w04/wiki-data.js` and list the 109 existing names so you do not duplicate them.

### Phase 2 — Breadth pass (add roughly 250)
Work in themed batches so coverage stays broad. Suggested batches and rough counts:

| Batch | Count | Batch | Count |
|---|---|---|---|
| Canon and retro (pre-2000) | 25 | Horror | 15 |
| Nintendo and family | 20 | Puzzle, word, casual, mobile | 25 |
| JRPG | 20 | MMO and persistent online | 20 |
| Modern shooters | 20 | Fighting, sports, racing | 25 |
| Strategy, 4X, tactics | 25 | Narrative and adventure | 20 |
| Sim, management, cozy | 25 | Roguelike and roguelite | 20 |
| Metroidvania and platformer | 20 | Survival, crafting, extraction | 20 |

### Phase 3 — Hole-filling pass (this is the important one)
Run the audit script in section 6. It prints every empty combination. Walk that list and for each empty cell ask: **is there a real, recognizable game here?** If yes, add it. If no, leave it empty, because a genuinely empty cell is exactly what the widget is meant to reveal.

**Known holes with confirmed answers** (these are false gaps in the current corpus, fix them first):

| Empty combination | Real games that fill it |
|---|---|
| Explore + Run-based | Spelunky, Noita, Risk of Rain 2 |
| Command + Massive | EVE Online, Foxhole, Clash of Clans |
| Fight + Cozy | Pokemon, Kirby, Slime Rancher |
| Versus + Persistent | Rust, DayZ, Albion Online |

Other currently-empty pairs to investigate: Explore+Versus, Solve+Power, Versus+Campaign, Versus+Run-based, Massive+Campaign, Massive+Run-based, Massive+Mastery. Some of these are true contradictions. Decide honestly; do not force a bad tag onto a game just to fill a cell. **Filling a cell with a mistagged game is the worst possible outcome, because it destroys the exercise it was meant to serve.**

---

## 6. Verification

Save this as a temp file and run it with `node`. Do not commit it.

```js
global.window = {};
require('/Users/markgill/Projects_26/SE_266_fall2026/wiki/w04/wiki-data.js');
const PG = global.window.SE266_WIKI.widgets.promisegrid;
const G = PG.games, ax = PG.axes;
const V = {}; ax.forEach(a => V[a.id] = a.cells.map(c => c.id));

// validity
let bad = 0;
G.forEach(g => ['d','w','s','f'].forEach(k => {
  if (!V[k].includes(g[k])) { console.log('BAD VALUE:', g.n, k, g[k]); bad++; }
}));
const names = G.map(g => g.n);
names.forEach((n,i) => { if (names.indexOf(n) !== i) console.log('DUPLICATE:', n); });
console.log('games:', G.length, '| bad values:', bad);
// two pre-existing entries are 29 chars and are fine; only flag what is longer
console.log('long names (>30):', names.filter(n => n.length > 30));

// occupancy
const cells = {};
G.forEach(g => cells[[g.d,g.w,g.s,g.f].join('|')] = true);
const occ = Object.keys(cells).length;
console.log('combos occupied:', occ, '/ 256 (' + (occ/256*100).toFixed(0) + '%)');

// empty cells, as a work list
const lab = (k,v) => ax.find(a=>a.id===k).cells.find(c=>c.id===v).label;
let empty = [];
V.d.forEach(d => V.w.forEach(w => V.s.forEach(s => V.f.forEach(f => {
  if (!cells[[d,w,s,f].join('|')]) empty.push([lab('d',d),lab('w',w),lab('s',s),lab('f',f)].join(' · '));
}))));
console.log('EMPTY (' + empty.length + '):'); empty.forEach(e => console.log('  ' + e));
```

**Done when all of these hold:**
- `games:` is between 380 and 420
- `bad values: 0`, no `DUPLICATE` lines, `long names (>30):` is empty
- `combos occupied:` is **150 or higher** out of 256
- The four known holes in section 5 are filled
- The file still parses (the script running at all proves this)

### Final visual check
The repo has a local preview server defined in `.claude/launch.json` under the name `course-static` (port 8266). Start it and open:

`http://localhost:8266/wiki/Week%2004%20-%20Design%20Vocabulary,%20What%20Makes%20Games%20Games.html#/promise-grid`

Confirm the grid renders, the game count in the status line reflects the new total, and selecting Fight / Solo / Persistent / Mastery still returns the Soulsborne cluster (Elden Ring, Dark Souls III, Bloodborne, plus any newly added Souls-likes such as Lies of P or Nioh).

---

## 7. Explicitly out of scope

- Do **not** change the widget function `promisegrid` in `wiki/Week 04 - Design Vocabulary, What Makes Games Games.html`.
- Do **not** change the four axes or any cell label or id.
- Do **not** edit `wiki/w04/articles/promise-grid.md`.
- Do **not** deploy anything to D2L. All work stays local.
- A separate planned change adds "near miss" feedback when a selection returns zero games. That is widget logic and is **not** part of this task.

Commit the single changed file with a message describing the new total and the resulting occupancy.
