<design-system>

# Design Style: SwiftUI macOS Native Messaging

## Design Philosophy

Design for **native macOS familiarity first**: quiet, precise, and materially layered rather than visually loud. The interface should feel like a first-party SwiftUI app rendered with AppKit-level polish, where hierarchy comes from vibrancy, subtle separators, and typography cadence, not decorative depth.

This style is inspired by iMessage on macOS: a translucent left sidebar, restrained neutral palette, compact toolbars, pill search, and calm message surfaces. The result should feel effortless and "already installed" on macOS, while still being implementable in Electron.

Core intent:

- Prioritize macOS-native affordances over web trends.
- Use semantic neutrals and system blue accents sparingly.
- Keep interactions short, quiet, and predictable.
- Preserve strong information density without feeling cramped.

## Design Token System

### Colors (Light Mode)

Use a macOS-like neutral ramp with low chroma.

- **Window Backdrop**: `#ECECEE`
- **Primary Surface**: `#F5F5F7`
- **Sidebar Material Tint**: `rgba(248, 248, 250, 0.72)`
- **Sidebar Border / Split Divider**: `rgba(210, 210, 215, 0.95)`
- **Hairline Separator**: `rgba(60, 60, 67, 0.18)`
- **Primary Text**: `#1D1D1F`
- **Secondary Text**: `#6E6E73`
- **Tertiary Text**: `#8E8E93`
- **Search Field Fill**: `rgba(120, 120, 128, 0.12)`
- **Search Placeholder**: `rgba(60, 60, 67, 0.55)`
- **Row Hover Fill**: `rgba(120, 120, 128, 0.10)`
- **Selection Blue**: `#0A84FF`
- **Selection Blue Hover**: `#0077ED`
- **Selection Text On Blue**: `#FFFFFF`
- **Incoming Bubble Fill**: `#E9E9EB`
- **Incoming Bubble Text**: `#1D1D1F`
- **Outgoing Bubble Fill**: `#0A84FF`
- **Outgoing Bubble Text**: `#FFFFFF`
- **Toolbar Icon**: `#5E5E63`
- **Composer Fill**: `#FFFFFF`
- **Composer Border**: `rgba(60, 60, 67, 0.20)`

### Material / Vibrancy Tokens

- **Sidebar Vibrancy**: `backdrop-filter: blur(28px) saturate(180%)`
- **Toolbar Vibrancy**: `backdrop-filter: blur(20px) saturate(160%)`
- **Sidebar Opacity Layer**: `rgba(255,255,255,0.42)` behind content
- **Fallback (no blur support)**: solid `#F2F2F4` with 1px border

### Typography

Use San Francisco stack to mirror SwiftUI/AppKit defaults.

- **Font Stack**: `"SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif`
- **Sidebar Section / Meta**: `11px`, `500`, `0.01em`, line-height `1.35`
- **Conversation Name**: `13px`, `600`, `0`, line-height `1.3`
- **Conversation Preview**: `12px`, `400`, `0`, line-height `1.35`
- **Toolbar Title**: `13px`, `600`, `0`, line-height `1.25`
- **Message Body**: `14px`, `400`, `0`, line-height `1.4`
- **Composer Input**: `13px`, `400`, `0`, line-height `1.35`
- **Button/Control Label**: `12px`, `500`, `0.01em`, line-height `1.2`

### Radius & Borders

- **Window Corner Radius**: `12px` (custom shell previews)
- **Search Field Radius**: `10px`
- **Sidebar Row Radius**: `8px`
- **Avatar Radius**: `9999px`
- **Message Bubble Radius**: `18px`
- **Composer Radius**: `10px`
- **Toolbar Icon Button Radius**: `8px`
- **Standard Border Width**: `1px`
- **Hairline Divider**: `0.5px` where device pixel ratio allows

### Shadows & Effects

- No visible card drop shadows in core surfaces.
- Use separators and material contrast for depth.
- Allow only extremely soft elevation on popovers:
  `0 6px 20px rgba(0,0,0,0.12)`.

## Component Styling Principles

### Window Shell (macOS Desktop Chroming)

- Include top traffic light controls with authentic spacing and size.
- Keep toolbar area compact (`48px` to `52px` height).
- Toolbar background should be subtly translucent, not fully opaque.
- Avoid thick framed borders around the app content.

### Sidebar (Critical Signature)

- Fixed left pane (`300px` to `340px` typical desktop width).
- Apply vibrancy token with translucent tint layer.
- Add one vertical split divider on the right edge.
- Search field at top: soft capsule, leading search icon, muted placeholder.
- Conversation list rows:
  - Avatar + name + preview + timestamp.
  - Tight but readable vertical rhythm.
  - Hover is neutral tint.
  - Active row is system blue rounded rectangle with white text.
- Keep row separators subtle and optionally omitted between grouped blocks.

### Conversation Header

- Compact top bar in message pane with contact avatar, title, and meta line.
- Toolbar actions appear as icon-only buttons with subtle hover fills.
- Header and message body separated by a single hairline divider.

### Message Bubbles

- Incoming: light neutral bubble, dark text.
- Outgoing: system blue bubble, white text.
- Bubble max width: `min(62ch, 68%)` on desktop.
- Bubble spacing: `6px` vertical, `10px` between logical groups.
- Timestamp/meta is tiny, tertiary text, and visually quiet.

### Composer Bar

- Stick to bottom, with top hairline separator from message list.
- Input is rounded rectangle, white fill, subtle border.
- Left actions (plus/attachments), right actions (emoji/mic/send) are icon buttons.
- Maintain minimum `32px` control hit area.

### Iconography

- Prefer SF Symbols-like stroke geometry (or Lucide configured lightly).
- Stroke weight around `1.75` to `2` for toolbar actions.
- Avoid oversized iconography; controls should feel utility-first.

### Interactive States

- **Hover**: fill-only feedback (`80-120ms`), no dramatic scale.
- **Active/Pressed**: slight darken (`~6%`) and optional `scale(0.98)`.
- **Focus Visible**: 2px ring in `#0A84FF` with subtle offset.
- **Selected list item**: strong blue fill, white content, no additional shadow.
- **Disabled**: reduce opacity to `0.45` and disable pointer interaction.

### Electron Native-Fidelity Constraints

- Preserve macOS-style spacing and compact control sizing.
- Avoid web-heavy nav bars, oversized hero typography, or card grids.
- Keep all desktop interactions mouse + keyboard friendly.
- Use backdrop blur only where it mirrors native panes (sidebar/toolbar), not everywhere.

## Layout Principles

### Structural Layout

Use a two-pane messaging layout with desktop-first proportions.

1. **Title/Toolbar region**: top strip across full width.
2. **Left sidebar**: translucent, fixed width (`300px` to `340px`).
3. **Main conversation area**: flexible width remaining space.
4. **Bottom composer**: anchored in main area.

### Sizing & Spacing Rhythm

- Base spacing unit: `4px`
- Common paddings: `8px`, `12px`, `16px`
- Sidebar content padding: `10px` to `12px`
- Main conversation horizontal padding: `20px` to `28px`
- Section separators: 1 hairline, never heavy borders

### Grid Behavior

- Sidebar is fixed; main pane is fluid.
- Message column should align to a comfortable reading width.
- Keep conversation content top-aligned with large empty-state tolerance.

### Responsive Behavior

- At narrow widths (`<1024px`), allow sidebar collapse to overlay/drawer.
- Maintain translucent material behavior for collapsed sidebar.
- Preserve composer accessibility and minimum hit targets on smaller widths.

## The "Bold Factor"

To avoid generic web UI drift, enforce these signatures:

1. **Authentic Translucent Sidebar**
- Real backdrop blur + tint + split divider. This is mandatory.

2. **Native macOS Density**
- Compact toolbar, tight list rows, and restrained typographic scale.

3. **System-Neutral Palette**
- Low-chroma grays with selective use of system blue only for active/primary states.

4. **Hairline Precision**
- Frequent use of subtle separators instead of cards and shadows.

5. **Blue Selection Row Behavior**
- Selected conversation row uses a rounded blue highlight with white text/icons.

6. **Quiet Main Pane with Intentional Negative Space**
- Conversation area should tolerate emptiness; do not force content blocks everywhere.

7. **Utility-First Icon Controls**
- Small icon-only actions with minimal hover fills, not large floating action buttons.

## Anti-Patterns (What to Avoid)

- Do not use bright gradient backgrounds or hero-style marketing treatments.
- Do not replace vibrancy with heavy opaque cards.
- Do not use thick borders, dramatic shadows, or neumorphism.
- Do not oversize text (especially sidebar and toolbar labels).
- Do not use rounded-2xl/3xl everywhere; keep radii disciplined.
- Do not apply blur effects across all surfaces.
- Do not turn list rows into card components with large gaps.
- Do not introduce playful/elastic motion that feels iOS-first instead of macOS desktop-first.
- Do not use non-system accent colors as primary selection state.

## Animation & Motion

### Timing

- Hover transitions: `80ms` to `120ms`
- Standard state transitions: `140ms` to `180ms`
- Pane toggle transitions: `180ms` to `220ms`

### Easing

- Primary easing: `cubic-bezier(0.2, 0.0, 0.0, 1)`
- Secondary easing: `ease-out` for subtle reveals

### Motion Rules

- Animate color/opacity first, transforms second.
- Keep scale animations minimal (`0.98` to `1.0` only for press feedback).
- Avoid large y-translation or spring bounces in core shell interactions.

## Accessibility Considerations

- Maintain WCAG AA contrast for text on all neutral and blue surfaces.
- Ensure selected row text on blue is legible at small sizes.
- Provide keyboard navigation for conversation list and toolbar actions.
- Focus indicators must remain visible on translucent materials.
- Minimum desktop target size: `28x28px` for icon controls; `32px` preferred.
- Respect reduced-motion preferences by minimizing transforms.
- Respect reduced-transparency preferences with opaque fallback surfaces.
- Decorative material layers should be `aria-hidden="true"`.

## Implementation Checklist

- [ ] Sidebar uses translucent material with blur and tint.
- [ ] Sidebar split divider is present and subtle.
- [ ] Search field, conversation rows, and selection behavior mirror native rhythm.
- [ ] Message bubbles use neutral incoming + system-blue outgoing convention.
- [ ] Toolbar and composer use compact macOS-like control sizing.
- [ ] Typography uses SF Pro system stack and restrained scale.
- [ ] Hover/active/focus states are defined and subtle.
- [ ] Layout remains desktop-native and avoids card-heavy web patterns.
- [ ] Accessibility and reduced-transparency/motion fallbacks are included.

</design-system>
