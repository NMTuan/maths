<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-15 16:28:35
 * @LastEditTime: 2023-02-16 16:40:20
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\guide\item.vue
-->
<template>
    <div>
        {{ name }}
    </div>
</template>
<script setup>

const { $pages } = useNuxtApp()
const props = defineProps({
    item: {
        type: Object,
        default: () => { }
    }
})
const name = computed(() => {
    const current = $pages.find((page)=>page.routeName === props.item.name)
    return current.name ||props.item.name
})
</script>
