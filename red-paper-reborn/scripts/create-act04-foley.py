"""Seeded original Act04 ambience and a short melody; no speech or downloaded samples."""
from pathlib import Path
from array import array
import math,random,wave
RATE=48000
DURATION=50
rng=random.Random(20261103)
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
 t=i/RATE;wind=.997*wind+.003*rng.uniform(-1,1);samples[i]+=.07*wind*min(1,(t+.2)/.5,(50-t)/.7)
 if t<11.4:
  water=.75*water+.25*rng.uniform(-1,1);samples[i]+=.013*water*min(1,(t+.2)/.5,(11.4-t)/.7)
for start in [.6,2.5,5.9,9.2]:add(start,.48,lambda t,n:.008*math.sin(2*math.pi*(1650*t+380*t*t))*math.sin(math.pi*t/n)**2)
add(12.2,1.1,lambda t,n:.017*math.sin(2*math.pi*(114*t+24*t*t))*edge(t,n,.12))
for start,hz,g in [(16.8,1040,.029),(18.9,580,.025),(20.2,710,.025),(25.5,109,.065),(34.4,130,.023)]:knock(start,hz,g)
for start,n,g in [(11.3,.5,.017),(19.5,.4,.018),(24.3,.7,.021),(26,.5,.02),(28.5,.5,.018),(30.2,.4,.018),(33.2,.6,.027),(34.5,.6,.03),(36.2,.5,.023),(48.5,.5,.014)]:paper(start,n,g)
for start,hz in [(3.5,293.665),(8,391.995),(16,329.628),(21,391.995),(28.2,440),(30.3,493.883),(39,391.995),(41,440),(43,493.883),(45.2,587.33)]:
 add(start,1.5,lambda t,n,hz=hz:.009*math.sin(2*math.pi*hz*t+.02*math.sin(2*math.pi*5*t))*edge(t,n,.2)*math.exp(-t*.8))
for start in [28.4,29.5,30.6]:knock(start,86,.018)
samples=array('d',(v*1.4 for v in samples))
pcm=array('h')
for v in samples:
 s=round(max(-1,min(1,v))*32767);pcm.extend((s,s))
out=Path(__file__).resolve().parents[1]/'public/assets/audio/act04-foley.wav'
with wave.open(str(out),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(pcm.tobytes())
print(f'Created 50s original Act04 stereo ambience; peak {20*math.log10(max(abs(v) for v in samples)):.2f}dBFS')
