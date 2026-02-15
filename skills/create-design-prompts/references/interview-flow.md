# Interview Flow

Run this flow when user requirements are incomplete.

## Interview Goal

Collect enough information to write a strong prompt without over-questioning the user.

## Default Rule

Ask 3-5 high-leverage questions max, then proceed with explicit assumptions.

## Priority Question Set

1. Intent and artifact
- "What are we designing (landing page, dashboard, ecommerce, app shell, or component system)?"

2. Visual direction
- "Which style direction should this lean toward (for example Swiss flat, Material You, editorial brutalist, premium minimal)?"

3. Audience and tone
- "Who is the target audience, and should the feel be playful, serious, premium, or utilitarian?"

4. Required sections/components
- "Which sections are mandatory (hero, features, pricing, testimonials, FAQ, footer, etc.)?"

5. Technical/output constraints
- "Should the prompt optimize for a specific stack or generator behavior (Tailwind, React, HTML/CSS, accessibility strictness)?"

## Fast Clarification Add-ons

Ask these only when needed:

- "Should this emulate your existing screenshots closely or reinterpret them?"
- "Do you want a strict design-system prompt or a concise style spec?"
- "Are there any hard no-go choices (font families, color families, heavy effects)?"

## Assumption Policy

When the user does not answer everything:

- Assume web-first responsive layout.
- Assume WCAG AA contrast target.
- Assume modern browser capabilities.
- Assume explicit interaction states are required.
- Declare assumptions in one compact note.

## Compression Rules

- Merge overlapping questions.
- Prefer either/or options to open-ended prompts.
- Stop questioning once enough information exists to produce a useful first draft.
