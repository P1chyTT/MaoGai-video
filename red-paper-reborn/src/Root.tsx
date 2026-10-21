import {Composition, Folder} from 'remotion';
import {Act01Demo} from './Act01Demo';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import './style.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Act01Demo" component={Act01Demo} durationInFrames={1080} fps={30} width={1920} height={1080}/>
      <Folder name="Scenes">
        <Composition id="Scene01" component={Scene01} durationInFrames={240} fps={30} width={1920} height={1080}/>
        <Composition id="Scene02" component={Scene02} durationInFrames={450} fps={30} width={1920} height={1080}/>
        <Composition id="Scene03" component={Scene03} durationInFrames={390} fps={30} width={1920} height={1080}/>
      </Folder>
    </>
  );
};
