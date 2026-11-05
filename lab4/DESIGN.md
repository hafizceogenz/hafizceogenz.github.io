---
name: Academic Kinetic
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#5a4139'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#8e7067'
  outline-variant: '#e2bfb4'
  surface-tint: '#ac3400'
  primary: '#a83300'
  on-primary: '#ffffff'
  primary-container: '#d14307'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59d'
  secondary: '#3d58b3'
  on-secondary: '#ffffff'
  secondary-container: '#859efe'
  on-secondary-container: '#0d318c'
  tertiary: '#006194'
  on-tertiary: '#ffffff'
  tertiary-container: '#007bb9'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390b00'
  on-primary-fixed-variant: '#842600'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b6c4ff'
  on-secondary-fixed: '#001550'
  on-secondary-fixed-variant: '#223f99'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1.25rem
  margin-lg: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system combines academic rigor with high-energy tech leadership. Tailored for an ambitious engineer-creator persona (@hafizceogenz at Universiti Tenaga Nasional), the aesthetic blends institutional credibility with modern Gen-Z digital execution.

The visual direction draws from **Corporate Modernism** punctuated with **Kinetic Tech** accents. It communicates decisive intellect, energetic innovation, and precise execution through crisp containerization, high-contrast typography, and purposeful vibrant energy cues.

### Key Tenets
- **Institutional Weight with Digital Momentum:** Anchored by authoritative deep blues, accelerated by high-octane institutional orange.
- **Structural Clarity:** Strict layout geometry, deliberate borders, and structural container hierarchy rather than heavy diffuse drop shadows.
- **Engineering Precision:** Clean technical markers, monospace-styled metadata labels, and sharp status chips that signal competence and structure.

## Colors

The palette directly reflects UNITEN’s legacy while providing high-contrast clarity across academic and digital showcases.

### Palette Architecture
- **Primary (`#F15A22` - UNITEN Vibrant Orange):** Represents dynamic engineering and forward-looking momentum. Reserved for key calls to action, focus rings, active indicator tabs, and primary metrics.
- **Secondary (`#0C308B` - UNITEN Deep Blue):** Symbolizes institutional heritage, academic authority, and engineering depth. Used for section headers, primary anchor containers, high-emphasis text, and dark-mode brand anchors.
- **Tertiary (`#0284C7` - Electric Azure):** Acts as a high-tech bridging hue for links, informational callouts, code syntax accents, and secondary achievements.
- **Neutral Core (`#0F172A` - Slate Obsidian):** Deep slate foundation used for high-contrast typography in light mode, and root canvas background in dark mode.

### Background & Surface Hierarchy
- **Light Mode:** Canvas root is `#FFFFFF`, secondary surface containers sit on `#F8F9FA`, with card borders rendered in subtle slate `#E2E8F0`.
- **Dark Mode:** Canvas root transitions to `#0F172A`, cards and elevated panels use `#1E293B`, with precise separation lines using `#334155`.

## Typography

The typography pairing unifies modern geometric authority with utilitarian readability.

- **Plus Jakarta Sans (Headlines, Display, Labels):** Offers clean geometric proportions, humanized curves, and contemporary weight balance. Gives titles, section headings, and numeric credentials an ambitious, punchy stance.
- **Inter (Body Text):** Provides neutral, highly legible optical metrics ideal for technical project summaries, research abstracts, and long-form experience descriptions.

### Formatting Rules
- Display titles utilize tight tracking (`-0.03em` to `-0.02em`) for an editorial tech feel.
- `label-caps` must always be rendered in uppercase to indicate categorizations, project tags, and academic status codes.

## Layout & Spacing

The layout is built on a responsive 12-column grid system calibrated for academic portfolios, research showcases, and technical dashboards.

### Responsive Breakpoints & Grids
- **Mobile (< 768px):** 4-column layout, `gutter-sm` (16px), `margin-sm` (20px). Fluid stack for project cards and academic timelines.
- **Tablet (768px - 1024px):** 8-column layout, `gutter` (24px), `margin` (32px). Two-column card distributions.
- **Desktop (> 1024px):** 12-column layout, max-width `1280px` centered, `gutter` (24px), outer canvas padding using `margin-lg` (64px).

### Spacing Hierarchy
- `space-xs` and `space-sm`: Reserved for badge padding, button internal gaps, and icon-to-text distances.
- `space-md`: Default padding inside small cards, form rows, and list items.
- `space-lg`: Internal padding for feature project cards, profile sidebars, and grid row gaps.
- `space-xl`: Section vertical separation within multi-topic pages.

## Elevation & Depth

This system intentionally departs from heavy, soft skeuomorphic blur in favor of structured **Tonal Layers with Low-Contrast Outlines**. Depth communicates clarity rather than physical weight.

### Surface Tiers
- **Surface 0 (Root Base):** `#FFFFFF` (Light) / `#0F172A` (Dark).
- **Surface 1 (Card & Section Containers):** `#F8F9FA` (Light) / `#1E293B` (Dark). Outlined with 1px border (`#E2E8F0` Light / `#334155` Dark).
- **Surface 2 (Floating Modals & Interactive Overlays):** `#FFFFFF` (Light) / `#273549` (Dark). Uses a precise hard-edged ambient lift: `0px 4px 16px -2px rgba(12, 48, 139, 0.08)`.

### Border & Focus Dynamics
- Interactive items feature a subtle 1px border that shifts from neutral gray to `#F15A22` on focus/hover.
- Dark-mode hover states utilize a faint inner border highlight: `inset 0px 0px 0px 1px rgba(241, 90, 34, 0.4)`.

## Shapes

The interface adopts a moderately rounded corner architecture (`roundedness: 2`), balancing corporate discipline with contemporary software fluidity.

- **Base Radius (0.5rem / 8px):** Applied to form inputs, small badges, action chips, and nested inner panels.
- **Large Radius (1rem / 16px):** Standard for portfolio cards, credential modals, and featured project containers.
- **Extra Large Radius (1.5rem / 24px):** Used exclusively for hero feature banners and main profile highlight modules.
- **Full Pill Shape:** Reserved strictly for categorical tag pills, verification badges, and primary circular avatar frames.

## Components

### Buttons
- **Primary:** Solid `#F15A22` background, white text (`label-lg`), 0.5rem radius, height 44px. Hover state deepens to `#D44A15` with an upward micro-translation (-1px).
- **Secondary / Academic:** Solid `#0C308B` background, white text, 0.5rem radius. Used for official thesis downloads, transcript verifications, or institutional outreach.
- **Outline / Ghost:** Transparent background with 1px border (`#E2E8F0` or `#334155`), text in `#0F172A` (or `#F8F9FA`). Hover triggers a 10% tint of `#F15A22`.

### Chips & Professional Badges
- **Status Badges (e.g., "UNITEN Dean’s List", "Lead Researcher"):** Compact height (28px), pill-shaped, utilizing low-opacity secondary backgrounds (`rgba(12, 48, 139, 0.08)`) with `#0C308B` solid text and a 1px border.
- **Tech Stack Chips:** 0.5rem radius, `#F8F9FA` background, `#0F172A` text, 1px border, paired with an icon on the left.

### Project & Research Cards
- Constructed with Surface 1 background and crisp 1px neutral borders.
- Top banner accepts visual project previews; content area holds `label-caps` metadata (date, role, stack), followed by `headline-sm` title and `body-sm` description.
- Hover effect: Card border transitions to `#F15A22` alongside an upward lift of 2px.

### Inputs & Search Bars
- Height 44px, 0.5rem radius, Surface 0 background, 1px border `#CBD5E1`.
- Active focus state: Border color changes to `#0C308B` with a 2px outer ring in `rgba(241, 90, 34, 0.2)`.

### Checkboxes & Selection Controls
- Checkbox size 18px x 18px with 4px border radius. Unselected uses 1.5px border `#94A3B8`.
- Checked state fills with `#F15A22` featuring a sharp white checkmark glyph.

### Academic Metric Callouts (Custom Product Component)
- High-impact stat modules (e.g., "CGPA 3.9+", "12+ Repositories", "Top 5 Hackathon").
- Features `display-hero` numeric size rendered in `#0C308B` (or `#F15A22` for top highlights), underlined by a 2px energetic orange baseline accent.