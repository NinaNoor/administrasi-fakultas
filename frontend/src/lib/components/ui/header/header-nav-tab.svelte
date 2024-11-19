<script lang="ts">
  export let submenus: { href: string; label: string }[] = []; // Array of submenu items
  export let activeTab = ""; // Current active tab

  // Emit tab click events to update the parent component
  function handleClick(submenu: { href: string; label: string }) {
    activeTab = submenu.href;
    dispatch("tabClick", submenu.href);
  }

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="nav-tabs">
  {#each submenus as submenu}
    <a
      href={submenu.href}
      class="px-4 py-2 text-sm transition-colors duration-200 rounded-md
        {submenu.href === activeTab ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}"
      on:click={(e) => {
        e.preventDefault();
        handleClick(submenu);
      }}
    >
      {submenu.label}
    </a>
  {/each}
</div>
