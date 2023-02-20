<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-17 14:24:03
 * @LastEditTime: 2023-02-20 14:02:46
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\paper.vue
-->
<template>
    <div class="shadow-lg" print="shadow-none">
        <div class="bg-white p-8 pt-6 min-h-3xl" print="shadow-none p-0 pt-6">
            <div class="sticky top-16 right-0 text-cool-gray-300 text-right" print="hidden">预览</div>
            <slot />
        </div>
        <div class="print:hidden sticky bottom-0 p-8 pt-6 bg-white border-t relative">
            <div class="absolute top-6 right-8 text-cool-gray-300 text-right" print="hidden">设置</div>
            <slot name="config"></slot>
        </div>
    </div>
</template>
