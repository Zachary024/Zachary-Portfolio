# Zachary — portfolio site (v3.1, "studio")

A single-page portfolio built with plain HTML, CSS and vanilla JavaScript.
No build step: open `index.html` in a browser.

- **Type:** Inter, one variable file (400–700), self-hosted.
- **Colour:** neutral slate surfaces; the Z gradient (blue → cyan → indigo) is
  the only colour event.
- **Layout:** 1200 px container, 64 px sticky header, 12 px card radius, one
  border colour, three text tones, 4/8/12/16/24/32/48/64 spacing scale.
- **Weight:** no frameworks. One font (48 KB), one icon subset (2 KB), no
  third-party CSS. Only typed.js and EmailJS load from a CDN.

---

## 1. File map

```
studio/
├── index.html              Page markup
├── hire.html               "Work with me" — process, engagements, FAQ, terms
├── 404.html                Not-found page (same brand, no JS)
├── work/                   5 case studies — GENERATED, do not edit by hand
├── tools/
│   ├── build-case-studies.py   projects.js → work/*.html
│   └── make-offsite-kit.py     banner PNG + rate-card PDF
├── offsite/                LinkedIn banner, email signature, rate card
├── robots.txt              Allow all + sitemap pointer
├── sitemap.xml             One URL — edit the domain
├── netlify.toml            Cache + security headers (Netlify)
├── NEXT-STEPS.md           What to do after this build
├── README.md               This file
└── assets/
    ├── styles.css          Tokens (§1) → components → breakpoints
    ├── icon-font.css       Remix Icon, subset to 17 glyphs
    ├── projects.js         The PROJECTS array — the only place work is edited
    ├── main.js             Behaviour: cards, filters, quick view, nav, form
    ├── fonts/
    │   ├── inter-latin-var.woff2   Inter 400–700, latin subset, 48 KB
    │   └── remix-subset.woff2      17 icons, 2 KB
    ├── img/
    │   ├── logo-mark.png           128 px Z mark (transparent)
    │   ├── favicon-32.png          32 px tab icon
    │   ├── favicon-192.png         192 px
    │   ├── apple-touch-icon.png    180 px, opaque charcoal
    │   ├── og-image.png            1200 × 630 social card
    │   ├── home-perfil.webp        Hero portrait  (800 × 1000)
    │   ├── about-perfil.webp       About portrait (800 × 800)
    │   ├── restaurant-website.webp
    │   ├── yoga-app.webp
    │   ├── fast-food-app.webp
    │   ├── finance-dashboard.webp
    │   └── interior-studio.webp
    └── pdf/
        └── zachary-resume.pdf      Résumé (placeholder)
```

`preview.html` (outside this folder) is the same page with every asset inlined
so it opens as one file.

---

## 2. Where to paste what

Everything lives in `index.html`, in this order. Each block opens with a
comment banner such as `<!-- ==================== HERO ==================== -->`.

| Block | What to change there |
|---|---|
| `<head>` | `<title>`, `meta description`, social meta, JSON-LD |
| `hire.html` | Process steps, engagement cards, FAQ — see §2a |
| Header | Brand lockup (logo + wordmark), nav links, CTA |
| `#hero` | Status pill, H1, lead paragraph, two buttons, meta row, portrait |
| Stack strip | Tool names after "Daily tools" |
| `#work` | Section intro text; **cards are generated from `main.js`** |
| `#about` | Heading, two paragraphs, skill lists, résumé link |
| `#services` | Three cards: icon, title, paragraph, bullet list |
| `#contact` | Heading, details list, social links, form fields |
| Footer | Nav repeat, socials, copyright line, location |

### 2a. The hire page (`hire.html`)

It shares `styles.css`, the header and the footer with the home page, and
holds the content a client needs before they write: a four-step process, three
engagement types, six FAQs, and a closing band that sends people back to the
form. The form itself stays on the home page, so there is exactly one place to
convert.

- **Process steps** — `<ol class="steps">` in `#process`. Keep them to four;
  the numbers are decorative (`aria-hidden`) and come from the order.
- **Engagements** — three `<article class="service">` cards in `#engagements`.
  To add a fourth, copy one and change the icon, title, paragraph and list.
- **FAQ** — native `<details>`/`<summary>`, no JavaScript. The first item is
  `open` by default. Add or remove `<details class="faq__item">` blocks.
- **Pricing** — deliberately not stated. When you are ready to publish rates,
  put a number in each engagement card and a sentence in the first FAQ.
  Until then the page says "quoted per scope", which is true and safer.

The page is linked from the Services section ("How engagements, timelines and
pricing work") and from the footer nav. It is in `sitemap.xml`.

### The testimonial section (`hire.html` → `#word`)

It is plain HTML — no JavaScript, no CMS, nothing to configure:

```html
<div class="quotes">
  <figure class="quote" data-reveal>
    <blockquote>
      <p class="quote__text">What the client said.</p>
    </blockquote>
    <figcaption class="quote__cite">
      <span class="quote__name">Client name</span>
      <span class="quote__role">Owner, Àura Dining</span>
      <a class="quote__link" href="work/restaurant-website.html">Read the case study →</a>
    </figcaption>
  </figure>
</div>
```

- **One quote** → the card stays at 52 rem on desktop, so it does not stretch.
- **Two quotes** → copy the whole `<figure>` and paste it after the first; the
  row becomes two columns at 900 px.
- **None yet** → delete the `<section id="word">`. A placeholder quote is worse
  than no quote; never invent one.
- Get the words in writing, keep the client's phrasing, and only trim for
  length.

### Swapping the portraits

The two portraits are your cut-outs, composited straight onto the card's
light gradient. To replace them:

1. Export a cut-out PNG with a transparent background — **800 × 1000** (hero,
   4:5) and **800 × 800** (about, 1:1). Waist-up, subject centred, bottom of
   the figure touching the bottom edge of the canvas.
2. Convert to WebP (`cwebp -q 88 in.png -o out.webp`, or any online converter).
3. Save over `assets/img/home-perfil.webp` and `assets/img/about-perfil.webp`,
   keeping the names. Nothing else needs editing.

If you use a JPEG with a background instead, remove `object-fit` reliance by
leaving the card as is — it will simply show the photo's own background inside
the rounded card.

### Replacing the logo

`assets/img/logo-mark.png` is your Z, 126 × 128 with transparency. Replace the
file and keep the name. It is used in three places:

- header and footer lockup (`width="32" height="32"`)
- `favicon-32.png` / `favicon-192.png` / `apple-touch-icon.png` — regenerate
  these from the new mark if the logo changes
- `og-image.png` — the social card bakes the mark in; re-export it too

The wordmark beside it is live text (`ZACHARY` / `PROGRAMMING`), not part of
the image. Its spacing is in `styles.css` → `.brand__name` / `.brand__sub`.

### Adding or changing a project

Everything lives in **`assets/projects.js`**. One object per project:

```js
{
  slug: "restaurant-website",          // URL: work/restaurant-website.html
  title: "Restaurant Website",
  category: "Website",                 // also the filter chip label
  year: "2026",
  description: "One line, used on the card and in the quick view.",
  client: "Àura Dining",
  role: "Design and build",
  timeline: "3 weeks",
  brief: "The problem, in the client's terms.",
  constraint: "The one thing that made it hard.",
  built: ["Four to six short bullets", "of what you shipped"],
  result: "What changed afterwards.",
  stack: ["HTML & CSS", "JavaScript"],
  image: "assets/img/restaurant-website.webp",  // 900 × 600, WebP
  imageAlt: "Describe the screenshot for screen readers.",
  detailUrl: "work/restaurant-website.html",
  repoUrl: "#",
  liveUrl: "#"
}
```

Then regenerate the case-study pages:

```bash
python3 tools/build-case-studies.py
```

Cards are numbered `P.01…` automatically, the grid reflows 1 → 2 → 3 columns,
and the filter chips rebuild themselves from whatever categories exist. Export
screenshots at **900 × 600** (3:2) and convert to WebP.

**Read the copy warning in `projects.js`:** the brief, constraint, built and
result fields are placeholders written to fit the screenshots. Replace them
with what actually happened before you publish — the structure is the useful
part, not the sentences.

### Work-section features

| Feature | Where | How it behaves |
|---|---|---|
| Filter chips | above the grid | Built from `category`; `aria-pressed` per chip; the result count is announced in a live region |
| Quick view | click any card image | Native `<dialog>`: focus trapped, Escape closes, focus returns to the card. Shows image, role, timeline, stack and a link to the case study |
| Case study pages | `work/*.html` | Generated; share the header, footer and section styles with the site |

### Adding an icon

The icon font is subset to the glyphs in use, so a new icon needs three steps:

1. Add the class in the markup (e.g. `ri-mail-line`).
2. Find its codepoint in the full Remix CSS:
   `curl -s https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css | grep 'ri-mail-line'`
3. Re-run the subset (needs `pip install fonttools brotli`):

```bash
python3 - <<'PY'
from fontTools import subset
subset.main([
    "remixicon.woff2",
    "--unicodes=ef3e,eb99,ea6c,edca,ecaf,ec54,ee83,ebad,ec2e,f2bc,ef4a,f1f0,f0da,eeb5,f3e6,ee66,ea76,<NEW>",
    "--flavor=woff2",
    "--output-file=assets/fonts/remix-subset.woff2",
    "--layout-features=", "--no-hinting", "--desubroutinize",
])
PY
```

Then add `.ri-mail-line:before{content:"\xxxx"}` to `assets/icon-font.css`.

### Social sharing card

`assets/img/og-image.png` is the 1200 × 630 card used by WhatsApp, X, LinkedIn
and Slack. **`og:image` must be an absolute URL once the site is live** —
change both `og:image` and `twitter:image` in `index.html` to
`https://yourdomain.com/assets/img/og-image.png`.

### Résumé

`assets/pdf/zachary-resume.pdf` is a placeholder generated from the site copy.
Replace it with your own PDF, keeping the file name.

---

## 3. Tokens (all in `:root`, `assets/styles.css` §1)

| Group | Values |
|---|---|
| Surfaces | `#0B0D12` page, `#11141B` card, `#171B24` raised, `#1D2230` |
| Borders | `rgba(255,255,255,.08)` · strong `.14` |
| Text | `#EAEEF5` primary · `#A5AEC0` secondary · `#7C8698` tertiary |
| Brand | blue `#3B6EF6`, cyan `#22D3EE`, indigo `#6D5BF5` |
| Buttons | `--gradient-btn` (deep blue → indigo) so white text clears 4.5:1 |
| Focus | `#6EA8FF` |
| Layout | container 1200 px, header 64 px, section rhythm `clamp(4rem,7vw,6.5rem)` |
| Radii | 6 / 8 / 12 / 16 / pill |
| Motion | 160 / 240 / 400 ms, `--ease` cubic-bezier(.22,.61,.36,1) |

Spacing uses `--s-1 … --s-8` = 4, 8, 12, 16, 24, 32, 48, 64 px.
Type uses `clamp()` throughout, so nothing jumps between breakpoints.

**Note on the gradient:** the bright cyan cannot carry white text (2.2:1), so
it is used for the logo, dots, rules, icon tint and the headline tail — never
behind body copy. Buttons use the deeper two stops.

---

## 4. What the JavaScript does (`assets/main.js`)

`main.js` is loaded by both pages; every function exits early if its element
is missing, so the same script is safe on `hire.html`.

1. **`PROJECTS`** — read from `assets/projects.js`; `renderProjects()` writes
   the filter chips, the cards and the quick-view dialog.
2. **Filters** — chips toggle `hidden` on cards, keep `aria-pressed` in sync
   and announce "Showing 2 of 5 — App projects."
3. **Quick view** — one `<dialog>` reused for every card; populated from the
   same data, opened with `showModal()`.
4. **Navigation** — mobile dropdown: toggle, `aria-expanded`, Escape to close
   (focus returns to the button), outside click, close on link, auto-close
   above 900 px.
5. **Scroll state** — header shadow past 8 px; `aria-current` + underline on
   the section in view.
6. **Scroll reveal** — `IntersectionObserver` on `[data-reveal]`, one-shot,
   staggered by `--i`.
7. **Back to top** — appears past 500 px, hides over the footer.
8. **Contact form** — honeypot check, then EmailJS submit with inline status.
9. **Year** — footer copyright.

Every function returns early if its element is missing, so the same `main.js`
can be reused on other pages.

---

### Scroll reveal

Every `[data-reveal]` element fades in and lifts 14 px as it enters the
viewport, driven by an IntersectionObserver in `main.js`, with a **0.4 s**
transition (`--t-reveal` in `styles.css` §1) and a 60 ms stagger between
siblings.

Three deliberate details:

1. **Gated on `.js`.** A three-line inline script in `<head>` adds a `js` class
   before first paint. The hidden state is `.js [data-reveal]`, so with
   scripting blocked nothing is ever invisible — the page just appears without
   the fade.
2. **Nothing below the fold stays hidden.** The observer marks elements already
   in view immediately and unobserves each one after it fires; it is one-shot,
   not a re-triggering parallax.
3. **Reduced motion wins.** With `prefers-reduced-motion: reduce` the duration
   collapses to zero and every element is visible from the start.

To retune it, change one token:

```css
--t-reveal: 0.4s;   /* styles.css :root */
```

The stagger is `transition-delay: calc(var(--i, 0) * 60ms)`, and `--i` is set
per card in `main.js` and per sibling in `styles.css` §14.

**If JS is off entirely**, the work grid renders a plain list of links to the
case studies from the `<noscript>` block in `index.html` — generated by
`tools/build-case-studies.py`, so it never drifts from the data.

---

## 5. Accessibility, behaviour, performance

- Skip link, one `<h1>`, landmarks, labelled fields, `aria-hidden` icons.
- All targets ≥ 44 × 44 px; `:focus-visible` is a 2 px `--focus` ring at 2 px
  offset.
- Contrast: 16.7:1 primary, 8.7:1 secondary, 5.3:1 tertiary; 5.5:1 and 6.3:1
  across the button gradient.
- `prefers-reduced-motion: reduce` removes reveals and smooth scrolling.
- `scroll-margin-top` on every section, so anchors clear the 65 px header
  (they land at 88 px).
- Images: explicit dimensions, `loading="lazy"` below the fold, `fetchpriority`
  on the hero, descriptive `alt`.
- axe-core: **0 violations** at 1440, 768 and 390 on the home page, the hire
  page and the 404 page.
- Payload: ~0.9 MB total on first load (was 2.6 MB before the WebP and font
  work). No render-blocking third-party requests.

---

## 5a. Off-site kit (`offsite/`)

| File | What it is |
|---|---|
| `linkedin-banner.png` | 3168 × 792 cover photo |
| `email-signature.html` | Copy-paste signature (inline styles only) |
| `rate-card.pdf` | One-page A4: engagements, terms, process |

```bash
python3 tools/make-offsite-kit.py    # re-render the PNG and PDF
```

`offsite/README.md` has the exact copy for the LinkedIn headline and About
section, and where to paste the signature in Gmail, Outlook and Apple Mail.
The rate card carries no prices by design — it explains the pricing model
instead, which is honest while rates are still moving.

---

## 6. Manual test checklist

1. **Responsive** — 320, 375, 390, 640, 768, 900, 1024, 1280, 1440, 1920. No
   horizontal scrollbar at any width.
2. **Menu (≤ 899 px)** — open, Escape closes, outside tap closes, link tap
   closes and jumps.
3. **Keyboard only** — Tab from the top: skip link → logo → four nav links →
   CTA → hero buttons. Every stop shows a visible ring. Enter activates.
4. **Anchors** — Work / About / Services / Contact land ~24 px below the
   header; the nav underline follows.
5. **Reduced motion** — enable it, reload: no fade-ins, instant scrolling.
6. **Form** — submit empty (browser validation), then with a real address. The
   status line reports "Sending…" then success.
7. **404** — visit `404.html` (or `/anything` once deployed).
8. **Lighthouse** on the deployed URL, desktop and mobile.
9. **Links** — `detailUrl`, `repoUrl`, `liveUrl` still point at `"#"` until you
   fill them in.

---

## 7. Deploying

Static site: drag the `studio` folder into Netlify Drop, or push it to GitHub
and point Vercel/Pages at it. No build command, no output directory — the
folder **is** the site.

Before you publish:

- [ ] Replace the résumé PDF.
- [ ] Fill in real project links.
- [ ] Set the domain in `robots.txt`, `sitemap.xml`, `og:image`, `twitter:image`
      and add `<link rel="canonical">` in `<head>`.
- [ ] Test the EmailJS form from the live domain (the key is domain-restricted).
- [ ] Confirm the social card renders when the URL is pasted into WhatsApp.
