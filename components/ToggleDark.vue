<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 14:30:06
 * @LastEditTime: 2022-07-29 15:56:33
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks_web\components\ToggleDark.vue
-->
<template>
    <button @click="toggleDark">明亮 / 黑暗</button>
</template>
<script setup lang="ts">
const colorMode = useColorMode()
const toggleDark = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>
