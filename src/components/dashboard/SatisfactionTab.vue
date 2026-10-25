<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Avg Satisfaction -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Avg Satisfaction</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.avgSatisfaction }}%</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Guests -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Active Guests</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.activeGuests }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Healthy -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Healthy</p>
            <p class="text-2xl font-bold text-green-600">{{ stats.healthy }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- At Risk -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">At Risk</p>
            <p class="text-2xl font-bold text-yellow-600">{{ stats.atRisk }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Critical -->
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Critical</p>
            <p class="text-2xl font-bold text-red-600">{{ stats.critical }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Satisfaction Trend Chart -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Overall Guest Satisfaction Trend</h3>
        <div class="flex space-x-2">
          <button
            v-for="period in timePeriods"
            :key="period.value"
            @click="selectedPeriod = period.value"
            :class="[
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
              selectedPeriod === period.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ period.label }}
          </button>
        </div>
      </div>

      <!-- Chart Area -->
      <div class="h-64 relative">
        <svg class="w-full h-full" viewBox="0 0 800 250" preserveAspectRatio="none">
          <!-- Grid lines -->
          <g class="text-gray-200">
            <line x1="50" y1="25" x2="780" y2="25" stroke="currentColor" stroke-dasharray="4" />
            <line x1="50" y1="75" x2="780" y2="75" stroke="currentColor" stroke-dasharray="4" />
            <line x1="50" y1="125" x2="780" y2="125" stroke="currentColor" stroke-dasharray="4" />
            <line x1="50" y1="175" x2="780" y2="175" stroke="currentColor" stroke-dasharray="4" />
            <line x1="50" y1="225" x2="780" y2="225" stroke="currentColor" />
          </g>

          <!-- Y-axis labels -->
          <g class="text-gray-500 text-xs">
            <text x="40" y="30" text-anchor="end" fill="currentColor">100%</text>
            <text x="40" y="80" text-anchor="end" fill="currentColor">75%</text>
            <text x="40" y="130" text-anchor="end" fill="currentColor">50%</text>
            <text x="40" y="180" text-anchor="end" fill="currentColor">25%</text>
            <text x="40" y="230" text-anchor="end" fill="currentColor">0%</text>
          </g>

          <!-- Trend line -->
          <path
            :d="trendLinePath"
            fill="none"
            stroke="#3B82F6"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <!-- Area fill -->
          <path
            :d="trendAreaPath"
            fill="url(#gradient)"
            opacity="0.3"
          />

          <!-- Gradient definition -->
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3B82F6" />
              <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
            </linearGradient>
          </defs>

          <!-- Data points -->
          <g v-for="(point, index) in trendData" :key="index">
            <circle
              :cx="getPointX(index)"
              :cy="getPointY(point.value)"
              r="5"
              fill="#3B82F6"
              class="cursor-pointer hover:r-7 transition-all"
            />
          </g>

          <!-- X-axis labels -->
          <g class="text-gray-500 text-xs">
            <text
              v-for="(point, index) in trendData"
              :key="index"
              :x="getPointX(index)"
              y="245"
              text-anchor="middle"
              fill="currentColor"
            >
              {{ point.label }}
            </text>
          </g>
        </svg>
      </div>
    </div>

    <!-- All Guests Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">All Guests</h3>
          <div class="flex items-center space-x-3">
            <!-- Search -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search guests..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Status Filter -->
            <select
              v-model="statusFilter"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="at-risk">At Risk</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <BaseLoader v-if="isLoading" />

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full min-w-[900px]">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50">
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Guest</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Score</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trend</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Current Issue</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Event</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredGuests.length === 0" class="border-b border-gray-100">
              <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                No guests found
              </td>
            </tr>
            <tr
              v-else
              v-for="guest in paginatedGuests"
              :key="guest.id"
              class="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              @click="openGuestModal(guest)"
            >
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-600">{{ getInitials(guest.name) }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ guest.name }}</p>
                    <p class="text-xs text-gray-500">Room {{ guest.room }} - Floor {{ guest.floor }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      :class="[
                        'h-full rounded-full',
                        getScoreColor(guest.score)
                      ]"
                      :style="{ width: `${guest.score}%` }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ guest.score }}%</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-1">
                  <svg
                    :class="[
                      'w-4 h-4',
                      guest.trend === 'up' ? 'text-green-500' : guest.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                    ]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      v-if="guest.trend === 'up'"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                    <path
                      v-else-if="guest.trend === 'down'"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                    <path
                      v-else
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                  <span :class="[
                    'text-sm',
                    guest.trend === 'up' ? 'text-green-600' : guest.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                  ]">
                    {{ guest.trendValue }}%
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="getStatusBadgeClass(guest.status)">
                  {{ guest.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ guest.currentIssue || '-' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ guest.lastEvent }}
              </td>
              <td class="px-6 py-4">
                <button
                  @click.stop="openGuestModal(guest)"
                  class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 0" class="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div class="flex space-x-2">
          <button
            v-for="page in displayedPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'w-8 h-8 rounded text-sm font-medium transition',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Guest Detail Modal -->
    <BaseModal v-model="showGuestModal" size="xl" :dismissible="true">
      <div v-if="selectedGuest" class="space-y-6">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <div class="flex items-center space-x-4">
            <div class="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-lg font-medium text-gray-600">{{ getInitials(selectedGuest.name) }}</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ selectedGuest.name }}</h3>
              <p class="text-sm text-gray-500">Room {{ selectedGuest.room }} - Floor {{ selectedGuest.floor }}</p>
            </div>
          </div>
          <span :class="getStatusBadgeClass(selectedGuest.status)">
            {{ selectedGuest.status }}
          </span>
        </div>

        <!-- Scores Row -->
        <div class="grid grid-cols-2 gap-6">
          <!-- Current Satisfaction Score -->
          <div class="bg-gray-50 rounded-xl p-6">
            <p class="text-sm text-gray-500 mb-2">Satisfaction Score</p>
            <div class="flex items-center space-x-4">
              <div class="relative w-24 h-24">
                <svg class="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#E5E7EB"
                    stroke-width="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    :stroke="getScoreColorHex(selectedGuest.score)"
                    stroke-width="8"
                    fill="none"
                    :stroke-dasharray="`${selectedGuest.score * 2.51} 251`"
                    stroke-linecap="round"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl font-bold text-gray-900">{{ selectedGuest.score }}%</span>
                </div>
              </div>
              <div class="flex items-center space-x-1">
                <svg
                  :class="[
                    'w-5 h-5',
                    selectedGuest.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  ]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="selectedGuest.trend === 'up'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span :class="[
                  'text-lg font-medium',
                  selectedGuest.trend === 'up' ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ selectedGuest.trendValue }}%
                </span>
              </div>
            </div>
          </div>

          <!-- Predicted Checkout Score -->
          <div class="bg-gray-50 rounded-xl p-6">
            <p class="text-sm text-gray-500 mb-2">Predicted Checkout Score</p>
            <div class="flex items-center space-x-4">
              <div class="relative w-24 h-24">
                <svg class="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#E5E7EB"
                    stroke-width="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    :stroke="getScoreColorHex(selectedGuest.predictedScore)"
                    stroke-width="8"
                    fill="none"
                    :stroke-dasharray="`${selectedGuest.predictedScore * 2.51} 251`"
                    stroke-linecap="round"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl font-bold text-gray-900">{{ selectedGuest.predictedScore }}%</span>
                </div>
              </div>
              <p class="text-sm text-gray-500">Based on current trend</p>
            </div>
          </div>
        </div>

        <!-- Satisfaction Timeline -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h4 class="text-sm font-semibold text-gray-700 mb-4">Satisfaction Timeline</h4>
          <div class="h-32">
            <svg class="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
              <!-- Grid lines -->
              <g class="text-gray-300">
                <line x1="0" y1="30" x2="600" y2="30" stroke="currentColor" stroke-dasharray="4" />
                <line x1="0" y1="60" x2="600" y2="60" stroke="currentColor" stroke-dasharray="4" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="currentColor" stroke-dasharray="4" />
              </g>

              <!-- Timeline line -->
              <path
                :d="getTimelinePath(selectedGuest.timeline)"
                fill="none"
                stroke="#3B82F6"
                stroke-width="2"
                stroke-linecap="round"
              />

              <!-- Data points -->
              <g v-for="(point, index) in selectedGuest.timeline" :key="index">
                <circle
                  :cx="index * (600 / (selectedGuest.timeline.length - 1))"
                  :cy="120 - (point.value * 1.1)"
                  r="4"
                  fill="#3B82F6"
                />
              </g>
            </svg>
          </div>
        </div>

        <!-- Score Breakdown -->
        <div>
          <h4 class="text-sm font-semibold text-gray-700 mb-4">Score Breakdown</h4>
          <div class="space-y-3">
            <div v-for="factor in selectedGuest.scoreBreakdown" :key="factor.name" class="flex items-center justify-between">
              <div class="flex items-center space-x-3 flex-1">
                <span class="text-sm text-gray-600 w-40">{{ factor.name }}</span>
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    :class="[
                      'h-full rounded-full',
                      factor.impact > 0 ? 'bg-green-500' : factor.impact < 0 ? 'bg-red-500' : 'bg-gray-400'
                    ]"
                    :style="{ width: `${Math.abs(factor.impact)}%` }"
                  ></div>
                </div>
              </div>
              <span :class="[
                'text-sm font-medium w-16 text-right',
                factor.impact > 0 ? 'text-green-600' : factor.impact < 0 ? 'text-red-600' : 'text-gray-500'
              ]">
                {{ factor.impact > 0 ? '+' : '' }}{{ factor.impact }}%
              </span>
            </div>
          </div>
        </div>

        <!-- Event Timeline -->
        <div>
          <h4 class="text-sm font-semibold text-gray-700 mb-4">Event Timeline</h4>
          <div class="space-y-4">
            <div
              v-for="(event, index) in selectedGuest.events"
              :key="index"
              class="flex items-start space-x-4"
            >
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                event.type === 'positive' ? 'bg-green-100' : event.type === 'negative' ? 'bg-red-100' : 'bg-gray-100'
              ]">
                <svg
                  :class="[
                    'w-4 h-4',
                    event.type === 'positive' ? 'text-green-600' : event.type === 'negative' ? 'text-red-600' : 'text-gray-600'
                  ]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="event.type === 'positive'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                  <path
                    v-else-if="event.type === 'negative'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ event.title }}</p>
                <p class="text-xs text-gray-500">{{ event.time }}</p>
              </div>
              <span :class="[
                'text-sm font-medium',
                event.impact > 0 ? 'text-green-600' : event.impact < 0 ? 'text-red-600' : 'text-gray-500'
              ]">
                {{ event.impact > 0 ? '+' : '' }}{{ event.impact }}%
              </span>
            </div>
          </div>
        </div>

        <!-- AI Recommendations -->
        <div class="bg-blue-50 rounded-xl p-6">
          <div class="flex items-center space-x-2 mb-4">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h4 class="text-sm font-semibold text-blue-900">AI Recommendations</h4>
          </div>
          <div class="space-y-3">
            <div
              v-for="(rec, index) in selectedGuest.recommendations"
              :key="index"
              class="flex items-center justify-between bg-white rounded-lg p-4"
            >
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                <p class="text-sm text-gray-700">{{ rec.text }}</p>
              </div>
              <button
                @click="applyIntervention(rec)"
                class="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Intervention
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import apiService from '@/services/apiService'

const isLoading = ref(false)
const isLoadingDetails = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')
const selectedPeriod = ref('week')
const currentPage = ref(1)
const itemsPerPage = 10
const totalItems = ref(0)
const showGuestModal = ref(false)
const selectedGuest = ref(null)

const timePeriods = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' }
]

// Stats data
const stats = ref({
  avgSatisfaction: 0,
  activeGuests: 0,
  healthy: 0,
  atRisk: 0,
  critical: 0
})

// Trend data for the chart
const trendData = ref([])

// Guests data from API
const guests = ref([])

// Debounce timer for search
let searchDebounceTimer = null

// Watch for period changes to fetch new trend data
watch(selectedPeriod, () => {
  fetchTrendData()
})

// Watch for search and filter changes
watch([searchQuery, statusFilter], () => {
  // Debounce search
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }
  searchDebounceTimer = setTimeout(() => {
    currentPage.value = 1
    fetchGuests()
  }, 300)
})

// Fetch overview stats
const fetchOverviewStats = async () => {
  try {
    const response = await apiService.getSatisfactionOverview()
    if (response.data) {
      const data = response.data
      stats.value = {
        avgSatisfaction: Math.round(data.avgSatisfaction || data.averageSatisfaction || 0),
        activeGuests: data.activeGuests || data.totalGuests || 0,
        healthy: data.healthy || data.healthyCount || 0,
        atRisk: data.atRisk || data.atRiskCount || 0,
        critical: data.critical || data.criticalCount || 0
      }
    }
  } catch (error) {
    console.error('Error fetching satisfaction overview:', error)
  }
}

// Fetch trend data based on selected period
const fetchTrendData = async () => {
  try {
    const response = await apiService.getSatisfactionTrend(selectedPeriod.value)
    if (response.data && response.data.trend) {
      trendData.value = response.data.trend.map(item => ({
        label: item.label || item.date || item.period,
        value: Math.round(item.value || item.score || item.satisfaction || 0)
      }))
    }
  } catch (error) {
    console.error('Error fetching satisfaction trend:', error)
    // Set default data if API fails
    trendData.value = []
  }
}

// Fetch guests list with pagination, search, and filter
const fetchGuests = async () => {
  isLoading.value = true
  try {
    const statusParam = statusFilter.value !== 'all' ? statusFilter.value : null
    const searchParam = searchQuery.value.trim() || null

    const response = await apiService.getSatisfactionGuests(
      currentPage.value,
      itemsPerPage,
      statusParam,
      searchParam
    )

    if (response.data) {
      const data = response.data
      totalItems.value = data.total || data.totalCount || 0

      // Map API response to component format
      guests.value = (data.guests || data.data || []).map(guest => ({
        id: guest._id || guest.id || guest.bookingId,
        bookingId: guest.bookingId || guest._id || guest.id,
        name: guest.guestName || guest.fullName || 'Guest',
        room: guest.roomNumber || guest.room || 'N/A',
        floor: guest.floor || extractFloor(guest.roomNumber) || '1',
        score: Math.round(guest.satisfactionScore || guest.score || 0),
        trend: determineTrend(guest.trendValue || guest.trend),
        trendValue: Math.abs(guest.trendValue || guest.trendChange || 0),
        status: normalizeStatus(guest.status || guest.satisfactionStatus),
        currentIssue: guest.currentIssue || guest.latestIssue || null,
        lastEvent: formatLastEvent(guest.lastEventTime || guest.lastEvent),
        // These will be fetched when opening the modal
        predictedScore: guest.predictedScore || null,
        timeline: guest.timeline || [],
        scoreBreakdown: guest.scoreBreakdown || [],
        events: guest.events || [],
        recommendations: guest.recommendations || []
      }))
    }
  } catch (error) {
    console.error('Error fetching satisfaction guests:', error)
    guests.value = []
  } finally {
    isLoading.value = false
  }
}

// Fetch detailed guest data when opening modal
const fetchGuestDetails = async (bookingId) => {
  isLoadingDetails.value = true
  try {
    const response = await apiService.getGuestSatisfactionDetails(bookingId)
    if (response.data) {
      const data = response.data
      return {
        id: data._id || data.id || bookingId,
        bookingId: bookingId,
        name: data.guestName || data.fullName || 'Guest',
        room: data.roomNumber || data.room || 'N/A',
        floor: data.floor || extractFloor(data.roomNumber) || '1',
        score: Math.round(data.satisfactionScore || data.score || 0),
        trend: determineTrend(data.trendValue || data.trend),
        trendValue: Math.abs(data.trendValue || data.trendChange || 0),
        status: normalizeStatus(data.status || data.satisfactionStatus),
        currentIssue: data.currentIssue || data.latestIssue || null,
        lastEvent: formatLastEvent(data.lastEventTime || data.lastEvent),
        predictedScore: Math.round(data.predictedScore || data.predictedCheckoutScore || 0),
        timeline: (data.timeline || data.satisfactionTimeline || []).map(t => ({
          value: t.value || t.score || 0
        })),
        scoreBreakdown: (data.scoreBreakdown || data.factors || []).map(f => ({
          name: f.name || f.factor,
          impact: f.impact || f.value || 0
        })),
        events: (data.events || data.eventTimeline || []).map(e => ({
          title: e.title || e.description || e.event,
          time: formatLastEvent(e.time || e.timestamp),
          type: e.type || (e.impact > 0 ? 'positive' : e.impact < 0 ? 'negative' : 'neutral'),
          impact: e.impact || 0
        })),
        recommendations: (data.recommendations || data.aiRecommendations || []).map(r => ({
          text: r.text || r.recommendation || r,
          priority: r.priority || 'medium'
        }))
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching guest details:', error)
    return null
  } finally {
    isLoadingDetails.value = false
  }
}

// Helper function to extract floor from room number
const extractFloor = (roomNumber) => {
  if (!roomNumber) return '1'
  const roomStr = String(roomNumber)
  if (roomStr.length >= 3) {
    return roomStr.charAt(0)
  }
  return '1'
}

// Helper function to determine trend direction
const determineTrend = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase()
  }
  if (typeof value === 'number') {
    if (value > 0) return 'up'
    if (value < 0) return 'down'
  }
  return 'stable'
}

// Helper function to normalize status
const normalizeStatus = (status) => {
  if (!status) return 'Healthy'
  const s = status.toLowerCase()
  if (s.includes('critical')) return 'Critical'
  if (s.includes('risk') || s.includes('at-risk') || s.includes('atrisk')) return 'At Risk'
  return 'Healthy'
}

// Helper function to format last event time
const formatLastEvent = (time) => {
  if (!time) return 'N/A'

  // If it's already a formatted string like "2 hours ago", return it
  if (typeof time === 'string' && time.includes('ago')) {
    return time
  }

  // Otherwise, try to parse and format the date
  try {
    const date = new Date(time)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  } catch {
    return time
  }
}

// Computed properties - now using server-side filtering/pagination
const filteredGuests = computed(() => guests.value)

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const paginatedGuests = computed(() => guests.value)

const displayedPages = computed(() => {
  const total = totalPages.value
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  return Array.from({ length: 5 }, (_, i) => i + 1)
})

// Chart path calculations
const trendLinePath = computed(() => {
  const points = trendData.value.map((point, index) => {
    const x = getPointX(index)
    const y = getPointY(point.value)
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  })
  return points.join(' ')
})

const trendAreaPath = computed(() => {
  const points = trendData.value.map((point, index) => {
    const x = getPointX(index)
    const y = getPointY(point.value)
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  })
  const lastX = getPointX(trendData.value.length - 1)
  const firstX = getPointX(0)
  return `${points.join(' ')} L ${lastX} 225 L ${firstX} 225 Z`
})

// Helper functions
const getPointX = (index) => {
  const padding = 50
  const width = 730
  return padding + (index * (width / (trendData.value.length - 1)))
}

const getPointY = (value) => {
  const height = 200
  const padding = 25
  return padding + height - (value / 100 * height)
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getScoreColor = (score) => {
  if (score >= 70) return 'bg-green-500'
  if (score >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getScoreColorHex = (score) => {
  if (score >= 70) return '#22C55E'
  if (score >= 50) return '#EAB308'
  return '#EF4444'
}

const getStatusBadgeClass = (status) => {
  const baseClass = 'px-3 py-1 rounded-full text-xs font-medium'
  switch (status) {
    case 'Healthy':
      return `${baseClass} bg-green-100 text-green-700`
    case 'At Risk':
      return `${baseClass} bg-yellow-100 text-yellow-700`
    case 'Critical':
      return `${baseClass} bg-red-100 text-red-700`
    default:
      return `${baseClass} bg-gray-100 text-gray-700`
  }
}

const getTimelinePath = (timeline) => {
  if (!timeline || timeline.length === 0) return ''
  const points = timeline.map((point, index) => {
    const x = index * (600 / (timeline.length - 1))
    const y = 120 - (point.value * 1.1)
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  })
  return points.join(' ')
}

// Actions
const openGuestModal = async (guest) => {
  // First show modal with basic data
  selectedGuest.value = { ...guest }
  showGuestModal.value = true

  // Then fetch detailed data
  if (guest.bookingId || guest.id) {
    const detailedData = await fetchGuestDetails(guest.bookingId || guest.id)
    if (detailedData) {
      selectedGuest.value = detailedData
    }
  }
}

const applyIntervention = (recommendation) => {
  console.log('Applying intervention:', recommendation)
  // TODO: Implement intervention API call
}

// Pagination - with server-side support
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchGuests()
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchGuests()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchGuests()
  }
}

// Initial data fetch
onMounted(async () => {
  isLoading.value = true
  try {
    // Fetch all data in parallel
    await Promise.all([
      fetchOverviewStats(),
      fetchTrendData(),
      fetchGuests()
    ])
  } catch (error) {
    console.error('Error initializing satisfaction tab:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
