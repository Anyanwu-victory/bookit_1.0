<template>
  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <!-- Table Header -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Requests</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 font-medium">
          <tr v-for="request in paginatedRequests" :key="request.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ request.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ request.roomNumber }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">
              <div>{{ request.service }}</div>
              <div class="text-xs text-gray-400">{{ request.details }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                request.status === 'Resolved' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
              ]">
                {{ request.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </td>
          </tr>
          <!-- Empty state -->
          <tr v-if="paginatedRequests.length === 0">
            <td colspan="5" class="px-6 py-8 text-center text-gray-500">
              No requests found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 0" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
      <div class="flex items-center justify-between">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <div class="flex space-x-1">
          <button
            v-for="page in displayedPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-1 rounded text-sm transition-colors',
              page === currentPage ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps } from 'vue'

const props = defineProps({
  requests: {
    type: Array,
    default: () => []
  }
})

const currentPage = ref(1)
const itemsPerPage = 10

// Total pages based on requests
const totalPages = computed(() => Math.ceil(props.requests.length / itemsPerPage))

// Paginated requests
const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return props.requests.slice(start, end)
})

// Displayed page numbers
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  // Show pages around current page
  let start = Math.max(1, current - 2)
  let end = Math.min(total, start + 4)
  if (end - start < 4) {
    start = Math.max(1, end - 4)
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// Watch for changes in requests to reset page if needed
watch(() => props.requests, () => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value
  } else if (totalPages.value === 0) {
    currentPage.value = 1
  }
}, { deep: true })

// Pagination methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>
