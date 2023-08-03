import { buttonProps, prefixClass, sizeClassMap, typeClassMap } from './constants';
import Icon from '../Icon';
import style from './index.module.scss';
import classNames from 'classnames';
import { MouseEventHandler } from 'react';
const Button = (props: buttonProps) => {
  const {
    type = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    block = false,
    onClick,
    onBlur,
    children,
    className,
    ...restProps
  } = props;

  const cls = classNames({
    [style[`${prefixClass}`]]: true,
    [style[`${prefixClass}-${sizeClassMap[size]}`]]: !!size,
    [style[`${prefixClass}-${typeClassMap[type]}`]]: !!type,
    [style[`${prefixClass}-block`]]: block,
    [style[`${prefixClass}-loading`]]: loading,
    [className as string]: !!className,
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick && typeof onClick === 'function' && onClick(event);
  };

  return (
    <button className={cls} onClick={handleClick} onBlur={onBlur} disabled={disabled} {...restProps}>
      {loading && <Icon name="loading" spin />}
      {children}
    </button>
  );
};

export default Button;
