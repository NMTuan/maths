<template>
    <div class="flex">
        <TemplatePinyinItem v-for="(item, index) in cols" :size="size"
            class="flex-1 border-l border-dashed border-cool-gray-600" :class="{
                'text-cool-gray-300': index !== 0 && trace,
                'print:text-cool-gray-50/50': index !== 0 && trace,
            }" first="border-solid" last="border-r border-r-solid">
            <slot v-if="index !== 0 && trace || index === 0" />
        </TemplatePinyinItem>
    </div>
</template>
<script setup>
const props = defineProps({
    size: { // 尺寸
        type: String,
        default: 'base'
    },
    cols: { // 一行几列
        type: Number,
        default: 1
    },
    trace: {    // 描边
        type: Boolean,
        default: false
    }
})
</script>
