import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '@/services/apiService'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)


  // Getters
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isStaff = computed(() => user.value?.role === 'staff')
  const currentUser = computed(() => user.value)

  // Actions
  const login = async (email, password) => {
    try {
      // Call API login endpoint
      const response = await apiService.login({ email, password })

      if (response.data) {
        const { user: userData, accessToken, token } = response.data

        // Use accessToken if available, otherwise fall back to token
        const authToken = accessToken || token

        // Normalize user role to lowercase for consistent comparison
        const normalizedUser = {
          ...userData,
          role: userData.role?.toLowerCase()
        }

        console.log('Login successful - User role:', normalizedUser.role)
        console.log('Normalized user:', normalizedUser)

        // Set user and authentication state
        user.value = normalizedUser
        isAuthenticated.value = true

        // Save to localStorage
        localStorage.setItem('auth_user', JSON.stringify(normalizedUser))
        localStorage.setItem('auth_token', authToken)

        return normalizedUser
      } else {
        throw new Error(response.data?.message || 'Login failed')
      }
    } catch (error) {
      // Handle API errors
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      } else if (error.message) {
        throw new Error(error.message)
      } else {
        throw new Error('Invalid email or password')
      }
    }
  }


  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }

  const restoreSession = () => {
    const savedUser = localStorage.getItem('auth_user')
    const token = localStorage.getItem('auth_token')

    if (savedUser && token) {
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
      return true
    }
    return false
  }

  return {
    // State
    user,
    isAuthenticated,

    // Getters
    isAdmin,
    isStaff,
    currentUser,

    // Actions
    login,
    logout,
    restoreSession
  }
})
