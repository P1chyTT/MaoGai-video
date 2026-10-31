"""Original, seeded non-vocal foley. Standard-library only; no downloaded samples."""
from pathlib import Path
from array import array
import math
import random
import wave

RATE = 48000
DURATION = 40
rng = random.Random(20261031)
samples = array('d', [0.0]) * (RATE * DURATION)

def add(start, duration, sound):
    first = round(start * RATE)
    count = round(duration * RATE)
    for i in range(count):
        at = first + i
        if at >= len(samples):
            break
        samples[at] += sound(i / RATE, duration)

def soft_edge(t, length, edge=.12):
    return min(1.0, t / edge, (length - t) / edge)

def paper(start, duration, gain=.04):
    state = [0.0]
    def rub(t, length):
        noise = rng.uniform(-1, 1)
        state[0] = .75 * state[0] + .25 * noise
        envelope = max(0, math.sin(math.pi * t / length)) ** .8
        return gain * (noise - state[0]) * envelope * (.55 + .45 * math.sin(43 * t) ** 2)
    add(start, duration, rub)

def machine(t, length):
    bed = (.006 * math.sin(2 * math.pi * 48 * t)
           + .003 * math.sin(2 * math.pi * 96 * t)
           + .0018 * math.sin(2 * math.pi * 191 * t))
    return bed * soft_edge(t, length, 1.5) * (.8 + .2 * math.sin(2 * math.pi * .63 * t))

add(1.2, 18.3, machine)
for n in range(32):
    start = 9.15 + n * .27
    add(start, .045, lambda t, length: .014 * math.sin(2 * math.pi * 145 * t) * math.exp(-90 * t))
paper(.18, 1.05, .035)
paper(5.7, .42, .014)
paper(13.1, .48, .019)
paper(20.45, 1.0, .016)
paper(37.05, 1.2, .037)
paper(38.45, .72, .021)
add(19.1, .3, lambda t, length: .12 * math.exp(-28 * t) * (math.sin(2 * math.pi * 103 * t) + .25 * math.sin(2 * math.pi * 297 * t)))
for start in [21.5, 24.1, 27.4, 31.8, 34.7]:
    add(start, .32, lambda t, length: .022 * math.sin(2 * math.pi * (2050 * t + 1450 * t * t)) * math.sin(math.pi * t / length) ** 2)
    add(start + .39, .21, lambda t, length: .014 * math.sin(2 * math.pi * (2550 * t - 810 * t * t)) * math.sin(math.pi * t / length) ** 2)
# A quiet original four-note plucked gesture; no existing melody or vocal imitation.
for start, hz in [(21.0, 293.665), (23.1, 440), (26.5, 391.995), (29.0, 293.665)]:
    add(start, 1.6, lambda t, length, freq=hz: .012 * math.exp(-3.2 * t) * soft_edge(t, length, .007) * (math.sin(2 * math.pi * freq * t) + .3 * math.sin(4 * math.pi * freq * t)))

output = Path(__file__).resolve().parents[1] / 'public/assets/audio/act01-foley.wav'
pcm = array('h')
for value in samples:
    v = max(-1, min(1, value))
    pcm.extend([round(v * 32767), round(v * 32767)])
with wave.open(str(output), 'wb') as stream:
    stream.setnchannels(2)
    stream.setsampwidth(2)
    stream.setframerate(RATE)
    stream.writeframes(pcm.tobytes())
peak = max(abs(v) for v in samples)
print(f'Wrote {output.name}: {DURATION}s, {RATE}Hz stereo PCM; peak {20 * math.log10(peak):.2f}dBFS; no voices.')
