import React, {useId} from 'react';
import {Img, staticFile} from 'remotion';
import {ScissorAnimation} from '../shared/ScissorAnimation';
import {colors, tween} from '../shared/styleTokens';
import {ModernPaperCut, PaperFlower} from './PaperArt';

const Mountain: React.FC<{d: string; fill: string; opacity?: number}> = ({d, fill, opacity = 1}) => <path d={d} fill={fill} opacity={opacity}/>;

const CloudRibbon: React.FC<{x: number; y: number; scale?: number; flip?: boolean}> = ({x, y, scale = 1, flip = false}) => <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
  <path d="M-150 24C-192 24-198-9-166-14C-186-44-145-68-119-43C-108-91-51-91-38-48C-8-73 38-54 29-23C66-39 103-9 83 14C127 7 162 13 180 30C57 46-54 44-150 24Z" fill={colors.gold}/>
  <path d="M-156 8C-123 12-105 4-106-15C-106-39-71-46-60-22C-47 2-83 15-105 8M-47 7C-19-19 3-16 15-3M39 25Q92 12 128 25" fill="none" stroke={colors.paper} strokeWidth="5" strokeLinecap="round"/>
</g>;

const Pavilion: React.FC<{x: number; y: number; scale?: number; small?: boolean}> = ({x, y, scale = 1, small = false}) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <path d="M-105 126H105V139H-105ZM-86 112H86V126H-86Z" fill={colors.wood}/>
  <path d="M-74 13H74V115H-74Z" fill={colors.red}/>
  {[-55, -23, 23, 55].map((v) => <path key={v} d={`M${v - 5} 10H${v + 5}V114H${v - 5}Z`} fill={colors.wood}/>)}
  <path d="M-88 76H88M-88 91H88" stroke={colors.gold} strokeWidth="5"/>
  <path d="M-34 44H34V110H-34Z" fill={colors.paper}/>
  <path d="M-30 44L0 22L30 44M-20 44v60M0 30v74M20 44v60" fill="none" stroke={colors.gold} strokeWidth="4"/>
  <path d="M-118 23C-79 14-47-15-17-47H17C47-15 79 14 118 23L101 35H-101Z" fill={colors.jade}/>
  <path d="M-123 17Q-103 29-85 19L-10-40H10L85 19Q103 29 123 17M-101 34H101" fill="none" stroke={colors.gold} strokeWidth="6" strokeLinecap="round"/>
  {!small && <g transform="translate(0 -75) scale(.68)"><path d="M-75 61V5H75V61" fill={colors.red}/><path d="M-118 14C-73 7-46-18-14-47H14C46-18 73 7 118 14L99 28H-99Z" fill={colors.jade}/><path d="M-121 9Q-102 22-85 12L-8-43H8L85 12Q102 22 121 9M-99 27H99" fill="none" stroke={colors.gold} strokeWidth="6"/><path d="M-44 9v43M-21 9v43M21 9v43M44 9v43" stroke={colors.gold} strokeWidth="5"/></g>}
</g>;

/** Small articulated profiles echo the existing leather puppets, with adult proportions. */
const ScrollPerson: React.FC<{x: number; y: number; scale?: number; flip?: boolean; elder?: boolean; jacket?: string; pose?: 'work' | 'show' | 'stand'; move?: number}> = ({x, y, scale = 1, flip = false, elder = false, jacket = colors.jade, pose = 'stand', move = 0}) => <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} stroke={colors.ink} strokeWidth="2.2" strokeLinejoin="round">
  <path d="M-19-114L-22-61L-31-7L-8-7L4-66L14-7H37L27-118Z" fill={elder ? colors.wood : colors.red}/>
  <path d="M-32-8Q-13-11-8-2L-8 2H-41Q-42-5-32-8ZM13-8Q30-9 39-2L39 3H11Z" fill={colors.ink}/>
  <path d="M-27-199Q0-219 26-196L33-116Q10-101-32-115L-37-169Z" fill={jacket}/>
  <path d="M-8-211L-4-195L10-189L18-211Z" fill={colors.paper}/>
  <g transform="translate(0 -211) scale(.74) translate(0 211)">
    <path d="M-13-257C-28-247-27-223-17-214L7-209L17-218L20-229L34-233L24-241L24-252C14-268-3-269-13-257Z" fill={colors.paper}/>
    <path d={elder ? 'M-24-245C-42-257-26-280-10-270C15-283 34-266 25-252L8-247L-4-257L-13-240Z' : 'M-26-238C-32-265-7-280 14-269Q33-270 30-250L8-247L-7-260L-14-238ZM-20-255C-57-259-51-222-45-213C-40-237-30-228-21-241Z'} fill={elder ? colors.paper : colors.ink}/>
    <path d="M16-245q4-2 7 0M17-242h5M18-223l7-2" stroke={colors.ink} strokeWidth="1.7" fill="none"/>
    {elder && <path d="M6-239h18M7-241v8h12v-8M-9-242l15 3" fill="none" stroke={colors.wood} strokeWidth="1.7"/>}
  </g>
  <path d="M-18-186L-4-165L-10-123M4-181L14-159L8-127" fill="none" stroke={colors.gold} strokeWidth="3"/>
  <path d="M-10-203L2-187L18-200M-26-120Q1-112 26-119M-20-119Q-24-106-19-93M16-104L20-68L25-18M-11-97L-16-62L-22-18" fill="none" stroke={colors.gold} strokeWidth="1.6"/>
  <path d="M-25-174Q-14-164-24-154Q-32-161-25-174ZM-25-153Q-14-143-24-133Q-32-140-25-153ZM15-139Q28-149 26-133Q19-127 15-139Z" fill="none" stroke={colors.gold} strokeWidth="1.6"/>
  <path d="M-24-169L-24-138M18-136L24-139" fill="none" stroke={colors.paper} strokeWidth="1"/>
  <g transform={`translate(21 -185) rotate(${pose === 'show' ? -49 + move : pose === 'work' ? -5 + move : 19})`}>
    <path d="M-10 0Q4-10 12 0L22 48L11 53L-7 14Z" fill={jacket}/>
    <g transform="translate(17 48) rotate(-58)"><path d="M-7 0H8L13 51L6 64L-3 61L-5 45Z" fill={jacket}/><path d="M-3 50L12 51L16 66L9 74L1 65Z" fill={colors.paper}/><circle r="4" fill={colors.gold}/></g>
    <circle r="4.5" fill={colors.gold}/>
  </g>
  <g transform={`translate(-24 -181) rotate(${pose === 'work' ? -28 : 5})`}><path d="M-10 0Q0-8 10 0L8 64L0 72L-9 63Z" fill={jacket}/><circle r="4" fill={colors.gold}/><path d="M-7 60L6 61L9 78L0 84L-8 76Z" fill={colors.paper}/></g>
  <circle cx="-10" cy="-112" r="4.5" fill={colors.gold}/><circle cx="18" cy="-112" r="4.5" fill={colors.gold}/>
  <path d="M-22-145Q-5-166 10-146Q-3-123-22-145ZM-13-138L0-154M-18-151L5-140" fill="none" stroke={colors.gold} strokeWidth="2.5"/>
</g>;

const VineSide: React.FC<{progress: number; right?: boolean}> = ({progress, right = false}) => <g transform={right ? 'translate(1920 0) scale(-1 1)' : undefined} fill={colors.red} opacity={progress > 0 ? 1 : 0}>
  <path d="M959 609C791 685 733 511 620 553C536 587 515 755 377 765C273 773 280 667 205 648C152 633 94 666 90 742M622 553C552 493 505 412 403 426C302 442 354 511 397 473M377 765C329 820 239 845 151 825" fill="none" stroke={colors.red} strokeWidth="15" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress}/>
  <g opacity={Math.max(0, (progress - .45) / .55)}>
    {[[182, 656, -28], [287, 735, -54], [452, 715, 35], [540, 611, -25], [613, 548, 40], [368, 433, -28], [164, 823, 20]].map(([x, y, r], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d="M0 0C-45-62-82-48-61-17C-42 7-13 4 0 0C31-56 70-63 62-30C55-7 18 6 0 0Z"/>
      <path d="M-7-4L-53-28M8-4L47-32" fill="none" stroke={colors.paper} strokeWidth="3"/>
    </g>)}
    <PaperFlower x={91} y={741} scale={1.25}/><PaperFlower x={401} y={454} scale={.85}/><PaperFlower x={506} y={705} scale={.75}/>
    <g fill={colors.paper}><PaperFlower x={91} y={741} scale={1.25} holes/><PaperFlower x={401} y={454} scale={.85} holes/><PaperFlower x={506} y={705} scale={.75} holes/></g>
  </g>
</g>;

export const ScrollReveal: React.FC<{frame: number; fps?: number}> = ({frame, fps = 30}) => {
  const generated = useId().replace(/:/g, '');
  const prefix = `scroll-${generated}`;
  // No ambient loop continues into the held final second.
  const f = Math.min(frame, 7 * fps);
  const pull = tween(f, 0, 2 * fps);
  const grow = tween(f, .35 * fps, 2.25 * fps);
  const landscape = tween(f, 1.65 * fps, 4 * fps);
  const people = tween(f, 4 * fps, 5.85 * fps);
  const settle = tween(f, 5.8 * fps, 6.8 * fps);
  const wide = tween(f, 1.3 * fps, 4.3 * fps);
  return <>
    <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: 'absolute', inset: 0, overflow: 'hidden'}} aria-label="从红纸延展出的青绿山河与非遗传承画卷">
      <defs>
        <clipPath id={`${prefix}-stage`}><rect x="77" y="202" width="1766" height="700" rx="6"/></clipPath>
        <mask id={`${prefix}-land-reveal`} maskUnits="userSpaceOnUse"><rect width="1920" height="1080" fill="black"/><ellipse cx="960" cy="625" rx={65 + 1030 * wide} ry={30 + 470 * wide} fill="white"/></mask>
        <linearGradient id={`${prefix}-paper`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={colors.paper} stopOpacity=".08"/><stop offset=".48" stopColor={colors.paper} stopOpacity=".88"/><stop offset="1" stopColor={colors.paper}/></linearGradient>
      </defs>
      <g clipPath={`url(#${prefix}-stage)`}>
        <rect x="78" y="203" width="1764" height="697" fill={`url(#${prefix}-paper)`} opacity={tween(f, .6 * fps, 1.7 * fps)}/>
        <g mask={`url(#${prefix}-land-reveal)`} opacity={landscape}>
          <g transform={`translate(${(1 - landscape) * -24} ${(1 - landscape) * 18})`}>
            <Mountain fill={colors.jade} opacity={.16} d="M70 672C95 611 149 611 182 558C213 507 220 436 257 442C290 447 307 505 332 506C365 504 380 432 402 379C427 312 449 322 469 366C489 409 504 452 523 452C551 450 570 411 594 425C622 444 649 504 677 521C722 551 734 497 760 478C801 448 823 504 851 524C918 574 944 534 997 545C1049 555 1051 516 1081 491C1117 454 1132 512 1157 526C1192 537 1216 471 1238 439C1260 406 1285 440 1307 442C1335 445 1351 362 1380 353C1414 339 1439 448 1468 449C1491 450 1513 402 1535 415C1563 428 1575 471 1598 476C1634 485 1652 433 1676 452C1704 477 1717 545 1746 560C1776 579 1802 583 1849 657V875H70Z"/>
            <path d="M145 652Q223 610 249 510Q260 475 276 502M335 602Q396 534 411 438Q425 374 445 379M447 507Q462 455 474 444M1346 557Q1371 506 1384 408Q1390 387 1404 418M1530 568Q1554 518 1560 482M1668 606Q1687 561 1684 506" fill="none" stroke={colors.gold} strokeWidth="2.3" opacity=".6"/>
          </g>
          <g transform={`translate(${(1 - landscape) * 18} ${(1 - landscape) * 30})`}>
            <Mountain fill={colors.jade} opacity={.4} d="M70 777C154 719 215 721 260 676C309 623 294 561 333 563C368 561 373 650 402 635C433 619 444 555 474 564C511 573 489 663 544 670C592 675 611 611 658 634C707 658 690 703 756 710C827 722 854 672 899 683C961 702 997 739 1058 700C1110 666 1149 704 1194 673C1232 644 1221 558 1253 552C1283 547 1288 599 1313 616C1343 636 1364 553 1391 571C1427 596 1421 646 1454 651C1504 659 1519 588 1556 613C1592 635 1602 689 1656 689C1731 688 1791 730 1848 772V909H70Z"/>
            <path d="M119 778C283 743 306 711 328 621M273 788C356 759 376 718 396 663M433 772C467 742 483 703 484 659M1259 731L1263 597M1318 760C1368 698 1382 664 1388 619M1434 772C1509 748 1530 708 1541 656M1632 789C1688 764 1721 762 1776 788" fill="none" stroke={colors.paper} strokeWidth="3" opacity=".6"/>
          </g>
          <g opacity={tween(f, 2.5 * fps, 4 * fps)}>
            <CloudRibbon x={319} y={300} scale={.82}/><CloudRibbon x={1601} y={311} scale={.9} flip/>
            <CloudRibbon x={1031} y={244} scale={.54}/>
            <path d="M93 357Q205 380 315 357M1513 392Q1647 416 1821 384M614 302Q692 321 763 303" fill="none" stroke={colors.gold} strokeWidth="3"/>
            <Pavilion x={1543} y={581} scale={.94}/><Pavilion x={342} y={620} scale={.65} small/>
            <path d="M226 748C399 700 517 741 636 758S849 772 956 745C1105 709 1201 738 1317 764S1620 810 1794 741" fill="none" stroke={colors.gold} strokeWidth="5"/>
            <path d="M184 789C366 766 499 797 666 807M1094 806C1307 771 1491 846 1763 795M147 817C266 809 325 826 401 821M1520 838Q1640 850 1777 822" fill="none" stroke={colors.jade} strokeWidth="3" opacity=".7"/>
          </g>
        </g>
        <VineSide progress={grow}/><VineSide progress={grow} right/>
        <g opacity={landscape}>
          <path d="M88 874C182 839 245 873 307 858C381 840 418 840 479 853C548 870 581 858 638 848C720 832 761 852 821 858C923 867 994 842 1090 851C1172 861 1205 878 1288 855C1391 824 1454 870 1526 851C1628 827 1730 842 1832 874V899H88Z" fill={colors.jade}/>
          <path d="M101 879C194 854 237 880 308 866C390 848 448 850 495 864M1074 860Q1171 882 1250 867M1455 864Q1585 837 1697 864" fill="none" stroke={colors.gold} strokeWidth="3"/>
        </g>
        <g opacity={people} transform={`translate(0 ${(1 - people) * 35})`}>
          {/* Left: a real handwork table, its red sheet passed between learners. */}
          <ScrollPerson x={389} y={854} scale={.68} pose="work" move={-5 * people}/>
          <ScrollPerson x={593} y={858} scale={.71} flip pose="work" jacket={colors.wood} move={3 * people}/>
          <path d="M426 781H558V794H426ZM436 793H445V856H436ZM541 793H550V856H541Z" fill={colors.wood} stroke={colors.ink} strokeWidth="2"/>
          <path d="M461 767L520 771L526 782L462 780Z" fill={colors.red}/>
          <path d="M473 775l12-4l15 5M533 774l8-5m-7 6l7 3" fill="none" stroke={colors.gold} strokeWidth="2"/>
          <ScissorAnimation frame={0} x={510} y={772} scale={.15} rest/>
          {/* The two original character assets complete the same gesture as Scene23. */}
          <foreignObject x="1260" y="630" width="150" height="225"><Img src={staticFile('assets/characters/grandma.png')} style={{width: 150, height: 225, display: 'block'}}/></foreignObject>
          <foreignObject x="1460" y="632" width="150" height="225"><Img src={staticFile('assets/characters/xiaolin.png')} style={{width: 150, height: 225, display: 'block'}}/></foreignObject>
          <g transform="translate(1438 738)"><circle r="42" fill={colors.red}/><g fill={colors.paper}><PaperFlower scale={.62} holes/></g><circle r="35" fill="none" stroke={colors.paper} strokeWidth="2"/></g>
          {/* The middle viewer links the small stories without becoming another scene. */}
          <ScrollPerson x={1172} y={862} scale={.57} flip jacket={colors.wood}/>
        </g>
        <g opacity={settle} fill={colors.gold}>
          <path d="M87 222H295M87 222V288M1833 222H1625M1833 222V288M87 891H295M87 891V825M1833 891H1625M1833 891V825" fill="none" stroke={colors.gold} strokeWidth="3"/>
          <path d="M308 221l9-6l9 6l-9 6ZM1594 221l9-6l9 6l-9 6ZM308 891l9-6l9 6l-9 6ZM1594 891l9-6l9 6l-9 6Z"/>
        </g>
      </g>
    </svg>
    {/* The very first frame is exactly Scene23's held paper, at the same coordinates. */}
    <div style={{position: 'absolute', left: 480 + 180 * pull, top: 250 + 50 * pull, width: 960 - 360 * pull, height: 576 - 216 * pull}}><ModernPaperCut reveal={1} id="scroll-central-paper"/></div>
  </>;
};
