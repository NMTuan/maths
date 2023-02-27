<template>
    <div class="flex items-baseline flex-shrink-0 w-full sm:w-1/3 print:w-1/3 mb-4 text-lg">
        <div class="text-sm text-gray-200 mr-4">
            {{ (index + 1).toString().padStart(2, '0') }}.
        </div>
        <div class="flex items-center justify-center text-center">
            <div class="w-10">{{ item.numbers[0] }}</div>
            <div class="w-10 h-10 border rounded border-cool-gray-400 mx-2 text-3xl">
                {{ showRes ? item.result : '' }}
            </div>
            <div class="w-10">{{ item.numbers[1] }}</div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: () => { }
    },
    index: {
        type: Number,
        default: 0
    },
    showRes: {
        type: Boolean,
        default: false
    }
})
</script>
