---
description: Generate or update a workout day HTML artifact
---

Generate or update a self-contained HTML workout page for the GetFit project.

Arguments: $ARGUMENTS (e.g. "day3" or "day5 replace nordic curl with leg curl")

## Steps

1. Parse $ARGUMENTS to identify the target day (1-7) and any modification request
2. Read the target day file at `workouts/day{N}-*.html`
3. If generating a new exercise card:
   - Follow the `exercise-card` HTML pattern in CLAUDE.md exactly
   - Use `../assets/exercise-placeholder.svg` as the image src
   - Add a link to the ExRx.net page for the exercise
   - Match sets/reps/rest to the plan in CLAUDE.md
   - Write a form cue that emphasizes the 3-second eccentric and mind-muscle connection
4. If modifying an existing card:
   - Find the `<article data-exercise="[slug]">` element
   - Update only what was requested; preserve all other attributes
5. Verify the `data-sets` and `data-reps` on the `.set-log` div match the exercise header
6. Verify the nutrition macros in the `<details class="nutrition-section">` still sum correctly
7. After editing, confirm no unclosed tags and no inline styles were added

## Reference
- Exercise rep scheme: see the workout split table in README.md
- Nutrition targets: see `nutrition/calorie-targets.html`
- Full HTML conventions: see CLAUDE.md
