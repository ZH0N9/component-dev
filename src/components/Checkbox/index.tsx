import { Checkbox as InternalCheckbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';
type CheckboxComponentType = typeof InternalCheckbox;
interface CheckboxComponentInterface extends CheckboxComponentType {
  Group: typeof CheckboxGroup;
}
const Checkbox = InternalCheckbox as CheckboxComponentInterface;
Checkbox.Group = CheckboxGroup;
export default Checkbox;
