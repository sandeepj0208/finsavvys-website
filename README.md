# Finsavvys website

Static site for **finsavvys.com**, hosted on GitHub Pages. Plain HTML/CSS/JS — no build step.

```
index.html            Home
services/index.html   Services   (/services — same URL as the old Squarespace site)
about/index.html      About      (/about)
contact/index.html    Contact    (/contact)
404.html              Not-found page
assets/css/styles.css All styling (colors are variables at the top)
assets/js/main.js     Mobile menu, scroll effects, contact-form thank-you
assets/img/           Logo, favicon, social preview image
```

## Turn on GitHub Pages
1. Repo → **Settings → Pages**.
2. Source: **Deploy from a branch** → Branch **main**, folder **/ (root)** → Save.
3. After ~1 minute the site is live at `https://sandeepj0208.github.io/finsavvys-website/`.

## Point www.finsavvys.com here (when ready to leave Squarespace)
1. Settings → Pages → **Custom domain**: `www.finsavvys.com` → Save (GitHub adds a `CNAME` file). Tick **Enforce HTTPS** once available.
2. At the domain's DNS provider:
   - `CNAME` record: `www` → `sandeepj0208.github.io`
   - `A` records for the root `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Cancel Squarespace only after the new site loads on the domain.

## Contact form
The form uses [FormSubmit](https://formsubmit.co) (free, no account). The **first** submission sends an activation email to teamfinsavvys@gmail.com — click the link once and every later submission arrives by email.

## Common edits
- **Founder photo:** `assets/img/radhika.jpg` (800×1000). Replace the file with the same name to update it.
- **Phone / email / social links:** appear in each page's footer and on the contact page — use GitHub's search (press `.` to open the web editor) to replace everywhere.
- **Colors:** edit the `--navy`, `--gold`, `--cream` variables at the top of `assets/css/styles.css`.
- **Disclaimer:** in every page footer; have it reviewed against your licensing/compliance requirements.
