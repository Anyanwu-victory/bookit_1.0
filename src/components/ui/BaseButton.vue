<template>
  <button
    :class="[
      ' text-[12px] px-[40px] py-[15px] lg:text-[16px] rounded-lg font-medium transition-all duration-200 shadow-md',
      primary
        ? 'bg-blue-500 text-white hover:bg-blue-700'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    primary: { type: Boolean, default: false },
  },
};
</script>
