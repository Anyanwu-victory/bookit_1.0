<template>
   <div class="baseCard w-full h-[180px] md:w-[230px] md:h-[280px]">
     <div class="mt-3">
    <slot>
        <p class="text-gray-700">{{ message }}</p>
    </slot>
   </div>  
  </div> 
  
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  message: { type: String, default: '' },
});

</script>


<style scoped>
  .baseCard {
    display: flex;
    flex-direction: column;
    padding: 17px 22px;
    gap: 10px;
    box-shadow: -2px 6px 10px rgba(0, 0, 0, 0.123);
    border-radius: 15px;
  }
</style>

