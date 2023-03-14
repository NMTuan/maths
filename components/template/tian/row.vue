<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-09 10:59:08
 * @LastEditTime: 2023-03-14 11:16:01
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\template\tian\row.vue
-->
<template>
    <div class="flex justify-center flex-wrap" :class="className">
        <TemplateTianItem v-for="(item, index) in cols" :size="size"
         class="flex-shrink-0 -ml-1px"
         :class="{
                'text-cool-gray-300': index !== 0 && trace,
             'print:text-cool-gray-50/50': index !== 0 && trace,
         }"
         >
            <slot v-if="index !== 0 && trace || index === 0" />
        </TemplateTianItem>
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
