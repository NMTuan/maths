<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-17 14:24:03
 * @LastEditTime: 2023-03-07 10:32:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\paper.vue
-->
<template>
    <div class="shadow-lg" print="shadow-none">
        <div class="bg-white p-8 pt-6 min-h-3xl" print="shadow-none p-0 pt-6">
            <div class="mb-3 hidden" print="flex">
                <div class="mr-6">
                    {{ title }}
                    <span class="text-sm">(<Domain www></Domain>)</span>
                </div>
                <div class="flex-1">日期：__________</div>
                <div class="flex-1">用时：__________</div>
                <div class="flex-1">得分：__________</div>
            </div>
            <div class="sticky top-18 right-0 text-cool-gray-300 text-right" print="hidden">预览</div>
            <slot />
        </div>
        <div class="print:hidden sticky bottom-0 px-8 pt-6 pb-2 bg-white border-t relative z-10">
            <!-- <div class="text-cool-gray-300 text-right" print="hidden">设置</div> -->
            <slot name="config"></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '练习题生成器'
    }
})
</script>
