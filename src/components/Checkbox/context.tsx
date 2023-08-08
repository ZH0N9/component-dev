import { MouseEventHandler, createContext } from 'react';

export interface CheckboxContextProps {
  value?: Array<string | number>;
  disabled?: boolean;
  onChange?: MouseEventHandler;
}
const CheckboxContext = createContext<CheckboxContextProps>({
  value: undefined,
  disabled: false,
  onChange: (event) => {},
});
export default CheckboxContext;
