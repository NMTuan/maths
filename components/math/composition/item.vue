<template>
    <div class="flex items-baseline flex-shrink-0 w-full sm:w-1/4 print:w-1/4 mb-3 text-lg">
        <div class="text-sm text-gray-200 mr-4">
            {{ (index + 1).toString().padStart(2, '0') }}.
        </div>
        <div v-if="showMode" class="text-center">
            <div>
                {{ result }}
            </div>
            <div class="">
                <span class="mx-1">↙</span>
                <span class="mx-1">↘</span>
            </div>
            <div class="">
                <span v-for="(num, i) in item.numbers" class="mx-4">
                    {{ number(num, i) }}
                </span>
            </div>
        </div>
        <div v-else class="text-center">
            <div class="">
                <span v-for="(num, i) in item.numbers" class="mx-4">
                    {{ number(num, i) }}
                </span>
            </div>
            <div class="">
                <span class="mx-1">↘</span>
                <span class="mx-1">↙</span>
            </div>
            <div>
                {{ result }}
            </div>
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
    type: {
        type: Object,
        default: () => { }
    },
    mode: {
        type: Object,
        default: () => { }
    },
    showRes: {
        type: Boolean,
        default: false
    }
})

const showMode = computed(() => {
    if (props.mode.key === 'no') {
        return 0.5 - Math.random() > 0
    }
    return props.mode.key === 'comp' ? true : false
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
