<template>
  <div class="space-y-6">
    <!-- Filter Tabs -->
    <div class="flex items-center justify-between px-[10px] md:px-[20px]">
      <div class="flex space-x-2">
        <button
          v-for="filter in statusFilters"
          :key="filter.value"
          @click="selectedFilter = filter.value; fetchRequests()"
          :class="[
            'px-2 py-1 md:px-4 md:py-2 text-[8px] md:text-sm rounded-lg font-medium transition-colors',
            selectedFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Requests Content Area -->
    <div class="bg-white rounded-xl shadow-sm px-[10px]">
      <!-- Loading State -->
      <BaseLoader v-if="isLoading" />

      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px]">
            <thead>
              <tr class="border-b border-[#E8F1FD] bg-[#E8F1FD]">
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Room Number</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Guest Name</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Request</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Category</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Priority</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Assignee</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedRequests.length === 0" class="border-b border-gray-100">
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                  No requests found
                </td>
              </tr>
              <tr v-else v-for="request in paginatedRequests" :key="request.id" class="border-b border-gray-100 hover:bg-gray-50">
                <td class="px-6 py-4 text-sm text-gray-900">{{ request.roomNumber }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ request.guestName }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ request.description }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ request.category }}</td>
                <td class="px-6 py-4 text-sm">
                  <span :class="getPriorityClass(request.priority)">{{ request.priority }}</span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span :class="getStatusClass(request.status)">{{ request.status }}</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ request.assignee || 'Unassigned' }}
                </td>
                <td class="px-6 py-4 text-sm">
                  <div class="relative inline-block">
                    <button
                      @click="toggleMenu(request.id)"
                      class="p-2 hover:bg-gray-200 rounded"
                    >
                      <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2 0.9 2 2 2zm0 2c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zm0 6c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z"></path>
                      </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <transition
                      enter-active-class="transition ease-out duration-100"
                      enter-from-class="opacity-0 scale-95"
                      enter-to-class="opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="opacity-100 scale-100"
                      leave-to-class="opacity-0 scale-95"
                    >
                      <div
                        v-if="openMenuId === request.id"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                      >
                        <button
                          @click="viewDetails(request)"
                          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </transition>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 0" class="flex items-center justify-between mt-6 pb-4">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <div class="flex gap-2">
            <button
              v-for="page in displayedPages"
              :key="page"
              :class="[
                'w-8 h-8 rounded text-sm font-medium transition',
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              ]"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <BaseModal v-model="showErrorModal" :dismissible="true" size="sm">
      <div class="space-y-4">
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900">Error</h3>
            <p class="text-sm text-red-600 mt-1">{{ errorMessage }}</p>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            @click="showErrorModal = false"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import apiService from '@/services/apiService'

const requests = ref([])
const selectedFilter = ref(null)
const openMenuId = ref(null)
const isLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10
const showErrorModal = ref(false)
const errorMessage = ref('')

// Status filters for admin view
const statusFilters = ref([
  { label: 'All', value: null },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Assigned', value: 'ASSIGNED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Completed', value: 'COMPLETED' },
])

// Fetch all service requests (Admin only)
const fetchRequests = async () => {
  isLoading.value = true
  try {
    const response = await apiService.getAllServiceRequests()

    if (response.data && response.data.requests) {
      let allRequests = response.data.requests.map(req => ({
        id: req._id || req.id,
        roomNumber: req.roomNumber,
        guestName: req.guestName,
        description: req.description,
        category: req.category,
        status: req.status,
        priority: req.priority || 'MEDIUM',
        assignee: req.assignedTo ? (req.assignedTo.name || `${req.assignedTo.firstName} ${req.assignedTo.lastName}`) : 'Unassigned',
        createdAt: req.createdAt
      }))

      // Apply filter if selected
      if (selectedFilter.value) {
        allRequests = allRequests.filter(req => req.status === selectedFilter.value)
      }

      requests.value = allRequests
    }
  } catch (error) {
    console.error('Error fetching requests:', error)
    errorMessage.value = 'Failed to load requests. Please try again.'
    showErrorModal.value = true
  } finally {
    isLoading.value = false
  }
}

// View details (placeholder for future implementation)
const viewDetails = (request) => {
  openMenuId.value = null
  console.log('View details for request:', request)
}

// Toggle dropdown menu
const toggleMenu = (requestId) => {
  openMenuId.value = openMenuId.value === requestId ? null : requestId
}

// Priority badge styling
const getPriorityClass = (priority) => {
  const baseClass = 'px-3 py-1 rounded-full text-sm font-medium'
  switch(priority) {
    case 'HIGH':
    case 'URGENT':
      return `${baseClass} text-red-600 bg-red-50`
    case 'MEDIUM':
      return `${baseClass} text-orange-600 bg-orange-50`
    case 'LOW':
      return `${baseClass} text-green-600 bg-green-50`
    default:
      return `${baseClass} text-gray-600 bg-gray-50`
  }
}

// Status badge styling
const getStatusClass = (status) => {
  const baseClass = 'px-3 py-1 rounded-full text-sm font-medium'
  switch(status) {
    case 'COMPLETED':
      return `${baseClass} text-green-600 bg-green-50`
    case 'IN_PROGRESS':
      return `${baseClass} text-blue-600 bg-blue-50`
    case 'ASSIGNED':
      return `${baseClass} text-orange-600 bg-orange-50`
    case 'PENDING':
    case 'UNASSIGNED':
      return `${baseClass} text-red-600 bg-red-50`
    default:
      return `${baseClass} text-gray-600 bg-gray-50`
  }
}

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(requests.value.length / itemsPerPage))

const paginatedRequests = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return requests.value.slice(start, end)
})

const displayedPages = computed(() => {
  const total = totalPages.value
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  return Array.from({ length: 7 }, (_, i) => i + 1)
})

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

// Fetch requests on mount
onMounted(() => {
  fetchRequests()
})
</script>
