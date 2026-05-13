---
name: DevJobs Tech-Modern System
colors:
  surface: '#11131b'
  surface-dim: '#11131b'
  surface-bright: '#373942'
  surface-container-lowest: '#0c0e16'
  surface-container-low: '#191b23'
  surface-container: '#1d1f27'
  surface-container-high: '#282a32'
  surface-container-highest: '#32343d'
  on-surface: '#e1e2ed'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#e1e2ed'
  inverse-on-surface: '#2e3039'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#b7c8e1'
  on-tertiary: '#213145'
  tertiary-container: '#5e6e85'
  on-tertiary-container: '#e9f0ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#11131b'
  on-background: '#e1e2ed'
  surface-variant: '#32343d'
typography:
  h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-main:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  tech-tag:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

This design system is engineered for the developer ecosystem, prioritizing technical precision and high-density information architecture. The style is a synthesis of **Minimalism** and **Glassmorphism**, creating a workspace feel that is both professional and cutting-edge. It targets software engineers and tech recruiters who value speed, legibility, and data depth.

The UI should evoke a sense of "The IDE for Job Hunting"—functional, performant, and organized. By utilizing a dark-mode-first approach with high-contrast accents, the system ensures reduced eye strain for users who spend their lives in terminal environments while highlighting critical career opportunities through vibrant electric blue and emerald highlights.

## Colors

The palette is optimized for a technical dark-mode environment. 

- **Primary (Electric Blue):** Used for primary actions, active navigation states, and focus indicators. It provides a sharp, energetic contrast against the dark base.
- **Success/Salary (Emerald Green):** Specifically reserved for salary ranges, "Hiring" indicators, and successful application states.
- **Neutral/Background:** A deep Navy-Charcoal (`#0F172A`) serves as the base layer, with a slightly lighter Slate-Navy (`#1E293B`) for elevated surfaces and containers.
- **Typography:** Primary text uses an off-white for maximum legibility without the harshness of pure white. Secondary text utilizes Soft Slate to de-emphasize metadata and administrative labels.

## Typography

The typographic system utilizes a dual-font approach to distinguish between UI/Content and Technical Data.

- **Inter:** The primary workhorse for all interface elements, headings, and body copy. It is selected for its exceptional legibility and neutral, modern appearance.
- **JetBrains Mono:** Employed for tech stacks, salary figures, and specific job metadata. This creates a visual "syntax highlighting" effect for key data points, making the interface feel familiar to developers.

Information density is maintained by keeping line heights tight but breathable and using systematic font-weight stepping to establish hierarchy without needing massive size shifts.

## Layout & Spacing

The layout utilizes a **Fixed Grid** approach for the main content area to ensure high-density information remains scannable and structured.

- **Grid:** A 12-column grid with a 1200px max-width container. 
- **Rhythm:** An 8px base unit drives all padding and margins.
- **Density:** To achieve a "high-density" feel without clutter, internal component padding is kept tight (12-16px) while the whitespace between major sections is generous (40-64px) to provide visual breathing room.

## Elevation & Depth

This design system uses **Glassmorphism** and **Tonal Layering** to create hierarchy. 

- **Surface Levels:** The main background is the lowest level. Cards and containers use a semi-transparent surface (10-15% opacity white overlay) with a 12px backdrop blur.
- **Borders:** Instead of heavy shadows, surfaces are defined by a 1px solid border at 10% white opacity. This creates a "glass edge" effect that feels precise and architectural.
- **Depth:** Higher elevation (e.g., modals or hovered cards) is achieved by increasing the background blur and adding a very subtle, large-radius ambient shadow (`rgba(0,0,0, 0.4)`).

## Shapes

The shape language is disciplined and consistent. An 8px (`0.5rem`) corner radius is the standard for all primary components including cards, input fields, and buttons. 

- **Cards/Modals:** 8px radius.
- **Buttons/Inputs:** 8px radius.
- **Status Badges:** 4px radius (Soft) to distinguish them from primary interactive elements.
- **Interactive Tech Tags:** 4px radius for a compact, tab-like appearance.

## Components

### Buttons
- **Primary:** Solid Electric Blue with white text. High contrast, 8px corners.
- **Secondary:** Ghost style with an Electric Blue border (1px) and subtle hover fill.
- **Actionable Icons:** 32x32px hit area with soft slate icons that transition to electric blue on hover.

### Cards (Job Listings)
- **Style:** Subtle glassmorphic background (`rgba(30, 41, 59, 0.7)`).
- **Border:** 1px `rgba(255, 255, 255, 0.1)` stroke.
- **Interaction:** On hover, the border opacity increases and the glass tint lightens slightly.

### Tech Tags
- **High-Contrast:** Dark charcoal background with bright Electric Blue or Emerald Green text.
- **Font:** JetBrains Mono.
- **Padding:** 4px vertical, 8px horizontal.

### Status Badges
- **Remote/Office:** Small, uppercase labels with a left-aligned status dot. 
- **Colors:** Emerald Green for "Remote," Soft Slate for "On-site," and Amber for "Hybrid."

### Inputs
- **Field Style:** Deep charcoal fill, 1px slate border.
- **Focus State:** Border changes to Electric Blue with a subtle outer glow (2px).
- **Labels:** Inter, 12px, Bold, Soft Slate, all-caps.

### Salary Displays
- **Style:** Always rendered in JetBrains Mono.
- **Color:** Emerald Green to indicate value and attract attention immediately.