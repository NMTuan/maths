<template>
    <div class="menu">
        <template v-for="page in firstLevelPages">
            <div class="title">{{ page.name }}</div>
            <LayoutMenuList :pages="pages" :current="page">
            </LayoutMenuList>
        </template>
    </div>
</template>
<script setup>
const files = import.meta.globEager('@/pages/**/*.vue')
const pages = Object.keys(files).reduce((total, key) => {
    const fileName = key.replace(/^\/pages\/(.*)\.\w+$/, '$1')
    if (files[key].default.page) {
        total.push({
            ...files[key].default.page,
            fileName, // 文件名称, 没有.vue
            dynamicRoute: fileName.includes('['), //是否动态路由, 动态路由不在菜单张显示.
            routeName: fileName // 路由名称
                .replace(/\//gi, '-')
                .replace(/\[/gi, '')
                .replace(/\]/gi, '')
                .replace('-index', ''),
            level: fileName.split('/').length // 层级
        })
    }
    return total
}, [])

// 找到顶级的菜单
const firstLevelPages = computed(() => {
    const res = pages.filter((page) => {
        return page.level === 1 && page.dynamicRoute === false
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
    @apply leading-none mt-2;
}

.title {
    @apply px-4 pt-5 pb-2;
    @apply text-cool-gray-400 capitalize text-sm;
}
</style>
