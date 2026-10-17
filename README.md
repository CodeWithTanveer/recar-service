# Re Car Service Website

A modern, mobile-first website for **Re Car Service**, a car repair and maintenance business at Groenekanseweg 66A, 3732 AG De Bilt, Netherlands. Built with plain HTML, CSS and JavaScript. No framework and no build step.

## Features

- Hero carousel with three slides (autoplay, arrows, progress dots, pause/play, swipe and keyboard support)
- Sticky header that turns solid on scroll, with a scroll progress bar and active-link highlighting
- Six service cards, rendered from an editable list
- "Why Choose Us" and "How It Works" sections
- Two Google reviews with a 4.5/5 summary (shown as based on 2 reviews)
- Contact details, Google Maps embed, click-to-call and Get Directions buttons
- Tabbed forms: appointment request and contact message, with validation, honeypot spam protection and honest success/error messages
- Mobile bottom bar with Call Now and Get Directions
- Light and dark colour support (follows the system setting)
- Respects `prefers-reduced-motion` (animations and autoplay are turned off)
- Local business SEO: title, description, Open Graph tags and `AutoRepair` JSON-LD (verified details only, no review markup)

## Project structure

```
recar/
├── index.html   # page markup, SEO metadata, structured data
├── style.css    # all styling and animations
├── script.js    # settings, rendering, forms, carousel, scroll effects
└── README.md
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Owner settings

Everything the owner is likely to change is at the top of `script.js`:

| Setting | Purpose |
| --- | --- |
| `CONFIG.phone` / `phoneDisplay` | Phone number used for call links and display |
| `CONFIG.hours` / `hoursShort` | Opening hours text (currently the Google listing: "Open 24 hours") |
| `CONFIG.maps` | Google Maps directions link |
| `CONFIG.reviewsUrl` | Verified Google Business Profile reviews URL (falls back to the Maps link while empty) |
| `CONFIG.formEndpoint` | Form service URL (see below) |
| `CONFIG.slides` | Hero photo URLs, alt text and focal position |
| `CONFIG.images.about` | Optional workshop photo for the About section |
| `SERVICES` | Service names, descriptions and icons |
| `WHY` | "Why Choose Us" points |

## Forms

The forms do **not** send anything until `CONFIG.formEndpoint` is set. Until then they validate input and then show a clear "not connected" message instead of a fake success.

To enable them:

1. Create a form on a service such as Formspree or Basin that accepts JSON `POST` requests.
2. Paste its endpoint URL into `CONFIG.formEndpoint`.
3. Send a test submission for both the appointment and contact forms.

Submissions are labelled as appointment requests pending confirmation by the business. No availability is shown as confirmed.

## Images and credits

The hero uses two free-to-use photos from Unsplash (Unsplash License):

- Mechanic working on a car engine in a workshop, by Dextar Studio
- Mechanic changing oil in a car, by Jimmy Nilsson Masth

Replace them with your own workshop photos whenever available. If a photo fails to load, the slide falls back to a dark background with a wheel graphic. Keep the photo credit in the footer while Unsplash photos are in use.

## Deployment

Any static host works (Netlify, Cloudflare Pages, GitHub Pages, Vercel). Serve over HTTPS.

## Before launch checklist

- [ ] Set `CONFIG.formEndpoint` and test both forms
- [ ] Confirm opening hours with the owner
- [ ] Add the verified Google reviews URL to `CONFIG.reviewsUrl`
- [ ] Add real workshop photos
- [ ] Have the Privacy Policy text reviewed for GDPR
- [ ] Add `<link rel="canonical">` once the real domain is known
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Add Dutch content or a language toggle (SEO keywords already include Dutch terms)
- [ ] Test at mobile, tablet and desktop widths

## Content rules

The site uses only supplied business details. It does not claim certifications, warranties, prices, years of experience, staff names or extra reviews. The second review is an English summary of a review originally written in Russian.

## Contact

Re Car Service, Groenekanseweg 66A, 3732 AG De Bilt, Netherlands. Phone: +31 6 29444225.
