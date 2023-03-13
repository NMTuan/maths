<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-28 14:30:19
 * @LastEditTime: 2023-03-13 10:38:27
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\template\pinyin\item.vue
-->
<template>
    <div class="bg" :class="bgSize">
        <div class="content" :class="contentSize">
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
    // 0.96cm   36px
    if (props.size === 'sm') {
        className.push('text-26px')
        className.push('h-9')
        className.push('!after:top-3 after:h-3')
    }
    // 1.2cm    48px
    if (props.size === 'base') {
        className.push('text-32px')
        className.push('h-12')
        className.push('!after:top-4 after:h-4')
    }
    // 1.5cm    56px
    if (props.size === 'lg') {
        className.push('text-36px')
        className.push('h-14')
        className.push('!after:top-19px after:h-18px')
    }
    // 1.8cm    64px
    if (props.size === 'xl') {
        className.push('text-42px leading-none')
        className.push('h-16')
        className.push('!after:top-21px after:h-22px')
    }
    return className
})

const contentSize = computed(() => {
    if (props.size === 'xl') {
        return '-mt-6px'
    } else {
        return '-mt-1'
    }
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
    --at-apply: relative z-10;
}
</style>
