import { ReactNode, CSSProperties, FormEventHandler } from 'react';

type OptionAlign = 'horizontal' | 'vertical';
export enum CheckboxOptionAlignMap {
  'horizontal' = 'row',
  'vertical' = 'column',
}
export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLInputElement> {
  name?: string;
  disabled?: boolean;
  value?: string[];
  defaultValue?: string[];
  className?: string;
  style?: CSSProperties;
  options?: Array<CheckboxOptionType>;
  optionAlign?: OptionAlign;
  onChange?: FormEventHandler;
}
export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onChange?: FormEventHandler;
}
export interface CheckboxOptionType {
  label?: string;
  value?: string;
  disabled?: boolean;
}
export const prefixClass = 'built-in-checkbox';
export const prefixGroupClass = 'built-in-checkbox-group';
