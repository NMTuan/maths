<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-28 14:30:19
 * @LastEditTime: 2023-03-01 10:19:59
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\template\pinyin\item.vue
-->
<template>
    <div class="bg" :class="bgSize">
        <div class="content">
            <slot />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    size: {
        type: String,
        default: 'base' // base | lg
    }
})
const bgSize = computed(() => {
    const className = []
    if (props.size === 'base') {
        className.push('text-2xl')
        className.push('h-9')
        className.push('mb-3')
        className.push('!after:top-3 after:h-3')
    }
    if (props.size === 'lg') {
        className.push('text-3xl')
        className.push('h-12')
        className.push('mb-4')
        className.push('!after:top-4 after:h-4')
    }
    return className
})
</script>
<style lang="scss" scoped>
@font-face {
    font-family: 'py';
    src: url('~/assets/font/py.woff') format('woff');
}

.bg {
    font-family: 'py';
    --at-apply: relative leading-none;
    --at-apply: flex items-center justify-center;
    // --at-apply: px-2;
    // --at-apply: font-bold;

    &::before,
    &::after {
        --at-apply: block border-y absolute inset-0;
    }

    &::before {
        content: '';
        --at-apply: border-cool-gray-600;
    }

    &::after {
        content: '';
        --at-apply: border-dashed border-cool-gray-400;
    }
}

.content {
    --at-apply: -mt-1 relative z-10;
}
</style>
