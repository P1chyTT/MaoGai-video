import {useCurrentFrame,useVideoConfig} from 'remotion';
import {ShadowStage,StageMark} from '../shared/ShadowStage';
import {Dialogue} from '../shared/Dialogue';
import {ThemeCaption} from '../act02/Act02Stage';
import {PaperCutDetail} from '../act06/PaperCutDetail';
import captions from '../act06/captions.json';
import topics from '../act06/topics.json';
export const Scene21=()=>{const frame=useCurrentFrame();const {fps}=useVideoConfig();return <ShadowStage><PaperCutDetail frame={frame} fps={fps}/><StageMark/><ThemeCaption text={topics.scene21} start={5} end={115}/><Dialogue captions={captions.scene21}/></ShadowStage>;};
