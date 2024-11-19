<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Sun, Moon, Bell, Search } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
  import { page } from '$app/stores';

  let darkMode = false;
  const toggleMode = () => {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark');
  };

  const menus = [
    { 
      label: 'Beranda', 
      href: '/beranda', 
      submenus: [] 
    },
    { 
      label: 'Dosen', 
      href: '/dosen', 
      submenus: [
        { label: 'Dosen', href: '/dosen' },
        { label: 'Profil', href: '/dosen/profil' }
      ] 
    },
    { 
      label: 'Mahasiswa', 
      href: '/mahasiswa', 
      submenus: [
        { label: 'Mahasiswa', href: '/mahasiswa' },
        { label: 'Profil', href: '/mahasiswa/profil' }
      ] 
    },
    { 
      label: 'Perkuliahan', 
      href: '/perkuliahan', 
      submenus: [
        { label: 'Perkuliahan', href: '/perkuliahan' },
        { label: 'Penjadwalan', href: '/perkuliahan/penjadwalan' },
        { label: 'Kurikulum', href: '/perkuliahan/kurikulum' }
      ] 
    },
    { 
      label: 'Ujian', 
      href: '/ujian', 
      submenus: [
        { label: 'Ujian', href: '/ujian' },
        { label: 'Pengajuan Pembimbing', href: '/ujian/pengajuan-pembimbing' },
        { label: 'Pendaftaran Ujian', href: '/ujian/pendaftaran-ujian' },
        { label: 'Jadwal Ujian', href: '/ujian/jadwal-ujian' }
      ] 
    },
    { 
      label: 'Layanan Umum', 
      href: '/layanan-umum', 
      submenus: [
        { label: 'Layanan Umum', href: '/layanan-umum' },
        { label: 'Yudisium & Wisuda', href: '/layanan-umum/yudisium-wisuda' },
        { label: 'Surat & SK', href: '/layanan-umum/surat-sk' }
      ] 
    }
  ];

  let isSearchExpanded = false;
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

<div class="grid h-[100vh] grid-rows-[1fr,auto] bg-black text-white">
  <div class="p-4 row-start-1">
    <main class="h-full bg-white text-black rounded-[24px] flex flex-col dark:bg-zinc-900 dark:text-white overflow-hidden">
      <div class="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0 relative">
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
        </div>

        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center px-6 gap-2">
          <div 
            class="relative ml-auto"
            role="search"
            on:mouseenter={() => isSearchExpanded = true}
            on:mouseleave={() => isSearchExpanded = false}
          >
            <Search class="text-muted-foreground absolute left-2 top-2 h-4 w-4 z-10" />
            <Input 
              type="search" 
              class="bg-background rounded-full p-0 transition-all duration-300 ease-in-out
                {isSearchExpanded ? 'w-[200px] pl-8' : 'w-8 h-8 min-w-[32px]'}"
              style="padding: 0 0 0 2rem;"
            />
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button
                variant="outline"
                size="icon"
                class="rounded-full h-8 w-8 p-0 overflow-hidden"
                builders={[builder]}
              >
                <img
                  src="/images/placeholder-user.jpg"
                  width={32}
                  height={32}
                  alt="Avatar"
                  class="rounded-full w-full h-full object-cover"
                />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Label>Akun Saya</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item on:click={toggleMode}>
                <div class="flex items-center space-x-2">
                  <Sun class="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  <span>Mode Gelap</span>
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <div class="flex items-center space-x-2">
                  <Bell class="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  <span>Notifikasi</span>
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Pengaturan</DropdownMenu.Item>
              <DropdownMenu.Item>Dukungan</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Keluar</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>

      <div class="flex-1 p-6 min-h-0">
        <div class="h-full max-w-6xl mx-auto">
          <slot />
        </div>
      </div>
    </main>
  </div>
</div>

<style>
  :global(body) {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  :global(.dark) .bg-white {
    background-color: theme('colors.zinc.900');
  }

  :global(.transition-all) {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>