<template>
    <div class="flex">
        <TemplatePinyinItem v-for="item in cols" :size="size" class="flex-1 border-l border-dashed border-cool-gray-600"
            first="border-solid" last="border-r border-r-solid">
            <slot />
        </TemplatePinyinItem>
    </div>
</template>
<script setup>
const props = defineProps({
    size: {
        type: String,
        default: 'base'
    },
    cols: {
        type: Number,
        default: 1
    }
})
</script>
