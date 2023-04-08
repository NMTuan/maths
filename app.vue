<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 10:07:12
 * @LastEditTime: 2023-03-08 09:53:11
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\app.vue
-->
<template>
    <div class="h-full">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
<script setup></script>
<style lang="scss">
html,
body,
#__nuxt {
    @apply text-base text-cool-gray-800 bg-cool-gray-50 h-full overflow-hidden;
}

*:focus-visible {
    @apply outline-none;
}

.simplebar {
    &:hover {
        .simplebar-track {
            @apply bg-black/5;
        }
    }

    .simplebar-scrollbar {
        &:before {
            @apply bg-black/50;
        }
    }
}
</style>
