# Mehak Tomar — Makeup Artist Portfolio
### Complete Website Definition
> Designed & Developed by **Paras Pawar** · © 2026

---

## 1. Project Overview

| Property | Value |
|---|---|
| **Site Name** | Mehak Tomar · Makeup Artistry |
| **Purpose** | Professional portfolio to showcase makeup work and attract clients/bookings |
| **Style** | Luxury beauty · Dark editorial · Cinematic |
| **Developer** | Paras Pawar |
| **Entry Point** | `index.html` |

---

## 2. File Structure

```
makeup-artist-portfolio/
├── index.html          ← Main HTML (single-page)
├── style.css           ← All styling + animations
├── main.js             ← All interactivity + effects
├── WEBSITE.md          ← This document
└── images/
    ├── hero_portrait_*.png         ← Hero background
    ├── bridal_look_1_*.png         ← Bridal collection #1
    ├── bridal_look_2_*.png         ← Bridal collection #2
    ├── bridal_look_3_*.png         ← Bridal collection #3
    ├── editorial_look_1_*.png      ← Editorial collection #1
    ├── editorial_look_2_*.png      ← Editorial collection #2
    ├── fashion_look_1_*.png        ← Fashion collection #1
    ├── fashion_look_2_*.png        ← Fashion collection #2
    ├── party_look_1_*.png          ← Party collection #1
    ├── party_look_2_*.png          ← Party collection #2
    ├── featured_work_1_*.png       ← Featured work hero card
    ├── before_makeup_*.png         ← Before/After slider - before
    ├── after_makeup_*.png          ← Before/After slider - after
    └── artist_portrait_*.png       ← About section portrait
```

---

## 3. Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0f0f0f` | Primary background |
| `--bg-2` | `#161616` | Alternate section background |
| `--bg-3` | `#1e1e1e` | Form/input backgrounds |
| `--gold` | `#c9a96e` | Primary accent — all highlights |
| `--gold-light` | `#e3c590` | Hover states |
| `--gold-dim` | `rgba(201,169,110,0.15)` | Subtle gold fills |
| `--white` | `#f9f6f1` | Primary text |
| `--white-dim` | `rgba(249,246,241,0.6)` | Secondary text |
| `--white-muted` | `rgba(249,246,241,0.35)` | Tertiary / labels |

### Typography
| Role | Font | Weight | Notes |
|---|---|---|---|
| Headings | **Playfair Display** | 400 | Italic for artist name |
| Body | **Inter** | 300–500 | Google Fonts |
| Eyebrows | Inter | 400 | `0.7rem`, `letter-spacing: 0.35em`, gold |
| Nav links | Inter | 400 | `0.75rem`, uppercase |

### Spacing
- Nav height: `72px` (desktop) / `60px` (mobile)
- Section padding: `clamp(80px, 12vh, 140px)` vertical
- Section padding: `clamp(24px, 6vw, 80px)` horizontal

### Radii & Shadows
- Default radius: `4px`
- Cards/images: `8px`
- Buttons (rounded): `40px`
- Lightbox glow: `0 40px 80px rgba(0,0,0,0.5)`

---

## 4. Page Sections (Top → Bottom)

### 4.1 Loader
- Full-screen dark overlay with gold `MT` monogram
- Animated progress bar fills over ~2 seconds
- Fades out, then hero animations begin

### 4.2 Navigation
- Fixed top bar · transparent → blurred (`backdrop-filter: blur(20px)`) on scroll
- Logo: *Mehak Tomar* (italic serif, gold)
- Links: Home · Portfolio · Collections · About · Contact
- CTA button: **Book Now** (gold outlined → gold filled on hover)
- Mobile: Hamburger → full-screen overlay menu

### 4.3 Hero
- Full-viewport (`100vh`) with parallax background image
- Layered gradient overlay (dark bottom)
- Animated text reveal (tagline → name → sub → button, staggered)
- **Animated name glow** — `Tomar` pulses with gold `text-shadow`
- **Ambient floating particles** — 22 gold specks drift upward
- **Cinematic grain overlay** (`::after` SVG noise)
- Stats bottom-left: `8+ Years · 1200+ Clients · 45+ Editorials`
- Scroll indicator bottom-right: animated line + "Scroll" label

### 4.4 Marquee
- Infinite scrolling ticker: `Bridal · Editorial · Fashion · Avant-Garde · Film & TV · Events`
- Gold separator dots · 20s loop

### 4.5 Cinematic Reel *(new)*
- Horizontal drag-scroll strip of 10 images
- Mouse drag with **momentum/inertia** (elastic feel)
- Fade edges (gradient mask left/right)
- "Drag to explore" hint with animated lines
- Each card lifts and zooms on hover

### 4.6 Featured Work
- 2-column editorial grid: 1 large card + 2 stacked side cards
- Cards: zoom on hover, title overlay reveals, **gold shimmer line** on bottom edge
- Images: Floral Artistry · Chrome Editorial · Holographic Fantasy

### 4.7 Before / After Transformation
- Interactive drag comparison slider
- Mouse drag + touch support
- Smooth handle (circle with arrows) + vertical separator line
- Labels: `Before` (left) / `After` (right)

### 4.8 Portfolio Gallery
- 3-column grid (`repeat(3, 1fr)`) of 9 portrait images
- Hover: image scale up + overlay with title + plus icon
- **Gold shimmer line** on bottom edge of each card
- Click any image → opens **lightbox**

### 4.9 Lightbox
- Full-screen dark overlay
- Prev / Next arrows + counter (`1 / 9`)
- Close button (top-right)
- Keyboard: `←` `→` navigate · `Esc` close
- Smooth opacity transition between images

### 4.10 Collections
- 4 tabbed categories: **Bridal · Editorial · Fashion · Party**
- Each tab: full-width banner image + description text (2-col layout)
- Below banner: 3-column image grid
- Tab switch: `fadeSlide` animation

### 4.11 About
- 2-column layout: portrait (left) + text (right)
- Gold accent border frame behind portrait image
- Content: bio paragraphs + 3 credentials (gold ✦ bullets) + CTA button

### 4.12 Testimonials
- Auto-advancing carousel (5s interval)
- **Glassmorphism cards** — frosted glass + gold top-edge glow
- Prev/Next buttons + dot indicators + touch swipe
- 4 testimonials from clients/collaborators

### 4.13 Contact / Booking
- 2-column: info panel (left) + form (right)
- Info: email · phone · location + social icon links (Instagram, Pinterest, TikTok, YouTube)
- Form fields: First Name · Last Name · Email · Service Type (dropdown) · Message
- Submit: animated button (`Sending…` → `Message Sent ✓`)
- **Button glow** — gold halo bloom on hover

### 4.14 Footer
- Centered: logo · tagline · nav links · copyright
- Gold top border

---

## 5. Animations & Effects

| Effect | Where | Tech |
|---|---|---|
| **Page loader** | On load | CSS keyframes |
| **Hero parallax** | Hero bg image | JS `scroll` + `transform: translateY` |
| **Scroll reveal** | All sections | `IntersectionObserver` + CSS transitions |
| **Hero text stagger** | Hero content | `setTimeout` + CSS opacity/translateY |
| **Counter animation** | Hero stats | RAF + easing function |
| **Heading shimmer sweep** | All `section-title` | CSS `@keyframes` pseudo-element |
| **Gold glow pulse** | Hero `em` name | CSS `@keyframes nameGlow` |
| **Marquee scroll** | Marquee strip | CSS `@keyframes marquee` |
| **Scroll progress bar** | Top of viewport | JS `scroll` + width |
| **Gold sparkle trail** | Cursor movement | Canvas 2D API + RAF |
| **Ambient dust particles** | Hero section | CSS custom properties + keyframes |
| **Reel momentum drag** | Reel section | JS pointerevents + RAF inertia |
| **Glassmorphism hover** | Testimonial cards | CSS `backdrop-filter` + transitions |
| **Button ripple + glow** | CTAs | CSS `::before` + `box-shadow` |
| **Image zoom on hover** | All cards/grids | CSS `transform: scale` |
| **Gold shimmer line** | Featured + Portfolio cards | CSS `::after` + `scaleX` transition |
| **Lightbox transition** | Lightbox nav | JS opacity fade + CSS transform |
| **Testimonial carousel** | Testimonials | JS `translateX` + auto-interval |
| **Before/After drag** | Slider | JS pointer + touch events |
| **Custom cursor** | Everywhere | JS `mousemove` + CSS transitions |

---

## 6. Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤ 1024px` | Featured grid → single column; About side-by-side → stacked; Collections banner → stacked; Contact → stacked |
| `≤ 768px` | Nav collapses to hamburger; Hero stats hidden; Portfolio/Collections grid → 2 columns; Form rows → single column |
| `≤ 480px` | Portfolio/Collections → 1 column; Featured side cards → column |
| `hover: none` | Custom cursor hidden; body cursor restored; Overlays always visible |

---

## 7. SEO & Meta

```html
<title>Mehak Tomar | Makeup Artistry</title>
<meta name="description" content="…">
<meta name="author" content="Paras Pawar">
<link rel="icon" type="image/svg+xml" href="data:…MT monogram SVG…">
```

---

## 8. Planned / Future Enhancements

- [ ] 3D card tilt effect on portfolio images (cursor-tracking perspective)
- [ ] Magnetic button drift toward cursor
- [ ] Text scramble on section eyebrows
- [ ] Diagonal `clip-path` section dividers
- [ ] Aurora/colour bleed background on featured section
- [ ] Line-by-line paragraph text reveal
- [ ] Masonry portfolio layout
- [ ] Floating active-section nav indicator dot
- [ ] Real email backend (Formspree / EmailJS)
- [ ] Open Graph / Social preview meta tags
- [ ] WebP image conversion for performance
- [ ] Schema.org `LocalBusiness` markup
