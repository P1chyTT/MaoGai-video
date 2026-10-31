import {useId} from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {colors,tween} from '../shared/styleTokens';
/** Palette and layering test only: these shapes do not document a real historic view. */
export const LandscapeLayers=()=>{
 const id=useId().replace(/:/g,'');const f=useCurrentFrame();const {fps}=useVideoConfig();
 const reveal=tween(f,0,1.8*fps);
 return <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
  <defs><clipPath id={id}><rect x="80" y="180" width={1760*reveal} height="780"/></clipPath></defs>
  <g clipPath={`url(#${id})`}>
   <path d="M65 616C206 597 198 358 326 400C392 420 401 531 470 474C558 399 591 236 672 321C754 410 811 538 896 475C1017 389 1063 301 1151 372C1255 454 1309 419 1393 345C1509 247 1570 475 1651 467C1720 447 1771 493 1858 536V950H65Z" fill={colors.sky}/>
   <path d="M65 742C179 674 204 591 300 620C420 659 403 489 512 522C619 552 606 679 703 646C824 606 859 504 965 545C1071 581 1096 706 1212 627C1336 536 1374 515 1469 602C1578 702 1711 586 1858 727V950H65Z" fill={colors.jade}/>
   <path d="M65 862Q349 743 629 827Q863 906 1108 812Q1499 715 1858 847V965H65Z" fill={colors.forest}/>
   <g fill="none" stroke={colors.gold} opacity=".55" strokeWidth="2"><path d="M213 619Q287 576 314 454M544 516Q617 491 649 376M1376 550Q1456 480 1488 389"/><path d="M300 911C567 870 698 925 897 861C1116 790 1340 839 1694 762"/></g>
   <path d="M823 952C1039 837 1143 814 1382 823C1611 831 1720 868 1858 878V965H823Z" fill={colors.sky}/>
   <g fill="none" stroke={colors.paper} strokeWidth="3" opacity=".7" transform={`translate(${tween(f,0,4*fps,0,12)} 0)`}><path d="M1060 923Q1250 874 1410 884M1280 935Q1470 894 1655 911"/></g>
   <g transform="translate(300 790)" fill={colors.paper} stroke={colors.earth} strokeWidth="3"><path d="M0-66H168V58H0Z"/><path d="M-16-66L84-115L188-66Z" fill={colors.forest}/><path d="M62 58V-11H102V58M18-37H44V-6H18ZM123-37H151V-6H123Z"/><path d="M-7 60H179" stroke={colors.gold}/></g>
   <g stroke={colors.forest} fill={colors.forest}>{[0,1,2].map(i=><g key={i} transform={`translate(${1570+i*70} ${804-i*15}) rotate(${i*5-6})`}><path d="M0 92Q-8-68 11-193" fill="none" strokeWidth="8"/>{[0,1,2,3].map(j=><g key={j} transform={`translate(0 ${-j*42})`}><path d="M0 0Q-82-62-98-33Q-48-25 0 0ZM1-7Q65-75 88-60Q49-28 1-7Z"/></g>)}</g>)}</g>
  </g>
 </svg>;
};
