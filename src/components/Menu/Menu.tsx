import { MenuProps, prefixClass } from './constants';
import { useItems } from './hooks/useItems';
import styles from './index.module.scss';
import classNames from 'classnames';
export const Menu = (props: MenuProps) => {
  const { style, mode, items, children } = props;
  const cls = classNames({ [styles[`${prefixClass}`]]: true });
  const mergedChildren = useItems(items) || children;
  console.log('mergedChildren: ', mergedChildren);

  return <ul className={cls}>{mergedChildren}</ul>;
};
