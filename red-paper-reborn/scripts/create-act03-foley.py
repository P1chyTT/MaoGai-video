"""Original seeded Act03 paper, pen, cup, stream and birds; no recordings or TTS."""
from pathlib import Path
from array import array
import math,random,wave
RATE=48000
DURATION=50
rng=random.Random(20261102)
samples=array('d',[0.0])*(RATE*DURATION)
def add(start,length,fn):
 for i in range(round(length*RATE)):
  at=round(start*RATE)+i
  if 0<=at<len(samples):samples[at]+=fn(i/RATE,length)
def edge(t,n,fade=.15):return max(0,min(1,t/fade,(n-t)/fade))
def paper(start,n,gain=.02):
 memory=[0.0]
 def f(t,n):
  value=rng.uniform(-1,1);memory[0]=.7*memory[0]+.3*value
  return gain*(value-memory[0])*math.sin(math.pi*t/n)**2
 add(start,n,f)
def knock(start,hz,gain):
 add(start,.35,lambda t,n:gain*math.exp(-22*t)*(math.sin(2*math.pi*hz*t)+.22*math.sin(2*math.pi*hz*2.7*t)))
for t,n,g in [(0,.65,.023),(3.15,.65,.017),(5.4,.55,.013),(24.5,.4,.012),(25.4,.65,.024),(28.15,.5,.025),(29.35,.4,.015),(30.15,.4,.016),(30.9,.4,.016),(31.55,.35,.014),(39.6,.35,.017),(42.3,.4,.018),(45,.4,.017)]:paper(t,n,g)
# Sparse original tones, never an imitation of an archival performance.
for start,hz in [(7,146.832),(17,195.998)]:
 add(start,2.5,lambda t,n,hz=hz:.008*(math.sin(2*math.pi*hz*t)+.15*math.sin(2*math.pi*hz*2*t))*edge(t,n,.6)*math.exp(-t*.7))
for start,hz in [(31.6,391.995),(34.1,440),(43,493.883),(46.2,587.33)]:
 add(start,1.8,lambda t,n,hz=hz:.008*math.sin(2*math.pi*hz*t+0.025*math.sin(2*math.pi*5*t))*edge(t,n,.25)*math.exp(-t*.5))
knock(35.2,640,.04)
add(36.4,.6,lambda t,n:.017*math.sin(2*math.pi*(510*t-130*t*t))*edge(t,n,.04)*math.exp(-4*t))
for t in [41.6,42.8,44.1]:paper(t,.3,.024);knock(t,105,.012)
for start in [43.2,46.3,48.2]:
 add(start,.45,lambda t,n:.008*math.sin(2*math.pi*(1680*t+360*t*t))*math.sin(math.pi*t/n)**2)
wind=0.0;water=0.0
for i in range(len(samples)):
 t=i/RATE;wind=.997*wind+.003*rng.uniform(-1,1)
 samples[i]+=.06*wind*min(1,t/.5,(50-t)/.7)
 if t>=37:
  water=.75*water+.25*rng.uniform(-1,1)
  samples[i]+=.011*water*min(1,(t-37)/1,(50-t)/.8)
samples=array('d',(v*2 for v in samples))
pcm=array('h')
for v in samples:
 a=round(max(-1,min(1,v))*32767);pcm.extend((a,a))
out=Path(__file__).resolve().parents[1]/'public/assets/audio/act03-foley.wav'
with wave.open(str(out),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(pcm.tobytes())
print(f'Act03: {DURATION}s / 48kHz / stereo original non-vocal ambience; peak {20*math.log10(max(abs(v) for v in samples)):.2f} dBFS')
