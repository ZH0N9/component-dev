import { ReactNode, CSSProperties } from 'react';
export type SwitchProps = {
  checked?: boolean;
  defatultChecked?: boolean;
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  size?: 'default' | 'small';
  onChange?: (checked: boolean, switcher: HTMLButtonElement) => void;
  onClick?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick'>;

export const prefixClass = 'built-in-switch';
