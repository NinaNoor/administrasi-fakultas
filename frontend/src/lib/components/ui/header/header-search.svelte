<script lang="ts">
    export let expanded = false;
    export let onSearch: (query: string) => void;
    let query = '';
  </script>
  
  <div class="relative flex items-center">
    <input
      type="text"
      bind:value={query}
      class="transition-all rounded-full px-4 py-2 {expanded ? 'w-40' : 'w-10'}"
      on:input={() => onSearch(query)}
    />
  </div>