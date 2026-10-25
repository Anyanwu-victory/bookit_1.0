<template>
  <div class="space-y-6">
    <!-- Room Content Area -->
    <div class="bg-white rounded-xl shadow-sm py-6 px-[20px]">
     <div class="flex-1 bg-white overflow-auto">
      <!-- Content Area -->
      <div class="">

        <!-- Tabs and Filters -->
        <div class="flex  items-center justify-between mb-6">
          <div class="flex gap-1 md:gap-3">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-2 py-1 md:px-4 md:py-2 rounded-sm md:rounded-full text-[8px] border-2 font-medium transition',
                activeTab === tab.id
                  ? 'border-blue-400 text-blue-600 bg-blue-50'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
          <div class="flex gap-3">
            <!-- Filter Button with Dropdown -->
            <div class="relative">
              <button
                @click="showFilterDropdown = !showFilterDropdown"
                class="flex px-2 py-1 items-center text-[8px] gap-2 md:px-4 md:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path d="M8.25 0.750002C10.5458 0.750002 12.7958 0.943336 14.9858 1.315C15.43 1.39 15.75 1.77834 15.75 2.22834V3.09834C15.75 3.34456 15.7015 3.58838 15.6073 3.81587C15.5131 4.04336 15.3749 4.25006 15.2008 4.42417L10.6742 8.95084C10.5001 9.12495 10.3619 9.33165 10.2677 9.55913C10.1735 9.78662 10.125 10.0304 10.125 10.2767V12.7158C10.1251 13.0641 10.0281 13.4056 9.84501 13.7019C9.6619 13.9982 9.39989 14.2376 9.08833 14.3933L6.375 15.75V10.2767C6.375 10.0304 6.32651 9.78662 6.23228 9.55913C6.13805 9.33165 5.99994 9.12495 5.82583 8.95084L1.29917 4.42417C1.12506 4.25006 0.986947 4.04336 0.892721 3.81587C0.798494 3.58838 0.749998 3.34456 0.75 3.09834V2.22834C0.75 1.77834 1.07 1.39 1.51417 1.315C3.73964 0.938214 5.99286 0.749215 8.25 0.750002Z" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="hidden md:inline">Filter</span>
                <span v-if="filterRoomNumber" class="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
              </button>

              <!-- Filter Dropdown Menu -->
              <div v-if="showFilterDropdown" class="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                <h4 class="font-semibold text-gray-700 mb-3">Filter by Room Number</h4>

                <!-- Room Number Filter -->
                <div class="mb-4">
                  <label class="text-sm text-gray-600 mb-1 block">Room Number</label>
                  <input
                    v-model="filterRoomNumber"
                    type="text"
                    placeholder="Enter room number (e.g., 101)"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Filter Actions -->
                <div class="flex gap-2">
                  <button
                    @click="clearFilter"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Clear
                  </button>
                  <button
                    @click="applyFilter"
                    class="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div class="hidden md:flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 3.74989C9.61358 3.74989 8.73583 3.92448 7.91689 4.2637C7.09794 4.60292 6.35382 5.10012 5.72703 5.72692C5.10023 6.35371 4.60303 7.09783 4.26381 7.91678C3.92459 8.73572 3.75 9.61347 3.75 10.4999C3.75 11.3863 3.92459 12.2641 4.26381 13.083C4.60303 13.9019 5.10023 14.6461 5.72703 15.2729C6.35382 15.8997 7.09794 16.3969 7.91689 16.7361C8.73583 17.0753 9.61358 17.2499 10.5 17.2499C12.2902 17.2499 14.0071 16.5387 15.273 15.2729C16.5388 14.007 17.25 12.2901 17.25 10.4999C17.25 8.70968 16.5388 6.99279 15.273 5.72692C14.0071 4.46105 12.2902 3.74989 10.5 3.74989ZM2.25 10.4999C2.25017 9.17499 2.56944 7.86961 3.18079 6.69419C3.79214 5.51876 4.67759 4.50787 5.76224 3.74701C6.84689 2.98615 8.09883 2.49771 9.41216 2.32301C10.7255 2.14831 12.0616 2.29249 13.3074 2.74334C14.5533 3.1942 15.6722 3.93847 16.5695 4.91321C17.4669 5.88794 18.1163 7.06446 18.4628 8.34325C18.8094 9.62204 18.8428 10.9655 18.5603 12.2599C18.2778 13.5544 17.6878 14.7617 16.84 15.7799L21.53 20.4699C21.6037 20.5386 21.6628 20.6214 21.7038 20.7134C21.7448 20.8053 21.7668 20.9047 21.7686 21.0054C21.7704 21.1061 21.7518 21.2061 21.7141 21.2995C21.6764 21.3929 21.6203 21.4777 21.549 21.5489C21.4778 21.6201 21.393 21.6763 21.2996 21.714C21.2062 21.7517 21.1062 21.7703 21.0055 21.7685C20.9048 21.7667 20.8055 21.7447 20.7135 21.7037C20.6215 21.6627 20.5387 21.6036 20.47 21.5299L15.78 16.8399C14.5752 17.8434 13.1094 18.4828 11.5543 18.6831C9.99922 18.8835 8.41922 18.6366 6.99941 17.9713C5.5796 17.306 4.37878 16.2499 3.53763 14.9266C2.69648 13.6034 2.24983 12.0678 2.25 10.4999Z" fill="#858D9D"/>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by room number"
                class="outline-none text-sm w-28 md:w-48"
              />
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <BaseLoader v-if="isLoading" />

        <!-- Table -->
        <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px] md:min-w-[700px]">
              <thead class="border-b border-[#E8F1FD] bg-[#E8F1FD]">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Room number</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Room Type</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Room facility</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Status</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredRooms.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    No rooms found
                  </td>
                </tr>
                <tr v-for="room in filteredRooms" :key="room.id" class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-6 py-4 font-semibold text-gray-900">{{ room.number }}</td>
                <td class="px-6 py-4 text-gray-700">{{ room.type }}</td>
                <td class="px-6 py-4 text-gray-600 text-sm">{{ room.facility }}</td>
                <td class="px-6 py-4">
                  <span :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    room.status === 'Available' ? 'bg-blue-100 text-blue-600' :
                    room.status === 'Booked' ? 'bg-red-100 text-red-600' :
                    'bg-green-100 text-green-600'
                  ]">
                    {{ room.status }}
                  </span>
                </td>
                <!-- Action button -->
                <td class="px-6 py-4 text-center">
                  <div class="relative inline-block">
                    <button
                      @click="toggleMenu(room.id)"
                      class="text-gray-400 hover:text-gray-600"
                    >
                      ⋮
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
                        v-if="openMenuId === room.id"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                      >
                        <button
                          @click="openReserveModal(room)"
                          :disabled="room.status === 'Booked' || room.status === 'Reserved'"
                          :class="[
                            'w-full text-left px-4 py-2 text-sm',
                            room.status === 'Booked' || room.status === 'Reserved'
                              ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                              : 'text-gray-700 hover:bg-gray-100'
                          ]"
                        >
                          Reserve Room
                        </button>
                        
                      </div>
                    </transition>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-6">
          <button class="px-4 py-2 text-gray-400 hover:text-gray-600 disabled:opacity-50">← Previous</button>
          <div class="flex gap-2">
            <button
              v-for="page in 2"
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
      </div>
    </div>
    </div>

    <!-- Reserve Room Modal -->
    <BaseModal v-model="showReserveModal" :dismissible="true" size="lg">
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-900">Reserve Room {{ selectedRoom?.number }}</h2>
        <p class="text-sm text-gray-600">Fill in the customer details to reserve this room</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Name -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              v-model="reserveForm.name"
              type="text"
              placeholder="Enter full name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="reserveForm.email"
              type="email"
              placeholder="customer@example.com"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              v-model="reserveForm.phone"
              type="tel"
              placeholder="+234 800 000 0000"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <!-- Check-in Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
            <input
              v-model="reserveForm.checkIn"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <!-- Check-out Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
            <input
              v-model="reserveForm.checkOut"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <!-- Room Details Summary -->
        <div class="bg-blue-50 rounded-lg p-4 mt-4">
          <h3 class="text-sm font-semibold text-blue-900 mb-2">Room Details</h3>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span class="text-blue-700">Room:</span>
              <span class="font-medium text-blue-900 ml-1">{{ selectedRoom?.number }}</span>
            </div>
            <div>
              <span class="text-blue-700">Type:</span>
              <span class="font-medium text-blue-900 ml-1">{{ selectedRoom?.type }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="showReserveModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleReserve"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </BaseModal>

    <!-- Message Modal (Success/Error) -->
    <BaseModal v-model="showMessageModal" :dismissible="true" size="sm">
      <div class="text-center space-y-4">
        <!-- Success Icon -->
        <div v-if="messageType === 'success'" class="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <!-- Error Icon -->
        <div v-else class="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 :class="['text-lg font-semibold', messageType === 'success' ? 'text-green-800' : 'text-red-800']">
          {{ messageType === 'success' ? 'Success' : 'Error' }}
        </h3>
        <p class="text-gray-600">{{ messageText }}</p>
        <button
          @click="showMessageModal = false"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            messageType === 'success'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          ]"
        >
          OK
        </button>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import apiService from '@/services/apiService'


const activeTab = ref(1)
const currentPage = ref(1)
const searchQuery = ref('')
const openMenuId = ref(null)
const showReserveModal = ref(false)
const showMessageModal = ref(false)
const showFilterDropdown = ref(false)
const messageType = ref('success')
const messageText = ref('')
const filterRoomNumber = ref('')
const selectedRoom = ref(null)
const isLoading = ref(false)

// Helper function to show message modal
const showMessage = (type, text) => {
  messageType.value = type
  messageText.value = text
  showMessageModal.value = true
}

// Filter functions
const clearFilter = () => {
  filterRoomNumber.value = ''
  showFilterDropdown.value = false
}

const applyFilter = () => {
  showFilterDropdown.value = false
}

const reserveForm = ref({
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: ''
})

const tabs = computed(() => [
  { id: 1, label: `All room(${allRooms.value.length})` },
  { id: 2, label: `Available room(${availableCount.value})` },
  { id: 3, label: `Booked(${bookedCount.value})` }
])

const allRooms = ref([])

// Fetch all rooms from API
const fetchAllRooms = async () => {
  isLoading.value = true
  try {
    const response = await apiService.getAllRooms()

    if (response.data && response.data.rooms) {
      // Map API data to match component structure
      allRooms.value = response.data.rooms.map(room => ({
        id: room._id || room.id,
        number: room.roomNumber,
        type: room.roomType,
        facility: room.amenities ? room.amenities.join(', ') : 'AC, shower, Double bed, towel bathtub, TV',
        status: room.status
      }))
    }
  } catch (error) {
    console.error('Error fetching rooms:', error)
    showMessage('error', 'Failed to load rooms. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Fetch rooms on component mount
onMounted(() => {
  fetchAllRooms()
})

// Computed properties for counts
const availableCount = computed(() => {
  return allRooms.value.filter(room => room.status === 'Available').length
})

const bookedCount = computed(() => {
  return allRooms.value.filter(room => room.status === 'Booked').length
})

// Filter rooms based on active tab, search query, and filter
const filteredRooms = computed(() => {
  let rooms = allRooms.value

  // Filter by tab
  if (activeTab.value === 2) {
    rooms = rooms.filter(room => room.status === 'Available')
  } else if (activeTab.value === 3) {
    rooms = rooms.filter(room => room.status === 'Booked')
  }

  // Filter by search query (room number only)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    rooms = rooms.filter(room =>
      room.number.toLowerCase().includes(query)
    )
  }

  // Filter by room number filter dropdown (room number only)
  if (filterRoomNumber.value.trim()) {
    const filterQuery = filterRoomNumber.value.toLowerCase().trim()
    rooms = rooms.filter(room =>
      room.number.toLowerCase().includes(filterQuery)
    )
  }

  return rooms
})

// Toggle dropdown menu
const toggleMenu = (roomId) => {
  openMenuId.value = openMenuId.value === roomId ? null : roomId
}

// Open reserve modal
const openReserveModal = (room) => {
  selectedRoom.value = room
  showReserveModal.value = true
  openMenuId.value = null // Close dropdown

  // Set default dates
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  reserveForm.value.checkIn = tomorrow.toISOString().split('T')[0]
  reserveForm.value.checkOut = nextWeek.toISOString().split('T')[0]
}

// Handle reservation
const handleReserve = () => {
  // Validate form
  if (!reserveForm.value.name || !reserveForm.value.email || !reserveForm.value.phone) {
    showMessage('error', 'Please fill in all required fields')
    return
  }

  // Create reservation
  console.log('Reserving room:', {
    room: selectedRoom.value,
    customer: reserveForm.value
  })

  // Update room status
  const room = allRooms.value.find(r => r.id === selectedRoom.value.id)
  if (room) {
    room.status = 'Reserved'
  }

  // Reset form and close modal
  reserveForm.value = {
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: ''
  }
  showReserveModal.value = false
  selectedRoom.value = null

  showMessage('success', 'Room reserved successfully!')
}
</script>
