<template>
  <aside :class="[
    'fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40',
    isSidebarOpen ? 'w-64' : 'w-20'
  ]">
    <!-- Logo -->
    <div class="h-20 flex items-center justify-between px-4 border-b border-gray-200 mt-8">
      <router-link to="/" class="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
          <img :src="BookitLogo" alt="bookit" class="w-full h-full object-contain"/>
        </div>
        <span v-show="isSidebarOpen" class="text-xl font-bold text-gray-900">BookIt</span>
      </router-link>
    </div>

    <!-- Dashboard Section Title -->
    <div class="px-4 pt-6 pb-2">
      <h2 v-show="isSidebarOpen" class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dashboard</h2>
    </div>

    <!-- Navigation -->
    <nav class="px-4 space-y-2">
      <button
        v-for="tab in availableTabs"
        :key="tab.id"
        @click="$emit('tab-change', tab.id)"
        :class="[
          'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
          activeTab === tab.id
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-gray-100'
        ]"
      >
        <component :is="tab.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-show="isSidebarOpen" class="font-medium">{{ tab.name }}</span>
        <span v-if="tab.badge && isSidebarOpen" class="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
          {{ tab.badge }}
        </span>
      </button>
    </nav>

    <!-- Toggle Button -->
    <button
      @click="$emit('toggle-sidebar')"
      class="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
    >
      <svg
        class="w-4 h-4 text-gray-600 transition-transform"
        :class="{ 'rotate-180': !isSidebarOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import BookitLogo from '@/assets/images/BookitLogo.png'

defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  },
  availableTabs: {
    type: Array,
    required: true
  }
})

defineEmits(['toggle-sidebar', 'tab-change'])
</script>
