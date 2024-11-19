<script lang="ts">
    import { Sun, Moon } from 'lucide-svelte';
  
    export let darkMode: boolean;
    export let toggleMode: () => void;
  </script>
  
  <button class="p-2" on:click={toggleMode}>
    {#if darkMode}
      <Sun class="w-5 h-5" />
    {:else}
      <Moon class="w-5 h-5" />
    {/if}
  </button>