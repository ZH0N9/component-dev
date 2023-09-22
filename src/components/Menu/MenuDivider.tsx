import { MenuDividerInterface, prefixClassDivider } from './constants';
import styles from './index.module.scss';
import classNames from 'classnames';

export const MenuDivider = (props: MenuDividerInterface) => {
  const { dashed = false } = props;
  const cls = classNames({
    [styles[`${prefixClassDivider}`]]: true,
    [styles[`${prefixClassDivider}-dashed`]]: dashed,
    menuItemDividerGlobal: true,
  });
  return <li role="separator" className={cls}></li>;
};
