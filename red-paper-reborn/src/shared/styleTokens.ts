import {Easing,interpolate} from 'remotion';
export const colors={forest:'#315D45',jade:'#6A9B8B',sky:'#A8C9C2',earth:'#8A6849',paper:'#F2E5CB',gold:'#C79540',ink:'#263D30'};
export const ease=Easing.bezier(.42,0,.22,1);
export const tween=(frame:number,start:number,end:number,from=0,to=1)=>interpolate(frame,[start,end],[from,to],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
export const FONT='ShanheSerif, SimSun, serif';
