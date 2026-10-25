<template>
  <div class="space-y-6 h-screen">
    <!-- Admin Only Warning -->
    <div v-if="!authStore.isAdmin"
      class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
      <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-sm text-yellow-800">This section is only accessible to administrators.</p>
    </div>

    <template v-if="authStore.isAdmin">
      <!-- Header -->
      <div class="flex items-center justify-end space-x-4 px-[20px]">
        <button
          @click="showAddRateModal = true"
          class="px-3 py-1 text-[9px] md:text-sm md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
          <span>Add rate</span>
        </button>

        <button
          class="flex items-center gap-2 px-3 py-1 text-[9px] md:text-sm md:px-4 md:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M8.25 0.750002C10.5458 0.750002 12.7958 0.943336 14.9858 1.315C15.43 1.39 15.75 1.77834 15.75 2.22834V3.09834C15.75 3.34456 15.7015 3.58838 15.6073 3.81587C15.5131 4.04336 15.3749 4.25006 15.2008 4.42417L10.6742 8.95084C10.5001 9.12495 10.3619 9.33165 10.2677 9.55913C10.1735 9.78662 10.125 10.0304 10.125 10.2767V12.7158C10.1251 13.0641 10.0281 13.4056 9.84501 13.7019C9.6619 13.9982 9.39989 14.2376 9.08833 14.3933L6.375 15.75V10.2767C6.375 10.0304 6.32651 9.78662 6.23228 9.55913C6.13805 9.33165 5.99994 9.12495 5.82583 8.95084L1.29917 4.42417C1.12506 4.25006 0.986947 4.04336 0.892721 3.81587C0.798494 3.58838 0.749998 3.34456 0.75 3.09834V2.22834C0.75 1.77834 1.07 1.39 1.51417 1.315C3.73964 0.938214 5.99286 0.749215 8.25 0.750002Z"
              stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg> Filter
        </button>
      </div>

      <!-- Rate Content Area -->
      <div class="bg-white rounded-xl shadow-sm px-[20px]">
        <!-- Loading State -->
        <BaseLoader v-if="isLoading" />

        <div v-else class="flex-1 bg-white overflow-auto">
          <!-- Table -->
          <div class="overflow-x-auto rounded-lg">
            <table class="w-full min-w-[500px]">
              <thead class="border-b border-[#E8F1FD] bg-[#E8F1FD]">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Room type</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Rate</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Availability</th>
                  <th class="px-6 py-4 text-right text-sm font-semibold text-gray-700 whitespace-nowrap"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="ratesData.length === 0">
                  <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                    No rates found
                  </td>
                </tr>
                <tr v-for="rate in ratesData" :key="rate.id" class="border border-[#E8F1FD] bg-white hover:bg-gray-50 transition">
                  <td class="px-6 py-4 text-sm text-gray-900">{{ rate.roomType }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900 font-semibold">₦{{ rate.price }}</td>
                  <td class="px-6 py-4">
                    <span :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      getAvailabilityClass(rate.availability)
                    ]">
                      {{ rate.availability }}
                    </span>
                  </td>
                  <!-- Action button -->
                  <td class="px-6 py-4 text-right">
                    <div class="relative inline-block">
                      <button
                        @click="toggleMenu(rate.id)"
                        class="text-gray-400 hover:text-gray-600 transition"
                      >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
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
                          v-if="openMenuId === rate.id"
                          class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                        >
                          <button
                            @click="openEditModal(rate)"
                            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            @click="deleteRate(rate)"
                            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
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
      </div>

      <!-- Add Rate Modal -->
      <BaseModal v-model="showAddRateModal" :dismissible="true" size="md">
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-900">Add New Rate</h2>

          <form @submit.prevent="addRate" class="space-y-4">
            <!-- Room Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Room type</label>
              <input
                v-model="rateForm.roomType"
                type="text"
                placeholder="Enter room type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <!-- Rooms -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
              <input
                v-model.number="rateForm.rooms"
                type="number"
                placeholder="Enter total number of rooms"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <!-- Price -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                v-model.number="rateForm.price"
                type="number"
                placeholder="Enter room price"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <!-- Additional Details -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
              <textarea
                v-model="rateForm.details"
                placeholder="Enter Details"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
              ></textarea>
            </div>

            <!-- Image Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  @change="handleImageUpload"
                  accept="image/*"
                  multiple
                  class="hidden"
                  ref="fileInput"
                />
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 w-full"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span class="text-sm">Upload Image(s)</span>
                </button>
              </div>

              <!-- Image Preview -->
              <div v-if="uploadedImages.length > 0" class="flex gap-2 mt-3 flex-wrap">
                <div v-for="(image, index) in uploadedImages" :key="index" class="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                  <img :src="image" class="w-full h-full object-cover" />
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showAddRateModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </BaseModal>

      <!-- Edit Rate Modal -->
      <BaseModal v-model="showEditRateModal" :dismissible="true" size="md">
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-900">Edit Room Rate</h2>

          <form @submit.prevent="updateRate" class="space-y-4">
            <!-- Room Type (Read-only) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <input
                v-model="editForm.roomType"
                type="text"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
              />
            </div>

            <!-- Price -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">New Price</label>
              <input
                v-model.number="editForm.price"
                type="number"
                placeholder="Enter new room price"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showEditRateModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isUpdating"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isUpdating ? 'Updating...' : 'Update Rate' }}
              </button>
            </div>
          </form>
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

      <!-- Delete Confirmation Modal -->
      <BaseModal v-model="showDeleteModal" :dismissible="true" size="sm">
        <div class="text-center space-y-4">
          <div class="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Delete Rate</h3>
          <p class="text-gray-600">Are you sure you want to delete <strong>{{ rateToDelete?.roomType }}</strong> rate? This action cannot be undone.</p>
          <div class="flex justify-center space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </BaseModal>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import apiService from '@/services/apiService'

const authStore = useAuthStore()

const showAddRateModal = ref(false)
const showEditRateModal = ref(false)
const showMessageModal = ref(false)
const showDeleteModal = ref(false)
const messageType = ref('success')
const messageText = ref('')
const rateToDelete = ref(null)
const openMenuId = ref(null)
const fileInput = ref(null)
const uploadedImages = ref([])
const isLoading = ref(false)
const isUpdating = ref(false)

// Helper function to show message modal
const showMessage = (type, text) => {
  messageType.value = type
  messageText.value = text
  showMessageModal.value = true
}

const rateForm = ref({
  roomType: '',
  rooms: null,
  price: null,
  details: ''
})

const editForm = ref({
  roomType: '',
  price: null,
  originalRoomType: ''
})

const ratesData = ref([])

// Fetch room rates from API
const fetchRoomRates = async () => {
  isLoading.value = true
  try {
    const response = await apiService.getRoomsRate()

    if (response.data && response.data.rates) {
      // Map API data to match component structure
      ratesData.value = response.data.rates.map(rate => ({
        id: rate._id || rate.roomType,
        roomType: rate.roomType,
        price: rate.rate,
        availability: rate.availableCount || rate.availableRooms || 0
      }))
    }
  } catch (error) {
    console.error('Error fetching room rates:', error)
    showMessage('error', 'Failed to load room rates. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Fetch rates on component mount
onMounted(() => {
  fetchRoomRates()
})

// Get availability badge color
const getAvailabilityClass = (availability) => {
  const count = parseInt(availability)
  if (count <= 5) return 'bg-red-100 text-red-700'
  if (count <= 15) return 'bg-orange-100 text-orange-700'
  return 'bg-blue-100 text-blue-700'
}

// Toggle dropdown menu
const toggleMenu = (rateId) => {
  openMenuId.value = openMenuId.value === rateId ? null : rateId
}

// Open edit modal
const openEditModal = (rate) => {
  editForm.value = {
    roomType: rate.roomType,
    price: rate.price,
    originalRoomType: rate.roomType
  }
  showEditRateModal.value = true
  openMenuId.value = null
}

// Update room rate
const updateRate = async () => {
  if (!editForm.value.price || editForm.value.price <= 0) {
    showMessage('error', 'Please enter a valid price')
    return
  }

  isUpdating.value = true
  try {
    await apiService.updateRoomRate(editForm.value.originalRoomType, editForm.value.price)

    // Refresh the rates data
    await fetchRoomRates()

    // Close modal and reset form
    showEditRateModal.value = false
    editForm.value = {
      roomType: '',
      price: null,
      originalRoomType: ''
    }

    showMessage('success', 'Room rate updated successfully!')
  } catch (error) {
    console.error('Error updating room rate:', error)
    showMessage('error', error.response?.data?.message || 'Failed to update room rate. Please try again.')
  } finally {
    isUpdating.value = false
  }
}

// Handle image upload
const handleImageUpload = (event) => {
  const files = event.target.files
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImages.value.push(e.target.result)
    }
    reader.readAsDataURL(files[i])
  }
}

// Remove uploaded image
const removeImage = (index) => {
  uploadedImages.value.splice(index, 1)
}

// Add new rate
const addRate = () => {
  // Generate new ID
  const newId = ratesData.value.length > 0
    ? Math.max(...ratesData.value.map(r => r.id)) + 1
    : 1

  // Add the new rate to the list
  ratesData.value.push({
    id: newId,
    roomType: rateForm.value.roomType,
    price: rateForm.value.price,
    availability: rateForm.value.rooms
  })

  // Reset form
  rateForm.value = {
    roomType: '',
    rooms: null,
    price: null,
    details: ''
  }
  uploadedImages.value = []

  // Close modal
  showAddRateModal.value = false
}

// Delete rate - show confirmation modal
const deleteRate = (rate) => {
  rateToDelete.value = rate
  showDeleteModal.value = true
  openMenuId.value = null
}

// Confirm delete action
const confirmDelete = () => {
  if (rateToDelete.value) {
    const index = ratesData.value.findIndex(r => r.id === rateToDelete.value.id)
    if (index !== -1) {
      ratesData.value.splice(index, 1)
      showMessage('success', `${rateToDelete.value.roomType} rate deleted successfully!`)
    }
  }
  showDeleteModal.value = false
  rateToDelete.value = null
}
</script>
