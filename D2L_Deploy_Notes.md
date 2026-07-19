# D2L Deployment Notes — SE 266 Course Wiki

Verified live against **Fa26 SE 266-01 Game Development** (ou `7571920`,
tenant `stcloudstate.learn.minnstate.edu`) on 2026-07-18. These notes capture
what actually happened so Weeks 02–16 deploy without re-discovery.

## Tenant validation results (Milestone-0, run in-course)

| Check | Result |
|---|---|
| static `<script src>` | **RUNS** (deviates from the skill docs, which expect inert — do not rely on it either way) |
| inline / dynamically-injected script | runs |
| `fetch()` sibling `.js` | works |
| `fetch()` sibling `.md` | **works, bytes intact** (served as `application/octet-stream` — fine for `.text()`) |
| relative `<img>` | works |
| `localStorage` | works (shared LMS-wide — namespace keys) |
| iframe sizing | grows to content → keep **fixed pixel height** root, never `100vh` |

## Layout in course files (Manage Files)

```
/content/2026/7571920-20273001214S/
├── Week 01 - Engines, Anatomy, and Choosing Yours.html   ← topic file (root)
└── w01/
    ├── wiki-data.js
    └── articles/*.md          (27 files)
```

- **Shells live at the content root** (that's where the Lessons drop-zone upload puts them).
- **Each week gets its own `wNN/` folder** for `wiki-data.js` + `articles/` — shells all
  fetch relative to the root, so per-week folders prevent cross-week collisions.
- The shell's `BASE` constant (top of its inline script) must match the folder: `w01/`, `w02/`, …

## Deploy workflow per week (repeatable)

1. Build `WeekNN/wiki/` locally: shell HTML (with `BASE = 'wNN/'`) + `wNN/wiki-data.js` + `wNN/articles/*.md`.
   Verify locally over HTTP (`.claude/launch.json` server, port 8266) — `file://` blocks article fetch.
2. **Create the topic via the Lessons drop zone** (unit → Add → Add Existing → drop zone):
   this uploads the shell to the content root AND creates the topic, titled from the
   file name **with `.html` stripped**. ("Add Existing → Course File" on an already-uploaded
   file keeps `.html` in the title — avoid for student-facing topics.)
3. In Manage Files: create `wNN/` at root, upload `wiki-data.js`; create `wNN/articles/`,
   upload all `.md` files (one multi-file upload works). **Wait for the dialog's progress
   bar to finish before clicking Save** — saving mid-upload fails with "Select at least
   one file"; the files stay staged, so just Save again once staging completes.
4. Verify inside the live topic (nested-iframe traversal): `SE266_WIKI_READY === true`,
   sidebar populated, hash navigation loads an article.
5. Updates: edit locally → re-upload the changed file(s) with **Overwrite**. Prose fix = one `.md`.

## Hard rules (from the d2l-activity skills; they held here)

- **Never rename a live topic and never open it in D2L's HTML editor** — both re-serialize
  and silently kill interactivity. Name the file to the final title before deploying.
- Uploads are driven browser-side: suppress the native picker
  (`HTMLInputElement.prototype.click` no-op for file inputs), assign in-memory `File`s via
  `DataTransfer` (use the dialog iframe's own constructors), dispatch `change`.
  File bytes come from a local CORS server (`127.0.0.1`, permissive `Access-Control-Allow-Origin`).
- `localStorage` is device-local UX only — never completion tracking or grades.
