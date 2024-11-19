<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Sun, Moon, Bell } from 'lucide-svelte';
  import { Button } from "$lib/components/ui/button";

  export let darkMode = false;
  export let toggleMode: () => void = () => {};
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <Button variant="outline" size="icon" class="rounded-full h-8 w-8 overflow-hidden">
      <img
        src="/images/placeholder-user.jpg"
        width={32}
        height={32}
        alt="Avatar"
        class="rounded-full object-cover"
      />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Label>Akun Saya</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Item on:click={toggleMode}>
      <div class="flex items-center space-x-2">
        {#if darkMode}
          <Sun class="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        {:else}
          <Moon class="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        {/if}
        <span>Mode Gelap</span>
      </div>
    </DropdownMenu.Item>
    <DropdownMenu.Item>
      <Bell class="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
      <span>Notifikasi</span>
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Pengaturan</DropdownMenu.Item>
    <DropdownMenu.Item>Keluar</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
