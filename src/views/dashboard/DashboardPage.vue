<template>
  <div class="min-h-screen bg-white">
    <!-- Sidebar Component -->
    <DashboardSidebar
      :is-sidebar-open="isSidebarOpen"
      :active-tab="activeTab"
      :available-tabs="availableTabs"
      @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
      @tab-change="activeTab = $event"
    />

    <!-- Main Content -->
    <div :class="['transition-all duration-300', isSidebarOpen ? 'ml-64' : 'ml-20']">
      <!-- Top Bar -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div class="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <!-- Top Row: Search on left, Notification & Profile on right -->
          <div class="flex items-center justify-between gap-2 sm:gap-4">
            <!-- Search - Left Side -->
            <div class="relative flex-1 max-w-[180px] sm:max-w-xs md:max-w-md">
              <input
                type="text"
                placeholder="Search..."
                class="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-2 sm:left-3 top-2 sm:top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Notification & Profile - Right Side -->
            <div class="flex items-center space-x-1 sm:space-x-3">
              <!-- Notifications -->
              <button class="relative p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span class="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
              </button>

              <!-- User Profile -->
              <div class="relative">
                <button
                  @click="showProfileMenu = !showProfileMenu"
                  class="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <img
                    :src="authStore.currentUser?.avatar || Avatar"
                    :alt="authStore.currentUser?.name"
                    class="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div class="text-left hidden md:block">
                    <p class="text-xs sm:text-sm font-medium text-gray-900">{{ authStore.currentUser?.name }}</p>
                    <p class="text-[10px] sm:text-xs text-gray-500 capitalize">{{ authStore.currentUser?.role }}</p>
                  </div>
                  <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
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
                    v-if="showProfileMenu"
                    class="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                  >
                    <div class="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
                      <p class="text-xs sm:text-sm font-medium text-gray-900 truncate">{{ authStore.currentUser?.name }}</p>
                      <p class="text-[10px] sm:text-xs text-gray-500 truncate">{{ authStore.currentUser?.email }}</p>
                    </div>
                    <a href="#" class="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">Profile Settings</a>
                    <a href="#" class="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">Preferences</a>
                    <div class="border-t border-gray-200"></div>
                    <button
                      @click="handleLogout"
                      class="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Bottom Row: Date below notification & profile (aligned right) -->
          <div class="flex justify-end mt-4 sm:mt-6 md:mt-10">
            <span class="text-[10px] sm:text-xs md:text-sm text-gray-500">{{ currentDate }}</span>
          </div>
        </div>
      </header>

      <!-- Tab Content -->
      <main class="p-4 sm:p-6">
        <component :is="currentTabComponent" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'

// Import tab components
import DashboardTab from '@/components/dashboard/DashboardTab.vue'
import RoomsTab from '@/components/dashboard/RoomsTab.vue'
import GuestTab from '@/components/dashboard/GuestTab.vue'
import RequestsTab from '@/components/dashboard/RequestsTab.vue'
import StaffTab from '@/components/dashboard/StaffTab.vue'
import RateTab from '@/components/dashboard/RateTab.vue'
import Avatar from '@/assets/images/staff_profile.png';
import SatisfactionTab from '@/components/dashboard/SatisfactionTab.vue'


const router = useRouter()
const authStore = useAuthStore()

const isSidebarOpen = ref(true)
const activeTab = ref('dashboard')
const showProfileMenu = ref(false)

// Tab definitions with icons
const tabs = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    component: DashboardTab,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: '#1366D9',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M2.25 12.0001L11.204 3.04507C11.644 2.60607 12.356 2.60607 12.795 3.04507L21.75 12.0001M4.5 9.75007V19.8751C4.5 20.4961 5.004 21.0001 5.625 21.0001H9.75V16.1251C9.75 15.5041 10.254 15.0001 10.875 15.0001H13.125C13.746 15.0001 14.25 15.5041 14.25 16.1251V21.0001H18.375C18.996 21.0001 19.5 20.4961 19.5 19.8751V9.75007M8.25 21.0001H16.5'
      })
    ])
  },
  {
    id: 'rooms',
    name: 'Rooms',
    component: RoomsTab,
    adminOnly: true,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: '#5D6679',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M17.593 3.32206C18.693 3.45006 19.5 4.39906 19.5 5.50706V21.0001L12 17.2501L4.5 21.0001V5.50706C4.5 4.39906 5.306 3.45006 6.407 3.32206C10.1232 2.89069 13.8768 2.89069 17.593 3.32206Z'
      })
    ])
  },
  {
    id: 'guest',
    name: 'Guest',
    component: GuestTab,
    adminOnly: true,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: '#5D6679',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M11.35 3.836C11.285 4.046 11.25 4.269 11.25 4.5C11.25 4.914 11.586 5.25 12 5.25H16.5C16.6989 5.25 16.8897 5.17098 17.0303 5.03033C17.171 4.88968 17.25 4.69891 17.25 4.5C17.2501 4.27491 17.2164 4.05109 17.15 3.836M11.35 3.836C11.492 3.3767 11.7774 2.97493 12.1643 2.68954C12.5511 2.40414 13.0192 2.25011 13.5 2.25H15C16.012 2.25 16.867 2.918 17.15 3.836M11.35 3.836C10.974 3.859 10.6 3.886 10.226 3.916C9.095 4.01 8.25 4.973 8.25 6.108V8.25M17.15 3.836C17.526 3.859 17.9 3.886 18.274 3.916C19.405 4.01 20.25 4.973 20.25 6.108V16.5C20.25 17.0967 20.0129 17.669 19.591 18.091C19.169 18.5129 18.5967 18.75 18 18.75H15.75M8.25 8.25H4.875C4.254 8.25 3.75 8.754 3.75 9.375V20.625C3.75 21.246 4.254 21.75 4.875 21.75H14.625C15.246 21.75 15.75 21.246 15.75 20.625V18.75M8.25 8.25H14.625C15.246 8.25 15.75 8.754 15.75 9.375V18.75M7.5 15.75L9 17.25L12 13.5'
      })
    ])
  },
  {
    id: 'requests',
    name: 'Requests',
    component: RequestsTab,
    adminOnly: true,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: '#5D6679',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M3 13V8H21V13C21 16.771 21 18.657 19.828 19.828C18.656 20.999 16.771 21 13 21H11C7.229 21 5.343 21 4.172 19.828C3.001 18.656 3 16.771 3 13Z'
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M3 8L3.865 6.077C4.537 4.585 4.872 3.84 5.552 3.42C6.232 3 7.105 3 8.85 3H15.15C16.895 3 17.767 3 18.448 3.42C19.128 3.84 19.463 4.585 20.135 6.077L21 8M12 8V3'
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M8.5 13.5H14C14.5304 13.5 15.0391 13.7107 15.4142 14.0858C15.7893 14.4609 16 14.9696 16 15.5C16 16.0304 15.7893 16.5391 15.4142 16.9142C15.0391 17.2893 14.5304 17.5 14 17.5H13M10 11.5L8 13.5L10 15.5'
      })
    ])
  },
  {
    id: 'staff',
    name: 'Staff',
    component: StaffTab,
    adminOnly: true,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
      })
    ])
  },
  {
    id: 'rate',
    name: 'Rate',
    component: RateTab,
    adminOnly: true,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  },
  {
    id: 'satisfaction',
    name: 'Guest Analysis',
    component: SatisfactionTab,
    adminOnly: true,
    icon: h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M9.568 3H5.25C4.65326 3 4.08097 3.23705 3.65901 3.65901C3.23705 4.08097 3 4.65326 3 5.25V9.568C3 10.165 3.237 10.738 3.659 11.159L13.24 20.74C13.939 21.439 15.02 21.612 15.847 21.07C17.9286 19.7066 19.7066 17.9286 21.07 15.847C21.612 15.02 21.439 13.939 20.74 13.24L11.16 3.66C10.951 3.45077 10.7029 3.28478 10.4297 3.17154C10.1565 3.05829 9.86371 3 9.568 3Z'
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '1.5',
        d: 'M6 6H6.008V6.008H6V6Z'
      })
    ])
  },
  
]

// Filter tabs based on user role
const availableTabs = computed(() => {
  return tabs.filter(tab => {
    if (tab.adminOnly) {
      return authStore.isAdmin
    }
    return true
  })
})

const currentTabComponent = computed(() => {
  const tab = tabs.find(t => t.id === activeTab.value)
  return tab ? tab.component : DashboardTab
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'staff-login' })
}

onMounted(() => {
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    const restored = authStore.restoreSession()
    if (!restored) {
      router.push({ name: 'staff-login' })
    }
  }
})
</script>
