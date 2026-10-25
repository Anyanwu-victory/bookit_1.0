<template>
  <div class="space-y-6">
    <!-- Overview Section -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Overview</h2>

      <!-- Admin Stats -->
      <div v-if="authStore.isAdmin" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="bg-white rounded-lg p-4 flex items-center gap-4">
          <div>
          <p class="text-sm text-gray-600">Today's</p>
          <p class="text-md text-gray-500">Check-in</p>
          </div>

          <div>
          <p class="text-3xl font-bold text-[#1366D9]  mt-2">{{ adminStats.checkIn }}</p>
          </div>
        </div> 

       

        <div class="bg-white rounded-lg p-4 flex items-center gap-4">
          <div>
          <p class="text-sm text-gray-600">Today's</p>
          <p class="text-md text-gray-500">Check-out</p>
          </div>

          <div>
          <p class="text-3xl font-bold text-[#1366D9] mt-2">{{ adminStats.checkOut }}</p>
        </div>
        </div>

        <div class="bg-white  rounded-lg p-4 flex items-center gap-4">
          <div>
          <p class="text-sm text-gray-600">Total</p>
          <p class="text-md text-gray-500">Bookings</p>
          </div>

          <div>
          <p class="text-3xl font-bold text-[#1366D9] mt-2">{{ adminStats.totalBookings }}</p>
        </div>       
         </div>

        <div class="bg-white rounded-lg p-4 flex items-center gap-4">
          <div>
          <p class="text-sm text-gray-600">Flagged</p>
          <p class="text-md text-gray-500">Bookings</p>
          </div>

          <div>
          <p class="text-3xl font-bold text-[#1366D9] mt-2">{{ adminStats.flaggedBookings }}</p>
          </div>       
        </div>
      </div>

      <!-- Staff Stats -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="rounded-lg py-6">
          <div class="flex items-center justify-between w-1/2">
            <div class="flex flex-col space-y-3 items-center justify-between mt-2">
              <p class="text-sm text-gray-600">Requests</p>
              <p class="text-md text-black">Assigned</p>
            </div>
            <div class="justify">
              <p class="text-3xl font-bold text-blue-600 mt-2 text-center">{{ staffStats.assigned }}</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg py-6">
          <div class="flex items-center justify-between w-1/2">
            <div class="flex flex-col space-y-3 items-center justify-between mt-2">
              <p class="text-sm text-gray-600">Requests</p>
              <p class="text-md text-black">Done</p>
            </div>
            <div class="justify">
              <p class="text-3xl font-bold text-blue-600 mt-2 text-center">{{ staffStats.done }}</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg py-6">
          <div class="flex items-center justify-between w-1/2">
            <div class="flex flex-col space-y-3 items-center justify-between mt-2">
              <p class="text-sm text-gray-600">Requests</p>
              <p class="text-md text-black">Pending</p>
            </div>
            <div class="justify">
              <p class="text-3xl font-bold text-blue-600 mt-2 text-center">{{ staffStats.pending }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin: Room Status & Booking Statistics -->
    <div v-if="authStore.isAdmin" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Room Status -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Room status</h3>
          <!-- Rooms status date picker button-->
          <div class="relative">
            <button
              @click="showRoomDatePicker = !showRoomDatePicker"
              class="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ selectedRoomDateLabel }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Date Picker Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="showRoomDatePicker"
                class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
              >
                <div class="space-y-3">
                  <button
                    @click="selectRoomDate('today')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      selectedRoomDate === 'today' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                    ]"
                  >
                    Today
                  </button>
                  <button
                    @click="selectRoomDate('yesterday')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      selectedRoomDate === 'yesterday' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                    ]"
                  >
                    Yesterday
                  </button>
                  <button
                    @click="selectRoomDate('week')"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      selectedRoomDate === 'week' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                    ]"
                  >
                    Last 7 Days
                  </button>
                  <div class="border-t border-gray-200 pt-3">
                    <label class="block text-xs font-medium text-gray-500 mb-2">Custom Date</label>
                    <input
                      type="date"
                      v-model="customRoomDate"
                      @change="selectRoomDate('custom')"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="flex items-center gap-8">
          <!-- Donut Chart Placeholder -->
          <div class="relative w-40 h-40">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <!-- Background circle -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="12" />
              <!-- Occupied (blue) -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="12"
                :stroke-dasharray="occupiedDash" stroke-dashoffset="0" />
              <!-- Available (dark blue) -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1e3a5f" stroke-width="12"
                :stroke-dasharray="availableDash" :stroke-dashoffset="occupiedOffset" />
              <!-- Reserved (orange) -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" stroke-width="12"
                :stroke-dasharray="reservedDash" :stroke-dashoffset="reservedOffset" />
            </svg>
          </div>
          <!-- Legend -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-blue-500"></span>
              <span class="text-sm text-gray-600">Occupied Rooms - {{ roomStatus.occupied }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#1e3a5f]"></span>
              <span class="text-sm text-gray-600">Available Rooms - {{ roomStatus.available }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-orange-500"></span>
              <span class="text-sm text-gray-600">Reserved Rooms - {{ roomStatus.reserved }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Statistics -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Booking Statistics</h3>
          <!-- date statistics button with dropdown -->
          <div class="relative">
            <button
              @click="showStatsDropdown = !showStatsDropdown"
              class="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ selectedStatsPeriod === 'monthly' ? 'Monthly' : 'Yearly' }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="showStatsDropdown"
                class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
              >
                <button
                  @click="selectStatsPeriod('monthly')"
                  :class="[
                    'w-full text-left px-4 py-2 text-sm transition-colors',
                    selectedStatsPeriod === 'monthly' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                  ]"
                >
                  Monthly
                </button>
                <button
                  @click="selectStatsPeriod('yearly')"
                  :class="[
                    'w-full text-left px-4 py-2 text-sm transition-colors',
                    selectedStatsPeriod === 'yearly' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                  ]"
                >
                  Yearly
                </button>
              </div>
            </transition>
          </div>
        </div>
        <!-- Bar Chart -->
        <div class="h-48 flex items-end justify-between gap-2 px-4">
          <div v-for="(item, index) in displayedBookingStats" :key="index" class="flex flex-col items-center flex-1">
            <div class="w-full bg-blue-500 rounded-t transition-all duration-300"
              :style="{ height: `${(item.value / maxBookingValue) * 100}%`, minHeight: item.value > 0 ? '4px' : '0' }"></div>
            <span class="text-xs text-gray-500 mt-2">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin: AI Overview Table -->
    <div v-if="authStore.isAdmin" class="bg-white rounded-lg shadow">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">AI overview</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Risk Type</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Severity</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">AI Analysis</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Booking ID</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Action Taken</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="risk in aiRisks" :key="risk.id" class="hover:bg-gray-50">
                <td class="px-4 py-4 text-sm text-gray-900 font-medium">{{ risk.type }}</td>
                <td class="px-4 py-4">
                  <span :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    risk.severity === 'Critical' ? 'text-red-600' : 'text-orange-600'
                  ]">
                    {{ risk.severity }}
                  </span>
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 max-w-xs">{{ risk.analysis }}</td>
                <td class="px-4 py-4 text-sm text-gray-900">{{ risk.bookingId }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ risk.action }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="aiRisksTotalPages > 0" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <button
          @click="previousAiRisksPage"
          :disabled="aiRisksCurrentPage === 1"
          class="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt; Prev
        </button>
        <div class="flex gap-1">
          <button
            v-for="page in aiRisksDisplayedPages"
            :key="page"
            @click="goToAiRisksPage(page)"
            :class="[
              'w-8 h-8 rounded text-sm transition-colors',
              page === aiRisksCurrentPage ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextAiRisksPage"
          :disabled="aiRisksCurrentPage === aiRisksTotalPages"
          class="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next &gt;
        </button>
      </div>
      <!-- Empty state for no data -->
      <div v-else class="px-6 py-4 border-t border-gray-200 text-center text-gray-500 text-sm">
        No AI overview data available
      </div>
    </div>

    <!-- Staff: New Requests Section -->
    <div v-if="!authStore.isAdmin" class="bg-white shadow rounded-lg px-6 py-8">
      <h3 class="text-lg font-semibold text-gray-900 mb-5">New Requests</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <RequestCard v-for="request in newRequests" :key="request.id" :request-id="request.id"
          :room-number="request.roomNumber" :request-type="request.type" @task-resolved="handleTaskResolved" />
        <div v-if="newRequests.length === 0" class="col-span-full text-center py-8 text-gray-500">
          No new requests at the moment
        </div>
      </div>
    </div>

    <!-- Staff: Requests Table -->
    <div v-if="!authStore.isAdmin">
      <RequestsTable :requests="allRequests" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import RequestCard from '@/components/staff/RequestCard.vue'
import RequestsTable from '@/components/staff/RequestsTable.vue'
import apiService from '@/services/apiService'

const authStore = useAuthStore();

// Dropdown states
const showRoomDatePicker = ref(false)
const showStatsDropdown = ref(false)
const selectedRoomDate = ref('today')
const customRoomDate = ref('')
const selectedStatsPeriod = ref('monthly')

// Computed label for room date picker
const selectedRoomDateLabel = computed(() => {
  switch (selectedRoomDate.value) {
    case 'today': return 'Today'
    case 'yesterday': return 'Yesterday'
    case 'week': return 'Last 7 Days'
    case 'custom':
      if (customRoomDate.value) {
        return new Date(customRoomDate.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }
      return 'Custom'
    default: return 'Today'
  }
})

// Select room date and fetch data
const selectRoomDate = (period) => {
  selectedRoomDate.value = period
  showRoomDatePicker.value = false
  fetchRoomStatusByDate()
}

// Select stats period
const selectStatsPeriod = (period) => {
  selectedStatsPeriod.value = period
  showStatsDropdown.value = false
}

// Close dropdowns when clicking outside
const closeDropdowns = (event) => {
  if (!event.target.closest('.relative')) {
    showRoomDatePicker.value = false
    showStatsDropdown.value = false
  }
}

// Admin Stats
const adminStats = ref({
  checkIn: 0,
  checkOut: 0,
  totalBookings: 0,
  flaggedBookings: 0
})

// Staff Stats
const staffStats = ref({
  assigned: 0,
  done: 0,
  pending: 0
})

// Room Status for admin chart
const roomStatus = ref({
  occupied: 0,
  available: 0,
  reserved: 0
})

// Computed properties for donut chart
const totalRooms = computed(() => roomStatus.value.occupied + roomStatus.value.available + roomStatus.value.reserved)
const circumference = 2 * Math.PI * 40 // 251.33

const occupiedDash = computed(() => {
  const percent = totalRooms.value > 0 ? (roomStatus.value.occupied / totalRooms.value) * circumference : 0
  return `${percent} ${circumference}`
})

const availableDash = computed(() => {
  const percent = totalRooms.value > 0 ? (roomStatus.value.available / totalRooms.value) * circumference : 0
  return `${percent} ${circumference}`
})

const reservedDash = computed(() => {
  const percent = totalRooms.value > 0 ? (roomStatus.value.reserved / totalRooms.value) * circumference : 0
  return `${percent} ${circumference}`
})

const occupiedOffset = computed(() => {
  const occupiedPercent = totalRooms.value > 0 ? (roomStatus.value.occupied / totalRooms.value) * circumference : 0
  return `-${occupiedPercent}`
})

const reservedOffset = computed(() => {
  const occupiedPercent = totalRooms.value > 0 ? (roomStatus.value.occupied / totalRooms.value) * circumference : 0
  const availablePercent = totalRooms.value > 0 ? (roomStatus.value.available / totalRooms.value) * circumference : 0
  return `-${occupiedPercent + availablePercent}`
})

// Booking Statistics for bar chart - Monthly view
const monthlyBookingStats = ref([
  { label: 'Jan', value: 0 },
  { label: 'Feb', value: 0 },
  { label: 'Mar', value: 0 },
  { label: 'Apr', value: 0 },
  { label: 'May', value: 0 },
  { label: 'Jun', value: 0 },
  { label: 'Jul', value: 0 },
  { label: 'Aug', value: 0 },
  { label: 'Sep', value: 0 },
  { label: 'Oct', value: 0 },
  { label: 'Nov', value: 0 },
  { label: 'Dec', value: 0 }
])

// Booking Statistics for bar chart - Yearly view
const yearlyBookingStats = ref([])

// Displayed stats based on selected period
const displayedBookingStats = computed(() => {
  if (selectedStatsPeriod.value === 'yearly') {
    return yearlyBookingStats.value
  }
  return monthlyBookingStats.value
})

const maxBookingValue = computed(() => Math.max(...displayedBookingStats.value.map(m => m.value), 1))

// AI Risks pagination computed properties
const aiRisksTotalPages = computed(() => Math.ceil(aiRisksTotalItems.value / aiRisksItemsPerPage))
const aiRisksDisplayedPages = computed(() => {
  const total = aiRisksTotalPages.value
  const current = aiRisksCurrentPage.value
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

// AI Risks for admin table
const aiRisks = ref([])
const allAiRisks = ref([]) // Store all AI risks for pagination
const aiRisksCurrentPage = ref(1)
const aiRisksItemsPerPage = 10
const aiRisksTotalItems = ref(0)

// Staff requests
const newRequests = ref([])
const allRequests = ref([])
// const staffRequestsCurrentPage = ref(1)
// const staffRequestsItemsPerPage = 10
// const staffRequestsTotalItems = ref(0)

const isLoading = ref(false)

// Handle task resolution (staff)
const handleTaskResolved = (taskData) => {
  const index = newRequests.value.findIndex(req => req.id === taskData.id)
  if (index !== -1) {
    newRequests.value.splice(index, 1)
  }

  staffStats.value.pending = Math.max(0, staffStats.value.pending - 1)
  staffStats.value.done += 1

  const existingRequest = allRequests.value.find(req => req.id === taskData.id)
  if (existingRequest) {
    existingRequest.status = 'Resolved'
  } else {
    allRequests.value.unshift({
      id: taskData.id,
      name: authStore.currentUser?.name || 'Guest',
      roomNumber: taskData.roomNumber.replace('Room ', ''),
      service: 'Room Service -',
      details: taskData.requestType,
      status: 'Resolved'
    })
  }
}

// Store bookings data for filtering
const allBookings = ref([])

// Fetch room status by selected date
const fetchRoomStatusByDate = async () => {
  try {
    const roomsResponse = await apiService.getAllRooms()
    if (roomsResponse.data?.rooms) {
      const rooms = roomsResponse.data.rooms
      let targetDate = new Date()

      // Determine target date based on selection
      if (selectedRoomDate.value === 'yesterday') {
        targetDate.setDate(targetDate.getDate() - 1)
      } else if (selectedRoomDate.value === 'custom' && customRoomDate.value) {
        targetDate = new Date(customRoomDate.value)
      }

      // For "week" we'll show current status (can be enhanced with historical data)
      // For now, filter bookings that were active on the target date
      if (selectedRoomDate.value === 'week') {
        // Show current room status for week view
        roomStatus.value.occupied = rooms.filter(r => r.status === 'Booked' || r.status === 'Occupied').length
        roomStatus.value.available = rooms.filter(r => r.status === 'Available').length
        roomStatus.value.reserved = rooms.filter(r => r.status === 'Reserved').length
      } else {
        // Filter bookings active on the target date
        targetDate.toDateString()
        const activeBookings = allBookings.value.filter(b => {
          const checkIn = new Date(b.checkInDate)
          const checkOut = new Date(b.checkOutDate)
          return targetDate >= checkIn && targetDate <= checkOut
        })

        // Count rooms based on bookings for that date
        const occupiedRoomNumbers = new Set(activeBookings.map(b => b.roomNumber))
        roomStatus.value.occupied = occupiedRoomNumbers.size
        roomStatus.value.available = Math.max(0, rooms.length - occupiedRoomNumbers.size)
        roomStatus.value.reserved = rooms.filter(r => r.status === 'Reserved').length
      }
    }
  } catch (error) {
    console.error('Error fetching room status by date:', error)
  }
}

// Fetch admin dashboard data using the new API endpoint
const fetchAdminData = async () => {
  try {
    // Use the new admin dashboard API
    const response = await apiService.getAdminDashboard('week', 1, 10)

    if (response.data) {
      const data = response.data

      // Update overview stats
      if (data.overview) {
        adminStats.value.checkIn = data.overview.todaysCheckIn || 0
        adminStats.value.checkOut = data.overview.todaysCheckout || 0
        adminStats.value.totalBookings = data.overview.totalBookings || 0
        adminStats.value.flaggedBookings = data.overview.flaggedBookings || 0
      }

      // Update room status
      if (data.roomStatus) {
        roomStatus.value.occupied = data.roomStatus.occupied || 0
        roomStatus.value.available = data.roomStatus.available || 0
        roomStatus.value.reserved = data.roomStatus.reserved || 0
      }

      // Update booking statistics from API
      if (data.bookingStatistics?.data) {
        // Process the data based on the period
        const statsData = data.bookingStatistics.data
        const monthCounts = Array(12).fill(0)
        const yearCounts = {}
        const currentYear = new Date().getFullYear()

        statsData.forEach(item => {
          const date = new Date(item.date)
          const month = date.getMonth()
          const year = date.getFullYear()

          // Count for monthly stats
          if (year === currentYear) {
            monthCounts[month] += item.count || 0
          }

          // Count for yearly stats
          if (!yearCounts[year]) {
            yearCounts[year] = 0
          }
          yearCounts[year] += item.count || 0
        })

        // Update monthly stats
        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        monthlyBookingStats.value = monthLabels.map((label, index) => ({
          label,
          value: monthCounts[index]
        }))

        // Update yearly stats
        const years = Object.keys(yearCounts).sort().slice(-5)
        yearlyBookingStats.value = years.map(year => ({
          label: year,
          value: yearCounts[year]
        }))

        if (yearlyBookingStats.value.length === 0) {
          yearlyBookingStats.value = [{ label: currentYear.toString(), value: 0 }]
        }
      }

      // Update AI overview/risks from API
      if (data.aiOverview?.events) {
        allAiRisks.value = data.aiOverview.events.map(event => ({
          id: event.id,
          type: formatRiskType(event.riskType),
          severity: formatSeverity(event.severity),
          analysis: truncateText(event.reasoning, 100),
          bookingId: '#' + (event.bookingId?.slice(-8) || 'N/A'),
          action: event.actionTaken || 'Under review'
        }))
        aiRisksTotalItems.value = data.aiOverview.total || allAiRisks.value.length
        aiRisksCurrentPage.value = 1
        updateAiRisksPagination()
      }
    }
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error)
    // Fallback to old method if new API fails
    await fetchAdminDataFallback()
  }
}

// Helper function to format risk type
const formatRiskType = (riskType) => {
  const types = {
    'SENTIMENT_ANALYSIS': 'Sentiment Analysis',
    'FRAUD_DETECTION': 'Fraud Detection',
    'RECOMMENDATION': 'AI Recommendation',
    'ID_VERIFICATION': 'ID Verification'
  }
  return types[riskType] || riskType?.replace(/_/g, ' ') || 'Unknown'
}

// Helper function to format severity
const formatSeverity = (severity) => {
  const severities = {
    'WARNING': 'Warning',
    'INFO': 'Info',
    'CRITICAL': 'Critical',
    'HIGH': 'Critical',
    'MEDIUM': 'Moderate',
    'LOW': 'Info'
  }
  return severities[severity] || severity || 'Unknown'
}

// Helper function to truncate text
const truncateText = (text, maxLength) => {
  if (!text) return 'N/A'
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Fallback method using old API calls
const fetchAdminDataFallback = async () => {
  try {
    // Fetch rooms for room status
    const roomsResponse = await apiService.getAllRooms()
    if (roomsResponse.data?.rooms) {
      const rooms = roomsResponse.data.rooms
      roomStatus.value.occupied = rooms.filter(r => r.status === 'Booked' || r.status === 'Occupied').length
      roomStatus.value.available = rooms.filter(r => r.status === 'Available').length
      roomStatus.value.reserved = rooms.filter(r => r.status === 'Reserved').length
    }

    // Fetch bookings for stats
    const bookingsResponse = await apiService.getBookings()
    if (bookingsResponse.data?.bookings) {
      const bookings = bookingsResponse.data.bookings
      allBookings.value = bookings
      const today = new Date().toDateString()

      adminStats.value.totalBookings = bookings.length
      adminStats.value.checkIn = bookings.filter(b => new Date(b.checkInDate).toDateString() === today).length
      adminStats.value.checkOut = bookings.filter(b => new Date(b.checkOutDate).toDateString() === today).length
      adminStats.value.flaggedBookings = bookings.filter(b => b.status === 'ID_FLAGGED' || b.riskAssessment?.level === 'HIGH').length

      // AI Risks from flagged bookings
      allAiRisks.value = bookings
        .filter(b => b.riskAssessment?.level === 'HIGH' || b.status === 'ID_FLAGGED')
        .map(b => ({
          id: b._id,
          type: 'Fraud Detection',
          severity: b.riskAssessment?.level === 'HIGH' ? 'Critical' : 'Moderate',
          analysis: b.idVerification?.reasoning || 'Booking shows risk indicators',
          bookingId: '#' + (b._id?.slice(-8) || 'N/A'),
          action: b.status === 'ID_FLAGGED' ? 'Booking flagged for manual review' : 'Under review'
        }))
      aiRisksTotalItems.value = allAiRisks.value.length
      aiRisksCurrentPage.value = 1
      updateAiRisksPagination()

      // Aggregate bookings by month
      const monthCounts = Array(12).fill(0)
      const currentYear = new Date().getFullYear()

      bookings.forEach(booking => {
        const bookingDate = new Date(booking.checkInDate || booking.createdAt)
        const month = bookingDate.getMonth()
        const year = bookingDate.getFullYear()

        if (year === currentYear) {
          monthCounts[month]++
        }
      })

      const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      monthlyBookingStats.value = monthLabels.map((label, index) => ({
        label,
        value: monthCounts[index]
      }))
    }
  } catch (error) {
    console.error('Error in fallback admin data fetch:', error)
  }
}

// Fetch staff dashboard data using the new API endpoint
const fetchStaffData = async () => {
  try {
    // Use the new staff dashboard API
    const response = await apiService.getStaffDashboard(1, 10)

    if (response.data) {
      const data = response.data

      // Update overview stats from API
      if (data.overview) {
        staffStats.value.assigned = data.overview.assigned || 0
        staffStats.value.done = data.overview.resolved || 0
        staffStats.value.pending = data.overview.pending || 0
      }

      // Update new requests from API
      if (data.newRequests && Array.isArray(data.newRequests)) {
        newRequests.value = data.newRequests.map(req => ({
          id: req._id || req.id,
          roomNumber: 'Room ' + (req.roomNumber || 'N/A'),
          type: req.description || req.category?.replace(/_/g, ' ') || 'Service Request'
        }))
      }

      // Update all requests from request history
      if (data.requestHistory?.requests) {
        allRequests.value = data.requestHistory.requests.map(req => ({
          id: req._id || req.id,
          name: req.guestName || 'Guest',
          roomNumber: req.roomNumber || 'N/A',
          service: formatServiceCategory(req.category),
          details: req.description || '',
          status: formatRequestStatus(req.status)
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching staff dashboard data:', error)
    // Fallback to old method if new API fails
    await fetchStaffDataFallback()
  }
}

// Helper function to format service category
const formatServiceCategory = (category) => {
  if (!category) return 'Service Request'
  const categories = {
    'ROOM_SERVICE': 'Room Service',
    'HOUSEKEEPING': 'Housekeeping',
    'MAINTENANCE': 'Maintenance',
    'CONCIERGE': 'Concierge',
    'FRONT_DESK': 'Front Desk',
    'SPA': 'Spa & Wellness',
    'DINING': 'Dining'
  }
  return categories[category] || category.replace(/_/g, ' ')
}

// Helper function to format request status
const formatRequestStatus = (status) => {
  if (!status) return 'Pending'
  const statuses = {
    'COMPLETED': 'Resolved',
    'RESOLVED': 'Resolved',
    'IN_PROGRESS': 'In Progress',
    'ASSIGNED': 'Assigned',
    'PENDING': 'Pending'
  }
  return statuses[status] || status
}

// Fallback method using old API calls for staff
const fetchStaffDataFallback = async () => {
  try {
    const response = await apiService.getMyTasks()
    if (response.data?.tasks) {
      const tasks = response.data.tasks

      allRequests.value = tasks.map(task => ({
        id: task._id || task.id,
        name: task.guestName || 'Guest',
        roomNumber: task.roomNumber || 'N/A',
        service: formatServiceCategory(task.category),
        details: task.description || '',
        status: formatRequestStatus(task.status)
      }))

      newRequests.value = tasks
        .filter(t => t.status === 'ASSIGNED' || t.status === 'PENDING')
        .map(t => ({
          id: t._id || t.id,
          roomNumber: 'Room ' + (t.roomNumber || 'N/A'),
          type: t.description || t.category?.replace(/_/g, ' ') || 'Service Request'
        }))

      // Update stats
      staffStats.value.assigned = tasks.filter(t => t.status === 'ASSIGNED').length
      staffStats.value.pending = tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS').length
      staffStats.value.done = tasks.filter(t => t.status === 'COMPLETED').length
    }

    // Also fetch stats endpoint
    const statsResponse = await apiService.getMyTasksStats()
    if (statsResponse.data?.stats) {
      const s = statsResponse.data.stats
      staffStats.value.assigned = s.assigned || 0
      staffStats.value.pending = s.inProgress || s.pending || 0
      staffStats.value.done = s.completed || 0
    }
  } catch (error) {
    console.error('Error in fallback staff data fetch:', error)
  }
}

// ============ AI Risks Pagination Methods ============
const updateAiRisksPagination = () => {
  const start = (aiRisksCurrentPage.value - 1) * aiRisksItemsPerPage
  const end = start + aiRisksItemsPerPage
  aiRisks.value = allAiRisks.value.slice(start, end)
}

const goToAiRisksPage = (page) => {
  if (page >= 1 && page <= aiRisksTotalPages.value) {
    aiRisksCurrentPage.value = page
    updateAiRisksPagination()
  }
}

const previousAiRisksPage = () => {
  if (aiRisksCurrentPage.value > 1) {
    aiRisksCurrentPage.value--
    updateAiRisksPagination()
  }
}

const nextAiRisksPage = () => {
  if (aiRisksCurrentPage.value < aiRisksTotalPages.value) {
    aiRisksCurrentPage.value++
    updateAiRisksPagination()
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    if (authStore.isAdmin) {
      await fetchAdminData()
    } else {
      await fetchStaffData()
    }
  } finally {
    isLoading.value = false
  }

  // Add click listener to close dropdowns
  document.addEventListener('click', closeDropdowns)
})

// Clean up event listener
onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>
