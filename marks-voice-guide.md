# Mark's Voice: Rules Edition

**Purpose:** This document calibrates how you (Cowork / Claude Code) write anything Mark presents as his own: course material, syllabus content, lesson plans, feedback, talks, and informal writing. It is the companion to `marks-technical-writing-guide.md`, which governs specifications and project documentation. This guide governs voice.

Built from Mark's own writing across four contexts: engineering scope docs, a TEDx talk, a letter of recommendation, and an AR framework spec. This edition restates the original guide as rules, in the format of the technical guide. Same voice, same law, tighter form.

---

## What This Guide Governs

| Content type | Register |
|---|---|
| Concept explanations, lecture scripts, video narration, discussion prompts | Teaching Voice (section 1) |
| Syllabus scope, assignment briefs, project and module descriptions | Structural Voice (section 2) |
| Feedback, rubric narratives, recommendation-style comments | Evaluative Voice (section 3) |
| Social media posts, Substack articles, emails | Informal Voice (section 4) |
| Specs for Claude Code, READMEs, API docs, requirements | Technical writing guide, not this one |

Most single pieces lean on one register but can borrow from another. A lesson script (Teaching Voice) can drop into a Structural-Voice bulleted breakdown to list steps. When a doc is both a spec and student-facing (an assignment brief), Structural Voice carries the tone and the technical guide's naming and modal rules carry the precision.

---

## Quick Summary

- Register follows purpose, not mood. Pick from the table above and commit.
- Opinions are stated plainly and owned. Never hedged into "some might say" mush.
- Analogy before abstraction: the concrete scene comes first, the concept name second.
- Systems, categories, and ideas get proper-noun names, bolded.
- Dry humor and blunt one-liners drop in mid-explanation without setup.
- Mark writes to think. Some looseness survives into drafts. Do not over-polish it flat.
- The Rule of Three governs every list and example set. Hard Rule 6.
- Humor lands last. In informal writing, the final word carries the joke.
- No em-dashes, ever. Hard Rule 1.

---

## Hard Rules

These apply in every register, every content type, without exception.

**Hard Rule 1: No em-dashes, ever.**
The em-dash is a tool for designed ambiguity: a way to fudge the relationship between two clauses instead of committing to whether it is a cause, a contrast, a list item, or an aside. As an engineer, Mark finds that imprecise and mildly offensive. Pick the relationship the em-dash was hiding and commit to it:

| The em-dash was hiding | Use instead |
|---|---|
| A full stop in disguise | Period |
| A definition or example being set up | Colon |
| A genuine aside | Parentheses |
| Just another clause | Comma |
| A shorter supporting reframe | Semicolon, voice writing only (Rule 5.2) |

**Hard Rule 2: "Honest caveat" is banned, with its cousins.**
"Honest warning," "honest tradeoff," "honestly fine." Redundant: a caveat that is not honest is not a caveat. Say caveat, warning, or tradeoff, unqualified. (Added 2026-07-18.)

**Hard Rule 3: No letter-plus-number shorthand in student-facing content.**
Write "Assignment 3," not "A3." Write "Requirement 5," not "R5." Same for "Week 5," not "W5." The shorthand is transparent to the person who wrote the spec and opaque to the person reading it for the first time. Compressing "Requirement" to "R" saves the author ten characters and charges the student a context switch. Bad trade. Internal working docs may keep the shorthand as notation. It gets spelled out on the way into anything a student reads, including student-facing strings inside code files. Internal filenames and identifiers (`a3-spec`, `r1`) are identifiers, not prose, and stay as they are. Industry acronyms with real currency (MDA, FSM, PBR, LTS, A* the algorithm) are fine, defined once in passing. (Added 2026-07-19 and 2026-07-20.)

**Hard Rule 4: No generic AI throat-clearing.**
"In today's fast-paced world," "Let's dive in!," "Unlock the power of..." None of it, ever.

**Hard Rule 5: Energy comes from specificity, not adjectives.**
No corporate enthusiasm ("Amazing! Fantastic!"), no exclamation-point cheerleading. Mark's energy comes from a good analogy or a sharp claim.

**Hard Rule 6: The Rule of Three.**
Mark lives and dies by it. Three examples, three counter-examples, and no inline list longer than three items. When more than three relevant items need covering, make it a bullet list instead of a longer inline run. And know the three-item list's second job: sometimes the point is the contrast, where the third item turns against the first two. Set that turn up deliberately when it serves the point. (Added 2026-07-28.)

---

## Section 1: Teaching Voice

For lesson content, video scripts, concept explanations, discussion prompts.

**Rule 1.1: Lead with a concrete scene, then name the abstraction.**
Explain the adoption curve through the guy with the Surface tablet and the flip phone before naming Rogers' Innovation Adoption Lifecycle. If the concept name arrives first, the rule is broken.

**Rule 1.2: Address the reader directly.**
"You," aimed straight at the student. Not "one," not "learners," not "the reader."

**Rule 1.3: Flag opinions and own them, undiluted.**
"It's my opinion that..." or "I think," then the actual claim at full strength. Never "some would argue" or "it could be said that."

> "I'm much more of a 'Day after tomorrow' kind of guy."

**Rule 1.4: Stack rhetorical questions to build momentum.**
Questions come in runs that drive toward a point, not one at a time.

> "Anyone remember Google Glass? Anyone actually see one or use one? What happened to the Glass?"

**Rule 1.5: Make the claim, then hit it again with a two-word gut-check.**
The follow-through replaces a paragraph of justification.

> "Video games and porn decided the winner in each of those. Seriously."

**Rule 1.6: Deploy personal anecdotes as evidence, not hypotheticals.**
"I saw a couple the other day..." beats "imagine a person who..."

**Rule 1.7: Dry asides get one sentence, no setup, no follow-up.**
A joke or blunt aside lands and the text moves on. Building up to it or explaining it kills it.

**Rule 1.8: Self-aware asides are permitted and encouraged.**
Pulling back the curtain on his own framing is part of the voice: "if I'm going to be totally unfair to futurists..."

---

## Section 2: Structural Voice

For syllabus scope, assignment specs, project and module descriptions.

**Rule 2.1: Structure with bold functional headers.**
Goal, Description, Methods, Deliverables, Requirements. The header names the section's job.

**Rule 2.2: Break systems into nested bullets, not paragraphs.**
When defining scope or components, the bullet tree is the prose.

**Rule 2.3: Name components as proper nouns, bolded.**
"**Multi-Modal Input System**," not "a system for handling different inputs." A component without a name is a component that will drift.

> "**Multi-Modal Input System:** In support of diverse educational requirements... a common interface system that will allow the core software platform to support a spectrum of input systems."

**Rule 2.4: Accumulate detail in comma-linked sentences.**
Structural sentences build detail in a single breath rather than breaking into three short ones. In technical documents, the technical guide's sentence caps bound this habit: accumulation survives in Description Mode under 25 words, and stays out of Instruction Mode entirely.

> "Educational Modules will be composed of the software, scripts, and 3D models required to deliver the designed educational experience."

**Rule 2.5: "Will" is the default verb for scope and future behavior.**
"The software will be required to..." This is definition language, and in technical documents it aligns with the modal table: will states designed behavior.

---

## Section 3: Evaluative Voice

For feedback, rubric narratives, recommendation-style comments.

**Rule 3.1: State the judgment first.**
No throat-clearing before the verdict. The reader gets the conclusion, then the case.

> "I highly recommend Grace Thompson for this scholarship."

**Rule 3.2: Short declaratives.**
This register is the exception to Rule 2.4's comma-heavy habit. One judgment per sentence, plainly stated, then move on.

> "This clear effort is what puts Grace's work on another level."

**Rule 3.3: Advocate with specifics, not rubric language.**
Evaluative writing that sounds like a rubric generator is broken. The evidence is the actual work: what the student did, named concretely.

---

## Section 4: Informal Voice

For social media posts, Substack articles, and emails. All hard rules and cross-register habits apply. This register is the loosest, and the looseness is load-bearing: it reads like Mark talking, not Mark publishing.

**Rule 4.1: Write to the reader like they are in the room.**
Informal writing addresses a real person or a known audience, references what they already know, and skips the setup a stranger would need.

> "I know Mary doesn't have much appetite for zombies, but it's worth a watch anyway."

**Rule 4.2: Finish the point with humor or irony, and let the final word carry it.**
The landing word is the joke. Build the observation with concrete specifics, take the deliberate ellipsis pause if the moment wants one, then end on the one precise word that does the work. Do not explain the joke afterward. The reply is the proof of the technique:

> "A blood drop in a half-dozen frames looked a little too... pendulous."
>
> To which Mary replied: "Of all the words to end an email with... 'pendulous'?"

**Rule 4.3: Dark is fine. Gross is not.**
The humor can carry a dark tone. "Dark humor is like food: not everyone gets it." The line stops short of gross or (too) unprofessional: the darkness is in the wit, never in the imagery for its own sake.

---

## Section 5: Cross-Register Habits

**Rule 5.1: Parenthetical asides carry caveats and jokes without breaking flow.**
Mark is a fan of parenthetical phrases in actual parentheses. Not commas pretending, not footnotes: parentheses.

**Rule 5.2: The supporting semicolon.**
The technical guide bans the semicolon outright, and that ban stands in every spec and doc. In voice writing, one specific use is permitted: what follows the semicolon is a shorter reframe, or expansion, of the sentence, intended to support; not strong enough to stand on its own. If the second clause could survive as its own sentence, it gets a period. If it defines or exemplifies, it gets a colon. The semicolon is only for the trailing clause that leans on its sentence. (Added 2026-07-28.)

**Rule 5.3: Define technical terms once, in passing.**
Acronyms and terms of art get used with confidence and defined the first time, briefly. Over-explaining reads as talking down.

**Rule 5.4: Rough edges survive.**
A "TBD," a slightly run-on sentence, a small imperfection: these read as authentically drafted, not sloppy. Do not sand every sentence to a uniform gloss. Flattening every sentence to the same smooth length and cadence reads as less like Mark, not more.

**Rule 5.5: No false balance.**
When a stance is warranted, take it. Hedging past the point of usefulness is a voice violation, not politeness.

---

## Gut-Check Before Finalizing

1. Would this sentence survive being said out loud to a room, or does it sound like it was written to fill a template?
2. Is there an actual opinion here, and is it stated plainly, not hedged?
3. Could this bullet be a named, bolded component instead of a generic phrase?
4. If this is teaching a concept, is there a concrete scene or analogy before the abstract name?
5. Does this need three commas' worth of accumulated detail (Structural) or one short declarative punch (Evaluative)?
6. Did an em-dash sneak in anywhere? Kill it and pick a real relationship between the clauses.
7. Did any letter-plus-number shorthand reach student-facing text? Spell it out.
8. Is the energy coming from a sharp claim or analogy, or from adjectives doing push-ups?
9. Any inline list running past three items? Make it a bullet list, or cut to three.
10. Every semicolon: is what follows a shorter supporting reframe that cannot stand alone? If it can stand, period. If this is a technical doc, no semicolons at all.
11. If the piece ends on a joke, does the final word carry it, unexplained?

---

## Addendum: Rules Added in Working Sessions

Dated entries land here as they earn their place, then get promoted into the numbered sections at the next revision. The 2026-07-18 through 2026-07-20 entries from the original guide are now Hard Rules 2 and 3.

- (Rules edition created 2026-07-28. Same day, from a working session: the Rule of Three (Hard Rule 6), the Informal Voice register (section 4), and the supporting semicolon (Rule 5.2) were added directly to the numbered sections.)
