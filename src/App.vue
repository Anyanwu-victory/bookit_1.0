<template>
  <main>
    <!-- You can now use route.name, route.path, etc. -->
    <RouterView />
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.name)

</script>

<style>
/* Global styles */
</style>
