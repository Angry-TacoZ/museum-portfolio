import { Html } from '@react-three/drei'

export type PlacardVariant = 'engelbart' | 'kay' | 'victor' | 'james'

const placards: Record<PlacardVariant, { heading: string, note: string }> = {
  engelbart: { heading: '1968: The Mother of All Demos', note: 'A workstation for navigating, linking, and thinking together.' },
  kay: { heading: 'A medium, not a machine', note: 'Change the object. The idea changes with it.' },
  victor: { heading: 'No gap between question + answer', note: 'The explanation responds while you are still asking.' },
  james: { heading: 'Still arranging the pieces', note: 'Prototype → notice → revise → repeat.' },
}

function PlacardDrawing({ variant }: { variant: PlacardVariant }) {
  if (variant === 'engelbart') {
    return (
      <svg viewBox="0 0 240 100" aria-hidden="true">
        <path d="M18 19h86v54H18zM30 29h62v31H30zM61 74v10M43 85h36" />
        <path d="M126 61c0-16 9-29 21-29s21 13 21 29v20h-42zM147 32v16" />
        <path className="accent-stroke" d="M103 38c24-19 47-23 69-14 16 6 30 3 45-11" />
        <path d="m209 8 8 5-7 7" />
        <text x="15" y="96">NLS workstation</text><text x="174" y="34">link ideas</text>
      </svg>
    )
  }
  if (variant === 'kay') {
    return (
      <svg viewBox="0 0 240 100" aria-hidden="true">
        <path d="M30 16h112v70H30zM39 27h94v47H39z" />
        <rect className="accent-fill" x="59" y="39" width="24" height="24" rx="2" />
        <path d="M158 31c25 3 40 15 45 36M194 60l9 7 5-10M94 51h25M112 45l7 6-7 6" />
        <text x="151" y="20">shape it</text><text x="151" y="84">see it change</text>
      </svg>
    )
  }
  if (variant === 'victor') {
    return (
      <svg viewBox="0 0 240 100" aria-hidden="true">
        <path d="M22 82h194M27 79C57 4 87 7 116 76c28-58 56-61 87 2" />
        <circle className="accent-fill" cx="76" cy="20" r="7" />
        <path d="M82 18c31-11 64-5 88 17M163 27l7 8-10 3" />
        <text x="136" y="54">change a value</text><text x="23" y="97">feedback now, not later</text>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 240 100" aria-hidden="true">
      <path d="M17 18h82v64H17zM28 29h60v16H28zM28 54h25v19H28zM60 54h28v19H60z" />
      <path className="accent-stroke" d="M111 62c18-26 38-39 60-38 19 1 34 11 47 30" />
      <path d="m209 47 9 7-11 5M131 76l19-11M141 79l9-14" />
      <text x="112" y="91">what belongs here?</text>
    </svg>
  )
}

export function IllustratedPlacard({ variant, position }: { variant: PlacardVariant, position: [number, number, number] }) {
  const content = placards[variant]
  return (
    <Html position={position} center transform distanceFactor={3.35} zIndexRange={[8, 0]}>
      <article className={`illustrated-placard illustrated-placard--${variant}`} aria-hidden="true">
        <i className="tape tape--left" /><i className="tape tape--right" />
        <p>{variant === 'james' ? 'PIN-UP / NOT FINAL' : 'FIELD NOTE'}</p>
        <h3>{content.heading}</h3>
        <PlacardDrawing variant={variant} />
        <small>{content.note}</small>
      </article>
    </Html>
  )
}
