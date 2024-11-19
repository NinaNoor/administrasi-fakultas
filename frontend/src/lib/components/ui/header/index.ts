// src/lib/components/ui/header/index.ts

import { mount, type ComponentType } from 'svelte';
import Root from './header.svelte';
import BackButton from './header-back-button.svelte';
import NavMenu from './header-nav-menu.svelte';
import NavSubMenu from './header-nav-submenu.svelte';
import Search from './header-search.svelte';
import DarkModeToggle from './header-dark-mode-toggle.svelte';
import Notification from './header-notification.svelte';
import UserMenu from './header-user-menu.svelte';

// Component Props Interfaces
export interface RootProps {
  darkMode?: boolean;
  menus?: Array<{
    label: string;
    href: string;
    submenus: Array<{ 
      label: string; 
      href: string; 
    }>;
  }>;
}

export interface BackButtonProps {
  onClick: () => void;
}

// Component Type Definitions for Svelte 5
import type { SvelteComponent } from 'svelte';

type HeaderRoot = typeof Root;
type HeaderBackButton = typeof BackButton;
type HeaderNavMenu = typeof NavMenu;
type HeaderNavSubMenu = typeof NavSubMenu;
type HeaderSearch = typeof Search;

export interface HeaderComponents {
  Root: HeaderRoot;
  BackButton: HeaderBackButton;
  NavMenu: HeaderNavMenu;
  NavSubMenu: HeaderNavSubMenu;
  Search: HeaderSearch;
  DarkModeToggle: typeof DarkModeToggle;
  Notification: typeof Notification;
  UserMenu: typeof UserMenu;
}

// Helper function to create mounted components
export function createHeader(target: HTMLElement) {
  return {
    Root: (props: RootProps) => mount(Root, { target, props }),
    BackButton: (props: BackButtonProps) => mount(BackButton, { target, props }),
    NavMenu: (props: { 
      menus: Array<{
        label: string;
        href: string;
        submenus: Array<{ label: string; href: string; }>;
      }>;
      activeMenu: string;
      onMenuClick: (menu: {
        label: string;
        href: string;
        submenus: Array<{ label: string; href: string; }>;
      }) => void;
    }) => mount(NavMenu, { target, props }),
    NavSubMenu: (props: {
      submenus: Array<{ label: string; href: string; }>;
      activeSubmenu: string;
      onSubmenuClick: (submenu: { label: string; href: string; }) => void;
    }) => mount(NavSubMenu, { target, props }),
    Search: (props: { expanded?: boolean; onSearch: (query: string) => void; }) => 
      mount(Search, { target, props }),
    DarkModeToggle: (props: { darkMode: boolean; toggleMode: () => void; }) => 
      mount(DarkModeToggle, { target, props }),
    Notification: (props = {}) => mount(Notification, { target, props }),
    UserMenu: (props: { avatarSrc: string }) => mount(UserMenu, { target, props })
  };
}

// Named exports of component definitions
export {
  Root,
  BackButton,
  NavMenu,
  NavSubMenu,
  Search,
  DarkModeToggle,
  Notification,
  UserMenu,
};

// Default export of component collection
const Header: HeaderComponents = {
  Root,
  BackButton,
  NavMenu,
  NavSubMenu,
  Search,
  DarkModeToggle,
  Notification,
  UserMenu
};

export default Header;