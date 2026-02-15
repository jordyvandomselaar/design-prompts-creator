# Screenshot Analysis Rubric

Use this rubric whenever the user provides UI screenshots.

## Pass 1: Global Read (30-60 seconds per shot)

- Identify product type and primary task flow.
- Identify visual era/style family.
- Identify density level (airy, balanced, dense).
- Identify first-impression traits (calm, loud, premium, utilitarian, playful).

## Pass 2: Structured Evidence Extraction

Capture observable facts by category.

| Category | What to Inspect | What to Record in Prompt |
| --- | --- | --- |
| Composition | Section cadence, hero dominance, rhythm | Section order, whitespace policy, hierarchy rules |
| Grid | Column count, gutters, alignment discipline | Grid template, gap sizes, breakpoint behavior |
| Typography | Family feel, case, weight contrast, scale leaps | Font stack, weight map, tracking, leading, type scale |
| Color | Base/foreground/accent balance, surfaces, contrast | Token palette with explicit hex values and role mapping |
| Shape language | Corner radii, pill usage, geometric motifs | Radius scale, component silhouettes, icon container rules |
| Depth model | Flat vs elevated, blur/gradient/shadow use | Shadow policy, blur policy, gradient constraints |
| Components | Buttons, cards, nav, forms, chips, lists | Component recipes and state behavior rules |
| Imagery | Photo style, crop/aspect, treatment | Image rules, overlay style, hover effects |
| Iconography | Stroke weight, containment, tone | Icon library style and sizing rules |
| Interaction cues | Hover affordances implied visually | Motion durations, easing, transform patterns |
| Branding signals | Logo treatment, tone words, taglines | Prompt voice and brand posture constraints |

## Pass 3: Inference Layer

Infer cautiously and label assumptions.

- Infer interaction style from affordances and genre.
- Infer responsive behavior from composition logic.
- Infer content strategy from hierarchy and section sequencing.

Mark confidence for each major inference:

- `high`: clearly visible pattern repeated in multiple areas.
- `medium`: strongly implied by one shot.
- `low`: plausible but not directly observable.

## Evidence Log Template

Use this structure before drafting the final prompt.

```markdown
## Evidence Log

### Observed
- Typography: ...
- Color hierarchy: ...
- Shape language: ...
- Layout rhythm: ...
- Component patterns: ...

### Inferred (with confidence)
- Hover behavior (medium): ...
- Motion model (low): ...
- Responsive collapse (medium): ...

### Style Signatures to Preserve
- ...
- ...
- ...
```

## Translation Rules

Translate visual evidence into explicit instructions.

- Convert approximate colors into nearest concrete hex values.
- Convert perceived spacing into a reusable spacing rhythm.
- Convert repeating motifs into style signatures.
- Convert observed hierarchy into section-level instructions.
- Convert implied interactions into explicit state rules.

## Common Misreads to Avoid

- Avoid treating a single accent color as the full palette strategy.
- Avoid overfitting to placeholder content text.
- Avoid inventing complex interactions not supported by evidence.
- Avoid copying one screenshot artifact that contradicts the rest.
