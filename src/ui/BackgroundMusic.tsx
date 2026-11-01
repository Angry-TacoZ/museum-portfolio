import { useCallback, useEffect, useRef, useState } from 'react'

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const enabledRef = useRef(true)
  const mounted = useRef(false)
  const [blocked, setBlocked] = useState(false)
  const [failed, setFailed] = useState(false)

  const startMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !enabledRef.current || !audio.paused) return
    setFailed(false)
    if (audio.error) audio.load()
    audio.volume = 0.12
    try {
      await audio.play()
      // Turning music off also cancels a play request that was still loading.
      if (!enabledRef.current) audio.pause()
      if (mounted.current) setBlocked(false)
    } catch (error) {
      if (!mounted.current || !enabledRef.current) return
      if (error instanceof DOMException && error.name === 'NotAllowedError') setBlocked(true)
      else if (!(error instanceof DOMException && error.name === 'AbortError')) setFailed(true)
    }
  }, [])

  useEffect(() => {
    mounted.current = true
    const audio = audioRef.current
    void startMusic()
    const retryFromGesture = (event: Event) => {
      // The off switch must not trigger playback before its click handler runs.
      if (event.target instanceof Element && event.target.closest('.music-toggle')) return
      void startMusic()
    }
    document.addEventListener('pointerdown', retryFromGesture)
    document.addEventListener('pointerup', retryFromGesture)
    document.addEventListener('keydown', retryFromGesture)
    return () => {
      mounted.current = false
      document.removeEventListener('pointerdown', retryFromGesture)
      document.removeEventListener('pointerup', retryFromGesture)
      document.removeEventListener('keydown', retryFromGesture)
      audio?.pause()
    }
  }, [startMusic])

  function toggleMusic() {
    enabledRef.current = !enabledRef.current
    setEnabled(enabledRef.current)
    if (enabledRef.current) void startMusic()
    else audioRef.current?.pause()
  }

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/gymnopedie-no-1.mp3`} preload="auto" loop
        onPlay={() => { if (enabledRef.current) setPlaying(true); else audioRef.current?.pause() }} onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setFailed(true) }} />
      <button className="music-toggle" aria-pressed={enabled} onClick={toggleMusic}
        title={enabled && !playing ? 'Music is enabled; playback starts when the browser allows it. Click to turn off.' : 'Quiet piano: Erik Satie · Gymnopédie No. 1. Click to toggle.'}>
        {enabled ? 'Music on' : 'Music off'}
      </button>
      <span className="sr-only" role="status">{enabled && failed ? 'Music could not start. Toggle music off and on to try again.' : enabled && blocked ? 'Music is enabled and will start with your first interaction.' : ''}</span>
    </>
  )
}
