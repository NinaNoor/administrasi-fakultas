<script lang="ts">
  import { goto } from '$app/navigation';
  import { Sun, Moon, Bell, Search } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let darkMode = false;
  const toggleMode = () => {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark');
  };

  const menus = [
    { 
      label: 'Beranda', 
      href: '/beranda', 
      submenus: [
        { label: 'Beranda', href: '/beranda' }
      ] 
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
  let activeMenu: typeof menus[0];
  let activeSubmenu: { label: string; href: string } | null = null;

  // Initialize active states based on current path
  $: {
    const path = $page.url.pathname;
    activeMenu = menus.find(menu => 
      path.startsWith(menu.href) || 
      menu.submenus.some(sub => path.startsWith(sub.href))
    ) || menus[0];
    
    if (activeMenu.submenus.length > 0) {
      activeSubmenu = activeMenu.submenus.find(sub => 
        path.startsWith(sub.href)
      ) || activeMenu.submenus[0];
    }
  }

  const setActiveMenu = async (menu: typeof menus[0]) => {
    const targetHref = menu.submenus.length > 0 ? menu.submenus[0].href : menu.href;
    await goto(targetHref);
  };

  const setActiveSubmenu = async (submenu: { label: string; href: string }) => {
    await goto(submenu.href);
  };

  const goBack = () => {
    window.history.back();
  };

  // Initialize dark mode from local storage
  onMount(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    darkMode = isDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  });

  // Save dark mode preference
  $: if (typeof window !== 'undefined') {
    localStorage.setItem('darkMode', darkMode.toString());
  }

  type ColorScheme = {
  light: string;
  dark: string;
};

type SubMenuColors = {
  [key: string]: ColorScheme;
};

type MenuColorConfig = {
  light: string;
  dark: string;
  submenus: SubMenuColors;
};

type MenuColors = {
  [key: string]: MenuColorConfig;
};

const menuColors: MenuColors = {
  '/beranda': {
    light: '#FCA5A5', // Complementary of #4CAF50
    dark: '#FF8A75',  // Complementary of #388E3C
    submenus: {
      '/beranda': { light: '#F87171', dark: '#EF4444' } // Variants of complementary coral shades
    }
  },
  '/dosen': {
    light: '#FFC857', // Complementary of #2196F3
    dark: '#FFAA00',  // Complementary of #1976D2
    submenus: {
      '/dosen': { light: '#FFD580', dark: '#FF9800' },     // Variants of complementary amber shades
      '/dosen/profil': { light: '#FFB347', dark: '#FFA000' } // Warmer complementary amber tones
    }
  },
  '/mahasiswa': {
    light: '#B392FF', // Complementary of #FFC107
    dark: '#814BFF',  // Complementary of #FFB300
    submenus: {
      '/mahasiswa': { light: '#C3A1FF', dark: '#9A67EA' },     // Softer lavender shades
      '/mahasiswa/profil': { light: '#A585FF', dark: '#673AB7' } // Slightly deeper purple shades
    }
  },
  '/perkuliahan': {
    light: '#9BF5A1', // Complementary of #673AB7
    dark: '#3CCF63',  // Complementary of #512DA8
    submenus: {
      '/perkuliahan': { light: '#A7F5BC', dark: '#2ECC71' },     // Muted lime greens
      '/perkuliahan/penjadwalan': { light: '#81F2A2', dark: '#34D399' }, // Fresh green shades
      '/perkuliahan/kurikulum': { light: '#72C976', dark: '#1F9F50' }  // Earthy greens
    }
  },
  '/ujian': {
    light: '#03A9F4', // Complementary of #F44336
    dark: '#0288D1',  // Complementary of #D32F2F
    submenus: {
      '/ujian': { light: '#29B6F6', dark: '#0277BD' },     // Cooler blue shades
      '/ujian/pengajuan-pembimbing': { light: '#81D4FA', dark: '#039BE5' }, // Aqua tones
      '/ujian/pendaftaran-ujian': { light: '#4FC3F7', dark: '#0288D1' },   // Vibrant cyan
      '/ujian/jadwal-ujian': { light: '#039BE5', dark: '#0277BD' }  // Consistent deep blue tones
    }
  },
  '/layanan-umum': {
    light: '#1976D2', // Complementary of #FF9800
    dark: '#1565C0',  // Complementary of #F57C00
    submenus: {
      '/layanan-umum': { light: '#1E88E5', dark: '#0D47A1' },     // Deep blues
      '/layanan-umum/yudisium-wisuda': { light: '#42A5F5', dark: '#1565C0' }, // Bright sky blues
      '/layanan-umum/surat-sk': { light: '#2196F3', dark: '#0D47A1' }  // Vibrant blues
    }
  }
};

// Update the color getter functions with proper typing
const getMenuColor = (href: string): string => {
  const menuColor = menuColors[href];
  return menuColor ? (darkMode ? menuColor.dark : menuColor.light) : 'transparent';
};

const getSubmenuColor = (menuHref: string, submenuHref: string): string => {
  const submenuColor = menuColors[menuHref]?.submenus[submenuHref];
  return submenuColor ? (darkMode ? submenuColor.dark : submenuColor.light) : 'transparent';
};

</script>

<div class="layout-container">
  <div class="bg-transparent backdrop-blur-sm border-zinc-200/50 dark:border-zinc-800/50 flex-shrink-0 relative">
    <div class="flex items-center h-16 px-6">
      <Button 
      variant="outline" 
      size="icon" 
      on:click={goBack} 
      class="flex bg-gray-700/30 backdrop-filter backdrop-blur-md rounded-full p-1 items-center justify-center"
    >
    <ChevronLeft class="h-4 w-4" style="color: {darkMode ? '#FFFFFF' : '#333333'}" />
    </Button>

      <div class="flex bg-gray-700/30 backdrop-filter backdrop-blur-md rounded-full p-1 ml-4">
        {#each menus as menu}
          {@const isActive = $page.url.pathname.startsWith(menu.href)}
          <a
          href={menu.submenus.length > 0 ? menu.submenus[0].href : menu.href}
          class="px-4 py-1 text-sm transition-colors duration-200 rounded-full"
          style="
            background-color: {isActive ? getMenuColor(menu.href) : 'transparent'};
            color: {darkMode ? '#FFFFFF' : '#333333'};
          "
          on:click={() => setActiveMenu(menu)}
        >
          {menu.label}
        </a>
        {/each}
      </div>

      {#if activeMenu?.submenus.length > 0}
      <div class="flex bg-gray-700/30 backdrop-filter backdrop-blur-md rounded-full p-1 ml-4">
        {#each activeMenu.submenus as submenu}
          {@const isActive = $page.url.pathname.startsWith(submenu.href)}
          <a
          href={submenu.href}
          class="px-4 py-1 text-sm transition-colors duration-200 rounded-full"
          style="
            background-color: {isActive ? getSubmenuColor(activeMenu.href, submenu.href) : 'transparent'};
            color: {darkMode ? '#FFFFFF' : '#333333'};
          "
          on:click={() => setActiveSubmenu(submenu)}
        >
          {submenu.label}
        </a>
          {/each}
        </div>
      {/if}

      <div class="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center px-6 gap-2">
        <div 
          class="relative"
          role="search"
          on:mouseenter={() => isSearchExpanded = true}
          on:mouseleave={() => isSearchExpanded = false}
        >
          <Search 
            class="text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10" 
          />
          <Input 
            type="search" 
            class="bg-gray-700/30 backdrop-filter backdrop-blur-md rounded-full transition-all duration-300 ease-in-out
              {isSearchExpanded ? 'w-[200px] h-[36px] pl-8' : 'w-[36px] h-[36px] pl-2'}"
            style="border: none; outline: none;"
          />
        </div>

      <Button
      variant="ghost"
      size="icon"
      class="flex bg-gray-700/30 backdrop-filter backdrop-blur-md rounded-full p-1"
      on:click={toggleMode}
    >
      {#if darkMode}
        <Sun class="h-4 w-4" />
      {:else}
        <Moon class="h-4 w-4" />
      {/if}
    </Button>
    

    <Button
    variant="ghost"
    size="icon"
    class="flex bg-gray-700/30 backdrop-filter backdrop-blur-md rounded-full p-1"
  >
    <Bell class="h-4 w-4" />
  </Button>
  
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        variant="ghost"
        size="icon"
        class="flex bg-gray-700/30 backdrop-filter backdrop-blur-md rounded-full p-1 overflow-hidden"
        builders={[builder]}
      >
        <img
          src="/01.png"
          alt="Avatar"
          class="rounded-full w-6 h-6 object-cover"
        />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end" class="bg-gray-700/30 backdrop-filter backdrop-blur-md rounded-lg">
      <DropdownMenu.Label class="px-2 py-1.5">Akun Saya</DropdownMenu.Label>
      <DropdownMenu.Separator class="bg-gray-500/20" />
      <DropdownMenu.Item class="px-2 py-1.5 hover:bg-gray-700/40">Pengaturan</DropdownMenu.Item>
      <DropdownMenu.Item class="px-2 py-1.5 hover:bg-gray-700/40">Dukungan</DropdownMenu.Item>
      <DropdownMenu.Separator class="bg-gray-500/20" />
      <DropdownMenu.Item class="px-2 py-1.5 hover:bg-gray-700/40">Keluar</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
      </div>
    </div>
  </div>

  <div class="page-container">
    <slot />
  </div>
</div>

<style>
  :global(.backdrop-blur-md) {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: rgba(55, 65, 81, 0.15) !important;
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    border: none !important;
    transition: all 0.3s ease;
  }

  :global(.dark .backdrop-blur-md) {
    background: rgba(55, 65, 81, 0.25) !important;
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  :global(.bg-gray-700\/30:hover) {
    background: rgba(55, 65, 81, 0.2) !important;
    box-shadow: 
      0 8px 12px -1px rgba(0, 0, 0, 0.15),
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  }


:global(body, html) {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  .layout-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .page-container {
    flex: 1;
    background: linear-gradient(to right, #A5F3FC, #14B8A6); /* light mode: teal-400 to yellow-200 */
    overflow-y: auto;
    margin-top: -4rem;
    padding-top: 4rem;
  }

  :global(.dark) .page-container {
    background: linear-gradient(to right, #0F766E, #134E4A); /* dark mode: teal-800 to yellow-700 */
  }
</style>