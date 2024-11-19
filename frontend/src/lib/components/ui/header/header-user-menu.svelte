<script lang="ts">
    export let avatarSrc: string;
  </script>
  
  <div class="relative">
    <button class="w-8 h-8 rounded-full overflow-hidden">
      <img src={avatarSrc} alt="User avatar" />
    </button>
    <div class="absolute mt-2 right-0 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <a href="/settings" class="block px-4 py-2">Settings</a>
      <a href="/logout" class="block px-4 py-2">Logout</a>
    </div>
  </div>