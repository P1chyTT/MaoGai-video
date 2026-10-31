import { Composition, Folder } from "remotion";
import { TechnicalPreview } from "./compositions/TechnicalPreview";
import { Act01Demo } from "./compositions/Act01Demo";
import { Scene01 } from "./scenes/act01/Scene01";
import { Scene02 } from "./scenes/act01/Scene02";
import { Scene03 } from "./scenes/act01/Scene03";
import { Scene04 } from "./scenes/act01/Scene04";
import { Act02Demo } from "./compositions/Act02Demo";
import { Scene05 } from "./scenes/act02/Scene05";
import { Scene06 } from "./scenes/act02/Scene06";
import { Scene07 } from "./scenes/act02/Scene07";
import { Scene08 } from "./scenes/act02/Scene08";
import { Act03Demo } from "./compositions/Act03Demo";
import { Scene09 } from "./scenes/act03/Scene09";
import { Scene10 } from "./scenes/act03/Scene10";
import { Scene11 } from "./scenes/act03/Scene11";
import { Scene12 } from "./scenes/act03/Scene12";
import "./style.css";
export const RemotionRoot = () => (
  <>
    <Composition
      id="Act03Demo"
      component={Act03Demo}
      durationInFrames={1500}
      fps={30}
      width={1920}
      height={1080}
    />
    <Folder name="Act03-Scenes">
      <Composition
        id="Scene09"
        component={Scene09}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene10"
        component={Scene10}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene11"
        component={Scene11}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene12"
        component={Scene12}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
    <Composition
      id="Act02Demo"
      component={Act02Demo}
      durationInFrames={1500}
      fps={30}
      width={1920}
      height={1080}
    />
    <Folder name="Act02-Scenes">
      <Composition
        id="Scene05"
        component={Scene05}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene06"
        component={Scene06}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene07"
        component={Scene07}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene08"
        component={Scene08}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
    <Composition
      id="Act01Demo"
      component={Act01Demo}
      durationInFrames={1200}
      fps={30}
      width={1920}
      height={1080}
    />
    <Folder name="Act01-Scenes">
      <Composition
        id="Scene01"
        component={Scene01}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene02"
        component={Scene02}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene03"
        component={Scene03}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene04"
        component={Scene04}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
    <Composition
      id="TechnicalPreview"
      component={TechnicalPreview}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
