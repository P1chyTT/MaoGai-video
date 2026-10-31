import { useCurrentFrame, useVideoConfig } from "remotion";
import { Act03Frame } from "../../components/act03/Act03Frame";
import { Notebook, Cup, Pen, armTo } from "../../components/act03/Notebook";
import { OldHouseStage, OldTable } from "../../components/act01/StageProps";
import { Puppet } from "../../components/act01/Puppet";
import { tween, colors } from "../../shared/styleTokens";

export const Scene11 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pull = tween(t, 7, 10.8);
  const start = tween(t, 0, 0.8);
  const z = 1 + 1.15 * start * (1 - pull);
  const strike = tween(t, 3.1, 3.85);
  const write = tween(t, 4.3, 6.6);
  const cupX = tween(t, 8.7, 10.2, 1280, 1195);
  const girl = armTo({
    x: 900,
    y: 275,
    scale: 0.82,
    targetX:
      1076 + (t < 4 ? strike * 74 : write * 68) - tween(t, 6.8, 7.5, 0, 45),
    targetY: (t < 4 ? 562 : 627) - tween(t, 6.8, 7.5, 0, 80),
  });
  const elder = armTo({
    x: 1160,
    y: 245,
    scale: 0.8,
    facing: "left",
    targetX: cupX + 22,
    targetY: 584,
  });
  const ring = tween(t, 11.2, 12);
  const focusX = 1090,
    focusY = 675;
  return (
    <Act03Frame
      scene="Scene11"
      label="寻找绿色发展的路"
      fiction
      labelOpacity={tween(t, 3, 3.3) * (1 - tween(t, 10.7, 11))}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <g
          transform={`translate(${(960 - focusX * z) * start * (1 - pull)} ${(540 - focusY * z) * start * (1 - pull)}) scale(${z})`}
        >
          <g opacity={start}>
            <OldHouseStage sway={Math.sin(t * 0.4) * 0.4} />
            <Puppet
              {...girl}
              variant="xiaohe"
              armLayer="body"
              head={tween(t, 3, 7, 6, -1)}
              smile={t > 6.6}
              backUpper={-5}
              backForearm={-45}
            />
            <Puppet
              {...elder}
              variant="elder"
              armLayer="body"
              head={2}
              hat={false}
              smile
            />
            <g opacity={1 - tween(t, 2.8, 3.1)}>
              <Puppet {...girl} variant="xiaohe" armLayer="front" />
            </g>
            <OldTable />
          </g>
          <g
            transform={`matrix(1 0 ${-0.28 * pull} ${1 - 0.72 * pull} ${155.4 * pull} ${454.6 * pull})`}
          >
            <Notebook
              open={tween(t, 0.2, 1.6)}
              strike={strike}
              rewrite={write}
              icons={tween(t, 7, 8.5)}
            />
          </g>
          <g opacity={start}>
            <Cup x={cupX} y={620} ripple={tween(t, 10.2, 10.8)} />
            <Puppet {...elder} variant="elder" armLayer="front" />
            <g opacity={tween(t, 2.8, 3.1)}>
              <Pen
                x={girl.hand.x}
                y={girl.hand.y + 10}
                angle={50}
                length={75}
              />
              <Puppet {...girl} variant="xiaohe" armLayer="front" />
            </g>
          </g>
        </g>
        {ring > 0 ? (
          <g>
            <circle cx="1195" cy="606" r={ring * 1550} fill={colors.sky} />
            <circle
              cx="1195"
              cy="606"
              r={ring * 1550}
              fill="none"
              stroke="#D8D4AF"
              strokeWidth="8"
            />
          </g>
        ) : null}
      </svg>
    </Act03Frame>
  );
};
