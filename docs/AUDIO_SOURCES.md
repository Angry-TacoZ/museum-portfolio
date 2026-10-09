# Exhibition music

The optional background track is Erik Satie's **Gymnopédie No. 1**, recorded by Wikimedia Commons contributor **Teknopazzo**.

- Source and recording license: https://commons.wikimedia.org/wiki/File:Gymnopedie_No._1..ogg
- Original file: https://upload.wikimedia.org/wikipedia/commons/b/b7/Gymnopedie_No._1..ogg
- License: [CC0 1.0 Universal Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).
- Local asset: `public/audio/gymnopedie-no-1.mp3` (2,458,585 bytes, approximately 3 minutes 25 seconds).

The source recording was converted to mono MP3 at 96 kbps with FFmpeg:

```powershell
ffmpeg -i Gymnopedie_No._1..ogg -codec:a libmp3lame -b:a 96k -ac 1 gymnopedie-no-1.mp3
```

The track is served locally, including under the GitHub Pages base path. It loops at 12% volume, starts only after the visitor presses the music button, and pauses when toggled off. `preload="none"` avoids downloading the track before the visitor enables it. Playback is independent of the motion preference and continues between exhibits and while viewing selected work.
