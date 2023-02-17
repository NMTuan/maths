<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-17 14:24:03
 * @LastEditTime: 2023-02-17 16:34:20
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\paper.vue
-->
<template>
    <div>
        <div class="print:hidden">
            <slot name="config"></slot>
        </div>
        <div class="bg-white p-4 shadow" print="shadow-none">
            <slot />
        </div>
    </div>
</template>
