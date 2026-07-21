# D2L Workflow Explainer: Narration Script

**Target runtime:** ~3:00 · **Narration load:** ~2:00 of speech across the 3 minutes, on purpose. The interactive pieces should play without a voice over the top of them. Where it says **[hold]**, stop talking and let the footage move.

**Voice:** Teaching register per `marks-voice-guide.md`. Read it like you're explaining it to one colleague, not presenting to a room. No em-dashes, so no dramatic pauses in the wrong places. Pace around 150 words a minute, slower on the punch lines.

---

## Segment 1: Cold open (0:00–0:22)

**On screen:** the finished Week 5 wiki open in D2L; a widget already moving (the ragdoll collapsing, or a block toppling).

**Narration:**
> Ask most people what a learning management system is for, and they'll tell you it's where the PDFs go. The syllabus, the slides, a couple of links. A filing cabinet with a login.

**[hold: let the widget finish its motion]**

> But a D2L content page is just a web page. And a web page can be almost anything.

---

## Segment 2: Two skills (0:22–0:54)

**On screen:** Claude Code working; the two `.skill` files; a glimpse of the sandbox-rules reference.

**Narration:**
> Getting there took two skills. One designs the experience, and it knows all the strange little rules of the D2L sandbox, the ones that break a naive build and fail without ever throwing an error. The other deploys it. It drives the upload, wires the page into a real course topic, and checks that the thing actually came alive instead of just sitting there looking rendered.

**[hold]**

> Design, then deploy. Two jobs, cleanly split.

---

## Segment 3: Develop locally, then deploy (0:54–1:20)

**On screen:** the local browser preview (localhost), a quick edit, then the deploy driving the D2L upload.

**Narration:**
> Everything gets built and tested on my own machine first. I watch it work in a browser, break it, fix it, and only then hand it over. The deploy step is the boring part, and boring is exactly what you want when it's touching a live course.

---

## Segment 4: What you can actually build (1:20–2:40)

**On screen:** the three experiences, in order. This section is mostly footage. Narrate one line, then get out of the way.

**Narration (intro):**
> Once that pipeline exists, the question stops being "what can the LMS do" and starts being "what do I want to build."

**[hold: cut to the adaptive onboarding]**

> An orientation that pays attention. New students don't all need the same thing, so this one adapts to what each of them walks in with.

**[hold: let the onboarding branch on screen]**

**[cut to the campus map]**
> A campus map they can actually move around in, instead of a static picture with a legend underneath it.

**[hold: pan/zoom the map]**

**[cut to the game design wiki, then a physics widget being used]**
> And my game design course, laid out as a wiki, where the concepts aren't described. They're playable. You don't read about a ragdoll. You grab it by the wrist and drop it.

**[hold: long. Let someone actually play the widget: pose it, drop it, fire the slingshot.]**

---

## Segment 5: Close (2:40–3:00)

**On screen:** pull back to the wiki living inside the normal D2L course chrome; the sidebar, the course nav.

**Narration:**
> None of this left D2L. Same login, same course, the same place the students already are. The filing cabinet was a web browser the whole time. We just started using it like one.

---

## Recording notes

- **Total spoken words:** ~300. At a relaxed 150 words a minute that is about 2:00 of narration, which leaves roughly a minute of deliberate silence for the demos. That is the point. Resist the urge to fill it.
- **The two-word buttons** ("cleanly split," "looking rendered," "drop it") are landing beats. Say them and stop. Do not trail off.
- **If you run long,** the first thing to cut is the second half of Segment 2 (the "wires the page into a real course topic" clause). The first thing to cut for time in Segment 4 is the campus map line, since the map reads on its own.
- **If you run short,** add a single line at the top of Segment 4 naming what these were built with ("all of it built with AI as the instrument, not the subject"), which also ties the course's own AI stance into the video.
- **Captions and lower-thirds follow the same rule as everything else in this course:** no em-dashes. Use a colon, a period, or a comma, and commit to the relationship.
