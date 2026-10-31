import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act06Frame } from "../../components/act06/Act06Frame";
import { ScrollBackdrop, ScrollPeople } from "../../components/act06/Scroll";
import { FinalPair } from "../../components/act06/FinalPair";
import { colors, tween } from "../../shared/styleTokens";
import { ink } from "../../components/act01/art";

export const Scene24 = () => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig();
  // Every visual clock is clamped: frames 330–389 (global 8940–8999) are identical.
  const t = Math.min(frame / fps, 11),
    pull = tween(t, 0, 5, 1, 0.96),
    title = tween(t, 5, 5.4),
    theme = tween(t, 7, 7.4);
  return (
    <Act06Frame scene="Scene24">
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g
          transform={`translate(720 880) scale(${pull}) translate(-720 -880) translate(0 40)`}
        >
          <ScrollBackdrop
            time={24.9334 + t}
            expand={1}
            light={1}
            notes={false}
          />
          <ScrollPeople time={24.9334 + t} />
          <FinalPair
            lower={1}
            pack={tween(t, 0.2, 3.3)}
            look={1 - 0.6 * Math.sin(tween(t, 0.3, 4.5) * Math.PI)}
          />
        </g>
        <g opacity={title} textAnchor="middle" fill={ink}>
          <path
            d="M610 136H1310V277H610Z"
            fill="#EBDDBB"
            stroke="#BA9B5B"
            strokeWidth="2"
          />
          <path
            d="M626 151H1294M626 263H1294"
            stroke={colors.gold}
            strokeWidth="1.5"
          />
          <text x="960" y="235" fontSize="100" letterSpacing="20">
            山河有约
          </text>
          <text x="960" y="332" fontSize="36" letterSpacing="3">
            ——从绿水青山到金山银山
          </text>
        </g>
        <g opacity={theme} textAnchor="middle" fill={ink}>
          <text x="960" y="397" fontSize="48" letterSpacing="3">
            绿水青山就是金山银山
          </text>
          <text x="960" y="455" fontSize="42" letterSpacing="2">
            让绿色成为高质量发展的鲜明底色
          </text>
          <path d="M80 923H1840V1018H80Z" fill="#F2E5CB" opacity=".96" />
          <path d="M180 923H1740" stroke="#B69A5B" strokeWidth="1.5" />
          <text x="960" y="963" fontSize="31">
            人物及家庭故事为艺术虚构｜历史依据见配套脚本
          </text>
          <text x="960" y="1006" fontSize="30">
            主要资料：新华社、文化和旅游部、国家发展改革委、国家林草局、央视网。
          </text>
        </g>
      </svg>
    </Act06Frame>
  );
};
