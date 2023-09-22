import { MouseEventHandler } from 'react';
import { MenuItemProps, prefixClassItem } from './constants';
import styles from './index.module.scss';
import classNames from 'classnames';

export const MenuItem = (props: MenuItemProps) => {
  const { id, children, title, disabled = false, icon, className, style } = props;
  const selected = false;
  const cls = classNames({
    [styles[`${prefixClassItem}`]]: true,
    [styles[`${prefixClassItem}-disabled`]]: disabled,
    [styles[`${prefixClassItem}-selected`]]: selected,
    [className as string]: className,
    menuItemGlobal: true,
  });
  const handleClick: MouseEventHandler = (event) => {
    if (disabled) {
      return;
    }
    console.log(event);
    console.log(disabled, id);
  };
  return (
    <li className={cls} style={style} onClick={handleClick}>
      {icon && (
        <span className={classNames({ [styles[`${prefixClassItem}-icon`]]: true, menuItemIconGlobal: true })}>
          {icon}
        </span>
      )}
      <span className={classNames({ [styles[`${prefixClassItem}-content`]]: true, menuItemContentGlobal: true })}>
        {children}
      </span>
    </li>
  );
};
