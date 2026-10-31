"""Seeded original Act02 foley; no recordings, downloaded samples, or TTS."""
from pathlib import Path
from array import array
import math
import random
import wave

RATE=48000
DURATION=50
rng=random.Random(20261101)
samples=array('d',[0.0])*(RATE*DURATION)

def add(start,length,sound):
    for i in range(round(length*RATE)):
        at=round(start*RATE)+i
        if 0<=at<len(samples):
            samples[at]+=sound(i/RATE,length)

def edge(t,length,fade=.1):
    return max(0,min(1,t/fade,(length-t)/fade))

def rustle(start,length,gain=.025):
    memory=[0.0]
    def f(t,n):
        noise=rng.uniform(-1,1)
        memory[0]=.8*memory[0]+.2*noise
        return gain*(noise-memory[0])*math.sin(math.pi*t/n)**2
    add(start,length,f)

def knock(start,hz=104,gain=.065):
    add(start,.28,lambda t,n:gain*math.exp(-28*t)*(math.sin(2*math.pi*hz*t)+.2*math.sin(2*math.pi*hz*2.8*t)))

# Equipment coasts down and stops; no machinery re-enters later scenes.
add(0,2.9,lambda t,n:(.008*math.sin(2*math.pi*(63*t-6*t*t))+.003*math.sin(2*math.pi*131*t))*edge(t,n,.3)*(1-t/n))
rustle(.25,.9,.018)
rustle(10.8,.5,.019)
knock(12.55,91,.1)
rustle(12.7,.65,.02)
rustle(13.6,.5,.023)
for t in [16.5,17.1,17.7,18.3,18.9,19.5]:
    knock(t,74,.018)
rustle(21,.65,.011)
rustle(28,.85,.014)
rustle(30.5,.5,.01)
rustle(33.2,1.0,.021)
for start,hz in [(28.6,293.665),(32.4,391.995)]:
    add(start,1.8,lambda t,n,hz=hz:.01*math.sin(2*math.pi*hz*t)*math.exp(-2.6*t)*edge(t,n,.008))

# Quiet original filtered wind and running-water textures.
wind=0.0
for i in range(len(samples)):
    t=i/RATE
    wind=.997*wind+.003*rng.uniform(-1,1)
    samples[i]+=.07*wind*min(1,t/.6,(50-t)/.8)
    if 37.4<t<49:
        samples[i]+=.0035*rng.uniform(-1,1)*min(1,(t-37.4)/.5,(49-t)/.5)
add(38.08,.7,lambda t,n:.034*math.sin(2*math.pi*(620*t-240*t*t))*math.exp(-6*t)*edge(t,n,.007))
for t in [38.5,39.2,39.8,41.8,42.7,43.6]:
    rustle(t,.25,.024)
for t in [41.9,42.8,43.7]:
    knock(t,113,.018)
knock(46.3,213,.035)
knock(47.7,137,.036)
rustle(47.8,.35,.014)

pcm=array('h')
for value in samples:
    v=round(max(-1,min(1,value))*32767)
    pcm.extend((v,v))
out=Path(__file__).resolve().parents[1]/'public/assets/audio/act02-foley.wav'
with wave.open(str(out),'wb') as f:
    f.setnchannels(2);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(pcm.tobytes())
print(f'Created original non-vocal Act02 sound: {DURATION}s / stereo {RATE}Hz; peak {20*math.log10(max(abs(x) for x in samples)):.2f}dBFS')
