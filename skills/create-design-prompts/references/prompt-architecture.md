# Prompt Architecture

Use one architecture per output. Do not mix structures.

## Artifact Packaging (Mandatory)

Write the final prompt to:

- `prompts/<design-style-name>/prompt.md`

After writing or updating `prompt.md`, regenerate:

- `prompts/<design-style-name>/screenshot.jpg`

## Architecture A: Design-System Format

Use when the user needs high determinism and implementation-ready detail.

### Required section order

1. `<design-system>` wrapper
2. `# Design Style: <Style Name>`
3. `## Design Philosophy`
4. `## Design Token System`
5. `## Component Styling Principles`
6. `## Layout Principles`
7. `## The "Bold Factor"`
8. `## Anti-Patterns`
9. `## Animation & Motion`
10. `## Accessibility Considerations`
11. `## Implementation Checklist`
12. `</design-system>`

### Minimum content per section

#### Design Philosophy

- Name the visual posture in one sentence.
- State what the design optimizes for.
- State key differentiators from adjacent styles.

#### Design Token System

- Define color palette with explicit hex values.
- Define typography families, weights, scale, line-height, letter spacing.
- Define radii, borders, elevation/shadow policy.
- Define state opacity model and focus behavior.

#### Component Styling Principles

- Specify buttons, cards, inputs, nav, and feature modules.
- Specify state behavior for hover/focus/active/disabled.
- Specify icon and imagery treatment.

#### Layout Principles

- Specify container widths, grid logic, spacing rhythm.
- Specify section order and alternation rules.
- Specify responsive collapse behavior.

#### The "Bold Factor"

- Add 5-8 style signatures that prevent generic output.
- Include at least one high-impact hero mechanic.
- Include at least one interaction signature.

#### Anti-Patterns

- Add explicit "do not" constraints.
- Add common failure modes to avoid.

#### Animation & Motion

- Define easing tokens.
- Define standard durations by interaction category.
- Define allowed transforms and forbidden animation behaviors.

#### Accessibility Considerations

- Define contrast, focus visibility, touch target minimums.
- Define reduced motion behavior.
- Define semantic/accessibility requirements for decorative elements.

#### Implementation Checklist

- Include a verifiable checkbox list.
- Cover tokens, layout, components, states, motion, and accessibility.

## Architecture B: Summary/Spec Format

Use when the user wants faster ideation with enough detail to build.

### Required section order

1. `# Summary`
2. `# Style`
3. `## Spec`
4. `# Layout & Structure`
5. `# Special Components`

### Minimum content per section

#### Summary

- Describe the system in 1-3 sentences.
- Include the emotional tone and technical posture.

#### Style

- Define typographic voice.
- Define palette strategy.
- Define interaction personality.

#### Spec

- Provide hard tokens (colors, sizes, fonts, timing).
- Provide implementation constraints and behavioral rules.

#### Layout & Structure

- Describe page flow from top to bottom.
- Define each major section as a construction instruction.

#### Special Components

- Define 1-3 signature mechanics with explicit implementation behavior.

## Selection Heuristics

Choose Architecture A when:

- The user asks for "super detailed", "production-grade", or "design system".
- The style must be reused repeatedly across multiple prompts.
- The model output must be highly stable.

Choose Architecture B when:

- The user asks for a concise but strong creative spec.
- The prompt is exploratory and likely to be iterated quickly.
- The artifact is one-off and speed matters more than completeness.

## Authoring Rules (Both Architectures)

- Keep every section actionable.
- Prefer tokens and measurable constraints over adjectives.
- Avoid duplicated guidance across sections.
- Use anti-patterns to guard style drift.
- Keep language directive, not advisory.
