---
name: workout-generator
description: Generate or update a workout day HTML artifact in the GetFit project
triggers:
  - user wants to add, remove, or replace an exercise on a workout day
  - user wants to change sets, reps, rest, or form cues
  - user asks to regenerate a workout day from scratch
  - user wants to adjust the workout for an injury or preference
---

# Workout Generator Skill

## Steps

1. Identify the target day (1-5) and the specific exercise to add/change
2. Read the target file: `workouts/day{N}-*.html`
3. Re-read `CLAUDE.md` for the exercise-card HTML pattern and conventions
4. For a **new exercise card**:
   - Image src: `../assets/exercise-placeholder.svg` (always)
   - Add `<figcaption>` with a real ExRx link for the exercise
   - Include 2-3 substitutes in `<details class="substitutes">` — this is mandatory
   - Form cue MUST mention: 3-second eccentric, mind-muscle connection, why this builds the target muscle
   - Rep ranges: 6-12 for compounds, 12-20 for isolation/pump finishers
5. For a **modification**:
   - Locate `<article data-exercise="[slug]">` and update only what was requested
   - Keep all other attributes and structure intact
6. Verify `data-sets` and `data-reps` on `.set-log` match the exercise-header text
7. Verify session still fits 45 minutes:
   `(total_sets × 52s work) + (total_sets × avg_rest_s) + (exercises × 120s transition) ≤ 2700s`
8. Confirm no inline styles and no unclosed tags

## Hypertrophy-First Language
Every cue should explain WHY this builds visible muscle mass, not just HOW to do the exercise.
Example: “This slow eccentric creates more micro-tears in the muscle fiber, which is what drives growth.”
