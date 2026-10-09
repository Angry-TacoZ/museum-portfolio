# The Tools That Changed How We Think

An interactive 3D museum portfolio prototype about Douglas Engelbart, Alan Kay, Bret Victor, and an unfinished installation for James Lane.

## Scope

This is an art-direction and interaction MVP. It proves the spatial narrative, guided navigation, camera choreography, exhibit interactions, responsive presentation, and portfolio reveal. Detailed biographies and final project case studies remain out of scope.

## Run locally

```powershell
npm install
npm run dev
```

## Verify

```powershell
npx playwright install chromium
npm run verify
```

`npm run verify` runs lint, unit tests, production builds for both `/` and `/museum-portfolio/`, and Chromium smoke tests from both paths. CI runs the same command on Windows and Ubuntu: Windows exercises the accessible fallback, while Ubuntu exercises the full WebGL scene and checks that all four portrait textures load. On Linux, install browser system dependencies with `npx playwright install --with-deps chromium`.

## Deploy to GitHub Pages

The `Deploy GitHub Pages` workflow verifies pull requests and builds the app for the repository's `/museum-portfolio/` URL path without publishing. On pushes to `main`, it verifies, builds, and publishes the site. To enable the first deployment, a repository maintainer must open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. After that, deployments run automatically on pushes to `main`; the workflow can also be started manually from the Actions tab.

The committed suite in `tests/browser/` checks desktop/mobile guided navigation, entrance skip links, WebGL failure navigation, dialog focus through camera arrival, keyboard focus trapping and restoration, controls, overflow, reset locking, and reduced motion. Run `npm run test:browser` after building to repeat just the browser checks. It starts an isolated production preview on port 4175; that port must be free. Failures retain screenshots and traces under `test-results/`, and CI uploads the report as an artifact. These smoke checks do not replace visual composition review.

To verify the no-WebGL experience locally, open `http://127.0.0.1:5173/?forceWebglFailure=1`. The failure switch is restricted to localhost and exposes the persistent DOM fallback navigation.

The museum uses React for accessible content and controls, React Three Fiber for architecture and exhibit objects, and Framer Motion for interface transitions. Camera poses and route order live in `src/museum/stations.ts`.

Exhibit cameras fit the installation's bounds to the actual canvas aspect ratio and refit after resizing or rotating the window. Portrait geometry is shared with the framing tests in `src/museum/framing.ts`; foreground gallery walls are clipped out of the active view. Narrow or short windows use a stacked canvas and scrollable text layout.

Quiet, looping piano is enabled by default at 12% volume; the header's music toggle switches it off or back on. If the browser blocks autoplay, playback starts on the visitor's first interaction. Recording credits and reuse rights are documented in [`docs/AUDIO_SOURCES.md`](docs/AUDIO_SOURCES.md).

## Art direction

The environment uses pale paper-like architecture, simplified grayscale forms, charcoal contours, original hand-drawn diagrams, and a single restrained light-blue accent. Taped placards, annotated controls, and project pin-ups make the spatial environment and interpretation surfaces feel like one illustrated editorial system without copying third-party illustrations or brand assets.

The three pioneer exhibits use locally stored, deterministically processed portrait murals. The final installation includes a monochrome portrait edited from James's supplied photograph in its right-hand frame. Source credits, licenses, and generation details are documented in [`docs/PORTRAIT_SOURCES.md`](docs/PORTRAIT_SOURCES.md).
