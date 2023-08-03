import { ReactNode, CSSProperties, FormEvent } from 'react';
export interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  name?: string;
  // when checked = false, radio cannot be checked by click
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: FormEvent) => void;
}
export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  name?: string;
  options?: Array<RadioOptionType>;
  optionType?: 'default' | 'button';
  onChange?: (event: FormEvent) => void;
}
export interface RadioOptionType {
  label?: string;
  value?: string;
  disabled?: boolean;
}

export const prefixClass = 'built-in-radio';
export const prefixGroupClass = 'built-in-radio-group';
