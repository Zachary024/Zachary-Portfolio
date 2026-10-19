/* ==========================================================================
   projects.js — the single source of truth for the work section
   --------------------------------------------------------------------------
   Loaded before main.js on index.html. Strict JSON inside a single assignment,
   so the same data also drives the generated case-study pages
   (tools/build-case-studies.py reads this file).

   FIELDS
     slug        URL of the case study: work/<slug>.html
     title       Card and <h1> title
     category    Website | App | Dashboard — also the filter chip label
     year        Shown on the card and in the case study meta
     description One line, used on the card and in the quick view
     brief       The problem, in the client's terms
     constraint  The one thing that made it hard
     built       Three to five short bullets: what you actually shipped
     result      What changed afterwards — or what you would measure
     stack       Tools used, shown as pills
     image       3:2 screenshot, 900 × 600 WebP
     imageAlt
     detailUrl   work/<slug>.html
     repoUrl     GitHub — "#" until you have a public repo
     liveUrl     Live build — "#" until it is public

   ⚠ ALL CASE-STUDY COPY BELOW IS PLACEHOLDER, written to fit the screenshots.
     Replace brief / constraint / built / result with what actually happened
     before you publish. The structure is the valuable part.
   ========================================================================== */

window.PROJECTS = [
  {
    "slug": "restaurant-website",
    "title": "Restaurant Website",
    "category": "Website",
    "year": "2026",
    "description": "A seasonal restaurant site with a menu the owner updates without a developer.",
    "client": "Àura Dining",
    "role": "Design and build",
    "timeline": "3 weeks",
    "brief": "The restaurant changed its menu every six weeks. Every change meant emailing a developer, waiting, and sometimes going live with a dish that had already been dropped.",
    "constraint": "The owner is not technical and works from a phone between services. Anything that needed a laptop or a tutorial was going to fail within a month.",
    "built": [
      "A five-page site: menu, story, reservations, private dining and contact.",
      "Menus as structured content, so adding or retiring a dish is a form, not a code change.",
      "A reservation form that emails the front desk and adds a calendar link to the reply.",
      "Enquiry tracking so the owner can see which pages bring bookings."
    ],
    "result": "Menu updates moved from a developer ticket to a two-minute edit. Placeholder for the real number — write down the concrete change (time saved, bookings, bounce rate) while you still remember it.",
    "stack": ["HTML & CSS", "JavaScript", "Node.js", "Figma"],
    "image": "assets/img/restaurant-website.webp",
    "imageAlt": "Restaurant homepage with a plated dish and a serif headline.",
    "detailUrl": "work/restaurant-website.html",
    "repoUrl": "#",
    "liveUrl": "#"
  },
  {
    "slug": "yoga-app",
    "title": "Yoga App",
    "category": "App",
    "year": "2026",
    "description": "Daily flows, class schedules and progress tracking in one calm interface.",
    "client": "Independent studio",
    "role": "Product design and front-end",
    "timeline": "5 weeks",
    "brief": "Students were booking classes on Instagram DMs and following sessions from screenshots saved in their camera roll. Nothing carried over from one week to the next.",
    "constraint": "It had to feel quiet. Most fitness apps shout; the brief was the opposite, and every screen was judged against whether it lowered the heart rate.",
    "built": [
      "A daily flow screen with one primary action and no streaks or badges.",
      "A weekly schedule that shows the next class without opening a second screen.",
      "Progress kept to three numbers, all of them about consistency rather than performance.",
      "A component and type scale that keeps the interface consistent as classes are added."
    ],
    "result": "Placeholder for a real result — completion of the first flow, return visits, or bookings moved off DMs.",
    "stack": ["Figma", "React", "CSS"],
    "image": "assets/img/yoga-app.webp",
    "imageAlt": "Three yoga app screens: a daily flow, a pose, and a weekly schedule.",
    "detailUrl": "work/yoga-app.html",
    "repoUrl": "#",
    "liveUrl": "#"
  },
  {
    "slug": "fast-food-app",
    "title": "Fast Food App",
    "category": "App",
    "year": "2025",
    "description": "Two-tap checkout and live delivery tracking built for small screens.",
    "client": "Burger Run",
    "role": "Interface design, front-end",
    "timeline": "6 weeks",
    "brief": "Orders arrived through three channels and were written on paper. The kitchen found out what to cook from a phone call, and customers called back to ask where their food was.",
    "constraint": "Most orders happen on a mid-range Android phone on mobile data, so the whole flow had to stay under 200 KB per screen and work on a shaky connection.",
    "built": [
      "A menu and cart that fit on one thumb-reachable column.",
      "Checkout reduced to two taps for a returning customer.",
      "An order status screen with four honest states instead of a fake map.",
      "Offline handling: the cart survives a dropped connection and retries once."
    ],
    "result": "Placeholder for a real result — orders per week, time per order taken, or calls asking for status.",
    "stack": ["Figma", "JavaScript", "CSS"],
    "image": "assets/img/fast-food-app.webp",
    "imageAlt": "Fast food app screens with a burger order and delivery tracking.",
    "detailUrl": "work/fast-food-app.html",
    "repoUrl": "#",
    "liveUrl": "#"
  },
  {
    "slug": "finance-dashboard",
    "title": "Finance Dashboard",
    "category": "Dashboard",
    "year": "2025",
    "description": "Revenue reporting reduced to the numbers a founder checks each morning.",
    "client": "Small agency",
    "role": "Design and build",
    "timeline": "7 weeks",
    "brief": "Monthly revenue lived in a spreadsheet that three people edited and nobody trusted. The founder opened it every morning and still could not answer “are we fine?”",
    "constraint": "The data already existed in Stripe, a bank export and the project tracker. The job was reconciliation, not a prettier chart.",
    "built": [
      "Ingestion from three sources into one table with a clear definition per column.",
      "Four summary numbers at the top — the only ones the founder actually used.",
      "A revenue trend with month and quarter views, and a drill-down to invoices.",
      "A data table that exports to CSV for the accountant."
    ],
    "result": "Placeholder for a real result — hours per month spent on reporting, or the number of errors found in the first month.",
    "stack": ["React", "Node.js", "Python"],
    "image": "assets/img/finance-dashboard.webp",
    "imageAlt": "Finance dashboard with a revenue chart, summary cards and a data table.",
    "detailUrl": "work/finance-dashboard.html",
    "repoUrl": "#",
    "liveUrl": "#"
  },
  {
    "slug": "interior-studio",
    "title": "Interior Studio",
    "category": "Website",
    "year": "2025",
    "description": "An editorial portfolio that lets large photography carry the studio's work.",
    "client": "Studio Bellevue",
    "role": "Design and build",
    "timeline": "4 weeks",
    "brief": "A portfolio with beautiful photographs and a gallery that made them look small. Every project page had the same eleven-shot carousel regardless of the room.",
    "constraint": "The photographs were shot at different times by different people, in four aspect ratios. The layout had to survive all of them without cropping the architecture.",
    "built": [
      "A project template that adapts its grid to the photographs it is given.",
      "Full-bleed images with captions that stay out of the frame.",
      "A studio page that explains process in four steps, for clients who are new to interiors.",
      "Lazy loading and responsive sizes for galleries of twenty-plus images."
    ],
    "result": "Placeholder for a real result — enquiries per month, time spent adding a project, or average session length.",
    "stack": ["HTML & CSS", "JavaScript", "Figma"],
    "image": "assets/img/interior-studio.webp",
    "imageAlt": "Interior design studio site with a sunlit living room and a project grid.",
    "detailUrl": "work/interior-studio.html",
    "repoUrl": "#",
    "liveUrl": "#"
  }
];
