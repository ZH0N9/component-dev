import { ReactNode } from 'react';
export interface AffixProps {
  children?: ReactNode;
  rootClassName?: string;
  className?: string;
  offsetBottom?: number;
  offsetTop?: number;
  target?: HTMLElement;
  onChange?: (affixed?: boolean) => void;
}

export const prefixClass = 'built-in-affix';
