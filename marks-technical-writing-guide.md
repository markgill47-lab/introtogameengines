# Mark's Technical Writing Guide

**Purpose:** This document calibrates how you (Cowork / Claude Code) write technical documentation and specifications so the output is precise, unambiguous, and buildable. It is the companion to `marks-voice-guide.md`, which governs voice and register. This guide governs technical discipline.

It adapts ASD-STE100 Simplified Technical English (Issue 9, January 2025), the aerospace standard for technical documentation. STE was built so that a maintenance tech with limited English can execute a procedure without misreading it. A spec handed to Claude Code has the same failure mode: the reader will do exactly what the words say, not what the author meant. Adopt the discipline, not the bureaucracy.

---

## What This Guide Governs

| Content type | Guide that wins |
|---|---|
| Specs and design docs handed to Claude Code to build from | This guide |
| Project documentation: READMEs, architecture docs, API docs, changelogs | This guide |
| Requirements, acceptance criteria, procedures, runbooks | This guide, strictly |
| Course content, lesson scripts, feedback | Voice guide (Teaching / Evaluative Voice) |
| Syllabus scope and assignment specs | Voice guide (Structural Voice), borrowing naming and modal rules from here |

The voice guide's hard rules apply everywhere, including here. No em-dashes, ever. No "honest caveat." The registers still exist. This guide sharpens the Structural / Specification Voice into something a machine or a stranger can build from.

---

## Quick Summary

- Write in one of two modes: **Instruction Mode** or **Description Mode**. Know which one you are in.
- One name per thing, forever. One meaning per word, per project.
- Modal verbs carry contract weight: must, will, should, can. Use them by the table, not by feel.
- Short sentences in instructions (aim under 20 words). Description prose gets more room (soft cap 25), and keeps Mark's comma-linked accumulation within it.
- Active voice. The sentence names who or what does the action.
- No dropped articles. "The parser reads the config file," not "Parser reads config file."
- No semicolons. Like the em-dash, a semicolon fudges the relationship between clauses. Split the sentence or use a colon.
- Notes inform. They never contain requirements.
- Reference words point at nouns. No bare "this," "it," or "which."
- Every kind of statement has one shape. Two requirements should read as diffs of the same template.
- Prose carries the why, lists carry the what, tables carry the mappings, code blocks carry the exact. Every example is normative.

---

## The Two Modes

STE splits all technical writing into procedural and descriptive, with different rules for each. That split resolves the one real conflict between STE and the existing Structural Voice: STE wants short sentences, and the Structural Voice runs on comma-linked accumulation. The answer is that each wins on its own turf.

### Instruction Mode

For: requirements, acceptance criteria, task lists, procedures, setup steps, anything Claude Code executes or a reader performs.

- Imperative form. "Create the table," not "The table should be created."
- One instruction per sentence, unless two actions genuinely happen at the same time.
- Aim for a maximum of 20 words per sentence. If a sentence runs long, it is usually two instructions wearing a trench coat.
- When a condition governs the instruction, state the condition first, then a comma, then the command: "If the cache is empty, skip the render step." The reader learns the condition before committing to the action.
- Short declaratives. The accumulation habit stays out of this mode.

### Description Mode

For: architecture overviews, rationale sections, README prose, "how it works" text.

- Give information gradually. One topic per sentence, one subject per paragraph, no paragraph over six sentences.
- Soft cap of 25 words per sentence. Comma-linked accumulation is welcome under that ceiling: build the detail in one breath, then stop.
- Structure with key phrases and named components so a reader can skim the bold and reconstruct the system.
- Never hide an instruction in description. If the reader must do something, break into Instruction Mode and say so.

---

## Naming Rules

This is the heart of the standard, and it is already half of Mark's habit. STE devotes its longest section to it for a reason: most spec ambiguity is naming ambiguity.

- **One name per thing.** Pick the name once (**Ingest Queue**, **Session Token**, **Elasticity Splitter**) and use it identically everywhere: same words, same order, same capitalization. Never rotate synonyms for style. If the doc says "the queue," "the ingest buffer," and "the message pipeline," the reader now maintains a table of guesses.
- **One thing per name.** Never reuse a name for a second concept, even a related one.
- **Three words maximum** for a compound name. "User session token refresh handler" forces the reader to parse four modifiers before the noun. Shorten it, or hyphenate the words that travel as a unit ("session-token refresh").
- **Introduce long names once, in full, then give the short form:** "the Multi-Modal Input System (the input system)." After that, use the short form only.
- **Nouns stay nouns, verbs stay verbs.** Established industry verbs (commit, deploy, cache) are fine. Inventing new ones ("let's requirement that," "the config errors") is not.
- **Define each name where it first appears** or in a small terms block at the top of the spec. A name Claude Code has to infer is a name it will infer wrong.

---

## Modal Verbs Carry Contract Weight

In a spec, "should" versus "must" is the difference between a bug and a choice. Fixed meanings:

| Word | Means | Example |
|---|---|---|
| **must / must not** | Hard requirement or prohibition. Violating it means the work is wrong. | "The parser must reject files over 10 MB." |
| **will** | Statement of designed behavior. This is scope definition, Mark's existing habit. | "The exporter will produce one JSON file per module." |
| **should / should not** | Strong default. Deviation is allowed with a recorded reason. | "Responses should return in under 200 ms." |
| **can / may** | Permitted option, reader's discretion. | "The user can override the default palette." |

Never "shall." Never "should" when you mean "must." Never "may" when you mean "will." When a requirement matters, say must and let the sentence be blunt.

---

## Sentence-Level Rules

- **Active voice, named agent.** "The scheduler retries the job," not "the job is retried." Passive is permitted only when the agent is unknown or truly irrelevant.
- **Simple tenses only.** Present, simple past, simple future. No "will be being processed," no stacked auxiliaries.
- **No dropped articles.** Telegraphic style ("System validates input, returns error code") reads as efficient and parses as ambiguous. Keep the, a, an, this, these in front of nouns.
- **No contractions in Instruction Mode.** "Do not delete the cache" survives a skim better than "don't." Contractions are fine in Description Mode and READMEs.
- **No semicolons.** STE bans them outright, for the same reason Mark bans the em-dash: the relationship between the clauses is left as an exercise for the reader. Split into two sentences, or commit to a colon.
- **Parentheses keep their existing jobs:** references, identifiers, abbreviations, alternatives, asides.
- **Vertical lists for anything complex.** Three or more parallel items in a sentence become a list. Already the house style.
- **American English spelling.**

---

## Reference Words

Adapted from STE's general recommendations. The smallest words cause the biggest misreads.

- **No bare "this," "these," "it," or "which."** Every reference word gets a noun: "this timeout," "these three fields." A bare "this" gesturing at the previous paragraph makes the reader pick one of the last four nouns, and Claude Code will pick with confidence.
- **Keep "that" after reporting verbs.** "Make sure that the cache is empty." "Check that the test passes." Dropping "that" invites a garden path: "check the test passes" briefly reads as an instruction to check the test, full stop. The extra word is free insurance.
- **One possessive, maximum.** "The parser's config" is fine. "The parser's config's default" is a multi-word noun in denial. Rewrite with "of," or better, use the component's actual name.

---

## Say It the Same Way Every Time

STE Rule 9.4 gets one line in the standard and deserves a section here: use a consistent style when you select wording. For specs, consistency means every statement of a given kind has the same shape. The reader stops parsing grammar and starts diffing content.

| Kind of statement | Template |
|---|---|
| Requirement | The [component] must [verb] [object]. |
| Conditional requirement | When [condition], the [component] must [verb] [object]. |
| Prohibition | The [component] must not [verb] [object]. |
| Designed behavior | The [component] will [verb] [object]. |
| Instruction | [Verb] [object]. Or: If [condition], [verb] [object]. |
| Error behavior | If [failure], the [component] must [response]. |

Example of the payoff: "When the queue is full, the Ingest Queue must reject new jobs" and "When the token expires, the Session Manager must refresh it" are instantly comparable. If two requirements have different shapes, the reader hunts for a meaningful difference that is not there.

---

## Notes, Warnings, and Callouts

Adapted from STE's safety-instruction rules, which are the best part of the standard.

- **A note gives information only. Never an instruction, never a requirement.** If a "Note:" contains the word must, it is a requirement that got filed in the wrong drawer. Promote it.
- **A warning states the condition or command first, then the consequence:** "Do not run the migration twice. A second run duplicates every row." Command, then risk. Not a paragraph of context with the risk buried at the end.
- Use a consistent callout ladder and keep the levels honest: **Warning** (data loss, security, breakage), **Caution** (recoverable damage, rework), **Note** (information). A doc where everything is a warning has no warnings.

---

## The Format Ladder

STE is a prose standard. Specs for Claude Code are not prose documents: they mix prose, lists, tables, and code blocks, and each format has one job. The ladder, from most binding to least:

1. **Code blocks carry the exact.** Schemas, file trees, function signatures, sample input and output, exact strings and names. Claude Code will often carry these forward verbatim into the implementation.
2. **Tables carry the mappings.** Config keys to meanings, states to transitions, endpoints to payloads. Anything enumerable with two or more attributes per item.
3. **Numbered lists carry the what.** One atomic, testable requirement per number. Numbering gives everyone a shared handle: "Requirement 4 is not met yet."
4. **Prose carries the why.** Rationale, intent, constraints, context. A short paragraph of why is what lets Claude Code make sane judgment calls in the gaps the spec does not cover. Prose never carries a requirement: when a must appears mid-paragraph, promote it to the numbered list.

Two rules ride along with the ladder:

- **Every example is normative.** Claude Code copies examples, typos included. Write every example as if it will ship, because it will. If an example is only an illustration, label it "illustrative, not normative," and still write it correctly.
- **Diagrams are for humans. The text version is normative.** An image is nearly opaque to Claude Code. Mermaid is text and parseable, but a plain edge list ("A calls B, B writes to C") is more reliable. When a diagram earns its place for the human reader, pair it with the text equivalent and mark the text as the one that governs.

---

## The Word List

STE's Part 2 is a 300-page controlled dictionary: one approved meaning per word. The full apparatus is overkill here. The principle is not: within one project, one word keeps one meaning.

Starter table of banned words and their replacements:

| Banned | Write instead |
|---|---|
| utilize, leverage | use |
| functionality | function, or the feature's actual name |
| in order to | to |
| prior to / subsequent to | before / after |
| ensure | make sure |
| perform | do, run |
| initiate, commence | start |
| terminate | stop, end |
| attempt | try |
| facilitate | help, let, or name the actual mechanism |
| via | through, with |
| i.e. / e.g. | that is / for example |
| etc. | finish the list, or say "and others" |
| appropriate, as needed | state the actual criterion |
| handle (as a vague verb) | name the action: parse, catch, retry, reject |

And a short reserved-meanings list, the one-word-one-meaning rule applied to the usual offenders:

- **check** = inspect and report. It does not mean fix.
- **verify** = confirm against a stated expectation. A verification without an expected value is just looking at something.
- **update** = modify in place. Not create, not replace.
- **flag** (noun) = a boolean. Do not use flag as a verb: write mark or report.

This table grows the same way the voice guide grows: when a word causes a misread in a working session, it gets an entry in the addendum with a date.

---

## Gut-Check Before Finalizing a Spec

1. Which mode is each section in, and does its sentence style match?
2. Could a stranger, or Claude Code, build this without asking a question? Every question they would ask is a hole in the spec.
3. Does every named component have exactly one name, used identically everywhere?
4. Is every must a real must, and is anything load-bearing hiding inside a should or a note?
5. Any sentence over 20 words in Instruction Mode: is it two instructions in a trench coat?
6. Does every warning lead with the command and follow with the consequence?
7. Did an em-dash or a semicolon sneak in? Kill it and pick a real relationship between the clauses.
8. Any bare "this," "it," or "which"? Give each one a noun.
9. Would every example survive shipping verbatim? It will ship verbatim.
10. Is anything load-bearing living only in a diagram or an unlabeled example instead of numbered text?

---

## Addendum: Rules Added in Working Sessions

- (Seeded 2026-07-28 from ASD-STE100 Issue 9. Entries land here as they earn their place.)
