<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-14 11:01:18
 * @LastEditTime: 2023-03-07 16:30:55
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\menu.vue
-->
<template>
    <div class="menu">
        <template v-for="page in $firstLevelPages">
            <div class="title">{{ page.name }}</div>
            <LayoutMenuList :current="page"> </LayoutMenuList>
        </template>
    </div>
</template>
<script setup>
const { $firstLevelPages } = useNuxtApp()
</script>
<style scoped lang="scss">
.menu {
    @apply leading-none;
}

.title {
    @apply px-4 pt-5 pb-2;
    @apply text-cool-gray-400 capitalize text-sm;
}
</style>
