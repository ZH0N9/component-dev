import { ReactNode, CSSProperties } from 'react';

//menu interfaces
export interface MenuProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onClick' | 'onSelect'> {
  items?: ItemType[];
  mode?: 'horizontal' | 'vertical' | 'inline';
  // inline 模式的菜单缩进宽度
  inlineIndent?: number;
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: (key: string, kePath: string[], event: MouseEvent) => void;
  onSelect?: (key: string, kePath: string[], event: MouseEvent) => void;
}
export interface MenuItemProps extends Omit<MenuItemType, 'children' | 'label'> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export interface SubMenuProps extends Omit<SubMenuType, 'children'> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export interface MenuGroupItemProps extends Omit<MenuGroupItemType, 'children'> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export interface MenuDividerInterface extends MenuDividerType {}

// menu types
export type ItemType = MenuItemType | SubMenuType | MenuGroupItemType | MenuDividerType | null;
export type MenuItemType = {
  label?: ReactNode;
  id?: string;
  title?: string;
  disabled?: boolean;
  icon?: ReactNode;
};
export type SubMenuType = {
  id?: string;
  label?: ReactNode;
  children?: ItemType[];
  disabled?: boolean;
  icon?: ReactNode;
  popupOffset?: [number, number];
  popupClassName?: string;
  onTitleClick?: (key: string, event: MouseEvent) => void;
};
export type MenuGroupItemType = {
  label?: ReactNode;
  children?: MenuItemType[];
  type?: 'group';
};
export type MenuDividerType = {
  type?: 'divider';
  dashed?: boolean;
};

// menu classnames
export const prefixClass = 'built-in-menu';
export const prefixClassItem = 'built-in-menu-item';
export const prefixClassSubmenu = 'built-in-menu-submenu';
export const prefixClassItemGroup = 'built-in-menu-group';
export const prefixClassDivider = 'built-in-menu-divider';
