import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act06Frame } from "../../components/act06/Act06Frame";
import { ScrollBackdrop, ScrollPeople } from "../../components/act06/Scroll";
import { FinalPair } from "../../components/act06/FinalPair";
import { tween } from "../../shared/styleTokens";
export const Scene22 = () => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = frame / fps;
  return (
    <Act06Frame scene="Scene22" label="从余村实践走向共同守护">
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <ScrollBackdrop time={t} expand={tween(t, 0, 9)} />
        <ScrollPeople time={t} opacity={tween(t, 8.4, 9.7)} />
        <g opacity={tween(t, 8.4, 9.7)}>
          <FinalPair look={1} />
        </g>
      </svg>
    </Act06Frame>
  );
};
