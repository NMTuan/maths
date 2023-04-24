<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-28 14:30:19
 * @LastEditTime: 2023-04-24 21:14:08
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\template\english\item.vue
-->
<template>
    <div class="bg" :class="bgSize">
        <div
            class="content"
            :class="contentSize"
            :style="{ 'font-family': fontStyle }"
        >
            <slot />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    size: {
        type: String,
        default: 'base' // base | lg
    },
    fontStyle: {
        type: String,
        default: 'italic'
    }
})
const bgSize = computed(() => {
    const className = []
    // 0.96cm   36px
    if (props.size === 'sm') {
        if (props.fontStyle === 'italic') {
            className.push('text-32px')
            className.push('pt-2px')
        }
        if (props.fontStyle === 'segoe') {
            className.push('text-22px')
            className.push('pb-4px')
        }
        className.push('h-9')
        className.push('!after:top-3 after:h-3')
    }
    // 1.2cm    48px
    if (props.size === 'base') {
        if (props.fontStyle === 'italic') {
            className.push('text-44px')
            className.push('pt-2px')
        }
        if (props.fontStyle === 'segoe') {
            className.push('text-30px')
            className.push('pb-6px')
        }
        className.push('h-12')
        className.push('!after:top-4 after:h-4')
    }
    // 1.5cm    56px
    if (props.size === 'lg') {
        if (props.fontStyle === 'italic') {
            className.push('text-52px')
            // className.push('pt-1')
        }
        if (props.fontStyle === 'segoe') {
            className.push('text-34px')
            className.push('pb-2')
        }
        className.push('h-14')
        className.push('!after:top-19px after:h-18px')
    }
    // 1.8cm    64px
    if (props.size === 'xl') {
        if (props.fontStyle === 'italic') {
            className.push('text-58px')
            className.push('pt-1')
        }
        if (props.fontStyle === 'segoe') {
            className.push('text-42px')
            className.push('pb-2')
        }
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
    font-family: 'italic';
    src: url('~/assets/font/italic.woff') format('woff');
}
@font-face {
    font-family: 'segoe';
    src: url('~/assets/font/segoe.woff') format('woff');
}

.bg {
    // font-family: 'py';
    font-family: 'segoe';
    // font-family: HengShuiTi, 楷体;
    // font-family: SegoeUIItalic, 楷体;
    @apply relative leading-none;
    @apply flex items-center justify-center;
    // @apply px-2;
    // @apply font-bold;

    &::before,
    &::after {
        @apply block border-y border-dashed absolute inset-0;
    }

    &::before {
        content: '';
        @apply border-cool-gray-400;
    }

    &::after {
        content: '';
        @apply border-t-dashed border-t-cool-gray-400 border-b-solid border-b-cool-gray-600;
    }
}

.content {
    @apply relative z-10;
}
</style>
