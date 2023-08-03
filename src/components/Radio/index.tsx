import { Radio as InternalRadio } from './Radio';
import { RadioGroup } from './RadioGroup';
type RadioComponentType = typeof InternalRadio;
interface RadioComponentInterface extends RadioComponentType {
  Group: typeof RadioGroup;
}
const Radio = InternalRadio as RadioComponentInterface;
Radio.Group = RadioGroup;
export default Radio;
