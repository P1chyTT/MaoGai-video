"""Seeded original Act06 ambience and a short melody; no speech or downloaded samples."""
from pathlib import Path
from array import array
import math,random,wave
RATE=48000
DURATION=50
rng=random.Random(20261105)
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
 t=i/RATE;wind=.997*wind+.003*rng.uniform(-1,1);samples[i]+=.07*wind*min(1,(t+.2)/.5,(50-t)/3)
 water=.75*water+.25*rng.uniform(-1,1);samples[i]+=.009*water*min(1,(t+.2)/.5,(50-t)/3)
for start in [12.6,15.3,19.2,25.2,29.6,36,39.6,42.1]:add(start,.48,lambda t,n:.007*math.sin(2*math.pi*(1650*t+380*t*t))*math.sin(math.pi*t/n)**2)
for start,n,g in [(.7,.6,.028),(1.8,.6,.024),(4.2,.3,.018),(5.3,.3,.015),(6.4,.3,.017),(7.5,.3,.017),(37.6,.7,.028),(39.3,.5,.025)]:paper(start,n,g)
for start,hz in [(4.4,180),(5.5,240),(6.6,600),(7.7,430)]:knock(start,hz,.023)
for start,hz,g in [(2,196,.006),(7,246.94,.007),(13,293.66,.007),(18,329.63,.008),(25,392,.008),(28,440,.009),(31,493.88,.011),(33,587.33,.013),(35,659.25,.011),(39,493.88,.009),(43.5,392,.008),(46,293.66,.006)]:
 add(start,2.3,lambda t,n,hz=hz,g=g:g*math.sin(2*math.pi*hz*t+.018*math.sin(2*math.pi*5*t))*edge(t,n,.25)*math.exp(-t*.75))
samples=array('d',(v*1.4 for v in samples))
pcm=array('h')
for v in samples:
 s=round(max(-1,min(1,v))*32767);pcm.extend((s,s))
out=Path(__file__).resolve().parents[1]/'public/assets/audio/act06-foley.wav'
with wave.open(str(out),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(pcm.tobytes())
print(f'Created 50s original Act06 stereo ambience; peak {20*math.log10(max(abs(v) for v in samples)):.2f}dBFS')
