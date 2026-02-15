# Style Taxonomy

Use this mapping to convert subjective style language into concrete prompt constraints.

## Family Profiles

### Material You / Organic System

- Palette: tonal surfaces, non-pure-white background, expressive accent roles.
- Shape: generous radii, pills for interactive controls.
- Depth: soft elevation + blurred atmospheric shapes.
- Motion: smooth decelerate easing, tactile active states.
- Signature: layered tonal hierarchy and micro-interactions.

### Swiss Flat / Bold Reduction

- Palette: high-contrast neutrals + controlled vivid accents.
- Shape: geometric primitives, moderate consistent radii.
- Depth: flat plane only, no shadows, no faux depth.
- Motion: fast snappy transitions through scale/color.
- Signature: typography-led hierarchy and poster-like color blocking.

### Editorial High-Contrast

- Palette: monochrome or near-monochrome with selective accents.
- Shape: crisp edges, framing lines, minimal ornament.
- Depth: mostly flat, depth implied through layering and typography.
- Motion: restrained, elegant reveals, subtle transformations.
- Signature: oversized headline mechanics and strict spacing control.

### Poster Brutalist Commerce

- Palette: warm neutrals with aggressive accent injections.
- Shape: mostly hard edges with occasional oversized geometric anchors.
- Depth: atmospheric background blobs while components stay direct.
- Motion: assertive but smooth, emphasis on entrance and hover punch.
- Signature: typographic drama and stark block-level contrasts.

### Premium Minimal

- Palette: narrow neutral range with one accent family.
- Shape: refined radii, sparse decoration.
- Depth: subtle, controlled, low-noise surfaces.
- Motion: calm and sparse.
- Signature: whitespace-led luxury and restrained emphasis.

## Descriptor-to-Token Translator

| Descriptor | Token Direction |
| --- | --- |
| bold | Increase headline scale contrast, stronger accent saturation, higher weight typography |
| calm | Reduce hue count, increase whitespace, longer easing, softer contrast transitions |
| playful | Rounder geometry, brighter accents, higher motion amplitude, friendlier copy tone |
| premium | Narrow palette, disciplined spacing, refined type pairings, subtle motion |
| technical | Tight grid, explicit utility hierarchy, lower decorative noise, stronger borders |
| editorial | Large typography, asymmetry, high contrast, narrative sectioning |
| futuristic | High contrast, geometric motif repetition, sharper motion, stronger gradient usage |
| brutalist | Heavy type, hard edges, severe hierarchy jumps, reduced polish artifacts |

## Escalation Rules

When style words conflict:

1. Preserve the first explicit style family requested by the user.
2. Treat later conflicting descriptors as accents, not replacements.
3. Document one dominant direction and up to two secondary influences.

## Style Signature Requirements

For every prompt, define at least 3 style signatures:

- One macro signature (hero/layout-level mechanic).
- One component signature (buttons/cards/forms/nav treatment).
- One interaction signature (hover/transition/state behavior).

Reject output if all three signatures are not explicit.
