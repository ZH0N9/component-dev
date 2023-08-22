import { ChangeEventHandler, MouseEventHandler, createContext } from 'react';

export interface CheckboxContextProps {
  value?: Array<string | number>;
  disabled?: boolean;
  onChange?: ChangeEventHandler;
  onClick?: MouseEventHandler;
}
const CheckboxContext = createContext<CheckboxContextProps>({
  value: undefined,
  disabled: false,
  onChange: (event) => {},
  onClick: (event) => {},
});
export default CheckboxContext;
