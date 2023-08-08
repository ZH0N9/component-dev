import { MouseEventHandler, createContext } from 'react';

export interface RadioContextProps {
  value?: string | number;
  disabled?: boolean;
  onChange?: MouseEventHandler;
}
const RadioContext = createContext<RadioContextProps>({
  value: '',
  disabled: false,
  onChange: (event) => {},
});

export default RadioContext;
