<template>
  <div class="space-y-6">
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
      <div class="flex items-center justify-end space-x-4 px-[10px] md:px-[20px]">

        <button
          @click="showAddStaffModal = true"
          class="px-3 py-1 text-[9px] md:text-sm md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700
           text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
          <span>Add Staff</span>
        </button>

        <button
          class="flex items-center gap-2 px-3 py-1 text-[9px] md:text-sm md:px-4 md:py-2 border border-gray-300 
          rounded-lg text-gray-700 hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M8.25 0.750002C10.5458 0.750002 12.7958 0.943336 14.9858 1.315C15.43 1.39 15.75 1.77834 15.75 2.22834V3.09834C15.75 3.34456 15.7015 3.58838 15.6073 3.81587C15.5131 4.04336 15.3749 4.25006 15.2008 4.42417L10.6742 8.95084C10.5001 9.12495 10.3619 9.33165 10.2677 9.55913C10.1735 9.78662 10.125 10.0304 10.125 10.2767V12.7158C10.1251 13.0641 10.0281 13.4056 9.84501 13.7019C9.6619 13.9982 9.39989 14.2376 9.08833 14.3933L6.375 15.75V10.2767C6.375 10.0304 6.32651 9.78662 6.23228 9.55913C6.13805 9.33165 5.99994 9.12495 5.82583 8.95084L1.29917 4.42417C1.12506 4.25006 0.986947 4.04336 0.892721 3.81587C0.798494 3.58838 0.749998 3.34456 0.75 3.09834V2.22834C0.75 1.77834 1.07 1.39 1.51417 1.315C3.73964 0.938214 5.99286 0.749215 8.25 0.750002Z"
              stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg> Filter
        </button>
      </div>

      <!-- Staff Content Area - Ready for your UI -->
      <div class="bg-white rounded-xl shadow-sm px-[20px]">
        <!-- Loading State -->
        <BaseLoader v-if="isLoading" />

        <div v-else class="flex bg-white">
          <!-- Main Content -->
          <div class="flex-1 bg-white flex flex-col">

            <!-- Table -->
            <div class="flex-1 overflow-hidden rounded-lg">
              <div class="overflow-x-auto">
                <table class="w-full min-w-[600px]">
                  <thead>
                    <tr class="border-b border-[#E8F1FD] bg-[#E8F1FD]">
                      <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Staff ID</th>
                      <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Name</th>
                      <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Department</th>
                      <th class="text-left py-3 px-4 text-sm font-semibold text-gray-600 whitespace-nowrap">User Role</th>
                      <th class="text-right py-3 px-4 text-sm font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="staffData.length === 0">
                      <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                        No staff found
                      </td>
                    </tr>
                    <tr v-for="staff in staffData" :key="staff.id"
                      class="border border-[#E8F1FD] hover:bg-gray-50 transition">
                    <td class="py-4 px-4 text-sm text-gray-900 font-medium">{{ staff.id }}</td>
                    <td class="py-4 px-4 text-sm text-gray-700">{{ staff.name }}</td>
                    <td class="py-4 px-4 text-sm text-gray-700">{{ staff.department }}</td>
                    <td class="py-4 px-4 text-sm text-gray-700">{{ staff.role }}</td>
                    <!-- Actionbutton -->
                    <td class="py-4 px-4 text-right">
                      <div class="relative inline-block">
                        <button
                          @click="toggleMenu(staff.id)"
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
                            v-if="openMenuId === staff.id"
                            class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                          >
                            <button
                              @click="openEditModal(staff)"
                              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              @click="deleteStaffMember(staff)"
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
        </div>
      </div>

      <!-- Add Staff Modal -->
      <BaseModal v-model="showAddStaffModal" :dismissible="true" size="md">
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-900">Add New Staff</h2>

          <form @submit.prevent="addStaff" class="space-y-4">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                v-model="staffForm.name"
                type="text"
                placeholder="Enter Full Name"
                required
                minlength="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <!-- Last Name -->
            <!-- <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                v-model="staffForm.lastName"
                type="text"
                placeholder="Enter Last Name"
                required
                minlength="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div> -->

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="staffForm.email"
                type="email"
                placeholder="Enter Email Address"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                v-model="staffForm.password"
                type="password"
                placeholder="Enter Password (min 6 characters)"
                required
                minlength="6"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <!-- Department -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                v-model="staffForm.department"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="" disabled>Select Department</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Front Desk">Front Desk</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Maintenance">Maintenance</option>
                <option value="General Utility">General Utility</option>
              </select>
            </div>

            <!-- User Role -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">User Role</label>
              <select
                v-model="staffForm.role"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="" disabled>Select Role</option>
                <option value="STAFF">Staff</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showAddStaffModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isCreating"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isCreating ? 'Creating...' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </BaseModal>

      <!-- Edit Staff Modal -->
      <BaseModal v-model="showEditStaffModal" :dismissible="true" size="md">
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-900">Edit Staff Member</h2>

          <form @submit.prevent="updateStaffMember" class="space-y-4">
            <!-- Name (Read-only) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Staff Name</label>
              <input
                v-model="editForm.name"
                type="text"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm cursor-not-allowed"
              />
            </div>

            <!-- Department -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                v-model="editForm.department"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="" disabled>Select Department</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Front Desk">Front Desk</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Maintenance">Maintenance</option>
                <option value="General Utility">General Utility</option>
              </select>
            </div>

            <!-- Active Status -->
            <div class="flex items-center space-x-2">
              <input
                v-model="editForm.isActive"
                type="checkbox"
                id="isActive"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label for="isActive" class="text-sm font-medium text-gray-700">Active Staff Member</label>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="showEditStaffModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isUpdating"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isUpdating ? 'Updating...' : 'Update' }}
              </button>
            </div>
          </form>
        </div>
      </BaseModal>

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

      <!-- Success Modal -->
      <BaseModal v-model="showSuccessModal" :dismissible="true" size="sm">
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">Success</h3>
              <p class="text-sm text-green-600 mt-1">{{ successMessage }}</p>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              @click="showSuccessModal = false"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </BaseModal>

      <!-- Delete Confirmation Modal -->
      <BaseModal v-model="showDeleteModal" :dismissible="true" size="sm">
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">Confirm Delete</h3>
              <p class="text-sm text-gray-600 mt-1">Are you sure you want to delete {{ staffToDelete?.name }}? This action cannot be undone.</p>
            </div>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              :disabled="isDeleting"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isDeleting ? 'Deleting...' : 'Delete' }}
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

const showAddStaffModal = ref(false)
const showEditStaffModal = ref(false)
const showErrorModal = ref(false)
const showSuccessModal = ref(false)
const showDeleteModal = ref(false)
const openMenuId = ref(null)
const isLoading = ref(false)
const isCreating = ref(false)
const isUpdating = ref(false)
const isDeleting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const staffToDelete = ref(null)

const staffForm = ref({
  name: '',
  email: '',
  password: '',
  department: '',
  role: ''
})

const editForm = ref({
  id: '',
  name: '',
  department: '',
  isActive: true
})

const staffData = ref([])

// Fetch all staff members
const fetchAllStaff = async () => {
  isLoading.value = true
  try {
    const response = await apiService.getAllStaff()

    if (response.data && response.data.staff) {
      // Map API data to match component structure
      staffData.value = response.data.staff.map(staff => ({
        id: staff._id || staff.id,
        name: staff.name || `${staff.firstName || ''} ${staff.lastName || ''}`.trim(),
        email: staff.email,
        department: staff.department,
        role: staff.role,
        isActive: staff.isActive
      }))
    }
  } catch (error) {
    console.error('Error fetching staff:', error)
    errorMessage.value = 'Failed to load staff members. Please try again.'
    showErrorModal.value = true
  } finally {
    isLoading.value = false
  }
}

// Fetch staff on component mount
onMounted(() => {
  fetchAllStaff()
})

// Toggle dropdown menu
const toggleMenu = (staffId) => {
  openMenuId.value = openMenuId.value === staffId ? null : staffId
}

// Open edit modal
const openEditModal = (staff) => {
  editForm.value = {
    id: staff.id,
    name: staff.name,
    department: staff.department,
    isActive: staff.isActive !== false
  }
  showEditStaffModal.value = true
  openMenuId.value = null
}

// Add new staff
const addStaff = async () => {
  if (staffForm.value.password.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long'
    showErrorModal.value = true
    return
  }

  // Split the full name into first and last name
  const nameParts = staffForm.value.name.trim().split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  // Validate that both first and last name have at least 2 characters
  if (firstName.length < 2) {
    errorMessage.value = 'First name must be at least 2 characters long'
    showErrorModal.value = true
    return
  }

  if (lastName.length < 2) {
    errorMessage.value = 'Last name must be at least 2 characters long. Please enter full name (e.g., "John Doe")'
    showErrorModal.value = true
    return
  }

  isCreating.value = true
  try {
    await apiService.createStaff({
      firstName: firstName,
      lastName: lastName,
      email: staffForm.value.email,
      password: staffForm.value.password,
      role: staffForm.value.role,
      department: staffForm.value.department
    })

    // Refresh staff list
    await fetchAllStaff()

    // Reset form
    staffForm.value = {
      name: '',
      email: '',
      password: '',
      department: '',
      role: ''
    }

    // Close modal
    showAddStaffModal.value = false

    // Show success message
    successMessage.value = 'Staff member created successfully!'
    showSuccessModal.value = true
  } catch (error) {
    console.error('Error creating staff:', error)
    errorMessage.value = error.response?.data?.message || 'Failed to create staff member. Please try again.'
    showErrorModal.value = true
  } finally {
    isCreating.value = false
  }
}

// Update staff member
const updateStaffMember = async () => {
  isUpdating.value = true
  try {
    await apiService.updateStaff(editForm.value.id, {
      department: editForm.value.department,
      isActive: editForm.value.isActive
    })

    // Refresh staff list
    await fetchAllStaff()

    // Close modal and reset form
    showEditStaffModal.value = false
    editForm.value = {
      id: '',
      name: '',
      department: '',
      isActive: true
    }

    // Show success message
    successMessage.value = 'Staff member updated successfully!'
    showSuccessModal.value = true
  } catch (error) {
    console.error('Error updating staff:', error)
    errorMessage.value = error.response?.data?.message || 'Failed to update staff member. Please try again.'
    showErrorModal.value = true
  } finally {
    isUpdating.value = false
  }
}

// Delete staff member - show confirmation modal
const deleteStaffMember = (staff) => {
  staffToDelete.value = staff
  showDeleteModal.value = true
  openMenuId.value = null
}

// Confirm delete action
const confirmDelete = async () => {
  if (!staffToDelete.value) return

  isDeleting.value = true
  try {
    await apiService.deleteStaff(staffToDelete.value.id)

    // Refresh staff list
    await fetchAllStaff()

    // Close modal and reset
    showDeleteModal.value = false
    staffToDelete.value = null

    // Show success message
    successMessage.value = 'Staff member deleted successfully!'
    showSuccessModal.value = true
  } catch (error) {
    console.error('Error deleting staff:', error)
    showDeleteModal.value = false
    staffToDelete.value = null
    errorMessage.value = error.response?.data?.message || 'Failed to delete staff member. Please try again.'
    showErrorModal.value = true
  } finally {
    isDeleting.value = false
  }
}
</script>
