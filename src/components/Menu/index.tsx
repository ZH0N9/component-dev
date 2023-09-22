import { Menu as InternalMenu } from './Menu';
import { MenuDivider } from './MenuDivider';
import { MenuItem } from './MenuItem';
import { MenuGroup } from './MenuGroup';
import { SubMenu } from './SubMenu';
type MenuComponentType = typeof InternalMenu;
interface MenuComponentInterface extends MenuComponentType {
  MenuDivider: typeof MenuDivider;
  MenuItem: typeof MenuItem;
  MenuGroup: typeof MenuGroup;
  SubMenu: typeof SubMenu;
}
const Menu = InternalMenu as MenuComponentInterface;
Menu.MenuDivider = MenuDivider;
Menu.MenuItem = MenuItem;
Menu.MenuGroup = MenuGroup;
Menu.SubMenu = SubMenu;

export default Menu;
