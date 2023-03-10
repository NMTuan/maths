<template>
    <div class="flex justify-center flex-wrap" :class="className">
        <TemplateTianItem v-for="(item, index) in cols" :size="size" class="flex-shrink-0 -ml-1px">
            <slot v-if="index !== 0 && trace || index === 0" />
        </TemplateTianItem>
        <!-- <TemplateTianItem v-for="(item, index) in cols" :size="size"
                class="flex-1 border-l border-dashed border-cool-gray-600" :class="{
                    'text-cool-gray-300': index !== 0 && trace,
                    'print:text-cool-gray-50/50': index !== 0 && trace,
                }" first="border-solid" last="border-r border-r-solid">
                <slot v-if="index !== 0 && trace || index === 0" />
            </TemplateTianItem> -->
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

const className = computed(() => {
    if (props.size === 'sm') {
        return 'mb-12px'
    }
    if (props.size === 'base') {
        return 'mb-14px'
    }
    if (props.size === 'lg') {
        return 'mb-15px'
    }
    if (props.size === 'xl') {
        return 'mb-18px'
    }
})
</script>
