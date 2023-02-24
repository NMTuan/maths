<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-14 11:29:07
 * @LastEditTime: 2023-02-15 10:56:36
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\layout\menu\Item.vue
-->
<template>
    <router-link class="link" :to="{ name: page.routeName }">
        <div v-if="page.icon" :class="`${page.icon} icon`"></div>
        {{ page.name }}
    </router-link>
</template>
<script setup>
const props = defineProps({
    page: {
        type: Object,
        default: () => { }
    }
})
</script>
<style lang="scss" scoped>
.link {
    --at-apply: block p-4 flex items-center;
    --at-apply: capitalize font-bold text-cool-gray-600;
    --at-apply: hover: bg-cool-gray-200;
}

.icon {
    --at-apply: text-20px mr-2 text-cool-gray-400;
}

.router-link-active,
.router-link-active:hover {
    --at-apply: bg-blue-400;
    --at-apply: text-white;

    .icon {
        --at-apply: text-blue-200;
    }
}
</style>
