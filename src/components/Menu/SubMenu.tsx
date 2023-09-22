import { useState } from 'react';
import { SubMenuProps, prefixClassSubmenu } from './constants';
import styles from './index.module.scss';
import classNames from 'classnames';
import { chdir } from 'process';

export const SubMenu = (props: SubMenuProps) => {
  const { label, disabled = false, icon, className, style, children } = props;
  const [open, setOpen] = useState(false);
  const cls = classNames({
    [styles[`${prefixClassSubmenu}`]]: true,
    [styles[`${prefixClassSubmenu}-disabled`]]: disabled,
    [styles[`${prefixClassSubmenu}-open`]]: open,
    [className as string]: className,
    menuItemSubMenuGlobal: true,
  });
  return (
    <li className={cls} style={style}>
      <div className={classNames({ [styles[`${prefixClassSubmenu}-title`]]: true, menuItemSubMenuTitleGlobal: true })}>
        {icon && (
          <span
            className={classNames({ [styles[`${prefixClassSubmenu}-icon`]]: true, menuItemSubMenuIconGlobal: true })}
          >
            {icon}
          </span>
        )}
        <span
          className={classNames({
            [styles[`${prefixClassSubmenu}-title-content`]]: true,
            menuItemSubMenuTitleContentGlobal: true,
          })}
        >
          {label}
        </span>
        <span
          className={classNames({ [styles[`${prefixClassSubmenu}-arrow`]]: true, menuItemSubMenuArrow: true })}
        ></span>
      </div>
      <ul className={classNames({ [styles[`${prefixClassSubmenu}-list`]]: true, menuItemSubMenuListGlobal: true })}>
        {children}
      </ul>
    </li>
  );
};
