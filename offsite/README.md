# Off-site kit

Assets that live *off* the website. All three render from HTML, so they stay in
step with the site's type and colour — no separate design file to drift.

| File | What it is | Where it goes |
|---|---|---|
| `linkedin-banner.png` | 3168 × 792 (1584 × 396 at 2×) | LinkedIn → Edit profile → Cover photo |
| `email-signature.html` | Copy-paste signature | Gmail / Outlook / Apple Mail |
| `rate-card.pdf` | One-page A4, engagements + terms + process | Attach to a reply instead of writing the same email twice |

Regenerate the PNG and PDF after any copy change:

```bash
python3 tools/make-offsite-kit.py     # needs `pip install playwright`
```

---

## 1. LinkedIn banner

Upload `linkedin-banner.png` as the cover photo. LinkedIn crops the middle of
the image on mobile, so the lockup sits left-of-centre and the right third is
deliberately empty — that is also where your profile photo overlaps on desktop.

**Profile copy that matches the site** — paste these in:

- **Headline**
  `Full-stack developer · Websites, web apps and dashboards for small teams`
- **About**
  `I design and build websites, web apps and dashboards for businesses that need them to work — not just to exist.

  You work directly with me: scope in writing, a fixed price, a working link you can open every week, and the code in your name at hand-off.

  Lagos, Nigeria. Remote worldwide. Currently taking projects from November.`
- **Featured** — pin the site, then the three case studies that match your best
  three repos.

---

## 2. Email signature

1. Open `email-signature.html` in a browser.
2. Select the rendered signature (not the source) and copy it.
3. Paste into your client's signature editor:

   | Client | Where |
   |---|---|
   | Gmail | Settings → General → Signature → Create new |
   | Outlook | File → Options → Mail → Signatures |
   | Apple Mail | Mail → Settings → Signatures |

4. Replace `https://yourdomain.com` in **two** places: the logo `src` and the
   link. The logo must be hosted for it to display — upload
   `assets/img/logo-mark.png` with the site and use that absolute URL.

The signature is a plain table with inline styles only, because Gmail strips
`<style>` blocks inside signatures.

---

## 3. Rate card

`rate-card.pdf` is one A4 page: what the four engagement types include, the
timeline for each, payment terms, and the four-step process.

**It deliberately carries no prices.** "On request" would read as evasive, so
the page instead states *how* pricing works — fixed price for a written scope,
a number in two working days. That is the honest version while your rates are
still moving. When you are ready to publish numbers, replace the timeline
column header with "From" and put a figure in each row.

Edit `rate-card.html`, then re-run `python3 tools/make-offsite-kit.py`.

---

## Still to do by hand

These cannot be generated, but they are ten minutes each:

- [ ] **Pin three repos** on GitHub that match your three strongest cards.
- [ ] **Check your GitHub profile README** — if it is empty, add one line and a
      link to the site.
- [ ] **Upload the banner** and paste the headline and About copy above.
- [ ] **Set the signature** in whichever client you actually send mail from.
- [ ] **Update the two URLs** in the signature and the banner domain.
