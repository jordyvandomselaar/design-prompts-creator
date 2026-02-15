#!/usr/bin/env python3
"""Validate prompt artifact structure in prompts/<style>/."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


def slugify_style_name(style_name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", style_name.lower()).strip("-")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Validate that prompts follow prompts/<style>/prompt.md + screenshot.jpg."
        ),
    )
    parser.add_argument(
        "--repo-root",
        default=".",
        help="Repository root where prompts/ lives. Defaults to current directory.",
    )
    parser.add_argument(
        "--style-name",
        help="Optional style to validate. Accepts natural name or kebab-case slug.",
    )
    return parser.parse_args()


def resolve_style_dirs(prompts_root: Path, style_name: str | None) -> list[Path]:
    if style_name:
        slug = slugify_style_name(style_name)
        return [prompts_root / slug]

    if not prompts_root.exists():
        return []

    return sorted([path for path in prompts_root.iterdir() if path.is_dir()])


def main() -> int:
    args = parse_args()
    repo_root = Path(args.repo_root).expanduser().resolve()
    prompts_root = repo_root / "prompts"
    style_dirs = resolve_style_dirs(prompts_root, args.style_name)

    if not style_dirs:
        raise SystemExit(
            "No prompt style folders found. Expected prompts/<design-style-name>/."
        )

    failures: list[str] = []

    for style_dir in style_dirs:
        prompt_path = style_dir / "prompt.md"
        screenshot_path = style_dir / "screenshot.jpg"

        if not style_dir.exists():
            failures.append(f"Missing style directory: {style_dir}")
            continue

        if not prompt_path.exists():
            failures.append(f"Missing prompt file: {prompt_path}")
            continue

        if not screenshot_path.exists():
            failures.append(f"Missing screenshot file: {screenshot_path}")
            continue

        if screenshot_path.stat().st_mtime < prompt_path.stat().st_mtime:
            failures.append(
                "Screenshot is older than prompt (regenerate screenshot): "
                f"{screenshot_path}"
            )

    if failures:
        for failure in failures:
            print(f"[FAIL] {failure}")
        raise SystemExit(1)

    for style_dir in style_dirs:
        print(f"[OK] {style_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
