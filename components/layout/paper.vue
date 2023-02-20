<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-17 14:24:03
 * @LastEditTime: 2023-02-20 10:41:39
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\paper.vue
-->
<template>
    <div class="">
        <div class="bg-white p-4 shadow-lg mb-6" print="shadow-none">
            <slot />
        </div>
        <div class="print:hidden sticky bottom-0 bg-red-100">
            <slot name="config"></slot>
        </div>
    </div>
</template>
