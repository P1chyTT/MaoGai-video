import {Series,useVideoConfig} from 'remotion';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
export const Act02Demo=()=>{const {fps}=useVideoConfig();return <Series>
 <Series.Sequence name="04 · 小林回到老屋" durationInFrames={360} premountFor={fps}><Scene04/></Series.Sequence>
 <Series.Sequence name="05 · 小林的金点子" durationInFrames={420} premountFor={fps}><Scene05/></Series.Sequence>
 <Series.Sequence name="06 · 奶奶的坚持" durationInFrames={420} premountFor={fps}><Scene06/></Series.Sequence>
 <Series.Sequence name="07 · 守旧与创新" durationInFrames={450} premountFor={fps}><Scene07/></Series.Sequence>
 </Series>;};
