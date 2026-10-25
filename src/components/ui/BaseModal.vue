<template>
    <teleport to="body">
        <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center" aria-hidden="false">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/40" @click="onBackdropClick" :aria-hidden="true"></div>

            <!-- Slide-down modal -->
            <transition enter-active-class="transition transform duration-300 ease-out"
                enter-from-class="-translate-y-12 opacity-0" enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition transform duration-250 ease-in"
                leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-y-12 opacity-0">
                <div v-if="modelValue" role="dialog" aria-modal="true"
                    :class="[
                        'relative bg-white rounded-2xl shadow-2xl w-full mx-4 max-h-[90vh] flex flex-col',
                        sizeClasses
                    ]">
                    <!-- Close button positioned absolutely -->
                    <button v-if="dismissible" @click="close"
                        class="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M7 5.44469L12.4447 0L14 1.55531L8.55531 7L14 12.4447L12.4447 14L7 8.55531L1.55531 14L0 12.4447L5.44469 7L0 1.55531L1.55531 0L7 5.44469Z"
                                fill="currentColor" />
                        </svg>
                    </button>

                    <div :class="['p-6', scrollable ? 'overflow-y-auto' : 'overflow-visible']">
                        <slot>
                            <p class="text-sm text-gray-700">{{ message }}</p>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    message: { type: String, default: '' },
    dismissible: { type: Boolean, default: true },
    size: { type: String, default: 'md' }, // sm, md, lg, xl, 2xl
    scrollable: { type: Boolean, default: true }
})

const scrollable = computed(() => props.scrollable)

const emit = defineEmits(['update:modelValue'])

const sizeClasses = computed(() => {
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        '2xl': 'max-w-6xl'
    }
    return sizes[props.size] || sizes.md
})

function close() {
    emit('update:modelValue', false)
}

function onBackdropClick() {
    if (props.dismissible) close()
}

function onKey(e) {
    if (e.key === 'Escape' && props.dismissible) close()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
/* small max-width tweak already handled via Tailwind classes */
</style>