<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-15 13:38:41
 * @LastEditTime: 2023-02-16 10:06:04
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\Guide.vue
-->
<template>
    <div class="ml-4 flex items-center capitalize">
        <div v-for="(item, index) in route.matched" class="flex items-center">
            <LayoutGuideItem :item="item"></LayoutGuideItem>
            <div v-if="index !== route.matched.length - 1" class="i-ri-arrow-right-s-line mx-2 text-cool-gray-400">
            </div>
        </div>
    </div>
</template>
<script setup>
const route = useRoute()
// console.log(route.matched);
</script>
