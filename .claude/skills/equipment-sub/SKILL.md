---
name: equipment-sub
description: Suggest exercise substitutions when gym equipment is unavailable or occupied
triggers:
  - user says equipment is unavailable, broken, occupied, or they don't have access to it
  - user asks for an alternative to an exercise
  - user is working out at a different gym or at home
  - user says "the cable machine is down" or similar
---

# Equipment Substitution Skill

## Steps

1. Identify the unavailable equipment and which exercise(s) it affects
2. Find today’s workout day (ask if unclear, or check the schedule logic in tracker.js)
3. Look at the exercise card’s `<details class="substitutes">` for pre-written alternatives
4. Recommend the best match from the substitutes list first
5. If none of the pre-written substitutes fit, generate a new one:
   - Same primary muscle target
   - Hypertrophy-appropriate rep range (6-12 compound, 12-20 isolation)
   - Note the weight adjustment (e.g., “reduce ~15% vs barbell weight”)
   - Note if sets/reps should change
6. If the user is at home with no equipment: suggest bodyweight with tempo modification
   (slow 4-second eccentric + 2-second pause at stretch position)

## Substitution Priority Ladder
1. Same cable/machine, different attachment (e.g., rope → bar on same cable station)
2. Dumbbell version of the movement
3. Machine version
4. Barbell version (if dumbbell was original)
5. Resistance band version
6. Bodyweight with tempo/pause manipulation

## Quick Reference Table
| Original | Sub 1 | Sub 2 |
|---|---|---|
| Barbell Bench Press | DB Bench Press | Machine Chest Press |
| Incline DB Press | Smith Machine Incline | Low-to-High Cable Fly |
| Cable Lateral Raise | DB Lateral Raise | Machine Lateral Raise |
| Rope Pushdown | Bar Pushdown | Overhead DB Extension |
| Face Pull | Band Face Pull | DB Reverse Fly |
| Pull-up / Lat Pulldown | Band Pull-down | Assisted Pull-up |
| Barbell Row | Single-Arm DB Row | Machine Row |
| Seated Cable Row | DB Row | Band Row |
| Barbell Squat | Goblet Squat | Hack Squat |
| Leg Press | Hack Squat | Bulgarian Split Squat |
| Romanian Deadlift | DB RDL | Single-Leg RDL |
| Leg Curl | Nordic Hamstring Curl | Stability Ball Curl |
| Hip Thrust | Glute Bridge (floor) | Machine Hip Thrust |
| Conventional Deadlift | Trap Bar Deadlift | Sumo Deadlift |
| Seated Calf Raise | Leg Press Calf Raise | Smith Machine Calf Raise |
| Reverse Wrist Curl | Reverse Cable Curl | DB Reverse Curl |
