# Quality Gate

Run this checklist before returning a design prompt.

## Gate 1: Structure Integrity

- Chosen architecture is internally consistent.
- All required sections for that architecture are present.
- No contradictory directives between sections.

Fail if any item is missing.

## Gate 2: Token Specificity

- Color system includes explicit role-based hex tokens.
- Typography includes families, weights, and scale behavior.
- Spacing/radius/border rules are concrete.
- Motion includes duration and easing values.

Fail if the prompt contains only qualitative style language.

## Gate 3: Component Completeness

- Buttons include variant and state behavior.
- Cards/containers include structure and interaction rules.
- Inputs/forms include rest/focus/validation states.
- Navigation/header/footer behavior is defined when relevant.

Fail if component guidance is incomplete for the target artifact.

## Gate 4: Layout Determinism

- Section order is explicit.
- Grid/container logic is explicit.
- Responsive collapse behavior is explicit.

Fail if another model would need to guess layout structure.

## Gate 5: Non-Genericness

- Prompt includes 3+ style signatures.
- Prompt includes anti-patterns and common mistakes.
- Prompt includes at least one high-impact differentiator.

Fail if the prompt could describe any generic SaaS template.

## Gate 6: Accessibility Coverage

- Contrast targets are specified.
- Focus behavior is specified.
- Touch target and keyboard considerations are specified.
- Reduced motion behavior is specified.

Fail if accessibility is absent or tokenless.

## Gate 7: Evidence Alignment (for screenshot-driven work)

- Key visual traits from screenshots are preserved.
- Inferences are clearly separated from observations.
- Low-confidence assumptions are disclosed.

Fail if screenshot analysis is not reflected in output.

## Gate 8: Artifact Contract

- Prompt file is located at `prompts/<design-style-name>/prompt.md`.
- Screenshot file is located at `prompts/<design-style-name>/screenshot.jpg`.
- `screenshot.jpg` is regenerated after every update to `prompt.md`.
- `scripts/validate_prompt_artifacts.py` passes for the updated style folder.

Fail if the folder structure or screenshot freshness requirement is not met.

## Final Acceptance Rule

Approve only when every gate passes.

If one gate fails, revise the prompt before delivery.
