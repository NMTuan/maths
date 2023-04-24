<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-28 14:24:53
 * @LastEditTime: 2023-04-24 07:01:33
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\template\pinyin.vue
-->
<template>
    <TemplatePinyin></TemplatePinyin>
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
        name: '四线三格（拼音）',
        sort: 100
    }
}
</script>
