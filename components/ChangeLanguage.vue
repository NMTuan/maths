<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 11:46:46
 * @LastEditTime: 2022-07-29 15:57:16
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks_web\components\ChangeLanguage.vue
-->
<template>
    <button @click="toggleLocales">切换语言</button>
</template>
<script setup lang="ts">
const { locale, availableLocales } = useI18n()
const locales = availableLocales
const i18nCookie = useCookie('i18n')

// 切换语言
const toggleLocales = () => {
    const language = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    i18nCookie.value = language
    locale.value = language
}
</script>
