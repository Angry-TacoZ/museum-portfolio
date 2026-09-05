# The Tools That Changed How We Think

An interactive 3D museum portfolio prototype about Douglas Engelbart, Alan Kay, Bret Victor, and an unfinished installation for James Lane.

## Scope

This is an art-direction and interaction MVP for private local review. It proves the spatial narrative, guided navigation, camera choreography, exhibit interactions, responsive presentation, and portfolio reveal. Detailed biographies, final project case studies, and production hosting are intentionally out of scope.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

## Verify

```powershell
npm.cmd run lint
npm.cmd run test
npm.cmd run build
```

To verify the no-WebGL experience locally, open `http://127.0.0.1:5173/?forceWebglFailure=1`. The failure switch is restricted to localhost and exposes the persistent DOM fallback navigation.

The museum uses React for accessible content and controls, React Three Fiber for architecture and exhibit objects, and Framer Motion for interface transitions. Camera poses and route order live in `src/museum/stations.ts`.

## Art direction

The environment uses pale paper-like architecture, simplified grayscale forms, charcoal contours, original hand-drawn diagrams, and a single restrained light-blue accent. Taped placards, annotated controls, and project pin-ups make the spatial environment and interpretation surfaces feel like one illustrated editorial system without copying third-party illustrations or brand assets.

The three pioneer exhibits use locally stored, deterministically processed portrait murals. Source credits, licenses, and regeneration instructions are documented in [`docs/PORTRAIT_SOURCES.md`](docs/PORTRAIT_SOURCES.md).
