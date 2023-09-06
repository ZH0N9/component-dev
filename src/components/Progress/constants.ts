import { CSSProperties } from 'react';

export enum ProgressTypeEnum {
  line = 'line',
  circle = 'circle',
}
export enum ProgressStrokeLineCapTypeEnum {
  round = 'round',
  square = 'square',
  butt = 'butt',
}
export enum ProgressSizeEnum {
  default = 'default',
  small = 'small',
}
export type ProgressStrokeColor = {
  from: string;
  to: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
};
export type ProgressSizeObj = {
  width: number;
  height: number;
};
export type ProgressSizeType = 'default' | 'small';
export type ProgressType = 'line' | 'circle';
export type ProgressStrokeLineCapType = 'round' | 'square' | 'butt';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage?: number;
  showInfo?: boolean;
  strokeColor?: string | ProgressStrokeColor;
  trailColor?: string;
  className?: string;
  type?: ProgressType;
  size?: ProgressSizeType | ProgressSizeObj;
  strokeLinecap?: ProgressStrokeLineCapType;
  style?: CSSProperties;
}

export const prefixClass = 'built-in-progress';
