import internal from 'stream';
import { Input as InternalInput } from './Input';
import { Textarea } from './Textarea';

type InputComponentType = typeof InternalInput;
interface InputComponentInterface extends InputComponentType {
  Textarea: typeof Textarea;
}
const Input = InternalInput as InputComponentInterface;
Input.Textarea = Textarea;
export default Input;
