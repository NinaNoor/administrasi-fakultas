import type { Menu } from '../types/menu';

export interface HeaderNavTabProps {
  menus: Menu[];
  activeMenu: Menu;
  activeTab: string;
  setActiveMenu: (menu: Menu) => void;
  setActiveTab: (tab: string) => void;
}