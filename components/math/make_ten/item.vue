<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-24 13:00:07
 * @LastEditTime: 2023-03-06 15:45:18
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\math\make_ten\item.vue
-->
<template>
    <div class="flex items-baseline flex-shrink-0 w-full sm:w-1/3 print:w-1/3 mb-3 text-lg">
        <div class="text-sm text-gray-200 mr-4">
            {{ (index + 1).toString().padStart(2, '0') }}.
        </div>
        <div class="relative">
            <div>
                <template v-for="(num, i) in item.numbers">
                    <span class="mx-4">{{ num }}</span>
                    {{ i === item.numbers.length - 1 ? ' = ' : ' + ' }}
                </template>
                {{ showRes ? `( ${item.result} )` : '(____)' }}
            </div>
            <div class="pl-14">
                <span class="mx-3">/</span>
                <span class="mx-3">\</span>
            </div>
            <div class="pl-8">
                <span :class="showRes ? 'mx-3' : 'mx-2'">
                    {{ showRes ? `( ${10 - item.numbers[0]} )` : '(____)' }}
                </span>
                <span :class="showRes ? 'mx-3' : 'mx-2'">
                    {{ showRes ? `( ${item.result - 10} )` : '(____)' }}
                </span>
            </div>
            <div class="mt-4" :class="showTen ? 'ml-7' : 'ml-4'">
                {{ showTen ? '10' : '(____)' }}
            </div>
            <div class="border-cool-gray-800 border-l border-b h-16 w-10 left-5 top-8 absolute">
                <div class="absolute right-0 bottom-0 w-4 h-3 border-cool-gray-800 border-r">
                </div>
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
    showTen: {
        type: Boolean,
        default: false
    },
    showRes: {
        type: Boolean,
        default: false
    }
})

// 运算数 显示方式
const number = (val, index) => {
    // 显示结果
    if (props.showRes) {
        return `( ${val} )`
    }
    return val
}
</script>
