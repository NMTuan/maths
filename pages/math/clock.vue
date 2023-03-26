<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-25 16:14:45
 * @LastEditTime: 2023-03-25 19:53:58
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\clock.vue
-->
<template>
    <LayoutPaper title="认识钟表">
        <div class="flex flex-wrap">
            <MathClockItem class="w-100 h-100"></MathClockItem>
            <MathClockItem class="w-75 h-75"></MathClockItem>
            <MathClockItem class="w-50 h-50"></MathClockItem>
        </div>
    </LayoutPaper>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)
</script>

<script>
export default {
    page: {
        name: '认识钟表',
        sort: 300
    }
}
</script>
