import { ReactNode, CSSProperties, FormEventHandler } from 'react';
export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onChange?: FormEventHandler;
}

export const prefixClass = 'built-in-checkbox';
