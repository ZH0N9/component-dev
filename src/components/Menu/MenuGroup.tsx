import { MenuGroupItemProps, prefixClassItemGroup } from './constants';
import { MenuItem } from './MenuItem';
import styles from './index.module.scss';
import classNames from 'classnames';

export const MenuGroup = (props: MenuGroupItemProps) => {
  const { className, style, label, children } = props;
  const cls = classNames({
    [styles[`${prefixClassItemGroup}`]]: true,
    [className as string]: className,
    menuItemGroupGlobal: true,
  });
  // const groupListView = () => {
  //   return children ? (
  //     <ul
  //       role="group"
  //       className={classNames({ [styles[`${prefixClassItemGroup}-list`]]: true, menuItemGroupListGlobal: true })}
  //     >
  //       {children.map((menuItem, index) => {
  //         return <MenuItem key={menuItem.id} {...menuItem}></MenuItem>;
  //       })}
  //     </ul>
  //   ) : null;
  // };
  return (
    <li className={cls} style={style}>
      <div className={classNames({ [styles[`${prefixClassItemGroup}-title`]]: true, menuItemGroupTitleGlobal: true })}>
        {label}
      </div>
      {/* {groupListView()} */}
      <ul
        role="group"
        className={classNames({ [styles[`${prefixClassItemGroup}-list`]]: true, menuItemGroupListGlobal: true })}
      >
        {children}
      </ul>
    </li>
  );
};
