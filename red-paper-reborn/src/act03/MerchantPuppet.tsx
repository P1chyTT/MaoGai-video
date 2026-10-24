import {Img, staticFile} from 'remotion';

export type MerchantPuppetProps = {
  frame: number;
  x?: number;
  y?: number;
  width?: number;
  enter?: number;
  headAngle?: number;
  bodyAngle?: number;
  handAngle?: number;
  opacity?: number;
};

const limitedAngle = (value: number) => Math.max(-3, Math.min(3, value));

// Pixel coordinates refer to the untouched 1024 × 1536 source PNG. The three
// complementary masks reconstruct the exact original silhouette at rest.
const head = 'M390 0H715V306H598L576 277L511 308L499 242H390Z';
const forearm = 'M50 300H173L250 380L283 409L344 455L376 466L384 494L363 523L325 541L192 548L199 500L216 445L217 420L183 412L133 402L79 373L50 344Z';
const sourceBounds = 'M0 0H1024V1536H0Z';

/** Original female merchant puppet, with restrained movement at existing joints. */
export const MerchantPuppet = ({
  frame,
  x = 1310,
  y = 140,
  width = 550,
  enter = 1,
  headAngle = 0,
  bodyAngle = 0,
  handAngle = 0,
  opacity = 1,
}: MerchantPuppetProps) => {
  const progress = Math.max(0, Math.min(1, enter));
  const walking = progress > 0 && progress < 1 ? Math.sin(progress * Math.PI) : 0;
  const step = Math.sin(frame * 0.31) * walking;
  const source = staticFile('assets/characters/merchant.png');
  const imageStyle = {position: 'absolute' as const, width: 1024, height: 1536};

  return (
    <div style={{
      position: 'absolute',
      left: x + (1 - progress) * 620,
      top: y + step * 2.6,
      width,
      height: width * 1.5,
      opacity,
      rotate: `${limitedAngle(bodyAngle) + step * 0.32}deg`,
      transformOrigin: '51% 94%',
      filter: 'drop-shadow(5px 7px 3px #2d1e1b30)',
    }}>
      <div style={{
        position: 'absolute',
        width: 1024,
        height: 1536,
        scale: width / 1024,
        transformOrigin: '0 0',
      }}>
        <Img src={source} style={{
          ...imageStyle,
          clipPath: `path(evenodd, "${sourceBounds} ${head} ${forearm}")`,
        }}/>
        <Img src={source} style={{
          ...imageStyle,
          clipPath: `path("${head}")`,
          rotate: `${limitedAngle(headAngle)}deg`,
          transformOrigin: '548px 286px',
        }}/>
        <Img src={source} style={{
          ...imageStyle,
          clipPath: `path("${forearm}")`,
          rotate: `${limitedAngle(handAngle)}deg`,
          transformOrigin: '360px 490px',
        }}/>
      </div>
    </div>
  );
};
