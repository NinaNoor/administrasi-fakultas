<script>
    // No props or logic needed for this version
  </script>
  
  <div class="page-container">
    <slot />
  </div>
  
  <style>
    :global(body, html) {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }
  
    .page-container {
      height: 100vh;
      width: 100vw;
      background: radial-gradient(
        circle at top right,
        rgb(255, 246, 214) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgb(240, 240, 240) 100%
      );
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>