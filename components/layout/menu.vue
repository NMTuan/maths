<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-14 11:01:18
 * @LastEditTime: 2023-02-20 16:50:28
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\menu.vue
-->
<template>
    <div class="menu">
        <template v-for="page in firstLevelPages">
            <div class="title">{{ page.name }}</div>
            <LayoutMenuList :current="page">
            </LayoutMenuList>
        </template>
    </div>
</template>
<script setup>
const { $pages } = useNuxtApp()

// 找到顶级的菜单
const firstLevelPages = computed(() => {
    const res = $pages.filter((page) => {
        return page.level === 1 && page.dynamicRoute === false && page.fileName !== 'index'
    })
    // 排序，sort值越小排名越靠前，未设定的统统往后排
    return res.sort((a, b) => {
        let x = a.sort || 10000
        let y = b.sort || 10000
        x = typeof x === 'string' ? Number(x) : x
        y = typeof y === 'string' ? Number(y) : y
        return x - y
    })
})

</script>
<style scoped lang="scss">
.menu {
    --at-apply: leading-none;
}

.title {
    --at-apply: px-4 pt-5 pb-2;
    --at-apply: text-cool-gray-400 capitalize text-sm;
}
</style>
