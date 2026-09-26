# 5 STAR Sales & Service — Website

Static website for **5 STAR Sales & Service, Pattukkottai**, covering CCTV camera sales, installation and service, AC sales and service, and refrigerator, washing machine, water heater and UPS service, electrical, wiring and plumbing works, plus spare parts and used appliances.

It's plain HTML, CSS and a small vanilla JavaScript file. It has no build step, no database, no server code and no Node.js, so it runs on **GitHub Pages** as it is.

---

## Site details

| What | Value |
|------|-------|
| Live site (custom domain) | **https://thefivestar.in/** (set everywhere with `./set-site-url.sh`, stored in `site-url.txt`) |
| GitHub repository | https://github.com/thefivestar-services/website |
| GitHub Pages address | https://thefivestar-services.github.io/website/ (redirects to the custom domain once it is set in Pages) |
| Shop address | Railway Station Road, Nadimuthu Nagar, Pattukkottai, Tamil Nadu 614602 |
| Google Maps link | https://maps.app.goo.gl/QaKWtsYDxicPGYmz7 |
| Plus Code | C88C+FM Pattukkottai, Tamil Nadu (full code `7J2XC88C+FM`) |
| Coordinates (JSON-LD `geo`) | 10.416188, 79.321687, decoded from the Plus Code |
| Google Business Profile ID | 18421696268107883094 (for your records; not shown on the site) |
| Google Business Profile shop code | 11392838984702571722 (for your records; not shown on the site) |
| Phone / WhatsApp | +91 96885 27308 |
| Email | contact.thefivestar@gmail.com |
| Formspree form | moevlzew |

### Still to fill in

| # | What | Where | Status |
|---|------|-------|--------|
| 1 | **Opening and closing times** | Contact section `TODO(owner)` comment; JSON-LD `openingHoursSpecification` | ❗ only "Open all days" is set |
| 2 | **Social profiles** (Facebook / Instagram) | JSON-LD `sameAs`, using the commented template in each page's `<head>` | optional, leave out until they exist |
| 3 | Google Search Console verification (optional) | `index.html` `<head>` (commented `google-site-verification`) | optional |
| 4 | Google Analytics 4 ID (optional) | `js/main.js` → `SITE_CONFIG.ga4Id` | optional, empty means off |
| 5 | More service areas (optional) | `js/main.js` → `SITE_CONFIG.serviceAreas` | only "Pattukkottai" |

Search the project for `TODO(owner)` and `REPLACE` to find every placeholder.

---

## Project structure

```
/
├── index.html                               Home page (all main sections)
├── cctv-camera-pattukkottai/index.html      CCTV sales, installation & service
├── ac-service-pattukkottai/index.html       AC service, repair & sales
├── refrigerator-service-pattukkottai/       Fridge / refrigerator service
├── washing-machine-service-pattukkottai/    Washing machine service
├── water-heater-service-pattukkottai/       Water heater / geyser service
├── used-appliances-pattukkottai/            Used AC, fridge, washing machine
├── electrical-plumbing-pattukkottai/        Electrical works, house/shop wiring, plumbing
├── templates/location-page-template.html    Template for a real nearby-town page (noindex)
├── 404.html                                 "Page not found"
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── site.webmanifest
├── set-site-url.sh                          Changes the site URL everywhere
├── site-url.txt                             Current site URL (used by the script)
├── .nojekyll                                Tells GitHub Pages to serve files as they are
├── CNAME                                    Custom domain for GitHub Pages (thefivestar.in)
├── assets/
│   ├── images/     product photos (WebP) and social-share image
│   ├── icons/      icons.svg sprite, favicon PNGs, app icons
│   ├── logo/       logo in several sizes + 5-star-logo-master.png
│   └── video/      logo reveal video for the home page hero (720p, 480p for phones, poster image)
├── css/style.css
└── js/main.js      ← SITE_CONFIG block at the top
```

All links are **relative**, so the site works both at `https://thefivestar-services.github.io/website/` and on `https://thefivestar.in/`.

---

## Edit business details

The phone number, email and Maps link appear as plain text in the HTML on purpose, so Google can read them without running JavaScript. To change one, use **Find and Replace in all files** (VS Code: `Ctrl+Shift+H`):

| Value | Find | Replace with |
|-------|------|--------------|
| Phone as shown | `+91 96885 27308` | new number in the same format |
| Phone in `tel:` links and JSON-LD | `+919688527308` | new number, no spaces |
| WhatsApp in links | `919688527308` | new number, digits only |
| Email | `contact.thefivestar@gmail.com` | new email |
| Google Maps link | `https://maps.app.goo.gl/QaKWtsYDxicPGYmz7` | new Maps link |

Then update `whatsappNumber` in `js/main.js`.

**Address:** it appears in each page's Contact section, in the footer, and in the JSON-LD `address` block in each page's `<head>` (`streetAddress`, `postalCode`, `geo`). Find and replace `Railway Station Road, Nadimuthu Nagar` if it ever changes.

**Hours:** in each page's Contact section, look for the `TODO(owner)` comment next to "Business hours" and replace the text below it. Also add the times to `openingHoursSpecification` in the JSON-LD.

> Keep the **name, address and phone (NAP)** exactly the same on the website, your Google Business Profile, Facebook, JustDial and anywhere else you are listed.

Validate the structured data after any change: <https://validator.schema.org/> and <https://search.google.com/test/rich-results>.

---

## Add or change services

- **Home page service cards** are in `index.html` inside `<section id="services">`. Each card is one `<article class="card">`. Copy a card, then change the icon, the title, the text, the `data-enquire` value and the "Details" link.
- **Icons:** use `<svg class="icon" aria-hidden="true"><use href="#i-cctv"/></svg>`. Available names include `i-cctv`, `i-ac`, `i-snow`, `i-fridge`, `i-washer`, `i-heater`, `i-ups`, `i-gear`, `i-recycle`, `i-wrench`, `i-bolt`, `i-plug`, `i-tap`, `i-phone`, `i-wa`, `i-pin`, `i-clock`, `i-mail`, `i-check`, `i-arrow` and `i-star`. The icon set is copied inside each page, just after `<body>`, so icons also work when a page is opened straight from disk. `assets/icons/icons.svg` is the master copy. To add a new icon, add its `<symbol>` there and to the copy in each page.
- **Form service list:** the `<select id="f-service">` in each page. If a card's `data-enquire` value exactly matches an option, clicking "Enquire Now" preselects that option.
- **A new service page:** copy the folder of the most similar page, for example `water-heater-service-pattukkottai/`, and rename it with a descriptive, hyphenated name. Update the `<title>`, `meta description`, `canonical`, `og:url`, H1, breadcrumb, JSON-LD and content. Add the page to `sitemap.xml`, to the footer "Services" list on every page and to the home page.

## Replace the logo

The logo was cut out of the supplied artwork and given a navy outline, so it reads on white and on dark backgrounds. The full-size version is `assets/logo/5-star-logo-master.png`. To replace it, export a new transparent PNG and save these sizes with the same file names:

- `assets/logo/5-star-logo-120.webp`, `-240.webp`, `-480.webp` (widths 120, 240 and 480 px) and `5-star-logo-480.png`
- `assets/icons/apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `favicon-32.png` and `/favicon.ico`

A free converter such as <https://squoosh.app> can create the WebP files. If the shape changes, update the `width`/`height` attributes on the logo `<img>` tags.

## Home page logo video

The home page hero shows the logo reveal animation (`assets/video/`). It plays once with no sound, then holds on the final logo. It starts only when it is on screen, is skipped for visitors who have turned on "reduce motion", and has a small pause / replay button. Phones get the 480p file (≈0.4 MB), larger screens the 720p file (≈0.7 MB). The poster image shows until the video loads.

To replace it, export a new MP4 (H.264, no audio) and overwrite `5-star-logo-reveal-720.mp4` (1280×720), `5-star-logo-reveal-480.mp4` (854×480) and `5-star-logo-reveal-poster.webp` (a still of the last frame), for example:

```bash
ffmpeg -i new-video.mp4 -vf scale=1280:720 -c:v libx264 -crf 26 -an -movflags +faststart assets/video/5-star-logo-reveal-720.mp4
ffmpeg -i new-video.mp4 -vf scale=854:480  -c:v libx264 -crf 27 -an -movflags +faststart assets/video/5-star-logo-reveal-480.mp4
```

Keep the full 4K master outside this folder, so the website stays light.

## Configure the contact form

The form sends to **Formspree** (<https://formspree.io>). The endpoint is set in **one place**: `js/main.js` → `SITE_CONFIG.formEndpoint` (currently `https://formspree.io/f/moevlzew`). The `action="…"` attribute on each form is a fallback for visitors without JavaScript. If you change the form ID, find and replace `moevlzew` in all files.

- A Formspree form ID is **public** by design, not a secret key. Nothing secret is stored in the frontend.
- In the Formspree dashboard, turn on email notifications and add your domain under **Settings → Restrict to domain** once the site is live.
- **Spam protection:** a hidden honeypot field (`_gotcha`) that bots fill in and people don't, plus Formspree's own filtering. You can also turn on reCAPTCHA in Formspree.
- **Duplicate protection:** the button is disabled while sending, and sending the same details twice is blocked.
- The form checks the name, a 10-digit Indian mobile number and the chosen service, then shows a clear success or error message.
- **Send on WhatsApp** in the form opens WhatsApp with the typed details, which is useful for customers who prefer chatting.

Send one test enquiry after publishing, and confirm the email reaches you.

## Configure WhatsApp

In `js/main.js`:

```js
whatsappNumber: "919688527308",                         // country code + number, digits only
whatsappMessage: "Hello 5 STAR, I need {service} in {place}.",
```

Each WhatsApp button fills in `{service}` from its `data-wa` attribute, for example `data-wa="AC service"`. `{place}` defaults to Pattukkottai, or uses the Location field when sent from the form. The `href` in the HTML is a working fallback for visitors without JavaScript.

## Configure Google Maps

- The **Get Directions** buttons use the shop's Maps link, `https://maps.app.goo.gl/QaKWtsYDxicPGYmz7`.
- The **Show map** embed (`SITE_CONFIG.mapEmbedUrl` in `js/main.js`) is pinned to the shop's Plus Code, `7J2XC88C+FM`. If you prefer Google's own embed of the business listing, open the shop in Google Maps, choose **Share → Embed a map**, and paste only the `src="…"` URL into `mapEmbedUrl`.
- The JSON-LD `geo` coordinates (10.416188, 79.321687) come from the same Plus Code.

The map loads only when a visitor taps **Show map**, which keeps the page fast on mobile data.

## Configure the domain

The site is set up for **https://thefivestar.in/**, hosted on GitHub Pages from the repository `thefivestar-services/website`.

- `site-url.txt` holds the public URL, and every canonical tag, social-share tag, JSON-LD block, `sitemap.xml` and `robots.txt` already uses it. If the address ever changes, run `./set-site-url.sh https://new-address/` (on Windows use Git Bash) to update every file.
- The `CNAME` file contains `thefivestar.in`. GitHub Pages reads it to serve the site on your domain. Keep it in the repository: if it is deleted, Pages drops the custom domain.
- With a custom domain, `robots.txt` is read by search engines, since it sits at the root of `thefivestar.in`.

### One-time GitHub Pages and DNS setup

1. In the repository, go to **Settings → Pages → Custom domain**, enter `thefivestar.in` and save. It matches the `CNAME` file.
2. At your domain provider, add the DNS records from [GitHub's guide](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site):
   - `A` records for `thefivestar.in` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - optionally `AAAA` records `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` and `2606:50c0:8003::153`
   - a `CNAME` record for `www` pointing to `thefivestar-services.github.io`
3. When the DNS check passes, tick **Enforce HTTPS**.
4. Optional but recommended: verify the domain under your GitHub account or organisation (**Settings → Pages → Verified domains**), which stops anyone else claiming it on GitHub Pages.

## Deploy on GitHub Pages

The files are not pushed yet. When you are ready, upload the **contents** of this folder, so that `index.html` sits at the repository root:

```bash
git init
git add .
git commit -m "5 STAR website"
git branch -M main
git remote add origin https://github.com/thefivestar-services/website.git
git push -u origin main
```

If the repository already has commits (for example a README created on github.com), run `git pull origin main --allow-unrelated-histories` before pushing.

Then:

1. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, then **main** and **/ (root)**, and save.
2. Complete the [custom domain setup](#one-time-github-pages-and-dns-setup) above.
3. After a few minutes the site is live at https://thefivestar.in/, and https://thefivestar-services.github.io/website/ redirects there.
4. Test it on your phone: calling, WhatsApp, the form, directions, the map, the logo video, the menu and every page.

You can open `index.html` directly in a browser to preview it. For the most realistic test, run `python3 -m http.server` in this folder and open <http://localhost:8000>.

---

## Connect Google Search Console

1. Go to <https://search.google.com/search-console> and click **Add property**.
2. Choose a property type:
   - **URL prefix:** enter `https://thefivestar.in/`. Choose the **HTML tag** method, copy the `content="…"` value, and paste it into the commented `google-site-verification` tag in `index.html`. Uncomment it, push, wait a minute, and click **Verify**.
   - **Domain** (recommended, since you own `thefivestar.in`): add the TXT record Google gives you at your domain provider. This covers `www` and non-`www` together.
3. **Submit the sitemap:** open **Sitemaps**, enter `sitemap.xml`, and click **Submit**. The status should become "Success".
4. **Inspect URLs:** paste a page URL into the top search bar (**URL Inspection**), then click **Request indexing** for the home page and each service page. Do this again after big content changes.
5. **Monitor indexing:** **Indexing → Pages** shows which pages are indexed and why others are not, such as "Crawled – currently not indexed" or "Duplicate". The 404 and template pages are marked `noindex` on purpose.
6. **Monitor search queries:** **Performance → Search results** shows the searches people used, such as "ac service pattukkottai", with clicks, impressions, CTR and position. Filter by page to see what each page ranks for.
7. **Find SEO issues:** check **Experience → Core Web Vitals** and **HTTPS**, **Enhancements** (structured-data errors for FAQ and breadcrumbs), **Security & Manual actions**, and the email alerts Google sends.

### Optional: Google Analytics 4

Create a GA4 property at <https://analytics.google.com>, copy the Measurement ID (`G-XXXXXXXXXX`) into `SITE_CONFIG.ga4Id` in `js/main.js`, and push. Call and WhatsApp taps are recorded as `click_call` and `click_whatsapp` events. While the ID is empty, no analytics code loads.

---

## Google Business Profile (most important for local search)

For searches like "AC service near me" or "CCTV shop Pattukkottai", Google's map results come mainly from your **Google Business Profile** (GBP). The website supports it, but doesn't replace it.

1. Create or claim the profile at <https://business.google.com> and complete verification.
2. **Keep information identical:** the business name, address and phone must match the website exactly. Use `5 STAR Sales & Service` and `+91 96885 27308` everywhere.
3. **Add the website URL** to the profile.
4. **Categories:** pick an accurate primary category, for example *Air conditioning repair service* or *Security system installer*. Add others that are true, such as *Appliance repair service*, *Air conditioning store*, *CCTV / security system supplier*, *Refrigerator repair service*, *Washing machine repair service* and *Used appliance store*.
5. **Services:** list each service, matching the website.
6. **Service areas:** add Pattukkottai and the nearby places you really visit.
7. **Hours:** enter real hours and keep them updated, including festival holidays.
8. **Photos:** add genuine photos of the shop front with its board, the inside of the shop, your team at work, and CCTV and AC installations you have done (with the customer's permission). Add new photos regularly.
9. **Reviews:** ask real customers for reviews after a job. Share your GBP review link on WhatsApp, and reply to every review politely. **Never** buy reviews, write your own, or offer gifts for reviews. This breaks Google's rules and can get the profile suspended.
10. **Posts and Q&A:** post offers, new products or seasonal tips (for example, "service your AC before summer"), and answer customer questions.

The profile's Maps link (`https://maps.app.goo.gl/QaKWtsYDxicPGYmz7`) is already used for the "Get Directions" buttons and as `hasMap` in the JSON-LD. Your Business Profile ID (18421696268107883094) and shop code (11392838984702571722) are listed under [Site details](#site-details) for reference. They are used inside the Business Profile dashboard, not on the website.

---

## Local SEO checklist

- [x] Site URL set to https://thefivestar.in/, so canonical tags, the sitemap and social tags are correct
- [x] Full address and PIN code on every page and in the JSON-LD
- [ ] Opening hours on every page and in the JSON-LD
- [x] The shop's own Google Maps link and map embed
- [ ] Custom domain set in GitHub Pages, DNS records added, HTTPS enforced
- [ ] Google Business Profile verified, with the same name, address and phone as the website
- [ ] Website URL added to the Google Business Profile
- [ ] Search Console verified, sitemap submitted, pages requested for indexing
- [ ] Structured data passes <https://validator.schema.org/>
- [ ] Mobile test passed: calling, WhatsApp, the form and directions all work on a phone
- [ ] Test form enquiry received by email
- [ ] Listed with the same details on JustDial, Sulekha, Facebook, Instagram and IndiaMART (only where it makes sense)
- [ ] Real photos of the shop and your work on the profile, and later on the website
- [ ] Getting genuine reviews is part of finishing every job

## Ongoing SEO recommendations

- **Replace sample photos with real ones.** The product images come from your shop banner. Real photos of the shop, van, team and installations, with customer permission, build trust. Use descriptive file names such as `cctv-installation-shop-pattukkottai.webp`, keep each under about 150 KB in WebP format, and write short alt text that describes the photo.
- **Add useful content over time**, for example "How to choose CCTV cameras for a shop", "AC service checklist before summer" or "Why your fridge is not cooling". Write it as helpful advice, not keyword lists.
- **Nearby towns:** only create a location page with `templates/location-page-template.html` for a place you really serve, and only when you have unique, useful content about it. Never create copies that differ only in the town name or spelling ("Pattukottai", "Patukkottai", "PKT"). Those count as doorway pages and can harm the whole site.
- **Keep everything consistent.** When the phone, address or hours change, update the website, the Google Business Profile and other listings on the same day.
- **Watch Search Console monthly.** See which searches bring impressions but few clicks, then improve that page's title and description.
- **Keep it fast.** Don't add heavy sliders, chat widgets or large images. Test with <https://pagespeed.web.dev>.
- **Get genuine local links** from local associations, suppliers, builders and electricians you work with, or local news. Never buy links.
- **Update `sitemap.xml`** (`<lastmod>`) when you add or significantly change a page.

---

## What is intentionally *not* included

To keep the site honest and in line with Google's guidelines, it contains no fake reviews or ratings, no "No.1", "Best" or guaranteed-ranking claims, no years of experience or customer counts, no brand-authorisation claims, no invented address, coordinates or PIN code, and no hidden or keyword-stuffed text. No website can guarantee a first-place ranking on Google. What this site provides is the technical and local SEO groundwork that gives it the best chance to rank well for relevant searches in Pattukkottai.
