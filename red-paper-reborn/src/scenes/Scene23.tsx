import {useCurrentFrame,useVideoConfig} from 'remotion';
import {ShadowStage} from '../shared/ShadowStage';
import {Dialogue} from '../shared/Dialogue';
import {ThemeCaption} from '../act02/Act02Stage';
import {ExhibitScene} from '../act06/ExhibitScene';
import captions from '../act06/captions.json';
import topics from '../act06/topics.json';
export const Scene23=()=>{const frame=useCurrentFrame();const {fps}=useVideoConfig();return <ShadowStage><ExhibitScene frame={frame} fps={fps}/><ThemeCaption text={topics.scene23} start={5} end={145}/><Dialogue captions={captions.scene23}/></ShadowStage>;};
