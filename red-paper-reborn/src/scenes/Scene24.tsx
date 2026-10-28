import {useCurrentFrame,useVideoConfig} from 'remotion';
import {ShadowStage} from '../shared/ShadowStage';
import {Dialogue} from '../shared/Dialogue';
import {tween} from '../shared/styleTokens';
import {ExhibitScene} from '../act06/ExhibitScene';
import {ScrollReveal} from '../act06/ScrollReveal';
import {FinalTitle} from '../act06/FinalTitle';
import captions from '../act06/captions.json';
export const Scene24=()=>{const frame=useCurrentFrame();const {fps}=useVideoConfig();return <ShadowStage><div style={{position:'absolute',inset:0,opacity:1-tween(frame,0,.8*fps)}}><ExhibitScene frame={149} showPaper={false}/></div><ScrollReveal frame={frame} fps={fps}/><FinalTitle/><Dialogue captions={captions.scene24}/></ShadowStage>;};
