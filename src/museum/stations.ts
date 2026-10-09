export type StationId = 'entrance' | 'engelbart' | 'kay' | 'victor' | 'james'

export type Station = {
  id: StationId
  index: number
  cameraPosition: [number, number, number]
  cameraTarget: [number, number, number]
  title: string
  eyebrow: string
  subtitle: string
  nextStation: StationId | null
  nextLabel: string | null
  interactionEnabled: boolean
}

export const stations: Station[] = [
  {
    id: 'entrance', index: 0, cameraPosition: [0, 2.45, 10.5], cameraTarget: [0, 2, 0],
    eyebrow: 'Built for Notion · An interactive project', title: 'Tools for\nthinking',
    subtitle: 'An independent project by James Lane for the Notion team. Explore three ideas that shaped tools for thinking.', nextStation: 'engelbart',
    nextLabel: 'ENTER EXHIBIT →', interactionEnabled: false,
  },
  {
    id: 'engelbart', index: 1, cameraPosition: [-5.8, 2.35, 3], cameraTarget: [-5.8, 1.85, -3],
    eyebrow: '01 · Douglas Engelbart', title: 'AUGMENTING\nHUMAN INTELLECT',
    subtitle: 'In 1968, Engelbart demonstrated NLS: a system for editing, linking, and collaborating. The breakthrough was not just a mouse. It was a different way of working together.', nextStation: 'kay',
    nextLabel: 'CONTINUE TOUR →', interactionEnabled: true,
  },
  {
    id: 'kay', index: 2, cameraPosition: [0, 2.35, -5], cameraTarget: [0, 1.75, -11],
    eyebrow: '02 · Alan Kay', title: 'THE COMPUTER\nAS A MEDIUM',
    subtitle: 'Kay imagined a personal computer as a medium for learning and making. Not a fixed appliance, but something its user could reshape. Try changing the object on the screen.', nextStation: 'victor',
    nextLabel: 'CONTINUE TOUR →', interactionEnabled: true,
  },
  {
    id: 'victor', index: 3, cameraPosition: [5.8, 2.35, -13], cameraTarget: [5.8, 1.8, -19],
    eyebrow: '03 · Bret Victor', title: 'IDEAS SHOULD\nBE TOUCHABLE',
    subtitle: 'Victor argues for a direct connection between an idea and its result. Adjust the simulation: a change in gravity should be something you can see, not just a number you type.', nextStation: 'james',
    nextLabel: 'ONE EXHIBIT REMAINS →', interactionEnabled: true,
  },
  {
    id: 'james', index: 4, cameraPosition: [5.8, 2.35, -23.5], cameraTarget: [5.8, 1.75, -29.5],
    eyebrow: '04 · A work in progress', title: 'NEXT EXHIBIT',
    subtitle: 'Builder, still in progress.', nextStation: null, nextLabel: null, interactionEnabled: true,
  },
]

export const stationById = Object.fromEntries(stations.map((station) => [station.id, station])) as Record<StationId, Station>

export function nextStation(id: StationId): StationId | null {
  return stationById[id].nextStation
}

export function previousStation(id: StationId): StationId | null {
  const index = stationById[id].index
  return index > 0 ? stations[index - 1].id : null
}
