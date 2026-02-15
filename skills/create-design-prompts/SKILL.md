---
name: create-design-prompts
description: Create production-grade UI design prompts from user conversations, screenshots of existing interfaces, or both. Use for reverse-engineering visual styles, turning design goals into concrete token-level prompt specs, emulating existing aesthetics, drafting prompt.md files, and maintaining screenshot artifacts at prompts/<design-style-name>/screenshot.jpg after every prompt update.
---

# Create Design Prompts

Create design prompts that are specific enough to produce consistent UI outcomes, while preserving room for creative direction.

Use progressive disclosure to stay efficient:

- Always read `references/prompt-architecture.md`.
- Always read `references/quality-gate.md` before finalizing output.
- Read `references/interview-flow.md` when requirements are underspecified.
- Read `references/screenshot-analysis-rubric.md` whenever screenshots are provided.
- Read `references/style-taxonomy.md` when naming or translating style traits into concrete tokens.

## Artifact Folder Contract (Mandatory)

Store every prompt in this exact layout:

- `prompts/<design-style-name>/prompt.md`
- `prompts/<design-style-name>/screenshot.jpg`

Rules:

- Normalize `<design-style-name>` to lowercase kebab-case.
- After every create or update to `prompt.md`, regenerate `screenshot.jpg` in the same folder.
- Do not place design prompt artifacts outside `prompts/`.

## Core Behavior

- Translate abstract taste into explicit implementation constraints.
- Prefer concrete numbers and tokens over vague adjectives.
- Use screenshots as evidence, not as decoration.
- Preserve intentional ambiguity only where exploration is desirable.
- Include anti-patterns to prevent generic outputs.

## Operating Modes

Select one mode immediately and follow it strictly.

1. `chat-only`
- Run a short discovery interview.
- Derive style constraints from user intent.
- Produce a full prompt with explicit defaults.

2. `screenshot-only`
- Reverse-engineer style from visuals.
- Infer likely interaction model and component logic.
- Mark non-observable behavior as assumptions.

3. `hybrid`
- Use user goals as primary intent.
- Use screenshots as style calibration.
- Resolve conflicts explicitly and choose one direction.

## End-to-End Workflow

1. Frame the target
- Identify artifact type: landing page, dashboard, ecommerce, design system, marketing site, app shell, or component set.
- Identify audience and brand posture: playful, corporate, editorial, brutalist, premium, utilitarian.
- Identify output objective: inspiration, direct implementation guide, reusable prompt library entry.

2. Gather minimum viable inputs
- Capture product/domain context.
- Capture must-have sections/components.
- Capture visual references and non-negotiables.
- Capture technical assumptions when available (Tailwind, CSS variables, React, static HTML).

If inputs are missing, ask only high-leverage questions from `references/interview-flow.md`, then proceed with explicit assumptions.

3. Extract visual evidence (when screenshots exist)
- Inspect every screenshot before writing.
- Build an evidence log across: composition, typography, color, shape language, density, interaction affordances, icon treatment, imagery style, and motion cues.
- Distinguish observed facts from inferred behavior.
- Record confidence for each major inference.

Follow the rubric in `references/screenshot-analysis-rubric.md`.

4. Synthesize a style identity
- Name the style in 3-8 words.
- Produce a one-paragraph design philosophy.
- Define design tokens with concrete values.
- Define layout logic and section rhythm.
- Define component rules and state behaviors.
- Define motion profile (durations, easing, transform patterns).

Use `references/style-taxonomy.md` to translate subjective descriptors into implementation-ready rules.

5. Choose prompt architecture
- Choose `design-system format` when precision and repeatability are required.
- Choose `summary/spec format` when faster ideation is preferred.
- Choose one format and keep it internally consistent.

Use section blueprints in `references/prompt-architecture.md`.

6. Author the prompt
- Write sections in the selected architecture.
- Include hard constraints: colors, typography, spacing, radii, borders, interactions, and animation.
- Include layout sections in rendering order from top to bottom.
- Include at least one signature mechanic that makes the style non-generic.
- Include explicit anti-patterns.
- Include accessibility guardrails.

7. Generate screenshot artifact (mandatory after every prompt edit)
- Render the prompt result page to HTML (or update existing preview HTML).
- Capture a full-page screenshot using the repo script:
  `bun run screenshot:html -- <preview.html> prompts/<design-style-name>/screenshot.jpg`
- Ensure the screenshot reflects the latest prompt revision.

8. Run quality gate
- Validate against `references/quality-gate.md`.
- Ensure every major claim is backed by user input or screenshot evidence.
- Ensure enough detail exists for another model to generate the intended UI with low ambiguity.
- Ensure the artifact folder contract is satisfied.
- Run `scripts/validate_prompt_artifacts.py` for the updated style folder.

9. Deliver output
- Return the final prompt in markdown.
- Separate assumptions from requirements.
- Offer 1-3 optional refinement directions only when useful.

## Prompt Authoring Standards

Apply these standards to every prompt.

- Use dense, actionable language.
- Specify token values directly (`#HEX`, `px`, `rem`, durations, easing curves).
- Specify interaction states (hover, focus, active, disabled).
- Specify responsive behavior and section collapse behavior.
- Specify "what to avoid" to prevent drift into generic UI.
- Keep voice confident and directive.
- Avoid contradictory instructions inside one prompt.

## Screenshot Reverse-Engineering Rules

- Infer from recurring motifs, not single accidental details.
- Treat typography as a system (family, weight, case, spacing, scale), not isolated font choices.
- Treat color as hierarchy (base, foreground, accents, surfaces, borders, states).
- Treat shape language as architecture (radii, card silhouette, icon containers, button geometry).
- Treat spacing as rhythm (section cadence, grid density, whitespace strategy).
- Infer motion from visual affordances and UI genre.
- Mark low-confidence behavior as assumptions.

## Conflict Resolution Rules

When user instructions conflict with screenshot evidence:

1. Prioritize explicit user intent over inferred visual details.
2. Preserve screenshot style markers unless user asks to deviate.
3. Explain the chosen tradeoff in one short note.

When multiple screenshots conflict with each other:

1. Identify stable cross-shot traits.
2. Choose one primary direction.
3. Use secondary traits as optional accents.

## Reusable Scripts

Use `scripts/scaffold_prompt.py` to create the canonical prompt folder and scaffold `prompt.md`.

Examples:

```bash
python3 scripts/scaffold_prompt.py \
  --format design-system \
  --style-name "High-Contrast Swiss Flat" \
  --repo-root /path/to/repo
```

```bash
python3 scripts/scaffold_prompt.py \
  --format summary-spec \
  --style-name "Editorial Brutalist Commerce" \
  --repo-root /path/to/repo
```

This script writes `prompts/<design-style-name>/prompt.md` and prints the expected screenshot path.
Generate the scaffold, then replace placeholders with evidence-backed values and create `screenshot.jpg`.

Use `scripts/validate_prompt_artifacts.py` to enforce the artifact contract.

```bash
python3 scripts/validate_prompt_artifacts.py \
  --repo-root /path/to/repo \
  --style-name "High-Contrast Swiss Flat"
```

Run this validator after updating a prompt and regenerating `screenshot.jpg`.

## Output Contract

Return prompts that include all of the following:

- Clear style identity and philosophy.
- Concrete design tokens.
- Component-level behavior rules.
- Layout/section build order.
- Motion and interaction model.
- Accessibility constraints.
- Anti-pattern list.
- Implementation checklist.
- Artifact folder output at `prompts/<design-style-name>/`.
- Updated screenshot at `prompts/<design-style-name>/screenshot.jpg`.

If the user supplies screenshots, ensure the output visibly preserves key traits from those references.
