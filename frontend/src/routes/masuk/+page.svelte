<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Card } from "$lib/components/ui/card";
  import { enhance } from "$app/forms";

  let loading = false;
  let error: string | null = null;
</script>

<div class="min-h-screen w-full flex lg:items-center justify-center bg-white lg:bg-transparent">
  <div class="w-full max-w-[1100px] lg:grid lg:grid-cols-2 lg:gap-0 lg:shadow-xl lg:rounded-3xl lg:overflow-hidden bg-white">
    <!-- Mobile Image with Gradient -->
    <div class="h-[280px] w-full bg-[url('/login.jpg')] bg-cover bg-center lg:hidden">
      <div class="h-full w-full bg-gradient-to-b from-black/30 via-black/10 to-white"></div>
    </div>

    <Card class="w-full p-8 -mt-20 lg:mt-0 lg:p-12 border-none shadow-none relative z-10">
      <div class="space-y-6">
        <div class="space-y-2">
          <h1 class="text-2xl font-semibold tracking-tight flex items-center gap-2">
            Selamat Datang Kembali <span class="text-xl">👋</span>
          </h1>
          <p class="text-muted-foreground text-sm">
            Cara baru telah hadir. Ini adalah hari Anda untuk bersinar. Masuk dan mulai wujudkan impian Anda.
          </p>
        </div>

        {#if error}
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{error}</span>
          </div>
        {/if}

        <form 
          method="POST" 
          class="space-y-4"
          use:enhance={() => {
            loading = true;
            return async ({ result }) => {
              loading = false;
              if (result.type === 'failure') {
                error = typeof result.data?.message === 'string' ? result.data.message : 'Terjadi kesalahan saat login';
              }
            };
          }}
        >
          <div class="space-y-2">
            <Label for="email" class="text-sm font-medium">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="nama@contoh.com" 
              required 
              class="w-full rounded-xl border-muted bg-muted/10"
              autocomplete="email"
            />
          </div>
          <div class="space-y-2">
            <Label for="password" class="text-sm font-medium">Kata Sandi</Label>
            <Input 
              id="password" 
              name="password"
              type="password"
              placeholder="••••••••••" 
              required 
              class="w-full rounded-xl border-muted bg-muted/10"
              autocomplete="current-password"
              minlength={8}
            />
          </div>
          <div class="flex justify-end">
            <a href="/forgot-password" class="text-sm text-emerald-600 hover:underline">
              Lupa Kata Sandi?
            </a>
          </div>
          <Button 
            type="submit" 
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>
      </div>
    </Card>
    <!-- Desktop Image -->
    <div class="hidden lg:block bg-[url('/login.jpg')] bg-cover bg-center"></div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f0f0f0;
  }
</style>