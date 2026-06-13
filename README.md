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

## Workout Split Overview

| Day | Focus | Muscle Groups | Anchor Compound |
|-----|-------|---------------|-----------------|
| Day 1 — Push | Chest, Anterior/Medial Delt, Triceps | Chest · Shoulders · Triceps | Barbell Bench Press |
| Day 2 — Pull | Back, Biceps, Forearms | Lats · Mid-Back · Biceps · Forearms | Pull-up / Lat Pulldown |
| Day 3 — Legs | Quads, Hamstrings, Calves | Quads · Hamstrings · Glutes · Calves | Barbell Back Squat |
| Day 4 — Upper | Shoulders, Arms (2nd hit) | All Delt Heads · Biceps · Triceps · Forearms | Seated DB Overhead Press |
| Day 5 — Lower B | Hamstrings, Glutes, Calves, Core | Posterior Chain · Calves · Core | Conventional Deadlift |

Every major muscle group is trained 2× per week. Forearms and calves get dedicated work on both their training days (14 sets/week each).

## Equipment Needed

| Day | Barbells | Dumbbells | Cables | Machines / Benches |
|-----|----------|-----------|--------|--------------------|
| Day 1 — Push | Barbell bench press | Incline DB press | Cable lateral raise, rope tricep pushdown, face pull | Flat bench, incline bench, cable tower |
| Day 2 — Pull | Barbell bent-over row | Hammer curl | Seated cable row | Lat pulldown / pull-up bar, cable tower |
| Day 3 — Legs | Barbell back squat | — | — | Leg press machine, leg curl machine, standing/seated calf raise machines |
| Day 4 — Upper | EZ-bar overhead tricep extension, reverse barbell curl | Seated DB overhead press, Arnold press, incline DB curl | — | Adjustable bench, incline bench |
| Day 5 — Lower B | Conventional deadlift, barbell hip thrust | — | — | Lying leg curl machine, seated calf raise machine |

All sessions require a **full commercial gym**. Every exercise card includes a collapsible "Equipment not available?" section with 2-3 alternatives.

## Nutrition Targets

| Day | Calories | Protein | Carbs | Fat |
|-----|----------|---------|-------|-----|
| Mon–Fri (workout) | 2,986 kcal | 154g | 326g | 119g |
| Sat–Sun (rest) | 2,786 kcal | 154g | 271g | 121g |

Protein (154g = 1.15g/lb) stays constant every day. Carbs drop on rest days because the training stimulus is absent; fat stays roughly the same. Source of truth: `nutrition/calorie-targets.html`.

## Hypertrophy Principles

- **Time under tension:** 3-second eccentric on every lift — slow lowering maximizes muscle fiber micro-damage and growth. Compounds: 3s down, 1s up. Isolation: 3s down, 1-2s squeeze at peak.
- **Progressive overload:** When you hit the top of the rep range for all sets, add 5 lb next session. Track every set weight using the in-page set log.
- **Rep range strategy:** 6-8 reps for compound anchors (mechanical tension), 8-12 for secondary compounds (tension + metabolic stress), 12-20 for isolation/pump finishers (cellular swelling). All three mechanisms drive hypertrophy.
- **Shoulder health via face pulls:** Face pulls appear 3×/week (Days 1, 2, 4) to counter anterior shoulder dominance from heavy pressing volume. Never skip them.

Full philosophy: `docs/HYPERTROPHY.md`

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
