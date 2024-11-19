<script lang="ts">
    export let menus: { label: string; href: string; submenus: { label: string; href: string }[] }[];
    export let activeMenu: string;
    export let onMenuClick: (menu: typeof menus[number]) => void;
  </script>
  
  <div class="flex space-x-4">
    {#each menus as menu}
      <a
        href={menu.href}
        class="px-4 py-2 rounded-lg text-sm transition-colors {menu.label === activeMenu ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}"
        on:click|preventDefault={() => onMenuClick(menu)}
      >
        {menu.label}
      </a>
    {/each}
  </div>