<template>
  <div class="bg-white rounded-2xl sm:p-2 p-6 md:p-8">
  <div class="sm:flex sm:flex-col flex flex-col lg:flex-row items-center justify-center py-20 space-y-4 lg:space-y-0 space-x-0 lg:space-x-4">
    <div
      class="w-18 h-18 rounded-full bg-blue-600 flex items-center justify-center text-center animate-pulse">
      <div class="loader">
        <li class="ball"></li>
        <li class="ball"></li>
        <li class="ball"></li>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>

</script>

<style scoped>
/* From Uiverse.io by ashish-yadv */
.loader {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  gap: 1px;
  align-items: center;
  border-radius: 100%;
  }

.ball {
  list-style: none;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #fff;
}

.ball:nth-child(1) {
  animation: bounce-1 2.1s ease-in-out infinite;
}

@keyframes bounce-1 {
  50% {
    transform: translateY(-18px);
  }
}

.ball:nth-child(2) {
  animation: bounce-3 2.1s ease-in-out 0.3s infinite;
}

@keyframes bounce-2 {
  50% {
    transform: translateY(-18px);
    /* background-color: aqua; */
  }
}

.ball:nth-child(3) {
  animation: bounce-3 2.1s ease-in-out 0.6s infinite;
}

@keyframes bounce-3 {
  50% {
    transform: translateY(-18px);
    /* background-color: aqua; */
  }
}
</style>