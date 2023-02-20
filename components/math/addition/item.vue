<template>
    <div class="flex items-center flex-shrink-0 w-full sm:w-1/2 print:w-1/2 mb-3 text-lg">
        <div class="text-sm text-gray-200 mr-4">
            {{ (index + 1).toString().padStart(2, '0') }}.
        </div>
        <template v-for="(num, i) in item.numbers">
            {{ number(num, i) }}
            {{ i === item.numbers.length - 1 ? '=' : '+' }}
        </template>
        {{ result }}
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
    type: {
        type: Object,
        default: () => { }
    },
    showRes: {
        type: Boolean,
        default: false
    }
})

// 运算数 显示方式
const number = (val, index) => {
    // 填空模式 + 被挖掉
    if (props.type.key === 'fill' && props.item.dig === index) {
        // 显示结果
        if (props.showRes) {
            return `( ${val} )`
        }
        return '(____)'
    }
    return val
}

// 结果 显示方式
const result = computed(() => {
    // 计算模式 + 显示结果
    if (props.showRes && props.type.key === 'cal') {
        return `( ${props.item.result} )`
    }
    return props.type.key === 'cal' ? '(____)' : props.item.result
})
</script>
