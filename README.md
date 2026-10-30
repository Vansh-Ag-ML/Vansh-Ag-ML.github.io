# Personal Portfolio Website

My personal portfolio, built with HTML, CSS and JavaScript to show my skills, projects and contact details.

**Live site:** https://vansh-ag-ml.github.io

## Features

- Responsive layout built with CSS Flexbox and Grid, with a mobile menu on small screens
- Sticky navbar with smooth scrolling between sections, and the current section highlighted
- Dark mode toggle that remembers your choice and follows the system setting the first time
- Contact form with JavaScript validation for name, email and message
- Animated scatter plot in the hero section, drawn with inline SVG
- Respects the reduced-motion setting and has visible keyboard focus
- No frameworks or libraries, only three small files

## Sections

Home, About, Skills (with certificates), Projects and Contact.

## Tech stack

HTML, CSS, JavaScript, hosted on GitHub Pages.

## Project structure

```
.
├── index.html   # page structure and content
├── style.css    # layout, colors, dark mode, responsive design
├── script.js    # dark mode, mobile menu, form validation, nav highlighting
└── README.md
```

## Run locally

1. Clone the repo:
   ```
   git clone https://github.com/Vansh-Ag-ML/Vansh-Ag-ML.github.io.git
   ```
2. Open the folder and double-click `index.html`, or open it in VS Code and click **Go Live** if you have the Live Server extension.

## Contact form

By default, the form checks the fields and then opens the visitor's email app with the message filled in. To receive messages without opening an email app, create a form at [formspree.io](https://formspree.io) and paste its URL into `FORM_ENDPOINT` at the top of the form section in `script.js`.

## Deployment

The site is deployed with GitHub Pages from the `main` branch (root folder). Every push to `main` updates the live site in a minute or two.

## Author

**Vansh Agarwal**, B.Tech CSE student at Galgotias University
GitHub: [Vansh-Ag-ML](https://github.com/Vansh-Ag-ML)
Email: vanshagarwal2121@gmail.com
