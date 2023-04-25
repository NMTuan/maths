<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-04-24 06:59:25
 * @LastEditTime: 2023-04-24 20:57:10
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\template\english\row.vue
-->
<template>
    <div class="flex" :class="className">
        <TemplateEnglishItem
            v-for="(item, index) in cols"
            :size="size"
            :font-style="fontStyle"
            class="flex-1 border-cool-gray-600"
            :class="{
                'text-cool-gray-300': index !== 0 && trace,
                'print:text-cool-gray-50/50': index !== 0 && trace
            }"
        >
            <slot v-if="(index !== 0 && trace) || index === 0" />
        </TemplateEnglishItem>
    </div>
</template>
<script setup>
const props = defineProps({
    size: {
        // 尺寸
        type: String,
        default: 'base'
    },
    cols: {
        // 一行几列
        type: Number,
        default: 1
    },
    trace: {
        // 描边
        type: Boolean,
        default: false
    },
    fontStyle: {
        type: String,
        default: ''
    }
})

const className = computed(() => {
    if (props.size === 'sm') {
        // return 'mb-12px'
        return 'mb-24px'
    }
    if (props.size === 'base') {
        // return 'mb-14px'
        return 'mb-26px'
    }
    if (props.size === 'lg') {
        // return 'mb-15px'
        return 'mb-30px'
    }
    if (props.size === 'xl') {
        // return 'mb-18px'
        return 'mb-36px'
    }
})
</script>
