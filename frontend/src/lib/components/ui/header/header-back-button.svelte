<script lang="ts">
    import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
  
    export let onClick: () => void;
  </script>
  
  <button
    class="rounded-full p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
    on:click={onClick}
  >
    <ChevronLeft class="w-4 h-4" />
  </button>