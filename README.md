# Tyreik Rogers — Personal Portfolio

Static portfolio site for Tyreik Rogers (Computer Science & Mathematics, Binghamton University). It highlights experience, projects, skills, conferences, certifications, and contact information.

## Stack

- HTML5, CSS (`css/main.css`), vanilla JavaScript (`js/main.js`)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts

## Structure

```
personal_website/
├── css/main.css          # Global styles
├── js/main.js            # Navigation, loader, motion preferences
├── images/               # Project and site imagery
└── portfolio/            # Site pages (entry: index.html)
    ├── index.html
    ├── about.html
    ├── experience.html
    ├── project.html
    ├── skills.html
    ├── conferences.html
    ├── certifications.html
    ├── contact.html
    └── resume.pdf
```

## Local preview

From the repository root, serve the folder so asset paths resolve correctly:

```bash
cd /path/to/personal_website
python3 -m http.server 8080
```

Then open [http://localhost:8080/portfolio/](http://localhost:8080/portfolio/) in a browser.

Alternatively, any static file server pointed at this directory works the same way.

## Deploy

Upload the repository (or build output) to any static host (GitHub Pages, Netlify, Cloudflare Pages, etc.). Ensure the site root maps to `portfolio/` if you want `/` to show the home page, or configure the host’s document root accordingly.
