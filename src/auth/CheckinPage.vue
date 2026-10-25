<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Image with Text Overlay -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <!-- Slides Container -->
      <div class="absolute inset-0">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="absolute inset-0 transition-all duration-[1500ms] ease-in-out"
          :class="currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
        >
          <img
            :src="slide"
            alt="Hotel"
            class="w-full h-full object-cover"
          >
        </div>
      </div>

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/30 z-[5]"></div>

      <!-- Text Content -->
      <div class="absolute inset-0 flex flex-col justify-between p-12 z-10">
        <!-- Main Heading -->
        <div class="flex-1 flex items-center justify-center w-full">
          <h1 class="text-3xl font-bold text-white leading-tight drop-shadow-2xl text-center">
            Your Unforgettable Experience<br>Begins Here
          </h1>
        </div>

        <!-- Pagination Dots -->
        <div class="flex space-x-2 justify-center pb-8">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            class="w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none"
            :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
          ></button>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
      <div class="w-full max-w-md">
        <!-- Header with Logo -->
        <div class="flex items-center justify-center mb-8">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span class="text-2xl font-bold text-gray-900">Bookit</span>
          </div>
        </div>

        <!-- Welcome Section -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-blue-600 mb-2">Welcome</h2>
          <p class="text-sm text-gray-600">Enter your access code to check in</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Access Code Input -->
          <div>
            <label for="accessCode" class="block text-sm text-gray-700 mb-2">
              Access Code
            </label>
            <input
              id="accessCode"
              v-model="accessCode"
              type="text"
              placeholder="Enter Access Code"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            >
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <span v-if="isLoading">Checking...</span>
            <span v-else>Log in</span>
            <svg v-if="isLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>

    <!-- Error Modal -->
    <BaseModal v-model="showErrorModal" :dismissible="true">
      <div class="text-center space-y-3 sm:space-y-4">
        <!-- Error Icon -->
        <div class="flex justify-center">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <!-- Error Message -->
        <div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">{{ errorTitle }}</h3>
          <p class="text-xs sm:text-sm text-gray-600">{{ errorMessage }}</p>
        </div>

        <!-- Close Button -->
        <button @click="showErrorModal = false"
                class="w-full px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base">
          OK
        </button>
      </div>
    </BaseModal>

    <!-- OTP Verification Modal -->
    <BaseModal v-model="showOtpModal" :dismissible="!isVerifyingOtp">
      <div class="space-y-4 sm:space-y-6 text-center py-2">
        <!-- Email Icon -->
        <div class="flex justify-center">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
            </svg>
          </div>
        </div>

        <!-- Title and Subtitle -->
        <div>
          <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-1">Enter Verification Code</h2>
          <p class="text-xs sm:text-sm text-gray-500">We sent a 6-digit code to <span class="text-blue-600 font-medium break-all">{{ guestEmail }}</span></p>
        </div>

        <!-- OTP Input Fields -->
        <div class="flex justify-center gap-2 sm:gap-3">
          <input
            v-for="(digit, index) in otpCode"
            :key="index"
            :ref="el => otpInputRefs[index] = el"
            v-model="otpCode[index]"
            @input="handleOtpInput(index, $event)"
            @keydown="handleOtpKeydown(index, $event)"
            @paste="handleOtpPaste($event)"
            type="text"
            inputmode="numeric"
            maxlength="1"
            :disabled="isVerifyingOtp"
            class="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <!-- Error Message -->
        <p v-if="otpError" class="text-xs sm:text-sm text-red-600 font-medium">{{ otpError }}</p>

        <!-- Loading State -->
        <div v-if="isVerifyingOtp" class="flex items-center justify-center gap-2 text-blue-600">
          <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm font-medium">Verifying...</span>
        </div>

        <!-- Resend Code -->
        <div v-if="!isVerifyingOtp" class="text-xs sm:text-sm">
          <span class="text-gray-500">Didn't receive the code? </span>
          <button @click="resendOtp" :disabled="isResendingOtp" class="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50">
            {{ isResendingOtp ? 'Sending...' : 'Resend' }}
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '@/components/ui/BaseModal.vue'
import apiService from '@/services/apiService'

const router = useRouter()
const accessCode = ref('')
const currentSlide = ref(0)
const showErrorModal = ref(false)
const isLoading = ref(false)
const errorTitle = ref('Invalid Access Code')
const errorMessage = ref('Please enter a valid Access Code to continue.')
let slideInterval = null

// OTP Modal State
const showOtpModal = ref(false)
const otpCode = ref(['', '', '', '', '', ''])
const otpInputRefs = ref([])
const isVerifyingOtp = ref(false)
const isResendingOtp = ref(false)
const otpError = ref('')
const tempBookingData = ref(null)
const guestEmail = ref('')

const slides = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80'
]

const goToSlide = (index) => {
  currentSlide.value = index
  resetInterval()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const resetInterval = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  slideInterval = setInterval(nextSlide, 5000)
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})

// OTP Input Handlers
const handleOtpInput = (index, event) => {
  const value = event.target.value

  // Only allow digits
  if (!/^\d*$/.test(value)) {
    otpCode.value[index] = ''
    return
  }

  // Clear any previous error
  otpError.value = ''

  if (value.length === 1) {
    if (index < 5) {
      // Move to next input
      nextTick(() => {
        if (otpInputRefs.value[index + 1]) {
          otpInputRefs.value[index + 1].focus()
        }
      })
    } else {
      // Last digit entered, auto-verify
      nextTick(() => {
        const code = otpCode.value.join('')
        if (code.length === 6) {
          verifyOtp()
        }
      })
    }
  }
}

const handleOtpKeydown = (index, event) => {
  if (event.key === 'Backspace' && !otpCode.value[index] && index > 0) {
    // Move to previous input on backspace
    nextTick(() => {
      if (otpInputRefs.value[index - 1]) {
        otpInputRefs.value[index - 1].focus()
      }
    })
  }
}

const handleOtpPaste = (event) => {
  event.preventDefault()
  const pastedData = event.clipboardData.getData('text').trim()

  // Only process if it's a 6-digit number
  if (/^\d{6}$/.test(pastedData)) {
    otpCode.value = pastedData.split('')
    otpError.value = ''
    nextTick(() => {
      verifyOtp()
    })
  }
}

const verifyOtp = async () => {
  const code = otpCode.value.join('')

  if (code.length !== 6) {
    otpError.value = 'Please enter the complete 6-digit verification code.'
    return
  }

  isVerifyingOtp.value = true
  otpError.value = ''

  try {
    await apiService.verifyCheckinOtp({
      accessCode: accessCode.value.trim(),
      otp: code
    })

    // OTP verified successfully - store booking data and redirect
    sessionStorage.setItem('bookingData', JSON.stringify(tempBookingData.value))
    showOtpModal.value = false
    router.push('/customer-checkin/customer-automation-checkin')
  } catch (error) {
    console.error('OTP verification error:', error)
    otpError.value = error.response?.data?.message || 'Invalid verification code. Please try again.'
    // Clear OTP inputs for retry
    otpCode.value = ['', '', '', '', '', '']
    nextTick(() => {
      if (otpInputRefs.value[0]) {
        otpInputRefs.value[0].focus()
      }
    })
  } finally {
    isVerifyingOtp.value = false
  }
}

const resendOtp = async () => {
  isResendingOtp.value = true
  otpError.value = ''

  try {
    // Call lookup again to resend OTP
    const response = await apiService.checkInLookup({
      accessCode: accessCode.value.trim()
    })

    // Update temp booking data
    tempBookingData.value = response.data
    guestEmail.value = response.data?.booking?.email || response.data?.email || 'your email'

    // Reset OTP inputs
    otpCode.value = ['', '', '', '', '', '']
    nextTick(() => {
      if (otpInputRefs.value[0]) {
        otpInputRefs.value[0].focus()
      }
    })
  } catch (error) {
    console.error('Resend OTP error:', error)
    otpError.value = 'Failed to resend code. Please try again.'
  } finally {
    isResendingOtp.value = false
  }
}

const handleLogin = async () => {
  if (!accessCode.value.trim()) {
    errorTitle.value = 'Invalid Access Code'
    errorMessage.value = 'Please enter a valid Access Code to continue.'
    showErrorModal.value = true
    return
  }

  isLoading.value = true

  try {
    const response = await apiService.checkInLookup({
      accessCode: accessCode.value.trim()
    })

    // Store booking data temporarily
    tempBookingData.value = response.data

    // Extract guest email for display
    guestEmail.value = response.data?.booking?.email || response.data?.email || 'your email'

    // Reset OTP state and show modal
    otpCode.value = ['', '', '', '', '', '']
    otpError.value = ''
    showOtpModal.value = true

    // Focus first OTP input
    nextTick(() => {
      if (otpInputRefs.value[0]) {
        otpInputRefs.value[0].focus()
      }
    })
  } catch (error) {
    console.error('Check-in lookup error:', error)

    // Handle different error cases
    if (error.response?.status === 404) {
      errorTitle.value = 'Booking Not Found'
      errorMessage.value = 'We couldn\'t find a booking with this access code. Please check and try again.'
    } else if (error.response?.status === 400) {
      errorTitle.value = 'Invalid Request'
      errorMessage.value = error.response?.data?.message || 'Please enter a valid Access Code.'
    } else {
      errorTitle.value = 'Something Went Wrong'
      errorMessage.value = error.response?.data?.message || 'An error occurred while looking up your booking. Please try again.'
    }
    showErrorModal.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
