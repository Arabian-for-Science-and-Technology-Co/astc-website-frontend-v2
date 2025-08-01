<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden bg-white font-zarid">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup></script>
