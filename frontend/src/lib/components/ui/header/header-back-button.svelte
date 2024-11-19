<script lang="ts">
    import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
    import { Button } from "$lib/components/ui/button";
  
    const goBack = () => window.history.back();
  </script>
  
  <Button variant="outline" size="icon" on:click={goBack} class="rounded-full h-8 w-8 flex items-center justify-center">
    <ChevronLeft class="h-4 w-4" />
  </Button>