#!/usr/bin/env python3
"""Scaffold design prompt markdown files for this skill."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


def slugify_style_name(style_name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", style_name.lower()).strip("-")
    return slug


def build_design_system_template(style_name: str, assumptions: bool) -> str:
    body = f"""<design-system>

# Design Style: {style_name}

## Design Philosophy

- Define the style posture in 2-4 sentences.
- State what this style optimizes for.
- State key differentiators from adjacent styles.

## Design Token System

### Colors

- **Background**: `#TODO`
- **Foreground**: `#TODO`
- **Primary**: `#TODO`
- **Secondary**: `#TODO`
- **Accent**: `#TODO`
- **Surface**: `#TODO`
- **Border**: `#TODO`

### Typography

- **Headings**: `TODO family + weights`
- **Body**: `TODO family + weights`
- **Scale**: `TODO headline/body sizing rules`
- **Tracking/Leading**: `TODO`

### Shape, Borders, and Depth

- **Radius scale**: `TODO`
- **Border strategy**: `TODO`
- **Shadow/blur strategy**: `TODO`

## Component Styling Principles

### Buttons

- Variants, states, and transitions.

### Cards/Containers

- Base treatment, hover treatment, and content density.

### Inputs

- Rest, focus, active, error, and disabled states.

### Navigation and Footer

- Header behavior and footer treatment.

## Layout Principles

- Section order from top to bottom.
- Container widths and grid rules.
- Responsive behavior at key breakpoints.

## The \"Bold Factor\"

1. Signature mechanic #1
2. Signature mechanic #2
3. Signature mechanic #3

## Anti-Patterns

- Do not #1
- Do not #2
- Do not #3

## Animation & Motion

- **Durations**: `TODO`
- **Easing**: `TODO`
- **Allowed transforms**: `TODO`
- **Disallowed motion**: `TODO`

## Accessibility Considerations

- Contrast targets.
- Focus visibility.
- Touch target minimums.
- Reduced-motion behavior.

## Implementation Checklist

- [ ] Tokens are explicit and complete
- [ ] Component states are specified
- [ ] Layout and responsive behavior are deterministic
- [ ] Anti-patterns prevent style drift
- [ ] Accessibility constraints are explicit

</design-system>
"""

    if assumptions:
        body += "\n\n## Assumptions\n\n- Add explicit assumptions here.\n"

    return body


def build_summary_spec_template(style_name: str, assumptions: bool) -> str:
    body = f"""# Summary

A concise description of {style_name} and intended output behavior.

# Style

Describe typography, palette, visual attitude, and interaction personality.

## Spec

- **Palette**: `TODO`
- **Typography**: `TODO`
- **Shape language**: `TODO`
- **Interaction model**: `TODO`
- **Motion**: `TODO`

# Layout & Structure

## Navigation

- TODO

## Hero Section

- TODO

## Content Sections

- TODO

## Footer

- TODO

# Special Components

## Signature Component 1

- TODO

## Signature Component 2

- TODO

## Signature Component 3

- TODO
"""

    if assumptions:
        body += "\n\n## Assumptions\n\n- Add explicit assumptions here.\n"

    return body


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Scaffold a design prompt at prompts/<style-slug>/prompt.md.",
    )
    parser.add_argument(
        "--format",
        dest="prompt_format",
        choices=["design-system", "summary-spec"],
        required=True,
        help="Prompt architecture format.",
    )
    parser.add_argument(
        "--style-name",
        required=True,
        help="Human-readable style name for the template title.",
    )
    parser.add_argument(
        "--repo-root",
        default=".",
        help="Repository root where prompts/ lives. Defaults to current directory.",
    )
    parser.add_argument(
        "--include-assumptions",
        action="store_true",
        help="Append an assumptions section to the scaffold.",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite prompt.md if it already exists.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    style_slug = slugify_style_name(args.style_name)
    if not style_slug:
        raise ValueError("Could not derive a valid style slug from --style-name")

    repo_root = Path(args.repo_root).expanduser().resolve()
    prompt_dir = repo_root / "prompts" / style_slug
    prompt_path = prompt_dir / "prompt.md"
    screenshot_path = prompt_dir / "screenshot.jpg"
    prompt_dir.mkdir(parents=True, exist_ok=True)

    if prompt_path.exists() and not args.overwrite:
        raise FileExistsError(
            f"Prompt already exists: {prompt_path}. Use --overwrite to replace it."
        )

    if args.prompt_format == "design-system":
        content = build_design_system_template(args.style_name, args.include_assumptions)
    else:
        content = build_summary_spec_template(args.style_name, args.include_assumptions)

    prompt_path.write_text(content, encoding="utf-8")
    print(f"Wrote scaffold: {prompt_path}")
    print(f"Expected screenshot path: {screenshot_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
