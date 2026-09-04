# The Tools That Changed How We Think

An interactive 3D museum portfolio prototype about Douglas Engelbart, Alan Kay, Bret Victor, and an unfinished installation for James Lane.

## Scope

This is an art-direction and interaction MVP for private local review. It proves the spatial narrative, guided navigation, camera choreography, basic exhibit interactions, responsive presentation, and portfolio reveal. Portraits, detailed biographies, final project case studies, and production hosting are intentionally out of scope.

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

The museum uses React for accessible content and controls, React Three Fiber for architecture and exhibit objects, and Framer Motion for interface transitions. Camera poses and route order live in `src/museum/stations.ts`.

## Art direction

The environment combines restrained charcoal museum architecture and warm gallery lighting with original ink-and-paper interpretation surfaces. Hand-drawn diagrams, taped placards, annotated controls, and project pin-ups carry the approachable visual voice without copying third-party illustrations or brand assets.
