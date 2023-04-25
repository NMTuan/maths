<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-28 14:24:53
 * @LastEditTime: 2023-04-25 06:42:58
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\template\english.vue
-->
<template>
    <TemplateEnglish> </TemplateEnglish>
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
        name: '四线三格（英语）',
        sort: 200
    }
}
</script>
