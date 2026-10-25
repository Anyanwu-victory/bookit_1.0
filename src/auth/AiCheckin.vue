<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Room Slider -->
    <div class="hidden lg:flex lg:w-1/2 overflow-hidden bg-gray-900 sticky top-0 h-screen">
      <!-- Slides Container -->
      <div class="absolute inset-0">
        <div
          v-for="(image, index) in roomSlides"
          :key="index"
          class="absolute inset-0 transition-all duration-700 ease-in-out"
          :class="currentSlide === index ? 'opacity-100' : 'opacity-0'"
        >
          <img
            :src="image"
            alt="Standard Room 102"
            class="w-full h-full object-cover"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        </div>
      </div>

      <!-- Content Overlay -->
      <div class="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-10">
        <!-- Room Info (Dynamic) -->
        <div class="flex-1 flex flex-col justify-end">
          <div class="space-y-4">
            <!-- Room Title -->
            <div>
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
                {{ bookingData?.room?.roomType || 'Standard' }} Room {{ bookingData?.room?.roomNumber || '' }}
              </h2>
              <p class="text-lg text-white/90">Comfortable & Elegant</p>
            </div>

            <!-- Room Features -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(amenity, index) in (bookingData?.room?.amenities || defaultAmenities)"
                :key="index"
                class="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
              >
                {{ amenity }}
              </span>
            </div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center gap-2 pb-4">
          <button
            v-for="(image, index) in roomSlides"
            :key="index"
            @click="goToSlide(index)"
            class="transition-all duration-300 rounded-full focus:outline-none"
            :class="currentSlide === index
              ? 'w-8 h-2 bg-white'
              : 'w-2 h-2 bg-white/50 hover:bg-white/70'"
          ></button>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button
        @click="previousSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Right Side - Service Request Panel -->
    <div class="w-full lg:w-1/2 flex flex-col bg-white">
      <!-- Header Section -->
      <div class="p-4 sm:p-6 md:p-8 border-b border-gray-200">
        <!-- Top Bar with Status and Notifications -->
        <div class="flex justify-between items-center mb-3 sm:mb-4">
          <!-- Back Button and Room Status -->
          <div class="flex items-center gap-2 sm:gap-3">
            <button
              @click="goBackToHome"
              class="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="text-xs sm:text-sm font-medium hidden xs:inline">Back</span>
            </button>
            <div class="w-px h-5 sm:h-6 bg-gray-200"></div>
            <!-- Room Status Indicator -->
            <span
              class="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold"
              :class="roomStatusStyles[roomStatus]"
            >
              <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" :class="roomStatusDot[roomStatus]"></span>
              {{ roomStatus }}
            </span>
          </div>

          <!-- Notification Button -->
          <div class="relative">
            <button
              @click="showNotifications = !showNotifications"
              class="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <!-- Notification Badge -->
              <span
                v-if="notificationCount > 0"
                class="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg"
              >
                {{ notificationCount > 99 ? '99+' : notificationCount }}
              </span>
            </button>

            <!-- Notifications Dropdown -->
            <div
              v-if="showNotifications"
              class="absolute right-0 top-12 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              <!-- Header -->
              <div class="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold">Notifications</h3>
                  <span class="text-xs bg-white/20 px-2 py-0.5 rounded-full">{{ notifications.length }} new</span>
                </div>
              </div>

              <!-- Notifications List -->
              <div class="max-h-80 overflow-y-auto">
                <div v-if="notifications.length === 0" class="p-6 text-center text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="text-sm">No notifications yet</p>
                </div>

                <div
                  v-for="(notification, index) in notifications"
                  :key="index"
                  class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div class="flex gap-3">
                    <!-- Icon based on type -->
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      :class="getNotificationIconClass(notification.type)"
                    >
                      <span class="text-lg">{{ getNotificationIcon(notification.type) }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900">{{ getNotificationTitle(notification.type) }}</p>
                      <p class="text-xs text-gray-600 mt-0.5 line-clamp-2">{{ notification.message }}</p>
                      <p class="text-xs text-gray-400 mt-1">{{ formatNotificationTime(notification.timestamp) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-4 py-2 bg-gray-50 border-t border-gray-100">
                <button
                  @click="showNotifications = false"
                  class="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
          <div>
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">
              Welcome, you are in room {{ bookingData?.room?.roomNumber || '---' }}
            </h2>
            <div class="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <span>Checked in: {{ formatDisplayDate(bookingData?.booking?.checkInDate) }}</span>
              <span>Check out: {{ formatDisplayDate(bookingData?.booking?.checkOutDate) }}</span>
            </div>
          </div>
          <span class="self-start px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
            {{ bookingData?.room?.roomType || 'Standard' }}
          </span>
        </div>

        <!-- Breadcrumb -->
        <div v-if="selectedCategory" class="mt-4 sm:mt-6 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            @click="goBack"
            class="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium group"
          >
            <svg class="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="hidden sm:inline">Room Service Request</span>
            <span class="sm:hidden">Back</span>
          </button>
          <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-semibold border border-blue-200 truncate max-w-[150px] sm:max-w-none">
            {{ selectedCategory }}
          </span>
        </div>
      </div>

      <!-- Service Request Section -->
      <div class="flex-1 p-4 sm:p-6 md:p-8 overflow-hidden overflow-y-auto">
        <!-- Category Selection -->
        <div v-if="!selectedCategory">
          <!-- AI Recommendations Section -->
          <div class="mb-4 sm:mb-6">
            <div class="flex items-center gap-2 mb-2 sm:mb-3">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <h3 class="text-base sm:text-lg font-semibold text-gray-900">Recommended For You</h3>
            </div>
            <p class="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Based on your previous stays and preferences</p>

            <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <button
                v-for="rec in recommendations"
                :key="rec.id"
                @click="handleRecommendation(rec)"
                class="group p-2.5 sm:p-3 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md text-left"
              >
                <div class="text-xl sm:text-2xl mb-1.5 sm:mb-2">{{ rec.icon }}</div>
                <h4 class="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{{ rec.title }}</h4>
                <p class="text-[10px] sm:text-xs text-gray-500 line-clamp-2">{{ rec.reason }}</p>
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="flex-1 h-px bg-gray-200"></div>
            <span class="text-[10px] sm:text-xs text-gray-400 font-medium whitespace-nowrap">OR BROWSE ALL SERVICES</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Room Service Request</h3>

          <div class="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              @click="selectCategory('Food & Beverage Request')"
              class="p-3 sm:p-4 bg-cyan-100 hover:bg-cyan-200 rounded-xl text-left transition-all duration-300 transform hover:scale-105"
            >
              <span class="text-xs sm:text-sm font-medium text-gray-900">Food & Beverage</span>
            </button>

            <button
              @click="selectCategory('Housekeeping Requests')"
              class="p-3 sm:p-4 bg-purple-100 hover:bg-purple-200 rounded-xl text-left transition-all duration-300 transform hover:scale-105"
            >
              <span class="text-xs sm:text-sm font-medium text-gray-900">Housekeeping</span>
            </button>

            <button
              @click="selectCategory('Bathroom & Toiletries')"
              class="p-3 sm:p-4 bg-teal-100 hover:bg-teal-200 rounded-xl text-left transition-all duration-300 transform hover:scale-105"
            >
              <span class="text-xs sm:text-sm font-medium text-gray-900">Bathroom & Toiletries</span>
            </button>

            <button
              @click="selectCategory('Other requests')"
              class="p-3 sm:p-4 bg-amber-100 hover:bg-amber-200 rounded-xl text-left transition-all duration-300 transform hover:scale-105"
            >
              <span class="text-xs sm:text-sm font-medium text-gray-900">Other requests</span>
            </button>
          </div>
        </div>

        <!-- Housekeeping Options -->
        <div v-else-if="selectedCategory === 'Housekeeping Requests'">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Room Service Request - Housekeeping
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              v-for="option in housekeepingOptions"
              :key="option"
              @click="selectOption(option)"
              :disabled="isSendingMessage"
              class="px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-300 bg-white text-gray-900 border-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- Food & Beverage Options -->
        <div v-else-if="selectedCategory === 'Food & Beverage Request'">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Room Service Request - Food & Beverage
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              v-for="option in foodBeverageOptions"
              :key="option"
              @click="selectOption(option)"
              :disabled="isSendingMessage"
              class="px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-300 bg-white text-gray-900 border-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- Bathroom & Toiletries Options -->
        <div v-else-if="selectedCategory === 'Bathroom & Toiletries'">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Room Service Request - Bathroom & Toiletries
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              v-for="option in bathroomOptions"
              :key="option"
              @click="selectOption(option)"
              :disabled="isSendingMessage"
              class="px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-300 bg-white text-gray-900 border-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- Other Requests -->
        <div v-else-if="selectedCategory === 'Other requests'">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Room Service Request - Other
          </h3>

          <textarea
            v-model="customRequest"
            rows="5"
            placeholder="Please describe your request..."
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            @keydown.ctrl.enter="handleCustomRequest"
          ></textarea>
          <button
            @click="handleCustomRequest"
            :disabled="!customRequest.trim() || isSendingMessage"
            class="mt-3 w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg text-sm font-medium transition-all duration-300"
          >
            {{ isSendingMessage ? 'Sending...' : 'Submit Request' }}
          </button>
        </div>
      </div>

      <!-- Chat Section -->
      <div class="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
        <div class="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <!-- Chat Messages -->
          <div class="mb-2 sm:mb-3 space-y-2 sm:space-y-3 max-h-36 sm:max-h-48 overflow-y-auto">
            <!-- Dynamic Chat Messages -->
            <template v-for="(msg, index) in chatMessages" :key="index">
              <!-- User Message -->
              <div class="flex items-end gap-1.5 sm:gap-2.5 justify-end animate-fade-in">
                <div class="flex flex-col items-end gap-0.5 sm:gap-1 max-w-[85%] sm:max-w-[75%]">
                  <div class="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl rounded-tr-md shadow-lg shadow-blue-500/20 backdrop-blur-sm">
                    <p class="text-xs sm:text-sm font-medium break-words">{{ msg.user }}</p>
                  </div>
                  <span class="text-[10px] sm:text-xs text-gray-400 px-1">{{ msg.time }}</span>
                </div>
                <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-500/30 ring-2 ring-white">
                  <span class="text-white text-[10px] sm:text-xs font-bold">GU</span>
                </div>
              </div>

              <!-- Bot Response (or Loading) -->
              <div class="flex items-start gap-1.5 sm:gap-2.5 animate-fade-in">
                <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 flex items-center justify-center shadow-md">
                  <span class="text-gray-700 text-[10px] sm:text-xs font-bold">AI</span>
                </div>
                <div class="flex flex-col gap-0.5 sm:gap-1 max-w-[85%] sm:max-w-[75%]">
                  <div class="bg-gray-100 text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl rounded-tl-md shadow-sm">
                    <p v-if="msg.bot" class="text-xs sm:text-sm font-medium break-words">{{ msg.bot }}</p>
                    <div v-else class="flex items-center gap-1">
                      <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
                      <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
                      <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
                    </div>
                  </div>
                  <span class="text-[10px] sm:text-xs text-gray-400 px-1">{{ msg.time }}</span>
                </div>
              </div>
            </template>
          </div>

          <!-- Chat Input -->
          <div class="relative">
            <div class="flex items-center gap-1.5 sm:gap-2 bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <button class="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-lg sm:rounded-xl hidden xs:block">
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <input
                v-model="chatMessage"
                type="text"
                placeholder="Type a message..."
                class="flex-1 px-2 py-2 sm:py-2.5 bg-transparent border-0 focus:outline-none text-xs sm:text-sm placeholder:text-gray-400"
                @keydown.enter="sendMessage"
              />
              <button
                @click="sendMessage"
                :disabled="!chatMessage.trim()"
                class="p-2 sm:p-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 disabled:shadow-none transform hover:scale-105 disabled:hover:scale-100"
              >
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <BaseModal v-model="showSuccessModal" :dismissible="true">
      <div class="text-center space-y-4">
        <div class="flex justify-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Request Submitted!</h3>
          <p class="text-sm text-gray-600">Your request has been sent to our staff. We'll attend to it shortly.</p>
        </div>
        <button
          @click="closeSuccessModal"
          class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          OK
        </button>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '@/components/ui/BaseModal.vue'
import apiService from '@/services/apiService'

const router = useRouter()

const selectedCategory = ref(null)
const selectedOptions = ref([])
const customRequest = ref('')
const chatMessage = ref('')
const showSuccessModal = ref(false)
const chatMessages = ref([])
const currentSlide = ref(0)
const showNotifications = ref(false)
const notificationCount = ref(0)
const notifications = ref([])
const roomStatus = ref('Checked In')
let slideInterval = null

// Booking data from sessionStorage
const bookingData = ref(null)

// Default amenities if none provided
const defaultAmenities = ['King Bed', 'Free WiFi', 'Smart TV', 'Mini Bar', 'Rain Shower', 'Work Desk']

// Format date for display
const formatDisplayDate = (dateString) => {
  if (!dateString) return '---'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Room status styling configurations
const roomStatusStyles = {
  'Available': 'bg-green-100 text-green-800 border border-green-200',
  'Occupied': 'bg-red-100 text-red-800 border border-red-200',
  'Checked In': 'bg-blue-100 text-blue-800 border border-blue-200',
  'Checked Out': 'bg-gray-100 text-gray-800 border border-gray-200',
  'Cleaning': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  'Maintenance': 'bg-orange-100 text-orange-800 border border-orange-200',
  'Inspection': 'bg-purple-100 text-purple-800 border border-purple-200'
}

const roomStatusDot = {
  'Available': 'bg-green-500',
  'Occupied': 'bg-red-500',
  'Checked In': 'bg-blue-500',
  'Checked Out': 'bg-gray-500',
  'Cleaning': 'bg-yellow-500',
  'Maintenance': 'bg-orange-500',
  'Inspection': 'bg-purple-500'
}

// Notification helper functions
const getNotificationIcon = (type) => {
  const icons = {
    'CHECK_IN_REMINDER': '🔔',
    'SERVICE_UPDATE': '🛎️',
    'CHECKOUT_REMINDER': '📅',
    'PROMOTION': '🎁',
    'ALERT': '⚠️'
  }
  return icons[type] || '📬'
}

const getNotificationIconClass = (type) => {
  const classes = {
    'CHECK_IN_REMINDER': 'bg-blue-100',
    'SERVICE_UPDATE': 'bg-green-100',
    'CHECKOUT_REMINDER': 'bg-orange-100',
    'PROMOTION': 'bg-purple-100',
    'ALERT': 'bg-red-100'
  }
  return classes[type] || 'bg-gray-100'
}

const getNotificationTitle = (type) => {
  const titles = {
    'CHECK_IN_REMINDER': 'Check-in Reminder',
    'SERVICE_UPDATE': 'Service Update',
    'CHECKOUT_REMINDER': 'Checkout Reminder',
    'PROMOTION': 'Special Offer',
    'ALERT': 'Alert'
  }
  return titles[type] || 'Notification'
}

const formatNotificationTime = (timestamp) => {
  if (!timestamp) return ''
  try {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

const roomSlides = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80'
]

const housekeepingOptions = [
  'Extra towels',
  'Extra pillows',
  'Extra blankets / duvet',
  'Bed sheet change',
  'Room cleaning',
  'Laundry pick-up',
  'Other'
]

const foodBeverageOptions = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Coffee/Tea',
  'Water',
  'Other'
]

const bathroomOptions = [
  'Shampoo',
  'Soap',
  'Toothbrush',
  'Toothpaste',
  'Toilet paper',
  'Other'
]

// AI Recommendations from API
const recommendations = ref([])

// Get icon based on category
const getCategoryIcon = (category) => {
  const icons = {
    'HOUSEKEEPING': '🛏️',
    'ROOM_SERVICE': '🍽️',
    'CONCIERGE': '🛎️',
    'FOOD_BEVERAGE': '☕',
    'MAINTENANCE': '🔧',
    'SPA': '💆',
    'TRANSPORT': '🚗'
  }
  return icons[category] || '✨'
}

const handleRecommendation = async (rec) => {
  const message = rec.preFilledMessage || rec.title
  await sendChatToAI(message)
}

const selectCategory = (category) => {
  selectedCategory.value = category
  selectedOptions.value = []
  customRequest.value = ''
}

const goBack = () => {
  selectedCategory.value = null
  selectedOptions.value = []
  customRequest.value = ''
}

// Slider navigation functions
const goToSlide = (index) => {
  currentSlide.value = index
  resetSlideInterval()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % roomSlides.length
  resetSlideInterval()
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? roomSlides.length - 1 : currentSlide.value - 1
  resetSlideInterval()
}

const resetSlideInterval = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  slideInterval = setInterval(nextSlide, 5000)
}

// Send chat message to AI
const isSendingMessage = ref(false)
const isLoadingHistory = ref(false)

// Load chat history from API
const loadChatHistory = async () => {
  const bookingId = bookingData.value?.booking?.id
  console.log('Loading chat history for bookingId:', bookingId)
  if (!bookingId) {
    console.warn('No bookingId available to load chat history')
    return
  }

  isLoadingHistory.value = true
  try {
    const response = await apiService.getChatHistory(bookingId)
    console.log('Chat history API response:', response.data)

    // API returns conversationHistory with alternating user/assistant messages
    const conversationHistory = response.data?.conversationHistory || []
    console.log('Extracted conversationHistory:', conversationHistory)

    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      // Group messages into pairs (user + assistant)
      const pairedMessages = []
      for (let i = 0; i < conversationHistory.length; i += 2) {
        const userMsg = conversationHistory[i]
        const assistantMsg = conversationHistory[i + 1]

        if (userMsg && userMsg.role === 'user') {
          pairedMessages.push({
            user: userMsg.message,
            bot: assistantMsg?.message || null,
            time: formatMessageTime(userMsg.timestamp)
          })
        }
      }

      chatMessages.value = pairedMessages
      console.log('Loaded chat history from API:', chatMessages.value.length, chatMessages.value)
    } else {
      console.log('No chat history found or empty array')
    }
  } catch (error) {
    console.error('Error loading chat history:', error.response?.data || error.message || error)
  } finally {
    isLoadingHistory.value = false
  }
}

// Format timestamp for display
const formatMessageTime = (timestamp) => {
  try {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  } catch {
    return ''
  }
}

const sendChatToAI = async (message) => {
  if (!message || isSendingMessage.value) return

  const bookingId = bookingData.value?.booking?.id
  if (!bookingId) {
    console.error('No bookingId available for chat')
    return
  }

  isSendingMessage.value = true
  const time = getCurrentTime()

  // Add user message to chat immediately
  chatMessages.value.push({
    user: message,
    bot: null,
    time: time
  })

  try {
    const response = await apiService.sendChatMessage({
      message: message,
      bookingId: bookingId
    })

    console.log('AI Chat response:', response.data)

    // Update the last message with bot response
    const lastIndex = chatMessages.value.length - 1
    if (lastIndex >= 0) {
      chatMessages.value[lastIndex].bot = response.data?.response || response.data?.message || 'Thank you for your request. Our team will assist you shortly.'
    }
  } catch (error) {
    console.error('Error sending chat message:', error)
    // Update with error message
    const lastIndex = chatMessages.value.length - 1
    if (lastIndex >= 0) {
      chatMessages.value[lastIndex].bot = 'Sorry, I couldn\'t process your request. Please try again or contact the front desk.'
    }
  } finally {
    isSendingMessage.value = false
  }
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)

  // Load booking data from sessionStorage
  const storedData = sessionStorage.getItem('bookingData')
  console.log('Raw sessionStorage data:', storedData)

  if (storedData) {
    try {
      bookingData.value = JSON.parse(storedData)
      console.log('Parsed booking data:', bookingData.value)

      // Load chat history from API for this booking
      loadChatHistory()

      // Update notifications from booking data
      if (bookingData.value?.notifications && bookingData.value.notifications.length > 0) {
        notifications.value = bookingData.value.notifications
        notificationCount.value = bookingData.value.notifications.length
        console.log('Loaded notifications:', notifications.value)
      }

      // Populate recommendations from API response
      if (bookingData.value?.recommendations && bookingData.value.recommendations.length > 0) {
        recommendations.value = bookingData.value.recommendations.map((rec, index) => ({
          id: index + 1,
          icon: getCategoryIcon(rec.category),
          title: rec.title,
          reason: rec.reason,
          category: rec.category,
          preFilledMessage: rec.preFilledMessage,
          confidence: rec.confidence
        }))
        console.log('Loaded recommendations:', recommendations.value)
      }
    } catch (error) {
      console.error('Error parsing booking data:', error)
    }
  } else {
    // No booking data, redirect back to check-in page
    console.warn('No booking data found, redirecting to check-in page')
    router.push('/guest-checkin')
  }
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})

const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

const selectOption = async (option) => {
  const category = selectedCategory.value
  const message = `${category}: ${option}`

  // Reset to category selection for next request
  selectedCategory.value = null
  selectedOptions.value = []

  // Send to AI chat
  await sendChatToAI(message)
}

const handleCustomRequest = async () => {
  if (customRequest.value.trim()) {
    const message = customRequest.value.trim()

    // Reset for next request
    selectedCategory.value = null
    customRequest.value = ''

    // Send to AI chat
    await sendChatToAI(message)
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  goBack()
}

const sendMessage = async () => {
  if (chatMessage.value.trim() && !isSendingMessage.value) {
    const message = chatMessage.value.trim()
    chatMessage.value = ''
    await sendChatToAI(message)
  }
}

const goBackToHome = () => {
  router.back()
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
