# CAP VERT ENERGIE

A responsive static website for CAP VERT ENERGIE, a photovoltaic solar-energy company based in Manouba, Tunisia.

## What is included

- A one-page marketing site in `index.html`.
- A six-step solar project request form in `demande.html`.
- Shared responsive styling in `css/style.css`.
- Shared navigation, validation, stepper, and photo-preview behavior in `js/script.js`.
- Local logo assets in `logo.png` and `logo.jpg`.

## Run locally

No build tool or server is required. Open `index.html` directly in a browser, or serve the folder with any static web server.

Example with the VS Code Live Server extension:

1. Open the project folder.
2. Start Live Server on `index.html`.
3. Use the navigation to test the home page and request form.

## Main routes

- `index.html`: home page, company information, benefits, solutions, process, FAQ, and call to action.
- `demande.html`: six-step request form prototype.

## Important limitation

The form is frontend-only. It validates fields, previews selected images in the browser, and displays a local success state, but it does not send data to a server or persist submissions.

See [PROJECT_REPORT.md](PROJECT_REPORT.md) for the complete project documentation, including architecture, content model, visual system, interaction flows, accessibility, and future improvements.
