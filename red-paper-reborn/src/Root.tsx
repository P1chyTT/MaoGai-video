import {Composition, Folder} from 'remotion';
import {Act01Demo} from './Act01Demo';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import './style.css';
import {Act02Demo} from './Act02Demo';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
import {Act03Demo} from './Act03Demo';
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';
import {Scene11} from './scenes/Scene11';
import {Scene12} from './scenes/Scene12';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Act01Demo" component={Act01Demo} durationInFrames={1080} fps={30} width={1920} height={1080}/>
      <Composition id="Act02Demo" component={Act02Demo} durationInFrames={1650} fps={30} width={1920} height={1080}/>
      <Composition id="Act03Demo" component={Act03Demo} durationInFrames={1800} fps={30} width={1920} height={1080}/>
      <Folder name="Act03-Scenes">
        <Composition id="Scene08" component={Scene08} durationInFrames={270} fps={30} width={1920} height={1080}/>
        <Composition id="Scene09" component={Scene09} durationInFrames={450} fps={30} width={1920} height={1080}/>
        <Composition id="Scene10" component={Scene10} durationInFrames={360} fps={30} width={1920} height={1080}/>
        <Composition id="Scene11" component={Scene11} durationInFrames={300} fps={30} width={1920} height={1080}/>
        <Composition id="Scene12" component={Scene12} durationInFrames={420} fps={30} width={1920} height={1080}/>
      </Folder>
      <Folder name="Act02-Scenes">
        <Composition id="Scene04" component={Scene04} durationInFrames={360} fps={30} width={1920} height={1080}/>
        <Composition id="Scene05" component={Scene05} durationInFrames={420} fps={30} width={1920} height={1080}/>
        <Composition id="Scene06" component={Scene06} durationInFrames={420} fps={30} width={1920} height={1080}/>
        <Composition id="Scene07" component={Scene07} durationInFrames={450} fps={30} width={1920} height={1080}/>
      </Folder>
      <Folder name="Scenes">
        <Composition id="Scene01" component={Scene01} durationInFrames={240} fps={30} width={1920} height={1080}/>
        <Composition id="Scene02" component={Scene02} durationInFrames={450} fps={30} width={1920} height={1080}/>
        <Composition id="Scene03" component={Scene03} durationInFrames={390} fps={30} width={1920} height={1080}/>
      </Folder>
    </>
  );
};
