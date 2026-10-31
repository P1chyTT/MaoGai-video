"""Seeded original Act05 ambience and a short melody; no speech or downloaded samples."""
from pathlib import Path
from array import array
import math,random,wave
RATE=48000
DURATION=60
rng=random.Random(20261104)
samples=array('d',[0.0])*(RATE*DURATION)
def add(start,n,fn):
 for i in range(round(n*RATE)):
  k=round(start*RATE)+i
  if 0<=k<len(samples):samples[k]+=fn(i/RATE,n)
def edge(t,n,f=.15):return max(0,min(1,t/f,(n-t)/f))
def paper(start,n,g=.027):
 m=[0.0]
 def fn(t,n):
  v=rng.uniform(-1,1);m[0]=.7*m[0]+.3*v
  return g*(v-m[0])*math.sin(math.pi*t/n)**2
 add(start,n,fn)
def knock(start,hz=160,g=.045):
 add(start,.32,lambda t,n:g*math.exp(-24*t)*(math.sin(2*math.pi*hz*t)+.2*math.sin(2*math.pi*2.8*hz*t)))
wind=0.0;water=0.0
for i in range(len(samples)):
 t=i/RATE;wind=.997*wind+.003*rng.uniform(-1,1);samples[i]+=.07*wind*min(1,(t+.2)/.5,(60-t)/.7)
 if t<20 or t>=45:
  end=20 if t<20 else 60
  water=.75*water+.25*rng.uniform(-1,1);samples[i]+=.013*water*min(1,(t+.2)/.5,(end-t)/.7)
for start in [2.4,4.8,7.8,12.2,46,48.4,52.2]:add(start,.48,lambda t,n:.008*math.sin(2*math.pi*(1650*t+380*t*t))*math.sin(math.pi*t/n)**2)
for start in [2.2,3.1,4.5,5.5,6.4,7.6,8.5,10.4,12.8,17.4,18.5,21.8,23.6,27.1,28.4,48,58.2]:paper(start,.45,.027)
for start in [1.5,3,4.5,6,7.5,9,10.5,12]:knock(start,380,.025)
for start,hz in [(11.7,100),(34.1,125),(35,125),(36,125),(37.6,125),(39.65,520),(50.9,125)]:knock(start,hz,.028)
for start,hz in [(5,293.665),(10,391.995),(18,329.628),(24,391.995),(32,440),(38,493.883),(46,391.995),(49,440),(52,493.883),(55.2,587.33)]:
 add(start,1.5,lambda t,n,hz=hz:.009*math.sin(2*math.pi*hz*t+.02*math.sin(2*math.pi*5*t))*edge(t,n,.2)*math.exp(-t*.8))
# Smiles are visual until a consenting actor records a natural laugh.
samples=array('d',(v*1.4 for v in samples))
pcm=array('h')
for v in samples:
 s=round(max(-1,min(1,v))*32767);pcm.extend((s,s))
out=Path(__file__).resolve().parents[1]/'public/assets/audio/act05-foley.wav'
with wave.open(str(out),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(pcm.tobytes())
print(f'Created 60s original Act05 stereo ambience; peak {20*math.log10(max(abs(v) for v in samples)):.2f}dBFS')
