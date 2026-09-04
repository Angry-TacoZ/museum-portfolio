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
    eyebrow: 'An interactive exhibition', title: 'THE TOOLS THAT\nCHANGED HOW WE THINK',
    subtitle: 'People who imagined computers as more than machines.', nextStation: 'engelbart',
    nextLabel: 'ENTER EXHIBIT →', interactionEnabled: false,
  },
  {
    id: 'engelbart', index: 1, cameraPosition: [-5.8, 2.35, 3], cameraTarget: [-5.8, 1.85, -3],
    eyebrow: '01 · Douglas Engelbart', title: 'AUGMENTING\nHUMAN INTELLECT',
    subtitle: 'The computer as an amplifier for human thought.', nextStation: 'kay',
    nextLabel: 'CONTINUE TOUR →', interactionEnabled: true,
  },
  {
    id: 'kay', index: 2, cameraPosition: [0, 2.35, -5], cameraTarget: [0, 1.75, -11],
    eyebrow: '02 · Alan Kay', title: 'THE COMPUTER\nAS A MEDIUM',
    subtitle: 'A medium people can shape while they learn.', nextStation: 'victor',
    nextLabel: 'CONTINUE TOUR →', interactionEnabled: true,
  },
  {
    id: 'victor', index: 3, cameraPosition: [5.8, 2.35, -13], cameraTarget: [5.8, 1.8, -19],
    eyebrow: '03 · Bret Victor', title: 'IDEAS SHOULD\nBE TOUCHABLE',
    subtitle: 'See cause and effect at the speed of thought.', nextStation: 'james',
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
