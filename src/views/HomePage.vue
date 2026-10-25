<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
         :class="scrolled ? 'bg-white shadow-md' : 'bg-transparent'">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-1.5 sm:space-x-2 group cursor-pointer">
            <div class="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <img src="../assets/icons/logo.svg" alt="" class="w-7 h-7">
            </div>
            <span class="text-lg sm:text-xl font-bold transition-colors duration-300"
                  :class="scrolled ? 'text-gray-900' : 'text-white'">
              Bookit
            </span>
          </div>

          <!-- Login Buttons -->
          <div class="flex items-center space-x-2 sm:space-x-3">
            <button @click="navigateToLogin('customer')"
                    class="group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300"
                    :class="scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-400'">
              <span class="hidden sm:inline">Guest Checkin</span>
              <span class="sm:hidden">Checkin</span>
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button @click="navigateToLogin('staff')"
                    class="group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
              <span class="hidden sm:inline">Staff Login</span>
              <span class="sm:hidden">Staff</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section with Background Image -->
    <section class="relative min-h-[500px] sm:min-h-[600px] lg:h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80"
             alt="Luxury Hotel Lobby"
             class="w-full h-full object-cover">
        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-0">
        <div class="max-w-xl animate-fade-in-up">
          <h1 class="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 sm:mb-4">
            <span class="block text-white">
              <span class="sm:hidden">Book a Room.<br>Manage your Stay.</span>
              <span class="hidden sm:inline">Book a Room. Manage your Stay.</span>
            </span>
            <span class="block">
              <span class="text-white">Do it all smoothly with </span>
              <span class="text-blue-400">Bookit.</span>
            </span>
          </h1>
          <p class="text-sm sm:text-sm md:text-base text-gray-300 mb-4 sm:mb-6 max-w-md leading-relaxed">
            From reservation to checkout, Bookit gives you complete control of your stay.
          </p>

          <!-- Feature Icons Row -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 sm:mt-8">
            <div class="group flex flex-col items-center space-y-1 sm:space-y-1.5 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <!-- Cocktail/Wine Glass Icon -->
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="text-center">
                <div class="text-[10px] sm:text-xs font-semibold text-white">Welcome</div>
                <div class="text-[9px] sm:text-xs text-gray-400">Drinks</div>
              </div>
            </div>

            <div class="group flex flex-col items-center space-y-1 sm:space-y-1.5 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <!-- Car Icon -->
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-2-4H7L5 9m14 0v7a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H8v1a1 1 0 01-1 1H6a1 1 0 01-1-1V9m14 0H5m14 0a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2m2.5 4a.5.5 0 100-1 .5.5 0 000 1zm9 0a.5.5 0 100-1 .5.5 0 000 1z" />
                </svg>
              </div>
              <div class="text-center">
                <div class="text-[10px] sm:text-xs font-semibold text-white">Car Rent</div>
                <div class="text-[9px] sm:text-xs text-gray-400">Service</div>
              </div>
            </div>

            <div class="group flex flex-col items-center space-y-1 sm:space-y-1.5 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-center">
                <div class="text-[10px] sm:text-xs font-semibold text-white">Resort</div>
                <div class="text-[9px] sm:text-xs text-gray-400">& Spa</div>
              </div>
            </div>

            <div class="group flex flex-col items-center space-y-1 sm:space-y-1.5 p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <div class="text-center">
                <div class="text-[10px] sm:text-xs font-semibold text-white">Free</div>
                <div class="text-[9px] sm:text-xs text-gray-400">WIFI Service</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Search Section -->
    <section class="py-6 sm:py-8 -mt-12 sm:-mt-16 relative z-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-2xl p-4 sm:p-6 border border-gray-100">
          <!-- Room Type Filter -->
          <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            <button v-for="type in roomTypes" :key="type.id"
                    @click="selectedRoomType = type.id"
                    class="px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105"
                    :class="selectedRoomType === type.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
              {{ type.name }}
            </button>
          </div>

          <!-- Date Selection -->
          <div class="flex flex-col gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-4 w-full overflow-hidden">
            <div class="space-y-1 sm:space-y-1.5 min-w-0">
              <label class="text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wide">Check in</label>
              <div class="relative w-full">
                <input type="date" v-model="checkInDate"
                       class="date-input w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-10 sm:pl-10 bg-white">
                <svg class="w-5 h-5 sm:w-4 sm:h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div class="space-y-1 sm:space-y-1.5 min-w-0">
              <label class="text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wide">Check out</label>
              <div class="relative w-full">
                <input type="date" v-model="checkOutDate"
                       class="date-input w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-10 sm:pl-10 bg-white">
                <svg class="w-5 h-5 sm:w-4 sm:h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div class="flex items-end sm:col-span-2 md:col-span-1 min-w-0">
              <button @click="searchRooms"
                      :disabled="isSearching"
                      class="w-full px-4 sm:px-6 py-2.5 sm:py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center space-x-2">
                <span v-if="isSearching">Searching...</span>
                <span v-else>Search</span>
                <svg v-if="!isSearching" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Search Error Message -->
          <div v-if="searchError" class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ searchError }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Rooms Section -->
    <section class="py-8 sm:py-12 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header - only show when searching or has results -->
        <div v-if="hasSearched || isSearching" class="mb-6 sm:mb-8">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
            Search Results
          </h2>
          <p class="text-xs sm:text-sm text-gray-600 mt-1">
            {{ filteredRooms.length }} room(s) available for {{ checkInDate }} to {{ checkOutDate }}
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isSearching">
          <BaseLoader />
          <p class="text-gray-600 text-center -mt-12 mb-8">
            Searching for available rooms...
          </p>
        </div>

        <!-- Welcome Empty State - Before Search -->
        <div v-else-if="!hasSearched" class="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200">
          <!-- Illustration -->
          <div class="relative mb-6">
            <!-- Building/Hotel Icon -->
            <svg class="w-32 h-32 text-blue-100" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 2H9c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H9V4h10v16z"/>
              <path d="M11 6h2v2h-2zM15 6h2v2h-2zM11 10h2v2h-2zM15 10h2v2h-2zM11 14h2v2h-2zM15 14h2v2h-2z"/>
            </svg>
            <!-- Calendar overlay -->
            <div class="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Welcome Text -->
          <div class="text-center max-w-md px-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Welcome to Bookit</h3>
            <p class="text-sm text-gray-500 leading-relaxed">
              Please select your check-in and check-out dates above to discover available rooms for your stay.
            </p>
          </div>

          <!-- Arrow pointing up -->
          <div class="mt-6 animate-bounce">
            <svg class="w-6 h-6 text-blue-500 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        <!-- No Results -->
        <div v-else-if="hasSearched && filteredRooms.length === 0" class="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-gray-200">
          <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">No rooms available</h3>
          <p class="text-sm text-gray-500 text-center max-w-md">
            Sorry, we couldn't find any rooms matching your criteria for the selected dates. Please try different dates or room type.
          </p>
        </div>

        <!-- Rooms Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <!-- Room card -->
          <div v-for="(room, index) in filteredRooms" :key="room.id"
               class="bg-white rounded-xl border border-blue-400 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row"
               :style="{ animationDelay: `${index * 50}ms` }">

            <!-- Room Image - Left/Top Side -->
            <div class="relative w-full h-48 sm:w-32 sm:h-auto md:w-36 lg:w-44 flex-shrink-0 p-2 sm:p-2.5 md:p-3 cursor-pointer group"
                 @click="openGallery(room)">
              <img :src="room.image" :alt="room.type"
                   class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
              <!-- View Gallery Overlay -->
              <div class="absolute inset-3 bg-black/0 group-hover:bg-black/40 rounded-lg transition-all duration-300 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                  <svg class="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-xs sm:text-sm font-medium">View Gallery</p>
                </div>
              </div>
            </div>

            <!-- Room Details - Right/Bottom Side -->
            <div class="flex-1 p-3 sm:p-2 md:p-3 lg:p-4 flex flex-col min-w-0">
              <!-- Header Row: Type Badge, Room Code and Availability -->
              <div class="flex flex-wrap items-center gap-1.5 sm:gap-1 md:gap-2 lg:gap-3 mb-2 sm:mb-2 md:mb-3">
                <!-- Room Type Badge -->
                <span class="px-2.5 sm:px-2 md:px-3 lg:px-4 py-0.5 sm:py-0.5 md:py-1 border border-gray-300 text-gray-700 rounded-full text-xs sm:text-[9px] md:text-[10px] lg:text-sm whitespace-nowrap">
                  {{ room.type }}
                </span>
                <!-- Room Code -->
                <span class="text-gray-900 font-medium text-xs sm:text-[9px] md:text-[10px] lg:text-sm whitespace-nowrap">{{ room.code }}</span>
                <!-- Availability Badge -->
                <span class="px-2 sm:px-1.5 md:px-2 lg:px-3 py-0.5 rounded text-[10px] sm:text-[8px] md:text-[9px] lg:text-xs font-medium whitespace-nowrap"
                      :class="room.available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'">
                  {{ room.available ? 'Available' : 'Unavailable' }}
                </span>
              </div>

              <!-- Amenities Description -->
              <p class="text-xs sm:text-[9px] md:text-[10px] lg:text-sm text-gray-500 mb-auto line-clamp-2">
                {{ room.amenities }}
              </p>

              <!-- Price and Book Button Row -->
              <div class="flex items-center justify-between gap-2 sm:gap-1 md:gap-1.5 lg:gap-2 mt-3 sm:mt-2 md:mt-2 lg:mt-3">
                <div class="flex-shrink-0">
                  <span class="text-lg sm:text-sm md:text-base lg:text-xl font-bold text-blue-600">
                    ₦{{ room.price.toLocaleString() }}
                  </span>
                  <span class="text-gray-500 text-xs sm:text-[9px] md:text-[10px] lg:text-sm">/night</span>
                </div>
                <!-- Book Button -->
                <button @click="bookRoom(room)"
                        :disabled="!room.available"
                        class="px-4 sm:px-2 md:px-3 lg:px-5 py-2 sm:py-1.5 md:py-1.5 lg:py-2 rounded-lg text-xs sm:text-[9px] md:text-[10px] lg:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0"
                        :class="room.available
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'">
                  <span class="hidden sm:inline">Book Now</span>
                  <span class="sm:hidden">Book</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <!-- Main Footer Content -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          <!-- Brand Section -->
          <div class="space-y-3 sm:space-y-4">
            <div class="flex items-center space-x-1.5 sm:space-x-2">
              <div class="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <img src="../assets/icons/logo.svg" alt="" class="w-7 h-7">
            </div>
              <span class="text-xl sm:text-2xl font-bold">Bookit</span>
            </div>
            <p class="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Your gateway to luxury and comfortable living spaces. Experience the perfect stay with modern amenities.
            </p>
            <!-- Newsletter -->
            <div class="pt-1 sm:pt-2">
              <p class="text-xs sm:text-sm font-semibold mb-2">Subscribe to our newsletter</p>
              <div class="flex">
                <input type="email" placeholder="Enter your email"
                       class="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white text-gray-900 border border-gray-300 rounded-l-lg text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-500">
                <button class="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul class="space-y-2 sm:space-y-3">
              <li>
                <a href="#" class="text-xs sm:text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Services
                </a>
              </li>
              <li>
                <a href="#" class="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center group">
                  <svg class="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h4 class="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h4>
            <ul class="space-y-2 sm:space-y-3">
              <li class="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-400">
                <svg class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@bookit.com</span>
              </li>
              <li class="flex items-start space-x-3 text-sm text-gray-400">
                <svg class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+234 808 649 6404</span>
              </li>
              <li class="flex items-start space-x-3 text-sm text-gray-400">
                <svg class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Transcorp Hilton,<br>Abuja, Nigeria</span>
              </li>
            </ul>
          </div>

          <!-- Social Media -->
          <div>
            <h4 class="font-bold mb-4 text-base">Follow Us</h4>
            <p class="text-sm text-gray-400 mb-4">Stay connected with us on social media</p>
            <div class="flex space-x-3">
              <a href="#" class="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 group">
                <svg class="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-blue-400 transition-all duration-300 hover:scale-110 group">
                <svg class="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 group">
                <svg class="w-5 h-5 text-pink-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800">
        <div class="max-w-6xl mx-auto px-6 lg:px-8 py-6">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p class="text-sm text-gray-400">
              &copy; 2025 Bookit. All rights reserved.
            </p>
            <div class="flex space-x-6 text-sm text-gray-400">
              <a href="#" class="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" class="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" class="hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Booking Modal -->
    <BookingInfo
      v-model="showBookingModal"
      :room="selectedRoom"
      :checkIn="checkInDate"
      :checkOut="checkOutDate"
      @booking-complete="handleBookingComplete"
    />

    <!-- Image Gallery Modal -->
    <div v-if="showGallery" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50" @click="closeGallery">
      <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full" @click.stop>
        <!-- Close Button -->
        <button @click="closeGallery"
                class="absolute -top-2 -right-2 z-[70] w-7 h-7 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Main Image Container -->
        <div class="w-full bg-gray-50 rounded-t-lg overflow-hidden" style="height: 400px;">
          <img v-if="selectedRoom"
               :src="selectedRoom.images[currentImageIndex]"
               :alt="`${selectedRoom.type} - Image ${currentImageIndex + 1}`"
               class="w-full h-full object-cover">
        </div>

        <!-- Thumbnail Strip -->
        <div class="bg-white p-4 rounded-b-lg">
          <div class="grid grid-cols-4 gap-3">
            <button v-for="(image, index) in selectedRoom?.images"
                    :key="index"
                    @click="currentImageIndex = index"
                    class="w-full h-20 rounded-md overflow-hidden border-2 transition-all duration-200"
                    :class="currentImageIndex === index
                      ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2'
                      : 'border-gray-300 opacity-60 hover:opacity-100 hover:border-gray-400'">
              <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BookingInfo from '@/components/BookingInfo.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import apiService from '@/services/apiService'

const router = useRouter()

const scrolled = ref(false)
const selectedRoomType = ref('all')
const checkInDate = ref('')
const checkOutDate = ref('')
const selectedRoom = ref(null)
const showBookingModal = ref(false)
const showGallery = ref(false)
const currentImageIndex = ref(0)
const isSearching = ref(false)
const searchError = ref('')
const apiRooms = ref([])
const hasSearched = ref(false)

// Set default dates
onMounted(() => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 8)

  checkInDate.value = tomorrow.toISOString().split('T')[0]
  checkOutDate.value = nextWeek.toISOString().split('T')[0]

  window.addEventListener('scroll', handleScroll)

  // Load Paystack script
  const script = document.createElement('script')
  script.src = 'https://js.paystack.co/v1/inline.js'
  script.async = true
  document.head.appendChild(script)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const roomTypes = [
  { id: 'all', name: 'All room(5)' },
  { id: 'standard', name: 'Standard' },
  { id: 'luxury', name: 'Luxury' },
  { id: 'deluxe', name: 'Deluxe' }
]

const filteredRooms = computed(() => {
  // After a search, only show API rooms (even if empty)
  if (hasSearched.value) {
    if (selectedRoomType.value === 'all') {
      return apiRooms.value
    }
    return apiRooms.value.filter(room => room.type.toLowerCase() === selectedRoomType.value)
  }

  // Before search, return empty array (welcome state will show)
  return []
})

const navigateToLogin = (type) => {
  if (type === 'customer') {
    router.push({ name: 'customer-checkin' })
  } else if (type === 'staff') {
    router.push({ name: 'staff-login' })
  }
}

const searchRooms = async () => {
  // Validate dates
  if (!checkInDate.value || !checkOutDate.value) {
    searchError.value = 'Please select both check-in and check-out dates'
    return
  }

  if (new Date(checkOutDate.value) <= new Date(checkInDate.value)) {
    searchError.value = 'Check-out date must be after check-in date'
    return
  }

  isSearching.value = true
  searchError.value = ''

  try {
    const params = {
      checkInDate: checkInDate.value,
      checkOutDate: checkOutDate.value
    }

    // Add room type filter if not "all"
    if (selectedRoomType.value !== 'all') {
      params.roomType = selectedRoomType.value.toUpperCase()
    }

    const response = await apiService.searchRooms(params)
    console.log('Search response:', response.data)

    // Handle different response structures
    let roomsArray = []
    if (Array.isArray(response.data)) {
      roomsArray = response.data
    } else if (response.data?.rooms && Array.isArray(response.data.rooms)) {
      roomsArray = response.data.rooms
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      roomsArray = response.data.data
    } else {
      console.warn('Unexpected search response structure:', response.data)
      roomsArray = []
    }

    // Map API response to match our room structure
    apiRooms.value = roomsArray.map(room => ({
      id: room._id || room.id,
      type: room.type || room.roomType || 'Standard',
      code: room.roomNumber || room.code || 'N/A',
      price: room.pricePerNight || room.price || 0,
      available: room.isAvailable !== false && room.available !== false,
      amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : (room.amenities || room.description || 'AC, TV, WiFi'),
      image: room.images?.[0] || room.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80',
      images: room.images || [room.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80']
    }))

    hasSearched.value = true
  } catch (error) {
    console.error('Search error:', error)
    searchError.value = error.response?.data?.message || 'Failed to search rooms. Please try again.'
  } finally {
    isSearching.value = false
  }
}

const bookRoom = (room) => {
  if (room.available) {
    selectedRoom.value = room
    showBookingModal.value = true
  }
}

// eslint-disable-next-line no-unused-vars
const handleBookingComplete = (bookingData) => {
  console.log('Booking completed:', bookingData)
  // You can handle the booking completion here
  // For example, save to database, send confirmation email, etc.
  selectedRoom.value = null
}

const openGallery = (room) => {
  selectedRoom.value = room
  currentImageIndex.value = 0
  showGallery.value = true
  document.body.style.overflow = 'hidden'
}

const closeGallery = () => {
  showGallery.value = false
  selectedRoom.value = null
  currentImageIndex.value = 0
  document.body.style.overflow = ''
}
</script>

<style scoped>
/* Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #2563eb);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #1d4ed8);
}

/* Input focus styles */
input[type="date"]:focus {
  outline: none;
}

/* Date input custom styling */
.date-input {
  font-size: 16px !important; /* Prevents iOS zoom on focus */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  min-height: 44px;
  max-width: 100% !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Mobile-specific fixes for date inputs */
@media (max-width: 639px) {
  .date-input {
    font-size: 16px !important;
    padding-right: 8px !important;
  }
}

input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  filter: invert(0.5);
  padding: 2px;
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* Ensure date inputs don't overflow on mobile */
input[type="date"]::-webkit-datetime-edit {
  padding: 0;
}

input[type="date"]::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

input[type="date"]::-webkit-datetime-edit-text {
  padding: 0 2px;
}

input[type="date"]::-webkit-datetime-edit-month-field,
input[type="date"]::-webkit-datetime-edit-day-field,
input[type="date"]::-webkit-datetime-edit-year-field {
  padding: 0;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
