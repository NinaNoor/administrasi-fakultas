<script lang="ts">
  import { House, Search, Sun, Moon } from 'lucide-svelte';
  import BookOpen from "lucide-svelte/icons/book-open";
  import FileText from "lucide-svelte/icons/file-text";
  import CalendarRange from "lucide-svelte/icons/calendar-range";
  import GraduationCap from "lucide-svelte/icons/graduation-cap";
  import HandPlatter from "lucide-svelte/icons/hand-platter";
  import BookUser from "lucide-svelte/icons/book-user";
  import { page } from '$app/stores';
  import { Input } from "$lib/components/ui/input";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
  
  let darkMode = false;
  const toggleMode = () => {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { icon: House, label: 'Beranda', href: '/beranda', badge: null },
    { icon: BookUser, label: 'Dosen', href: '/dosen', badge: null },
    { icon: GraduationCap, label: 'Mahasiswa', href: '/mahasiswa', badge: null },
    { icon: HandPlatter, label: 'Layanan Umum', href: '/layanan-umum', badge: null },
    { icon: BookOpen, label: 'Perkuliahan', href: '/perkuliahan', badge: null },
    { icon: FileText, label: 'Ujian', href: '/ujian', badge: null },
    { icon: CalendarRange, label: 'Kegiatan', href: '/kegiatan', badge: null }
  ];

  const tabs = [
    { label: 'Beranda', href: '/beranda' },
    { label: 'Profil', href: '/profile' }
  ];

  const goBack = () => {
    window.history.back();
  };
</script>

<div class="flex flex-col md:flex-row h-screen bg-black text-white">
  <!-- Main Content Area -->
  <div class="flex-1 bg-black p-4 order-1 md:order-2">
    <main class="h-full bg-white text-black rounded-[24px] flex flex-col dark:bg-zinc-900 dark:text-white">
      <!-- Header -->
      <div class="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div class="flex items-center justify-between px-6 py-2">
          <div class="flex items-center space-x-3">
            <Button variant="outline" size="icon" on:click={goBack} class="rounded-full h-8 w-8 flex items-center justify-center">
              <ChevronLeft class="h-4 w-4" />
            </Button>

            <!-- Centered Navigation Tabs -->
            <div class="flex bg-zinc-100 dark:bg-zinc-800 rounded-full p-1">
              {#each tabs as tab}
                {@const isActive = $page.url.pathname === tab.href}
                <a
                  href={tab.href}
                  class="px-4 py-1 text-sm transition-colors duration-200 rounded-full
                    {isActive ? 
                      'bg-black text-white dark:bg-white dark:text-black shadow-sm' : 
                      'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}"
                >
                  {tab.label}
                </a>
              {/each}
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="relative w-64">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search class="h-4 w-4 text-zinc-400" />
              </div>
              <Input
                type="search"
                placeholder="Cari..."
                class="w-full pl-10 bg-zinc-100 dark:bg-zinc-800 border-none h-8 rounded-full"
              />
            </div>

            <button
              on:click={toggleMode}
              class="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 h-8 w-8 flex items-center justify-center"
            >
              <div class="relative h-5 w-5">
                <Sun class="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-zinc-600 dark:text-zinc-400" />
                <Moon class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-zinc-600 dark:text-zinc-400" />
              </div>
            </button>

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
                <DropdownMenu.Item>Pengaturan</DropdownMenu.Item>
                <DropdownMenu.Item>Dukungan</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Keluar</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <div class="flex-1 p-6">
        <div class="h-full max-w-6xl mx-auto">
          <slot />
        </div>
      </div>
    </main>
  </div>

  <!-- Navigation Bar -->
  <nav class="group md:w-16 md:hover:w-48 h-16 md:h-screen shrink-0 transition-all duration-300 ease-in-out bg-black order-2 md:order-1 fixed md:relative bottom-0 left-0 right-0">
    <div class="h-full flex items-center justify-center p-4">
      <!-- Navigation Container -->
      <div class="w-full md:space-y-6 flex md:flex-col items-center md:items-stretch">
        <!-- Navigation Menu -->
        <div class="flex md:flex-col md:space-y-2 w-full">
          {#each navItems as item}
            {@const isActive = $page.url.pathname === item.href}
            <div class="relative flex-shrink-0">
              <a
                href={item.href}
                class="relative flex items-center px-3 py-2 transition-colors duration-200 {isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}"
              >
                <svelte:component this={item.icon} class="h-4 w-4 min-w-[1rem]" />
                <span class="hidden md:block ml-2 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </a>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </nav>
</div>

<style>
  .transition-all {
    transition: all 0.3s ease-in-out;
  }

  :global(.dark) .bg-white {
    background-color: theme('colors.zinc.900');
  }
</style>