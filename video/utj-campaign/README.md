# סרטון קמפיין — יהדות התורה (ג׳)

Remotion project for a ~41s campaign clip in two formats:

- `UTJ` — vertical 1080×1920 (Stories, Reels, TikTok, WhatsApp)
- `UTJ-Landscape` — landscape 1920×1080 (YouTube, Facebook)

## Build

Requires Node.js, Python 3 with numpy, and ffmpeg.

```bash
npm i
./scripts/render.sh        # → out/utj-vertical.mp4, out/utj-landscape.mp4
npx remotion studio        # interactive preview
```

`render.sh` renders both compositions, synthesizes the soundtrack
(`scripts/make_music.py`, original, no licensing needed), muxes it and
normalizes loudness to -14 LUFS.

## Layout

- `src/scenes.tsx` — the eight scenes (texts live here)
- `src/Composition.tsx` — scene order, durations, transitions, compositions
- `src/components.tsx` — backdrop, word-by-word reveal, gold rule, shine
- `src/theme.ts` — colors and fonts
- `renders/` — the final MP4s and thumbnails

Fonts (Frank Ruhl Libre, Heebo) are bundled in `public/fonts` under the
SIL Open Font License (see the `OFL-*.txt` files there).

Before publishing, mark the clip as election material per the Central
Elections Committee rules.
