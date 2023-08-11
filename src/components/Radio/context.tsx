import { ChangeEventHandler, MouseEventHandler, createContext } from 'react';

export interface RadioContextProps {
  value?: string | number;
  disabled?: boolean;
  onChange?: ChangeEventHandler;
  onClick?: MouseEventHandler;
}
const RadioContext = createContext<RadioContextProps>({
  value: undefined,
  disabled: false,
  onChange: (event) => {},
  onClick: (event) => {},
});

export default RadioContext;
