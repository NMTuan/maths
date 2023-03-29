<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-14 16:04:57
 * @LastEditTime: 2023-03-29 22:13:28
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\rightGuide.vue
-->
<template>
    <div class="text-sm text-cool-gray-500 flex gap-4">
        <span @click="showAboutDialog = true" class="cursor-pointer" hover="text-blue-400">关于</span>
        <span @click="showLogDialog = true" class="cursor-pointer" hover="text-blue-400">更新日志</span>
        <a hover="text-blue-400" href="https://support.qq.com/product/530277?ref=guide" target="_black">
            建议反馈
            <sup class="inline-block text-cool-gray-400 i-ri-share-box-line"></sup>
        </a>
        <IndexAboutDialog v-model:show="showAboutDialog"></IndexAboutDialog>
        <IndexLogDialog v-model:show="showLogDialog"></IndexLogDialog>
    </div>
</template>
<script setup>
const showAboutDialog = ref(false)
const showLogDialog = ref(false)

</script>
