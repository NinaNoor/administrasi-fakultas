<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Sun, Moon, Bell, Search } from 'lucide-svelte';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
    import { page } from '$app/stores';
  
    export let darkMode = false;
  
    const toggleMode = () => {
      darkMode = !darkMode;
      document.documentElement.classList.toggle('dark');
    };
  
    export let menus: { label: string; href: string; submenus: { label: string; href: string }[] }[] = [];
    let activeMenu = menus[0];
    let activeSubmenu: { label: string; href: string } | null = null;
  
    const setActiveMenu = async (menu: { label: string; href: string; submenus: { label: string; href: string }[] }) => {
      activeMenu = menu;
      if (menu.submenus.length > 0) {
        activeSubmenu = menu.submenus[0];
        await goto(menu.submenus[0].href);
      } else {
        activeSubmenu = null;
        await goto(menu.href);
      }
    };
  
    const setActiveSubmenu = async (submenu: { label: string; href: string }) => {
      activeSubmenu = submenu;
      await goto(submenu.href);
    };
  
    const goBack = () => {
      window.history.back();
    };
  
    onMount(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      }
      const currentPath = $page.url.pathname;
      const currentMenu = menus.find(menu => currentPath.startsWith(menu.href));
      if (currentMenu) {
        if (currentMenu.submenus.length > 0) {
          const currentSubmenu = currentMenu.submenus.find(submenu => submenu.href === currentPath);
          if (currentSubmenu) {
            activeSubmenu = currentSubmenu;
          } else {
            activeSubmenu = currentMenu.submenus[0];
          }
        }
        activeMenu = currentMenu;
      }
    });
  </script>
  
  <div class="bg-white text-black dark:bg-zinc-900 dark:text-white">
    <div class="flex items-center h-16 px-6">
      <Button variant="outline" size="icon" on:click={goBack} class="rounded-full h-8 w-8 flex items-center justify-center">
        <ChevronLeft class="h-4 w-4" />
      </Button>
  
      <div class="flex bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 ml-4">
        {#each menus as menu}
          {@const isActive = menu === activeMenu}
          <a
            href={menu.href}
            class="px-4 py-1 text-sm transition-colors duration-200 rounded-full
              {isActive ? 
                'bg-black text-white dark:bg-white dark:text-black shadow-sm' : 
                'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}"
            on:click|preventDefault={() => setActiveMenu(menu)}
          >
            {menu.label}
          </a>
        {/each}
      </div>
  
      {#if activeMenu.submenus.length > 0}
        <div class="flex bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 ml-4">
          {#each activeMenu.submenus as submenu}
            {@const isActive = submenu === activeSubmenu}
            <a
              href={submenu.href}
              class="px-4 py-1 text-sm transition-colors duration-200 rounded-full
                {isActive ? 
                  'bg-black text-white dark:bg-white dark:text-black shadow-sm' : 
                  'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}"
              on:click|preventDefault={() => setActiveSubmenu(submenu)}
            >
              {submenu.label}
            </a>
          {/each}
        </div>
      {/if}
  
      <div class="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center px-6 gap-2">
        <Search class="text-muted-foreground absolute left-2 top-2 h-4 w-4 z-10" />
        <Input type="search" class="bg-background rounded-full" />
        <Button variant="outline" size="icon" class="rounded-full h-8 w-8" on:click={toggleMode}>
          {#if darkMode}
            <Sun class="h-4 w-4" />
          {:else}
            <Moon class="h-4 w-4" />
          {/if}
        </Button>
        <Button variant="outline" size="icon" class="rounded-full h-8 w-8">
          <Bell class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
  