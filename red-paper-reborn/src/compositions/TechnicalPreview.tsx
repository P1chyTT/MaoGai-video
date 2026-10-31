import {ShadowStage} from '../shared/ShadowStage';
import {Dialogue} from '../shared/Dialogue';
import {colors,tween} from '../shared/styleTokens';
import {CameraLayer} from '../components/CameraLayer';
import {LandscapeLayers} from '../components/LandscapeLayers';
import {ThemeCaption} from '../components/ThemeCaption';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import captions from './preview-captions.json';
export const TechnicalPreview=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 return <ShadowStage><CameraLayer><LandscapeLayers/></CameraLayer><ThemeCaption text="推进生态文明建设"/>
  <div style={{position:'absolute',top:265,left:180,right:180,textAlign:'center',opacity:tween(frame,.25*fps,1*fps),color:colors.forest}}><div style={{fontSize:122,letterSpacing:18}}>山河有约</div><div style={{fontSize:37,letterSpacing:5,marginTop:30}}>——从绿水青山到金山银山</div></div>
  <Dialogue captions={captions}/>
 </ShadowStage>;
};
