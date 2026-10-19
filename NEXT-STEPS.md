# What to do next

Everything from the A / B / C / D list is built. What is left is content only
you can supply. Ordered by impact.

---

## 1. Content — replace the placeholders

- [ ] **Case-study copy.** `assets/projects.js` → `brief`, `constraint`,
      `built`, `result` for all five projects. They are written to fit the
      screenshots but they are **not true yet**. Replace them, then run
      `python3 tools/build-case-studies.py`.
- [ ] **The testimonial.** `hire.html` → `#word`. One real quote with a name
      and a role, with written permission. If you have none yet, delete the
      whole `<section id="word">` rather than publish a fake.
- [ ] **Project links.** `repoUrl` and `liveUrl` are `"#"` in every project.
- [ ] **Budget ranges.** The form's price bands (`Under ₦500,000` …) are my
      guesses. Move them to match your real quotes.
- [ ] **The opening line.** Hero: "Two project slots open from November —
      update or remove this line." Update it monthly or delete it.
- [ ] **Cal.com link.** The booking link points at `https://cal.com/`. Replace
      it with your own scheduling URL, or remove the line.
- [ ] **Résumé.** `assets/pdf/zachary-resume.pdf` is still the placeholder.

## 2. Before you deploy

- [ ] **Domain** in: `robots.txt`, `sitemap.xml` (7 URLs), `og:image` and
      `twitter:image` on all three page templates, the JSON-LD `url` on
      `hire.html`, and the two URLs inside `offsite/email-signature.html`.
- [ ] **Canonical tag** in the `<head>` of `index.html`, `hire.html` and the
      case-study template.
- [ ] **Test the form** from the live domain — the EmailJS key is
      domain-restricted. Check the template receives `user_budget`.
- [ ] **Test the quick view and filters** with JavaScript on and with it off
      (cards simply do not render without JS — acceptable, but know it).
- [ ] **Social card** — paste the URL into WhatsApp and check the 1200 × 630.

## 3. Off-site, ten minutes each

- [ ] Upload `offsite/linkedin-banner.png`.
- [ ] Paste the headline and About copy from `offsite/README.md`.
- [ ] Pin three GitHub repos that match your three best cards.
- [ ] Add the email signature; host the logo so the `<img>` resolves.

## 4. After the first three enquiries

These are worth doing only once you see how people actually reply:

- **A `/process` page** if the hire page's FAQ section keeps getting asked in
  email anyway.
- **A before/after slider** for one project, if any of them was a redesign.
- **Per-case-study OG images** — right now all five share the site card.
  Worth it only if you start sharing individual case studies.
- **Publish prices** on the hire page and rate card once your quotes have
  stabilised. Replace the "From: On request" logic with real numbers in the
  engagement table and delete the pricing note.

---

## Done in this build

| From the list | What shipped |
|---|---|
| **A — Case studies** | 5 generated pages in `work/`, same header/type/cards as the site, `tools/build-case-studies.py` to rebuild them from data |
| **A — Testimonial** | Section on `hire.html` (`#word`) with a structural placeholder |
| **B — Budget field** | Select in the contact form with five ranges and a hint line |
| **B — Next opening** | Availability line under the hero meta |
| **B — Payment terms** | New `#terms` section on `hire.html` + the first FAQ rewritten |
| **B — Booking link** | Inside the form card, under the submit button |
| **C — Filter chips** | Built from `category`, `aria-pressed`, live result count |
| **C — Quick view** | Native `<dialog>`, keyboard-complete, linked to the case study |
| **C — Per-project cards** | Band starts here; case-study pages exist, per-page OG images still open |
| **C — Service JSON-LD** | `ProfessionalService` + `OfferCatalog` + `FAQPage` on `hire.html` |
| **D — LinkedIn banner** | `offsite/linkedin-banner.png`, 3168 × 792 |
| **D — Rate card** | `offsite/rate-card.pdf`, one A4 page, no invented prices |
| **D — Email signature** | `offsite/email-signature.html`, inline styles only |
| **E — Nothing** | No theme toggle, no skill bars, no counters, no loading screen, no modal popup |
