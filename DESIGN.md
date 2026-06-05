---
name: Sabriel Digi-Floral
colors:
  surface: '#fff8f5'
  surface-dim: '#ebd6ca'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ea'
  surface-container: '#ffeade'
  surface-container-high: '#f9e4d8'
  surface-container-highest: '#f3dfd2'
  on-surface: '#241912'
  on-surface-variant: '#564335'
  inverse-surface: '#3a2e26'
  inverse-on-surface: '#ffede4'
  outline: '#8a7263'
  outline-variant: '#ddc1af'
  surface-tint: '#944a00'
  primary: '#944a00'
  on-primary: '#ffffff'
  primary-container: '#f27f0d'
  on-primary-container: '#562900'
  inverse-primary: '#ffb784'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#62fae3'
  on-secondary-container: '#007165'
  tertiary: '#006398'
  on-tertiary: '#ffffff'
  tertiary-container: '#00a6f9'
  on-tertiary-container: '#003859'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc5'
  primary-fixed-dim: '#ffb784'
  on-primary-fixed: '#301400'
  on-primary-fixed-variant: '#713700'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#fff8f5'
  on-background: '#241912'
  surface-variant: '#f3dfd2'
  accent-pink: '#f43f5e'
  surface-light: '#fcfaf8'
  background-dark: '#221910'
  surface-dark: '#2a221b'
  slate-900: '#0f172a'
  slate-600: '#475569'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 60px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  container-max: 1280px
  section-gap: 4rem
  element-gap: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
---

## Brand & Style
The brand personality is **friendly, optimistic, and approachable**, targeting a creative audience looking for celebration and connection. The visual style is a blend of **Modern Corporate and Glassmorphism**, utilizing soft rounded corners, vibrant accent colors, and subtle depth through backdrop blurs and diffused shadows.

The UI should feel "light as air" but grounded by high-quality photography and bold typography. It avoids industrial coldness in favor of a warm, celebratory aesthetic that feels both premium and accessible.

## Colors
The palette is anchored by a high-energy **Primary Orange (#f27f0d)** used for main calls to action and brand identification. This is complemented by a refreshing **Secondary Turquoise (#2dd4bf)** for accents and price points, and an **Accent Pink (#f43f5e)** for "Hot" tags and celebratory highlights.

The neutral scale uses "warm slates" to avoid a clinical look. Backgrounds are pure white or a very soft off-white `surface-light`, while dark mode transitions to a rich "coffee-bean" dark brown (`#221910`) rather than pure black, maintaining the brand's warmth even in low-light settings.

## Typography
We use **Plus Jakarta Sans** across all levels to maintain a soft, welcoming feel. The hierarchy relies on extreme weight contrasts—using `ExtraBold (800)` for hero displays and `Bold (700)` for section headers to create clear entry points.

For body text, `Regular (400)` provides high legibility. Small labels and "Overlines" should always be in `Bold` with uppercase styling and slight letter-spacing to ensure they don't get lost. Display sizes on mobile scale down aggressively to prevent awkward word breaks in long Polish words.

## Layout & Spacing
The system uses a **Fixed Grid** approach for large screens, centered at 1280px, but transitions to a fluid model for tablet and mobile. 

A vertical rhythm of `4rem (64px)` separates major sections, while internal component spacing follows an 8px base unit. Hero sections utilize generous internal padding (`3rem` or `48px`) to create a "container-within-a-container" feel. Mobile layouts should reduce horizontal margins to `1rem` to maximize screen real estate for product imagery.

## Elevation & Depth
Depth is created using **Ambient Shadows** and **Tonal Layers**. 
- **Surface Level 0:** The main background.
- **Surface Level 1:** Cards and containers use a `soft` shadow (extra-diffused, 5% opacity black) to lift slightly off the background.
- **Surface Level 2:** Hover states for cards increase shadow spread and scale the element by 1.05x.
- **Glassmorphism:** Navigation bars use a `backdrop-blur (md)` with a 90% opacity white fill to maintain context while scrolling.
- **Glows:** Primary buttons and "Hot" tags may use a colored shadow (e.g., orange or turquoise) to simulate a soft neon glow.

## Shapes
The design uses a **Pill-shaped (3)** logic. All buttons, search bars, and tags utilize fully rounded ends (pill shape). 

Structural containers like hero blocks and product cards use a `large` radius (`1.5rem` or `24px`) to maintain the friendly, soft aesthetic. Image containers within cards should have slightly smaller radii (`1rem` or `16px`) to create a nested "inner" look.

## Components
- **Buttons:** Primary buttons are pill-shaped with a slight gradient or solid orange fill and white text. They should include an icon (e.g., arrow_forward) for directional intent. Secondary buttons use a white/transparent background with a thin border.
- **Cards:** Product cards must have a fixed aspect ratio (1:1) for images. They feature a "favorite" heart icon in the top right, floating on a glassmorphic white circle.
- **Input Fields:** Search bars are pill-shaped with a soft border. On focus, the border transitions to the primary orange with a subtle outer ring.
- **Chips/Badges:** Small, pill-shaped indicators for "New" or "Hot" categories. Use 10% opacity backgrounds of the accent color (e.g., Pink background at 10% for red text).
- **Icons:** Use *Material Symbols Outlined* with a consistent weight of 400. Icons used inside primary buttons should be slightly smaller than those used as standalone triggers.