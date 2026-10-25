#!/usr/bin/env bash
# Render both versions (vertical 9:16 and landscape 16:9) with soundtrack.
# Output: out/utj-vertical.mp4, out/utj-landscape.mp4
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out
python3 scripts/make_music.py out/music.wav
for comp in UTJ:vertical UTJ-Landscape:landscape; do
  id=${comp%%:*}; name=${comp##*:}
  npx remotion render "$id" "out/$name-silent.mp4" --codec=h264 --crf=18 --log=error
  ffmpeg -y -loglevel error -i "out/$name-silent.mp4" -i out/music.wav \
    -map 0:v -map 1:a -c:v copy \
    -af "aecho=0.8:0.7:60|120:0.25|0.15,loudnorm=I=-14:TP=-1.5:LRA=7" \
    -ac 2 -c:a aac -b:a 192k -shortest -movflags +faststart "out/utj-$name.mp4"
  rm "out/$name-silent.mp4"
done
