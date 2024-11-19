<script lang="ts">
    export let submenus: { label: string; href: string }[];
    export let activeSubmenu: string;
    export let onSubmenuClick: (submenu: typeof submenus[number]) => void;
  </script>
  
  <div class="flex space-x-2">
    {#each submenus as submenu}
      <a
        href={submenu.href}
        class="text-sm px-3 py-1 rounded-lg transition-colors {submenu.label === activeSubmenu ? 'bg-blue-400 text-white' : 'text-gray-500 dark:text-gray-400'}"
        on:click|preventDefault={() => onSubmenuClick(submenu)}
      >
        {submenu.label}
      </a>
    {/each}
  </div>