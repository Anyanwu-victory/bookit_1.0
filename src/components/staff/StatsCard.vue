<template>
  <div class="rounded-lg py-6 ">
    <div class="flex items-center justify-between w-1/2">
      
        <div class="flex flex-col space-y-3 items-center justify-between mt-2">
           <p class="text-sm text-gray-600">Requests</p>
          <p class="text-md text-black">{{ label }}</p>
        
        </div>
      <div class="justify" >
       
        <p class="text-3xl font-bold text-blue-600 mt-2 text-center">{{ value }}</p>
       
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  // icon: {
  //   type: Object,
  //   default: null
  // }
})
</script>
