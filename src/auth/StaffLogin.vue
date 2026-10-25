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
            :src="slide.image"
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
          <h1 class="text-3xl font-bold text-white leading-tight relative drop-shadow-2xl text-center w-full">
            <span
              v-for="(slide, index) in slides"
              :key="index"
              class="transition-all duration-[1500ms] ease-in-out absolute inset-0 flex items-center justify-center"
              :class="currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
              v-html="slide.text"
            ></span>
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
        <!-- Welcome Section -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-blue-600 mb-2">Welcome</h2>
          <p class="text-sm text-gray-600">Enter your credentials</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="staffId"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            >
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <!-- Eye Open Icon (password hidden) -->
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <!-- Eye Closed Icon (password visible) -->
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Logging in...' : 'Log in' }}
          </button>
        </form>


        <!-- Base Modal for Messages -->
        <BaseModal
          v-model="showModal"
          :dismissible="modalType !== 'success'"
        >
          <div class="text-center py-2">
            <!-- Success State with Loader -->
            <div v-if="modalType === 'success'" class="space-y-4">
              <!-- Animated Success Icon -->
              <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4 animate-pulse-soft">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <!-- Title -->
              <h3 class="text-lg font-semibold text-gray-900">Login Successful!</h3>
              <!-- Redirecting Loader -->
              <div class="flex flex-col items-center gap-3">
                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="text-sm font-medium">Redirecting to dashboard...</span>
                </div>
                <!-- Progress bar -->
                <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full animate-progress"></div>
                </div>
              </div>
            </div>

            <!-- Error State -->
            <div v-else class="space-y-3">
              <!-- Error Icon -->
              <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <!-- Title -->
              <h3 class="text-lg font-semibold text-gray-900">Login Failed</h3>
              <!-- Message -->
              <p class="text-sm text-gray-600">{{ modalMessage }}</p>
              <!-- Try Again Button -->
              <button
                @click="showModal = false"
                class="mt-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </BaseModal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseModal from '@/components/ui/BaseModal.vue'

const router = useRouter()
const authStore = useAuthStore()

const staffId = ref('')
const password = ref('')
const showPassword = ref(false)
const currentSlide = ref(0)
const isLoading = ref(false)
const showModal = ref(false)
const modalType = ref('error') // 'error' or 'success'
const modalMessage = ref('')
let slideInterval = null

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    text: 'Your Unforgettable Experience<br>Begins Here'
  },
  {
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
    text: 'Luxury Comfort Awaits<br>Your Arrival'
  },
  {
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
    text: 'Create Memorable<br>Moments With Us'
  },
  {
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
    text: 'Your Perfect Stay<br>Starts Now'
  }
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

  // Check if user is already logged in
  if (authStore.isAuthenticated) {
    router.push({ name: 'dashboard' })
  }
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})

const showErrorMessage = (message) => {
  modalType.value = 'error'
  modalMessage.value = message
  showModal.value = true
}

const showSuccessMessage = (message) => {
  modalType.value = 'success'
  modalMessage.value = message
  showModal.value = true
}

const handleLogin = async () => {
  // Clear previous modal
  showModal.value = false

  // Validate inputs
  if (!staffId.value.trim()) {
    showErrorMessage('Please enter your Email')
    return
  }

  if (!password.value.trim()) {
    showErrorMessage('Please enter your password')
    return
  }

  isLoading.value = true

  try {
    // Use authStore.login (API) which handles token/user storage
    await authStore.login(staffId.value.trim(), password.value.trim())

    // Show success message
    showSuccessMessage('Login successful! Redirecting...')

    // Route to unified dashboard after a brief delay
    setTimeout(() => {
      router.push({ name: 'dashboard' })
    }, 1000)
  } catch (error) {
    console.warn('API login failed:', error)
    showErrorMessage(error.message || error.response?.data?.message || 'Invalid credentials')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Soft pulse animation for success icon */
@keyframes pulse-soft {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse-soft {
  animation: pulse-soft 2s ease-in-out infinite;
}

/* Progress bar animation */
@keyframes progress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.animate-progress {
  animation: progress 1s ease-out forwards;
}
</style>
