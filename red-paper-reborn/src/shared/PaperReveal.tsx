import {useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, tween} from './styleTokens';
import {PhoenixHoles, PhoenixSilhouette} from './PhoenixMotif';

export const PaperReveal = () => {
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  const open=tween(frame,2.5*fps,5*fps,.08,1);
  const outline=tween(frame,5*fps,6.8*fps,0,1000);
  const holes=tween(frame,6.2*fps,9*fps,0,1000);
  const scale=tween(frame,0,2.5*fps,.88,1)*tween(frame,9*fps,11.5*fps,1,1.035);
  return <div style={{position:'absolute',left:425,top:130,width:1070,height:813,scale,filter:'drop-shadow(3px 5px 2px rgba(58,24,15,.26))'}}>
    <svg viewBox="0 0 1000 760" width="100%" height="100%">
      <defs>
        <clipPath id="unfold"><rect x={500-450*open} y="72" width={900*open} height="640"/></clipPath>
        <clipPath id="hole-wipe"><rect width={holes} height="760"/></clipPath>
        <mask id="phoenix-emerging" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="760">
          <g fill="white" color="white"><PhoenixSilhouette/></g>
          <rect x={outline} y="72" width={1000-outline} height="640" fill="white"/>
          <g clipPath="url(#hole-wipe)" fill="black"><PhoenixHoles/></g>
        </mask>
        <linearGradient id="paper-leather" x2="1" y2=".8"><stop stopColor="#b73c36"/><stop offset=".45" stopColor={colors.red}/><stop offset="1" stopColor="#94272c"/></linearGradient>
        <linearGradient id="crease"><stop stopColor="#401615" stopOpacity="0"/><stop offset=".5" stopColor="#401615" stopOpacity=".28"/><stop offset=".53" stopColor="#eeae7d" stopOpacity=".24"/><stop offset="1" stopColor="#eeae7d" stopOpacity="0"/></linearGradient>
      </defs>
      <g clipPath="url(#unfold)">
        <rect x="50" y="72" width="900" height="640" fill="url(#paper-leather)" mask="url(#phoenix-emerging)"/>
        <rect x="475" y="72" width="50" height="640" fill="url(#crease)" mask="url(#phoenix-emerging)" opacity={1-tween(frame,5*fps,9*fps,0,.85)}/>
      </g>
      {frame<5*fps?<path d={`M${500-450*open} 75L500 72L${500+450*open} 75`} fill="none" stroke="#d77760" strokeWidth="1" opacity=".7"/>:null}
    </svg>
  </div>;
};
