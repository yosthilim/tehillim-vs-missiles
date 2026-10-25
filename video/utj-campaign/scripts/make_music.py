"""Synthesize a warm, uplifting pad (I-V-vi-IV) with soft hits on key moments."""
import sys
import wave

import numpy as np

SR = 44100
DUR = 41.2
t = np.arange(int(SR * DUR)) / SR
out = np.zeros_like(t)


def note(freq, start, length, amp, harmonics=(1, 0.5, 0.25, 0.12)):
    n0, n1 = int(start * SR), min(int((start + length) * SR), len(t))
    tt = t[n0:n1] - start
    env = np.minimum(tt / 0.9, 1) * np.minimum((length - tt) / 1.2, 1)
    env = np.clip(env, 0, 1)
    sig = sum(h * np.sin(2 * np.pi * freq * (k + 1) * tt + k) for k, h in enumerate(harmonics))
    # gentle chorus: slightly detuned copy
    sig += 0.6 * np.sin(2 * np.pi * freq * 1.004 * tt)
    out[n0:n1] += amp * env * sig


def midi(m):
    return 440 * 2 ** ((m - 69) / 12)


# C, G, Am, F voicings (MIDI), 4 bars of 2.575s each, looped.
CHORDS = [(48, 60, 64, 67), (43, 59, 62, 67), (45, 60, 64, 69), (41, 60, 65, 69)]
BAR = 2.575
i = 0
s = 0.0
while s < DUR:
    bass, *upper = CHORDS[i % 4]
    note(midi(bass), s, BAR + 0.6, 0.09, (1, 0.3))
    for m in upper:
        note(midi(m), s, BAR + 0.6, 0.045)
    # soft plucked arpeggio from the second half onward, builds energy
    if s > 14:
        for j, m in enumerate(upper + [upper[0] + 12]):
            note(midi(m + 12), s + j * BAR / 4, 0.9, 0.025, (1, 0.2))
    s += BAR
    i += 1


def hit(at, amp=0.5):
    n0 = int(at * SR)
    n = int(1.6 * SR)
    tt = np.arange(n) / SR
    boom = np.sin(2 * np.pi * (55 + 40 * np.exp(-tt * 12)) * tt) * np.exp(-tt * 3.5)
    out[n0:n0 + n] += amp * boom[: len(out) - n0]


hit(24.2)   # ballot drops into the box
hit(30.8)   # big ג on the call to action
hit(36.2, 0.4)  # end card

fade = np.minimum(np.minimum(t / 1.5, 1), np.minimum((DUR - t) / 2.5, 1))
out *= fade
out /= np.max(np.abs(out)) * 1.15
pcm = (out * 32767).astype(np.int16)
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
