import React, {useId} from 'react';
import {PhoenixHoles, PhoenixSilhouette} from '../shared/PhoenixMotif';
import {colors} from '../shared/styleTokens';

/** A single connected sheet: the negative shapes in this mask really show the stage. */
const LeafSpray: React.FC<{holes?: boolean}> = ({holes = false}) => (
  <g>
    {!holes && <path d="M0 0C-42-45-73-91-63-148C-49-203 3-211 21-179C42-139-24-133-19-169M-45-91C-112-84-140-118-123-143M-27-53C35-56 64-90 50-116" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>}
    {[-1, 1].map((side) => <g key={side} transform={`scale(${side} 1)`}>
      {[0, 1, 2].map((i) => <path key={i} transform={`translate(${-17 - i * 13} ${-34 - i * 33}) rotate(${-28 - i * 12})`} d={holes ? 'M-7-4Q-25-13-29-30L-9-8Z' : 'M0 0C-31-2-49-29-41-46C-16-45-1-25 0 0Z'}/>) }
    </g>)}
  </g>
);

export const PaperFlower: React.FC<{x?: number; y?: number; scale?: number; holes?: boolean}> = ({x = 0, y = 0, scale = 1, holes = false}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {Array.from({length: 8}, (_, i) => <path key={i} transform={`rotate(${i * 45})`} d={holes ? 'M-4-19Q-16-32-8-43Q4-36 4-21Z' : 'M0 0C-28-12-39-35-28-48C-14-59 3-45 3-35C20-51 41-36 28-19C20-7 10-2 0 0Z'}/>)}
    <circle r={holes ? 7 : 20}/>
    {holes && Array.from({length: 8}, (_, i) => <ellipse key={i} cx="0" cy="-13" rx="2" ry="3.5" transform={`rotate(${i * 45})`}/>)}
  </g>
);

const Cloud: React.FC<{holes?: boolean}> = ({holes = false}) => <path d={holes
  ? 'M-64 11C-38 12-13 11 2 3C23-8 38-12 68-8M-8-5C-21-27-48-22-49-7M27-6C18-26 37-37 50-24'
  : 'M-95 14C-110-3-98-19-81-16C-85-40-54-51-37-33C-21-64 14-58 21-32C43-48 73-30 65-10C92-18 111-3 102 14C39 29-27 29-95 14Z'} fill={holes ? 'none' : undefined} stroke={holes ? 'black' : undefined} strokeWidth="5" strokeLinecap="round"/>;

const CityLife: React.FC<{holes?: boolean}> = ({holes = false}) => <g>
  {holes ? <>
    {[310, 352, 416, 470, 688, 750, 805, 856].map((x, i) => <g key={x}>
      <path d={`M${x} ${i < 4 ? 574 : 581}v22m8-22v22m8-22v22`} stroke="black" strokeWidth="3"/>
    </g>)}
    <path d="M576 401Q582 409 589 405M621 401Q615 408 609 405" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"/>
    <path d="M553 458Q567 471 580 464M620 464Q632 471 647 458M569 498L580 516L570 530M631 498L620 516L630 530" fill="none" stroke="black" strokeWidth="4"/>
    <path d="M566 548h68v8h-68Z"/>
    <path d="M589 535q11-19 22 0q-11-6-22 0Z"/>
    <path d="M351 636L370 620L389 636M812 636L831 620L850 636" fill="none" stroke="black" strokeWidth="4"/>
  </> : <>
    {/* The skyline grows from the same lower vine as the phoenix tails. */}
    <path d="M275 621H297V559H334V536H356V553H390V583H403V522H445V548H483V603H518V628H682V603H716V550H749V522H790V581H805V554H845V537H866V559H902V623H927V641H275Z"/>
    <path d="M309 563L323 547L337 563ZM413 525L423 511L434 525ZM759 525L771 511L781 525ZM839 563L853 547L867 563Z"/>
    <path d="M295 641C410 680 486 651 553 602H647C713 652 792 680 910 641L904 660C785 703 682 669 624 629H576C515 670 411 704 299 660Z"/>
    {/* Two profiles share a book/paper and are joined to the central flower stem. */}
    <path d="M600 602C580 559 551 550 537 526L541 468L552 446L547 426L554 418L551 407L563 399C559 381 568 364 584 365C609 365 613 386 600 400L601 421L592 432L596 454L608 484L610 526L600 602Z"/>
    <path d="M600 602C620 559 649 550 663 526L659 468L648 446L653 426L646 418L649 407L637 399C641 381 632 364 616 365C591 365 587 386 600 400L599 421L608 432L604 454L592 484L590 526L600 602Z"/>
    <path d="M549 452L526 445L516 430C512 412 528 395 542 402L553 419ZM647 451L674 439L680 420C680 404 670 399 660 402L650 420Z"/>
    <path d="M557 535L597 546L641 535L645 561L600 574L555 561Z"/>
    <path d="M600 652V569M533 568Q600 611 667 568" fill="none" stroke="currentColor" strokeWidth="12"/>
  </>}
</g>;

export const ModernPaperCut: React.FC<{reveal?: number; id?: string}> = ({reveal = 1, id}) => {
  const generated = useId().replace(/:/g, '');
  const prefix = `${id ?? 'modern-paper'}-${generated}`;
  const modern = Math.max(0, Math.min(1, reveal));
  return <svg viewBox="0 0 1200 720" width="100%" height="100%" style={{overflow: 'visible'}} aria-label="双凤卷草与城市青年相融的镂空剪纸">
    <defs>
      <clipPath id={`${prefix}-reveal`}><path d={`M${600 - 375 * modern} 335Q600 ${285 - 30 * modern} ${600 + 375 * modern} 335V690H${600 - 375 * modern}Z`}/></clipPath>
      <mask id={`${prefix}-cut`} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="720">
        <g fill="white" color="white">
          <path d="M600 46C809 46 1066 112 1151 280C1212 401 1125 568 1012 627C828 725 372 725 188 627C75 568-12 401 49 280C134 112 391 46 600 46Z" fill="none" stroke="white" strokeWidth="14"/>
          <path d="M600 67C809 67 1044 128 1129 289C1181 398 1105 548 998 606C820 703 380 703 202 606C95 548 19 398 71 289C156 128 391 67 600 67Z" fill="none" stroke="white" strokeWidth="4"/>
          <g transform="translate(20 96) scale(.59 .72)"><PhoenixSilhouette/></g>
          <g transform="translate(1180 96) scale(-.59 .72)"><PhoenixSilhouette/></g>
          <path d="M93 529C214 691 454 656 600 614C746 656 986 691 1107 529M99 308C246 254 283 157 443 155C508 153 562 126 600 85C638 126 692 153 757 155C917 157 954 254 1101 308" fill="none" stroke="white" strokeWidth="12"/>
          <g transform="translate(560 302) rotate(-34) scale(.8)"><LeafSpray/></g>
          <g transform="translate(640 302) rotate(34) scale(-.8 .8)"><LeafSpray/></g>
          <PaperFlower x={600} y={124} scale={1.13}/><PaperFlower x={600} y={632} scale={.78}/>
          <g transform="translate(600 269) scale(.9)"><Cloud/></g>
          <g transform="translate(193 174) scale(.67) rotate(-22)"><Cloud/></g><g transform="translate(1007 174) scale(-.67 .67) rotate(-22)"><Cloud/></g>
          {[0, 1].map((i) => <g key={i} transform={i ? 'translate(1200 0) scale(-1 1)' : undefined}>
            <path d="M109 345C61 443 94 495 141 489C192 482 171 424 142 445M182 625C245 642 277 609 260 579" fill="none" stroke="white" strokeWidth="9"/>
            <PaperFlower x={114} y={406} scale={.62}/>
            <path d="M81 371Q17 343 50 315Q74 306 88 338M133 520Q65 559 67 509Q80 484 105 505"/>
          </g>)}
          <g clipPath={`url(#${prefix}-reveal)`}><CityLife/></g>
        </g>
        <g fill="black" color="black">
          <g transform="translate(20 96) scale(.59 .72)"><PhoenixHoles/></g>
          <g transform="translate(1180 96) scale(-.59 .72)"><PhoenixHoles/></g>
          <g transform="translate(560 302) rotate(-34) scale(.8)"><LeafSpray holes/></g>
          <g transform="translate(640 302) rotate(34) scale(-.8 .8)"><LeafSpray holes/></g>
          <PaperFlower x={600} y={124} scale={1.13} holes/><PaperFlower x={600} y={632} scale={.78} holes/>
          <g transform="translate(600 269) scale(.9)"><Cloud holes/></g>
          <g transform="translate(193 174) scale(.67) rotate(-22)"><Cloud holes/></g><g transform="translate(1007 174) scale(-.67 .67) rotate(-22)"><Cloud holes/></g>
          <PaperFlower x={114} y={406} scale={.62} holes/><PaperFlower x={1086} y={406} scale={.62} holes/>
          <g clipPath={`url(#${prefix}-reveal)`}><CityLife holes/></g>
          {Array.from({length: 18}, (_, i) => <g key={i} transform={`translate(${165 + i * 51} ${80 + Math.abs(8.5 - i) ** 1.68 * 2.9}) rotate(${(i - 8.5) * 7})`}><path d="M-7 0Q0-12 7 0Q0 10-7 0Z"/></g>)}
        </g>
      </mask>
    </defs>
    <rect width="1200" height="720" fill={colors.red} mask={`url(#${prefix}-cut)`}/>
  </svg>;
};
