<template>
  <div class="bg-white rounded-lg border border-gray-200 p-10 px-[16px]">
    <div class="flex items-start justify-between mb-2">
      <div class="mt-[30px]">
        <h3 class="font-semibold text-gray-900 text-[16px]">{{ roomNumber }}</h3>
        <p class="sm:text-sm text-blue-600 font-bold text-[18px] mt-2">{{ requestType }}</p>
      </div>
      <!-- Action button-->
      <button
        @click="showResolveModal = true"
        class="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>
    </div>

    <!-- Resolve Task Modal -->
    <BaseModal v-model="showResolveModal" size="md">
      <div class="space-y-6">
        <!-- Modal Header -->
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Resolve Task</h3>
          <p class="text-sm text-gray-500">Are you sure you want to mark this task as resolved?</p>
        </div>

        <!-- Task Details -->
        <div class="bg-gray-50 rounded-lg p-4 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Room:</span>
            <span class="font-medium text-gray-900">{{ roomNumber }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Request:</span>
            <span class="font-medium text-gray-900">{{ requestType }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-2">
          <button
            @click="showResolveModal = false"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleResolveTask"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Mark as Resolved
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const props = defineProps({
  roomNumber: {
    type: String,
    required: true
  },
  requestType: {
    type: String,
    required: true
  },
  requestId: {
    type: [Number, String],
    required: true
  }
})

const emit = defineEmits(['task-resolved'])

const showResolveModal = ref(false)

const handleResolveTask = () => {
  // Emit event to parent component with request details
  emit('task-resolved', {
    id: props.requestId,
    roomNumber: props.roomNumber,
    requestType: props.requestType,
    resolvedAt: new Date().toISOString()
  })

  // Close the modal
  showResolveModal.value = false
}
</script>
