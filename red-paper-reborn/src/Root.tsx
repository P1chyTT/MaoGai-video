import {Composition} from 'remotion';
import {TechnicalPreview} from './compositions/TechnicalPreview';
import './style.css';
export const RemotionRoot=()=> <Composition id="TechnicalPreview" component={TechnicalPreview} durationInFrames={150} fps={30} width={1920} height={1080}/>;
