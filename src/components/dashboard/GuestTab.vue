<template>
  <div class="bg-white">
    <!-- Success Alert Toast -->
    <transition name="slide-fade">
      <div v-if="showSuccessAlert"
        class="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-lg shadow-lg max-w-md">
        <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-green-800">{{ successAlertMessage }}</p>
        </div>
        <button @click="showSuccessAlert = false" class="flex-shrink-0 text-green-500 hover:text-green-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>

    <div class="flex flex-col">
      <!-- Main Content -->
      <div class="flex-1">
        <!-- Tabs -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex gap-4 items-center justify-between">
            <button @click="switchTab('bookings')" :class="[
              'px-2 py-1 md:px-4 md:py-2 rounded-[8px] border text-[9px] md:text-sm font-medium transition-all duration-200',
              activeTab === 'bookings'
                ? 'bg-[#F9A63A] text-white border-[#F9A63A] shadow-md scale-105'
                : 'bg-white text-[#F9A63A] border-[#F9A63A] hover:bg-[#FFF8F0]'
            ]">
              Bookings
              <span v-if="getTabCount('bookings') > 0" class="ml-1 text-xs opacity-80">({{ getTabCount('bookings') }})</span>
            </button>
            <button @click="switchTab('checked-in')" :class="[
              'px-2 py-1 md:px-4 md:py-2 rounded-[8px] border text-[9px] md:text-sm font-medium transition-all duration-200',
              activeTab === 'checked-in'
                ? 'bg-[#41C588] text-white border-[#41C588] shadow-md scale-105'
                : 'bg-white text-[#41C588] border-[#41C588] hover:bg-[#F0FFF7]'
            ]">
              Checked in
              <span v-if="getTabCount('checked-in') > 0" class="ml-1 text-xs opacity-80">({{ getTabCount('checked-in') }})</span>
            </button>
            <button @click="switchTab('checked-out')" :class="[
              'px-2 py-1 md:px-4 md:py-2 rounded-[8px] border text-[9px] md:text-sm font-medium transition-all duration-200',
              activeTab === 'checked-out'
                ? 'bg-[#F36960] text-white border-[#F36960] shadow-md scale-105'
                : 'bg-white text-[#F36960] border-[#F36960] hover:bg-[#FFF0EF]'
            ]">
              Checked out
              <span v-if="getTabCount('checked-out') > 0" class="ml-1 text-xs opacity-80">({{ getTabCount('checked-out') }})</span>
            </button>
          </div>

          <!-- Filter and Search -->
          <div class="flex gap-4 md:mb-6">
            <!-- Filter Dropdown -->
            <div class="relative">
              <button
                @click="showFilterDropdown = !showFilterDropdown"
                class="px-4 py-2 border border-gray-300 rounded-lg
                 text-gray-700 text-sm font-medium hidden md:flex items-center gap-2 hover:bg-gray-50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
                <span v-if="activeFilters.length > 0" class="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {{ activeFilters.length }}
                </span>
              </button>
              <!-- Filter Dropdown Menu -->
              <div v-if="showFilterDropdown" class="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                <h4 class="font-semibold text-gray-700 mb-3">Filter by</h4>

                <!-- Room Type Filter -->
                <div class="mb-3">
                  <label class="text-sm text-gray-600 mb-1 block">Room Type</label>
                  <select v-model="filterRoomType" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Room Types</option>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                <!-- Risk Level Filter -->
                <div class="mb-3">
                  <label class="text-sm text-gray-600 mb-1 block">Risk Level</label>
                  <select v-model="filterRiskLevel" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Risk Levels</option>
                    <option value="low">Low Risk (&lt; 50%)</option>
                    <option value="high">High Risk (&ge; 50%)</option>
                  </select>
                </div>

                <!-- Status Filter (only for bookings tab) -->
                <div v-if="activeTab === 'bookings'" class="mb-3">
                  <label class="text-sm text-gray-600 mb-1 block">Status</label>
                  <select v-model="filterStatus" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Statuses</option>
                    <option value="Approved">Approved</option>
                    <option value="Flagged">Flagged</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <!-- Filter Actions -->
                <div class="flex gap-2 mt-4">
                  <button @click="clearFilters" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                    Clear
                  </button>
                  <button @click="showFilterDropdown = false" class="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <!-- Search Input -->
            <div class="relative flex-1">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name, room number, or reservation ID..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3  top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <BaseLoader v-if="isLoading" />

        <!-- Table -->
        <div v-else class="bg-white rounded-lg border border-[#E8F1FD] overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm min-w-[900px]">
              <thead>
                <tr class="border-b border-[#E8F1FD] bg-[#E8F1FD]">
                  <th class="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Reservation ID</th>
                  <th class="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Name</th>
                  <th class="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Room Type</th>
                  <th class="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Room Number</th>
                  <th class="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Risk Score</th>
                  <th class="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Analysis</th>
                  <th v-if="activeTab === 'bookings'" class="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Status</th>
                  <th class="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Check In</th>
                  <th class="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Check Out</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="guests.length === 0">
                  <td :colspan="activeTab === 'bookings' ? 9 : 8" class="px-6 py-8 text-center text-gray-500">
                    No guests found
                  </td>
                </tr>
                <tr v-for="guest in guests" :key="guest.id" class="border-b border-gray-200 hover:bg-gray-50">
                  <td class="px-6 py-4 text-gray-900 font-medium">{{ guest.reservationId }}</td>
                  <td class="px-6 py-4 text-gray-700">{{ guest.name }}</td>
                  <td class="px-6 py-4 font-medium">
                    <span :class="getRoomTypeClass(guest.roomType)">{{ guest.roomType }}</span>
                  </td>
                  <td class="px-6 py-4 text-gray-700">{{ guest.roomNumber }}</td>
                  <td class="px-6 py-4">
                    <span class="text-sm font-semibold text-gray-900">{{ guest.riskScore }}%</span>
                  </td>
                  <td class="px-6 py-4">
                    <button @click="viewRiskAssessment(guest)"
                      class="text-blue-600 hover:text-blue-800 font-medium text-sm underline">
                      View
                    </button>
                  </td>
                  <td v-if="activeTab === 'bookings'" class="px-6 py-4">
                    <span :class="getStatusClass(guest.bookingStatus)">{{ guest.bookingStatus }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <button v-if="activeTab === 'bookings'"
                      @click="checkInGuest(guest)"
                      :disabled="!canCheckIn(guest) || (processingGuestId === guest.id && processingAction === 'check-in')"
                      :class="[
                        'px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1',
                        !canCheckIn(guest)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      ]">
                      <svg v-if="processingGuestId === guest.id && processingAction === 'check-in'" class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ processingGuestId === guest.id && processingAction === 'check-in' ? 'Processing...' : 'Check In' }}
                    </button>
                    <span v-else class="text-gray-600 text-xs">{{ guest.checkIn }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <button v-if="activeTab === 'bookings' || activeTab === 'checked-in'"
                      @click="checkOutGuest(guest)"
                      :disabled="!canCheckOut(guest) || (processingGuestId === guest.id && processingAction === 'check-out')"
                      :class="[
                        'px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1',
                        !canCheckOut(guest)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-orange-700 text-white hover:bg-orange-800'
                      ]">
                      <svg v-if="processingGuestId === guest.id && processingAction === 'check-out'" class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ processingGuestId === guest.id && processingAction === 'check-out' ? 'Processing...' : 'Check Out' }}
                    </button>
                    <span v-else class="text-gray-600 text-xs">{{ guest.checkOut }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-between mt-6">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="[
              'px-4 py-2 rounded transition',
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
            ]">
            ← Previous
          </button>
          <div class="flex gap-2">
            <button v-for="page in visiblePages" :key="page" :class="[
              'w-8 h-8 rounded text-sm font-medium transition',
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-200'
            ]" @click="goToPage(page)">
              {{ page }}
            </button>
          </div>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            :class="[
              'px-4 py-2 rounded transition',
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
            ]">
            Next →
          </button>
        </div>
      </div>
    </div>

    <!-- Risk Score Modal -->
    <BaseModal v-model="showRiskScoreModal" :dismissible="true" size="md">
      <!-- Loading State -->
      <div v-if="isModalLoading" class="flex flex-col items-center justify-center py-12">
        <div class="relative">
          <div class="w-24 h-24 rounded-full border-4 border-gray-200 relative">
            <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
            <div class="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-500 animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <p class="mt-4 text-gray-600 font-medium animate-pulse">Analyzing risk factors...</p>
        <div class="flex space-x-1 mt-2">
          <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
          <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
          <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
        </div>
      </div>

      <!-- Risk Assessment Content -->
      <div v-else class="space-y-4 animate-fadeIn">
        <h2 class="text-xl font-bold text-gray-900">Risk Assessment</h2>
        <p class="text-sm text-gray-600">Booking risk analysis for {{ selectedGuest?.name }}</p>

        <div class="bg-gray-50 rounded-lg p-4 space-y-3 animate-slideUp" style="animation-delay: 100ms;">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">Reservation ID:</span>
            <span class="text-sm text-gray-900">{{ selectedGuest?.reservationId }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">Guest Name:</span>
            <span class="text-sm text-gray-900">{{ selectedGuest?.name }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">Room Number:</span>
            <span class="text-sm text-gray-900">{{ selectedGuest?.roomNumber }}</span>
          </div>
        </div>

        <!-- High Risk (>= 50%) - RED -->
        <div v-if="isHighRisk" class="border-t border-gray-200 pt-4 animate-slideUp" style="animation-delay: 200ms;">
          <div class="flex items-center justify-center mb-4">
            <div class="relative animate-scaleIn" style="animation-delay: 300ms;">
              <svg class="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#FEE2E2" stroke-width="8" fill="none" />
                <circle cx="48" cy="48" r="40" stroke="#EF4444" stroke-width="8" fill="none"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="animatedStrokeOffset"
                  class="transition-all duration-1000 ease-out" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-red-600">{{ selectedGuest?.riskScore }}%</span>
              </div>
            </div>
          </div>

          <div class="bg-red-50 rounded-lg p-4 mb-4 animate-slideUp" style="animation-delay: 400ms;">
            <h3 class="text-sm font-semibold text-red-900 mb-2">Risk Factors Detected:</h3>
            <ul class="space-y-2">
              <li v-for="(factor, index) in selectedGuest?.riskFactors" :key="index" class="flex items-start space-x-2">
                <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span class="text-sm text-red-800">{{ factor }}</span>
              </li>
            </ul>
          </div>

          <!-- Action Buttons - Only show if booking can be approved/declined -->
          <div v-if="canTakeAction" class="flex justify-end space-x-3 mt-6 animate-slideUp" style="animation-delay: 500ms;">
            <button @click="declineBooking"
              :disabled="isDeclining || isApproving"
              class="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <svg v-if="isDeclining" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isDeclining ? 'Declining...' : 'Decline Booking' }}
            </button>
            <button @click="approveBooking"
              :disabled="isApproving || isDeclining"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <svg v-if="isApproving" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isApproving ? 'Approving...' : 'Approve Booking' }}
            </button>
          </div>

          <!-- Already Approved Status -->
          <div v-else-if="isAlreadyApproved" class="flex justify-end mt-6 animate-slideUp" style="animation-delay: 500ms;">
            <div class="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Booking Already Approved
            </div>
          </div>
        </div>

        <!-- Low Risk (< 50%) - GREEN -->
        <div v-else class="border-t border-gray-200 pt-4 animate-slideUp" style="animation-delay: 200ms;">
          <div class="flex items-center justify-center mb-4">
            <div class="relative animate-scaleIn" style="animation-delay: 300ms;">
              <svg class="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#D1FAE5" stroke-width="8" fill="none" />
                <circle cx="48" cy="48" r="40" stroke="#10B981" stroke-width="8" fill="none"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="animatedStrokeOffset"
                  class="transition-all duration-1000 ease-out" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-green-600">{{ selectedGuest?.riskScore }}%</span>
              </div>
            </div>
          </div>

          <div class="bg-green-50 rounded-lg p-4 mb-4 flex items-center space-x-3 animate-slideUp" style="animation-delay: 400ms;">
            <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-green-800 font-medium">Low Risk - Guest verification passed</p>
          </div>

          <!-- Action Buttons - Only show if booking can be approved/declined -->
          <div v-if="canTakeAction" class="flex justify-end space-x-3 mt-6 animate-slideUp" style="animation-delay: 500ms;">
            <button @click="declineBooking"
              :disabled="isDeclining || isApproving"
              class="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <svg v-if="isDeclining" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isDeclining ? 'Declining...' : 'Decline Booking' }}
            </button>
            <button @click="approveBooking"
              :disabled="isApproving || isDeclining"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <svg v-if="isApproving" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isApproving ? 'Approving...' : 'Approve Booking' }}
            </button>
          </div>

          <!-- Already Approved Status -->
          <div v-else-if="isAlreadyApproved" class="flex justify-end mt-6 animate-slideUp" style="animation-delay: 500ms;">
            <div class="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Booking Already Approved
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import apiService from '@/services/apiService'

// State
const currentPage = ref(1)
const totalPages = ref(1)
const totalBookings = ref(0)
const itemsPerPage = ref(10)
const isLoading = ref(false)
const isModalLoading = ref(false)
const activeTab = ref('bookings')
const searchQuery = ref('')
const showRiskScoreModal = ref(false)
const selectedGuest = ref(null)
const allGuests = ref([])

// Filter state
const showFilterDropdown = ref(false)
const filterRoomType = ref('')
const filterRiskLevel = ref('')
const filterStatus = ref('')

// Circle progress calculation
const circumference = 2 * Math.PI * 40

// Computed properties
const activeFilters = computed(() => {
  const filters = []
  if (filterRoomType.value) filters.push('roomType')
  if (filterRiskLevel.value) filters.push('riskLevel')
  if (filterStatus.value) filters.push('status')
  return filters
})

const isHighRisk = computed(() => {
  return selectedGuest.value && selectedGuest.value.riskScore >= 50
})

// Check if booking can be approved/declined (only for pending statuses)
const canTakeAction = computed(() => {
  if (!selectedGuest.value) return false
  const status = selectedGuest.value.bookingStatus?.toUpperCase() || ''
  // Can only approve/decline if status is pending, pending_approval, or flagged (but not already confirmed/approved)
  return status === 'PENDING' ||
         status === 'PENDING_APPROVAL' ||
         status === 'FLAGGED' ||
         status === 'ID_FLAGGED' ||
         selectedGuest.value.bookingStatus === 'Pending' ||
         selectedGuest.value.bookingStatus === 'Flagged'
})

const isAlreadyApproved = computed(() => {
  if (!selectedGuest.value) return false
  const status = selectedGuest.value.bookingStatus?.toUpperCase() || ''
  return status === 'CONFIRMED' ||
         status === 'APPROVED' ||
         selectedGuest.value.bookingStatus === 'Approved'
})

const animatedStrokeOffset = computed(() => {
  if (!selectedGuest.value || isModalLoading.value) return circumference
  return circumference - (selectedGuest.value.riskScore / 100) * circumference
})

// Filter guests based on active tab, search query, and filters
const guests = computed(() => {
  let filtered = allGuests.value.filter(guest => guest.status === activeTab.value)

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(guest =>
      guest.roomNumber?.toLowerCase().includes(query) ||
      guest.name?.toLowerCase().includes(query) ||
      guest.reservationId?.toLowerCase().includes(query)
    )
  }

  // Apply room type filter
  if (filterRoomType.value) {
    filtered = filtered.filter(guest => guest.roomType === filterRoomType.value)
  }

  // Apply risk level filter
  if (filterRiskLevel.value) {
    if (filterRiskLevel.value === 'low') {
      filtered = filtered.filter(guest => guest.riskScore < 50)
    } else if (filterRiskLevel.value === 'high') {
      filtered = filtered.filter(guest => guest.riskScore >= 50)
    }
  }

  // Apply status filter (only for bookings tab)
  if (filterStatus.value && activeTab.value === 'bookings') {
    filtered = filtered.filter(guest => guest.bookingStatus === filterStatus.value)
  }

  return filtered
})

// Compute visible page numbers
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 7
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const clearFilters = () => {
  filterRoomType.value = ''
  filterRiskLevel.value = ''
  filterStatus.value = ''
}

const switchTab = (tab) => {
  activeTab.value = tab
  if (tab !== 'bookings') {
    filterStatus.value = ''
  }
}

const getTabCount = (tab) => {
  return allGuests.value.filter(guest => guest.status === tab).length
}

const closeFilterDropdown = (event) => {
  if (showFilterDropdown.value && !event.target.closest('.relative')) {
    showFilterDropdown.value = false
  }
}

const getRoomTypeClass = (type) => {
  const baseClass = 'px-2 py-1 rounded text-sm font-medium sm:text-xs'
  if (type === 'Standard') return baseClass + ' text-[#F9A63A]'
  if (type === 'Deluxe') return baseClass + ' text-[#41C588]'
  if (type === 'Luxury') return baseClass + ' text-[#F36960]'
  return baseClass
}

const getStatusClass = (status) => {
  const baseClass = 'sm:text-xs text-sm font-medium'
  if (status === 'Approved') return baseClass + ' text-green-600'
  if (status === 'Flagged') return baseClass + ' text-red-600'
  return baseClass
}

// Check if guest can be checked in
// Can check in ONLY if: status is CONFIRMED (not CHECKED_IN, CHECKED_OUT, PENDING, or FLAGGED)
const canCheckIn = (guest) => {
  if (!guest) return false
  const originalStatus = guest.originalStatus?.toUpperCase() || ''

  // Already checked in or checked out - cannot check in
  if (originalStatus === 'CHECKED_IN' || originalStatus === 'CHECKED_OUT') {
    return false
  }

  // Can only check in if status is CONFIRMED
  return originalStatus === 'CONFIRMED'
}

// Check if guest can be checked out
// Can check out if: status is CONFIRMED OR CHECKED_IN (not CHECKED_OUT, PENDING, or FLAGGED)
const canCheckOut = (guest) => {
  if (!guest) return false
  const originalStatus = guest.originalStatus?.toUpperCase() || ''

  // Already checked out - cannot check out again
  if (originalStatus === 'CHECKED_OUT') {
    return false
  }

  // In bookings tab: can check out if CONFIRMED (direct checkout without check-in)
  if (activeTab.value === 'bookings') {
    return originalStatus === 'CONFIRMED'
  }

  // In checked-in tab: can check out if CHECKED_IN
  if (activeTab.value === 'checked-in') {
    return originalStatus === 'CHECKED_IN'
  }

  return false
}

const isApproving = ref(false)
const isDeclining = ref(false)
const processingGuestId = ref(null)
const processingAction = ref(null) // 'check-in' or 'check-out'

// Success alert state
const showSuccessAlert = ref(false)
const successAlertMessage = ref('')

const approveBooking = async () => {
  if (!selectedGuest.value) return

  isApproving.value = true
  try {
    await apiService.updateBookingStatus(selectedGuest.value.id, 'CONFIRMED')

    // Update local state
    const guest = allGuests.value.find(g => g.id === selectedGuest.value.id)
    if (guest) {
      guest.bookingStatus = 'Approved'
      guest.originalStatus = 'CONFIRMED'
    }

    showRiskScoreModal.value = false
    selectedGuest.value = null
  } catch (error) {
    console.error('Failed to approve booking:', error)
    alert('Failed to approve booking. Please try again.')
  } finally {
    isApproving.value = false
  }
}

const declineBooking = async () => {
  if (!selectedGuest.value) return

  const confirmed = confirm(`Are you sure you want to decline booking for ${selectedGuest.value.name}?`)
  if (!confirmed) return

  isDeclining.value = true
  try {
    await apiService.updateBookingStatus(selectedGuest.value.id, 'DECLINED')

    // Remove from local state
    const index = allGuests.value.findIndex(g => g.id === selectedGuest.value.id)
    if (index !== -1) {
      allGuests.value.splice(index, 1)
    }

    showRiskScoreModal.value = false
    selectedGuest.value = null
  } catch (error) {
    console.error('Failed to decline booking:', error)
    alert('Failed to decline booking. Please try again.')
  } finally {
    isDeclining.value = false
  }
}

// Check In guest
const checkInGuest = async (guest) => {
  if (!guest || guest.bookingStatus === 'Flagged') return

  processingGuestId.value = guest.id
  processingAction.value = 'check-in'

  try {
    await apiService.updateBookingStatus(guest.id, 'CHECKED_IN')

    // Update local state - move guest to checked-in tab
    const guestIndex = allGuests.value.findIndex(g => g.id === guest.id)
    if (guestIndex !== -1) {
      allGuests.value[guestIndex].status = 'checked-in'
      allGuests.value[guestIndex].bookingStatus = 'Checked In'
      allGuests.value[guestIndex].originalStatus = 'CHECKED_IN'
    }

    // Show success alert
    successAlertMessage.value = `${guest.name} has been successfully checked in!`
    showSuccessAlert.value = true

    // Auto-hide after 3 seconds
    setTimeout(() => {
      showSuccessAlert.value = false
    }, 3000)
  } catch (error) {
    console.error('Failed to check in guest:', error)
    alert('Failed to check in guest. Please try again.')
  } finally {
    processingGuestId.value = null
    processingAction.value = null
  }
}

// Check Out guest
const checkOutGuest = async (guest) => {
  if (!guest) return
  if (activeTab.value === 'bookings' && guest.bookingStatus === 'Flagged') return

  processingGuestId.value = guest.id
  processingAction.value = 'check-out'

  try {
    await apiService.updateBookingStatus(guest.id, 'CHECKED_OUT')

    // Update local state - move guest to checked-out tab
    const guestIndex = allGuests.value.findIndex(g => g.id === guest.id)
    if (guestIndex !== -1) {
      allGuests.value[guestIndex].status = 'checked-out'
      allGuests.value[guestIndex].bookingStatus = 'Checked Out'
      allGuests.value[guestIndex].originalStatus = 'CHECKED_OUT'
    }

    // Show success alert
    successAlertMessage.value = `${guest.name} has been successfully checked out!`
    showSuccessAlert.value = true

    // Auto-hide after 3 seconds
    setTimeout(() => {
      showSuccessAlert.value = false
    }, 3000)
  } catch (error) {
    console.error('Failed to check out guest:', error)
    alert('Failed to check out guest. Please try again.')
  } finally {
    processingGuestId.value = null
    processingAction.value = null
  }
}

// Fetch all bookings from API
const fetchBookings = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await apiService.getAllBookings(page, itemsPerPage.value)
    const data = response.data
    const bookings = data.bookings || data || []

    // Update pagination info
    if (data.pagination) {
      currentPage.value = data.pagination.currentPage || data.pagination.page || page
      totalPages.value = data.pagination.totalPages || data.pagination.pages || 1
      totalBookings.value = data.pagination.totalBookings || data.pagination.total || bookings.length
    } else if (data.totalPages || data.total) {
      currentPage.value = data.currentPage || data.page || page
      totalPages.value = data.totalPages || Math.ceil((data.total || bookings.length) / itemsPerPage.value) || 1
      totalBookings.value = data.total || bookings.length
    } else {
      currentPage.value = page
      totalPages.value = 1
      totalBookings.value = bookings.length
    }

    // Map API response to guest format
    allGuests.value = bookings.map(booking => ({
      id: booking.id || booking._id,
      reservationId: booking.reservationId || `#${booking.id?.slice(-6).toUpperCase() || '0000'}`,
      name: booking.guestName || booking.fullName || 'Unknown',
      roomType: booking.roomType || 'Standard',
      roomNumber: booking.roomNumber || 'N/A',
      riskScore: parseRiskScore(booking.riskScore),
      bookingStatus: mapDisplayStatus(booking.status, booking.riskLevel),
      originalStatus: booking.status, // Store original API status for button logic
      status: mapBookingStatus(booking.status),
      checkIn: formatDateTime(booking.checkIn),
      checkOut: formatDateTime(booking.checkOut),
      riskFactors: booking.riskFactors || [],
      riskLevel: booking.riskLevel,
      verificationStatus: booking.verificationStatus
    }))
  } catch (error) {
    //console.error('Failed to fetch bookings:', error)
  } finally {
    isLoading.value = false
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page
    fetchBookings(page)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1)
  }
}

const parseRiskScore = (riskScore) => {
  if (!riskScore) return 0
  if (typeof riskScore === 'number') return riskScore
  const parsed = parseFloat(riskScore.toString().replace('%', ''))
  return isNaN(parsed) ? 0 : Math.round(parsed)
}

const mapDisplayStatus = (status, riskLevel) => {
  if (!status) return 'Pending'
  const statusUpper = status.toUpperCase()
  if (statusUpper === 'CONFIRMED' || statusUpper === 'APPROVED') return 'Approved'
  if (statusUpper === 'ID_FLAGGED' || statusUpper === 'FLAGGED' || riskLevel === 'HIGH') return 'Flagged'
  if (statusUpper === 'CHECKED_IN' || statusUpper === 'CHECKED-IN') return 'Checked In'
  if (statusUpper === 'CHECKED_OUT' || statusUpper === 'CHECKED-OUT') return 'Checked Out'
  return status
}

const mapBookingStatus = (status) => {
  if (!status) return 'bookings'
  const statusLower = status.toLowerCase()
  if (statusLower === 'checked-in' || statusLower === 'checked_in') return 'checked-in'
  if (statusLower === 'checked-out' || statusLower === 'checked_out') return 'checked-out'
  return 'bookings'
}

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB') + '; ' + date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase()
}

const viewRiskAssessment = async (guest) => {
  isModalLoading.value = true
  showRiskScoreModal.value = true
  selectedGuest.value = guest

  try {
    const response = await apiService.getBookingById(guest.id)
    const booking = response.data.booking || response.data

    selectedGuest.value = {
      ...guest,
      riskScore: booking.riskAssessment?.riskScore || guest.riskScore,
      riskFactors: booking.riskAssessment?.riskFactors || guest.riskFactors || [],
      bookingStatus: booking.riskAssessment?.status || booking.status || guest.bookingStatus
    }
  } catch (error) {
    //console.error('Failed to fetch booking details:', error)
  } finally {
    isModalLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchBookings()
  document.addEventListener('click', closeFilterDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeFilterDropdown)
})

watch(activeTab, () => {
  // Data is already loaded, just filtering changes
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}

.animate-slideUp {
  opacity: 0;
  animation: slideUp 0.5s ease-out forwards;
}

.animate-scaleIn {
  opacity: 0;
  animation: scaleIn 0.6s ease-out forwards;
}

/* Success alert transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
