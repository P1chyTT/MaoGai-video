import { Puppet } from "../act01/Puppet";
import { OldPrint } from "../act01/StageProps";
import { PhoneView } from "../act04/Props";
import { armTo } from "../act03/Notebook";
import { handPoint } from "../act02/Villager";
import { AlignedLandscape } from "../act05/Props";
import { tween } from "../../shared/styleTokens";

export const FinalPair = ({
  lower = 0,
  pack = 0,
  look = 0,
}: {
  lower?: number;
  pack?: number;
  look?: number;
}) => {
  const oldX = 715 + 110 * pack,
    oldY = 700 + 18 * pack;
  const e = armTo({
    x: 540,
    y: 535,
    scale: 0.44,
    targetX: oldX - 29,
    targetY: oldY + 20,
  });
  const elder = {
    ...e,
    upper: tween(pack, 0.3, 1, e.upper, -12),
    forearm: tween(pack, 0.3, 1, e.forearm, -48),
  };
  const xh = armTo({
    x: 735,
    y: 539,
    scale: 0.43,
    targetX: tween(pack, 0, 1, 865, 797),
    targetY: tween(lower, 0, 1, 674, 744) - 23 * pack,
  });
  const hand = handPoint(xh);
  return (
    <g>
      <Puppet
        {...elder}
        variant="elder"
        head={-3 + 6 * (1 - look)}
        smile
        armLayer="body"
      />
      <Puppet
        {...xh}
        variant="xiaohe"
        head={2 - 7 * look + Math.sin(pack * Math.PI) * 3}
        smile
        armLayer="body"
      />
      <g
        opacity={1 - tween(pack, 0.7, 1)}
        transform={`translate(${oldX} ${oldY}) scale(${1 - 0.42 * pack} ${1 - 0.65 * pack})`}
      >
        <OldPrint x={-60} y={-38} width={120} height={76} />
      </g>
      <PhoneView
        x={hand.x + 12}
        y={hand.y + 19}
        scale={0.32}
        angle={-6 + 10 * lower}
        view={<AlignedLandscape time={0} />}
      />
      <Puppet {...elder} variant="elder" armLayer="front" />
      <Puppet {...xh} variant="xiaohe" armLayer="front" />
    </g>
  );
};
