<script lang="ts">
  import HeaderNavTab from './header-nav-tab.svelte';

  // Define menu structure
  export let menus = [
    {
      label: "Beranda",
      href: "/beranda",
      submenus: [],
      defaultTab: "/beranda",
    },
    {
      label: "Dosen",
      href: "/dosen",
      submenus: [
        { label: "Dosen", href: "/dosen" },
        { label: "Profil", href: "/dosen/profil" },
      ],
      defaultTab: "/dosen",
    },
    {
      label: "Mahasiswa",
      href: "/mahasiswa",
      submenus: [
        { label: "Mahasiswa", href: "/mahasiswa" },
        { label: "Profil", href: "/mahasiswa/profil" },
      ],
      defaultTab: "/mahasiswa",
    },
    {
      label: "Perkuliahan",
      href: "/perkuliahan",
      submenus: [
        { label: "Penjadwalan", href: "/perkuliahan/penjadwalan" },
        { label: "Jadwal Kuliah", href: "/perkuliahan/jadwal-kuliah" },
        { label: "Kurikulum", href: "/perkuliahan/kurikulum" },
      ],
      defaultTab: "/perkuliahan/jadwal-kuliah",
    },
    {
      label: "Ujian",
      href: "/ujian",
      submenus: [
        { label: "Pengajuan Pembimbing", href: "/ujian/pengajuan-pembimbing" },
        { label: "Pendaftaran Ujian", href: "/ujian/pendaftaran-ujian" },
        { label: "Penjadwalan Ujian", href: "/ujian/penjadwalan-ujian" },
        { label: "Jadwal Ujian", href: "/ujian/jadwal-ujian" },
      ],
      defaultTab: "/ujian/jadwal-ujian",
    },
    {
      label: "Layanan Umum",
      href: "/layanan-umum",
      submenus: [
        { label: "Kegiatan", href: "/layanan-umum/kegiatan" },
        { label: "Yudisium & Wisuda", href: "/layanan-umum/yudisium-wisuda" },
        { label: "Surat & SK", href: "/layanan-umum/surat-sk" },
      ],
      defaultTab: "/layanan-umum/kegiatan",
    },
  ];

  let activeMenu = menus[0]; // Default active menu
  let activeTab = activeMenu.defaultTab; // Default active tab

  function setActiveMenu(menu: { label: string; href: string; submenus: { label: string; href: string }[]; defaultTab: string }) {
    activeMenu = menu;
    activeTab = menu.defaultTab || menu.href;
  }

  function setActiveTab(tab: string) {
    activeTab = tab;
  }
</script>

<div class="menu-container">
  <!-- Main Navigation Tabs -->
  <div class="flex flex-row space-x-4">
    {#each menus as menu}
      <a
        href={menu.href}
        class="px-4 py-2 text-sm font-bold transition-colors duration-200 rounded-md
          {menu === activeMenu ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}"
        on:click={(e) => {
          e.preventDefault();
          setActiveMenu(menu);
        }}
      >
        {menu.label}
      </a>
    {/each}
  </div>

  <!-- Submenu Navigation Tabs -->
  {#if activeMenu.submenus.length > 0}
    <HeaderNavTab
      submenus={activeMenu.submenus}
      activeTab={activeTab}
      on:tabClick={(e) => setActiveTab(e.detail)}
    />
  {/if}
</div>
