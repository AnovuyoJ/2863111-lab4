<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot / AI Agent Instructions — Country Explorer

Purpose
- Single-page static app (HTML + CSS + JS) named "Country Explorer". Edit only what you must; preserve DOM IDs and layout unless you update HTML and CSS together.

Big picture (what to know quickly)
- Files: `index.html`, `script.js`, `style.css` (note: `index.html` currently links `styles.css` — filename mismatch).
- UI contract: JS should interact with these DOM IDs: `country-input`, `search-btn`, `loading-spinner`, `country-info`, `bordering-countries`, `error-message`.
- `country-info` and `bordering-countries` are placeholders that JS populates; keep their containers and IDs intact when modifying markup.

Project-specific conventions & gotchas
- Static site: there is no build system or tests in the repo — serve files over HTTP when testing (see developer workflows).
- CSS/name issues to be aware of:
  - `index.html` references `styles.css` but repo contains `style.css` (rename or update reference).
  - CSS has `.county-card` (misspelling) while HTML uses `country-card` — prefer matching the HTML (`country-card`) and update CSS accordingly.
- Minimal DOM semantics: prefer updating container `innerHTML` or using DOM creation APIs to inject country cards; do not add new required IDs unless also reflected in `index.html`.

Developer workflows (how to run & test locally)
- Serve the workspace root over HTTP (recommended) to allow network/fetch: e.g. `python -m http.server 8000` then open `http://localhost:8000`.
- Alternatively use VS Code Live Server or any static server. No build step required.
- Debugging: open browser DevTools Console and Network tab. Look for failed fetches or CORS issues.

Integration points & inferred behavior
- The UI expects country data to be fetched and rendered (country details and bordering countries). The codebase doesn't include an API client; agents may implement fetch calls. A commonly used public API is https://restcountries.com (e.g., `/v3.1/name/{name}`) — treat this as an implementation suggestion and confirm with the maintainer if unsure.

Style & PR guidance for agents
- Keep changes minimal and atomic. When fixing naming mismatches (file or CSS typos), update all affected references in the repo in the same PR.
- Preserve accessibility: ensure buttons use `<button>` and images include `alt` text if added.
- Add simple inline comments in `script.js` to explain non-obvious DOM wiring. Do not add heavy stylistic changes to layout without approval.

Examples (quick references)
- Hook JS to button: `document.getElementById('search-btn').addEventListener('click', handler)`
- Populate country container: `document.getElementById('country-info').innerHTML = '<div class="country-card">...</div>'`

When in doubt
- Ask the repo owner before introducing new dependencies or changing the overall file layout.

Next step for reviewer: confirm whether to (A) rename `style.css` → `styles.css`, (B) update `index.html` to reference `style.css`, and (C) confirm use of an external country API.

-- End
