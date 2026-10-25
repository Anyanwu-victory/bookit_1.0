<template>

<!-- Pagination -->
        <div class="flex items-center justify-between mt-6">
          <button class="px-4 py-2 text-gray-400 hover:text-gray-600 disabled:opacity-50">← Previous</button>
          <div class="flex gap-2">
            <button 
              v-for="page in 7" 
              :key="page"
              :class="[
                'w-8 h-8 rounded text-sm font-medium transition',
                currentPage === page 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              ]"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>
          <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded">
            Next →
          </button>
        </div>
</template>

<script setup>

</script>

<style scoped></style>