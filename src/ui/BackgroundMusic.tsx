import { useRef, useState } from 'react'

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [starting, setStarting] = useState(false)
  const [failed, setFailed] = useState(false)

  async function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      audio.pause()
      return
    }
    setFailed(false)
    setStarting(true)
    if (audio.error) audio.load()
    audio.volume = 0.12
    try {
      await audio.play()
    } catch {
      setFailed(true)
    } finally {
      setStarting(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/gymnopedie-no-1.mp3`} preload="none" loop
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setStarting(false); setFailed(true) }} />
      <button className="music-toggle" aria-pressed={playing} disabled={starting} onClick={toggleMusic}
        title="Quiet piano: Erik Satie · Gymnopédie No. 1">
        {starting ? 'Starting…' : playing ? 'Music on' : 'Music off'}
      </button>
      <span className="sr-only" role="status">{failed ? 'Music could not start. Use the music button to try again.' : ''}</span>
    </>
  )
}
