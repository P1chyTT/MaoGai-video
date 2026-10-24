import {useCurrentFrame,useVideoConfig} from 'remotion';
import {ShadowStage} from '../shared/ShadowStage';
import {Dialogue} from '../shared/Dialogue';
import {ThemeCaption} from '../act02/Act02Stage';
import {WorkshopScene} from '../act06/WorkshopScene';
import captions from '../act06/captions.json';
import topics from '../act06/topics.json';
export const Scene22=()=>{const frame=useCurrentFrame();const {fps}=useVideoConfig();return <ShadowStage><WorkshopScene frame={frame} fps={fps}/><ThemeCaption text={topics.scene22} start={5} end={85}/><Dialogue captions={captions.scene22}/></ShadowStage>;};
