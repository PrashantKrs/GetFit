---
name: nutrition-calc
description: Calculate or adjust nutrition targets for the lean bulk program
triggers:
  - user asks about calories, macros, or nutrition targets
  - user wants to adjust their calorie intake
  - user asks what to eat today or for a meal suggestion
  - user reports a significant weight change (recalculate)
  - user asks about meal timing around workouts
---

# Nutrition Calculator Skill

## Current Targets (source of truth: nutrition/calorie-targets.html)
- **Start:** 134 lb → **Target:** 150+ lb → **Timeline:** 6 months
- **TDEE:** ~2,686 kcal (Mifflin-St Jéor, age 27, 5‘8", 6x/week activity)
- **Workout days (Mon–Fri):** 2,986 kcal | 154g P / 326g C / 119g F
- **Rest days (Sat–Sun):** 2,786 kcal | 154g P / 271g C / 121g F
- **Protein:** always 1.15g × current weight in lbs

## When to Adjust Targets
- Not gaining 0.5–1 lb/week after 2 weeks → **+200 kcal/day**
- Gaining >1.5 lb/week (too much fat) → **−150 kcal/day**
- Weight reaches 145 lb → **Recalculate TDEE** with new weight_kg (+~75 kcal to targets)
- Weight reaches 150 lb → **Full recalculation** using the formula below

## TDEE Formula (Mifflin-St Jéor)
```
BMR = 10 × weight_kg + 6.25 × height_cm − 5 × age + 5
TDEE = BMR × 1.725  (very active, training 6x/week)
Lean bulk = TDEE + 300
Rest day = TDEE + 100
```

## Meal Timing Rules
- **Pre-workout (9 am):** Whey + fast carbs — eaten 30-60 min before session
- **Post-workout (10:15 am):** Whey + white rice + fruit — within 30 min of finishing
  (White rice: higher GI than brown → faster glucose delivery → better nutrient uptake)
- **All other meals:** Complex carbs (brown rice, oats, sweet potato)
- **Protein:** Spread across all 6 meals, never skip post-workout shake

## Steps for Nutrition Questions
1. Reference current targets from `nutrition/calorie-targets.html`
2. If user’s weight has changed: recalculate TDEE with new weight_kg
3. Keep protein at 1.15g × current_lb regardless of other adjustments
4. Provide specific meal suggestions matching updated targets
