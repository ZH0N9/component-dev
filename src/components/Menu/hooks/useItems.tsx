import { ItemType } from '../constants';
import { MenuGroup } from '../MenuGroup';
import { MenuDivider } from '../MenuDivider';
import { MenuItem } from '../MenuItem';
import { SubMenu } from '../SubMenu';
import { useMemo } from 'react';

/* @
 **
 */
function convertItemToNodes(items: ItemType[]) {
  if (items.length <= 0) {
    return;
  }
  return items
    .map((item, index) => {
      if (item && typeof item === 'object') {
        const { label, id, children, key, type, ...restProps } = item as any;
        const mergedKey = key ?? `tmp-${index}`;
        // SubMenu & MenuGroup case
        if (children || type === 'group') {
          if (type === 'group') {
            // MenuGroup
            return (
              <MenuGroup key={mergedKey} label={label} {...restProps}>
                {convertItemToNodes(children)}
              </MenuGroup>
            );
          }
          // SubMenu
          return (
            <SubMenu id={id} key={mergedKey} label={label} {...restProps}>
              {convertItemToNodes(children)}
            </SubMenu>
          );
        }
        // MenuDivider
        if (type === 'divider') {
          return <MenuDivider key={mergedKey} {...restProps}></MenuDivider>;
        }
        return (
          <MenuItem id={id} key={mergedKey} {...restProps}>
            {label}
          </MenuItem>
        );
      }
      return null;
    })
    .filter((node) => node);
}
export const useItems = (items?: ItemType[]) => {
  return useMemo(() => {
    if (!items) {
      return items;
    }
    return convertItemToNodes(items);
  }, [items]);
};
