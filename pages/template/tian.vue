<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-08 13:40:32
 * @LastEditTime: 2023-03-14 10:29:02
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\template\tian.vue
-->
<template>
    <TemplateTian></TemplateTian>
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
        name: '田字格'
    }
}
</script>
