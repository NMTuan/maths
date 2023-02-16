<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-14 11:25:11
 * @LastEditTime: 2023-02-15 15:51:39
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\menu\List.vue
-->
<template>
    <LayoutMenuItem v-for="page in children" :page="page">
    </LayoutMenuItem>
</template>
<script setup>
const { $pages } = useNuxtApp()

const props = defineProps({
    current: {
        type: Object,
        default: () => { }
    }
})

// 子页面以父页面的文件名开头.
const reg = new RegExp(`^${props.current.fileName}/`, 'ig')
// 找 所有子页面
const children = computed(() => {
    const res = $pages.filter((page) => {
        return (page.level === props.current.level + 1) && page.dynamicRoute === false && page.fileName.match(reg)
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
