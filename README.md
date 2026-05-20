# GetFit — Muscle Gain Workout System

Self-contained HTML workout artifacts for a 6-month lean bulk program.
**Goal:** 134 lb → 150+ lb, building visible muscle mass and size.

## How to Use

1. Open `workouts/index.html` in any browser
2. The app detects which day of your plan today is
3. Click the highlighted day card to open that workout
4. Log weights per set, check off completed sets
5. If you miss a session: press **Skip Today** — the schedule auto-adjusts

## Schedule (Mon–Fri only)

| Day | File | Focus |
|-----|------|-------|
| Monday | `day1-push.html` | Chest · Shoulders · Triceps |
| Tuesday | `day2-pull.html` | Back · Biceps · Forearms |
| Wednesday | `day3-legs.html` | Quads · Hamstrings · Calves |
| Thursday | `day4-upper.html` | Shoulders · Arms (2nd hit) |
| Friday | `day5-lower.html` | Deadlift · Glutes · Calves · Core |
| Sat–Sun | — | Full rest |

## Nutrition Targets

| Day | Calories | Protein | Carbs | Fat |
|-----|----------|---------|-------|-----|
| Mon–Fri (workout) | 2,986 kcal | 154g | 326g | 119g |
| Sat–Sun (rest) | 2,786 kcal | 154g | 271g | 121g |

## Equipment Substitutions

Every exercise card has a collapsible **"Equipment not available?"** section
with 2-3 alternatives. You can also tell Claude in chat:
> *"The cable machine is broken today"*

Claude will suggest the best substitute for your specific situation.

## Skip Day / Schedule

- App tracks your start date and any skipped days in browser localStorage
- Pressing **Skip Today** shifts future sessions forward by one day
- **Reset Schedule** on the index page restarts from today
- You can also tell Claude: *"I skipped Monday"* and it will inject the skip

## Modifying Workouts

Every HTML file is self-contained — open in any text editor.
See `CLAUDE.md` for the full HTML conventions and `data-*` attribute spec.
