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

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Act01Demo" component={Act01Demo} durationInFrames={1080} fps={30} width={1920} height={1080}/>
      <Composition id="Act02Demo" component={Act02Demo} durationInFrames={1650} fps={30} width={1920} height={1080}/>
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
