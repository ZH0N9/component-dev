import { InputProps, prefixClass } from './constants';
import style from './index.module.scss';
import classNames from 'classnames';
export const Input = (props: InputProps) => {
  const { children, className, ...restProps } = props;
  const cls = classNames({
    [style[`${prefixClass}`]]: true,
    [className as string]: !!className,
  });
  return (
    <div className="{cls}" {...restProps}>
      {children}
    </div>
  );
};
