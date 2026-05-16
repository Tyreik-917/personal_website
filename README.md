# Tyreik Rogers — Personal Portfolio

Single-page portfolio on `portfolio/index.html` (intro, portfolio showcase with projects / certificates / tech, contact link cards). A **welcome loading screen** (progress + “Portfolio Website”) runs on the first load of the portfolio home each browser session, then the intro appears. Project detail pages: `portfolio/project.html?slug=…` with data in `js/project-detail.js`.

## Stack

- HTML5, CSS (`css/main.css`), vanilla JavaScript (`js/main.js`, `js/project-detail.js`)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) and [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## Structure

```
personal_website/
├── vercel.json             # Root / → /portfolio/
├── css/main.css
├── js/main.js
├── js/project-detail.js
├── js/certificate-detail.js
├── images/
│   ├── trogers.jpg
│   ├── certifications/     # Credential images linked from index
│   └── projects/           # Project thumbnails
└── portfolio/
    ├── index.html          # Primary entry
    ├── projects.html       # Full project grid + filters
    ├── project.html        # Project detail shell (slug-driven)
    ├── certificate.html    # Certificate detail shell (slug-driven)
    └── resume.pdf
```

## Local preview

From the repository root:

```bash
cd /path/to/personal_website
python3 -m http.server 8080
```

Open [http://localhost:8080/portfolio/](http://localhost:8080/portfolio/).

## Deploy

Configured for Vercel: `/` redirects to `/portfolio/`. Any static host works; point the site root at `portfolio/` or mirror the redirect behavior.
