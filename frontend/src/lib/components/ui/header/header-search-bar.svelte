<script lang="ts">
    import { Input } from '$lib/components/ui/input';
    import { Search } from 'lucide-svelte';
  
    let isExpanded = false;
  </script>
  
  <div 
    class="relative"
    role="search"
    on:mouseenter={() => (isExpanded = true)}
    on:mouseleave={() => (isExpanded = false)}
  >
    <Search class="absolute left-2 top-2 h-4 w-4 z-10 text-muted-foreground" />
    <Input 
      type="search"
      class="bg-background rounded-full transition-all duration-300 ease-in-out
        {isExpanded ? 'w-[200px] pl-8' : 'w-8 h-8 min-w-[32px]'}"
      placeholder="Search..."
    />
  </div>