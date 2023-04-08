<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-08 14:29:37
 * @LastEditTime: 2023-03-19 11:45:16
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\template\tian\item.vue
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
        default: 'base'
    },
    customClass: {
        type: String,
        default: ''
    }
})

const bgSize = computed(() => {
    const className = []
    if (props.customClass) {
        return props.customClass
    }
    // 0.96cm   36px
    if (props.size === 'sm') {
        className.push('text-26px')
        className.push('w-9 h-9')
    }
    // 1.2cm    48px
    if (props.size === 'base') {
        className.push('text-36px')
        className.push('w-12 h-12')
    }
    // 1.5cm    56px
    if (props.size === 'lg') {
        className.push('text-42px')
        className.push('w-14 h-14')
    }
    // 1.8cm    64px
    if (props.size === 'xl') {
        className.push('text-48px')
        className.push('w-16 h-16')
    }
    return className
})
</script>
<style lang="scss" scoped>
.bg {
    @apply flex items-center justify-center;
    @apply border border-cool-gray-600;
    @apply relative;
    @apply select-none;

    &::before,
    &::after {
        content: '';
        @apply block absolute;
        @apply border border-dashed border-cool-gray-300;
    }

    &::before {
        @apply w-full h-0;
    }

    &::after {
        @apply w-0 h-full;
    }
}

.content {
    font-family: 楷体_gb2312, 楷体, 'Kaiti SC', STKaiti, 'AR PL UKai CN',
        'AR PL UKai HK', 'AR PL UKai TW', 'AR PL UKai TW MBE', 'AR PL KaitiM GB',
        KaiTi, KaiTi_GB2312, DFKai-SB, TW-Kai;
    // font-family: STKaiti, zhengkai, KaiTi, 楷体;
    // font-family: '华文楷体';
    @apply relative z-10;
    @apply leading-none;
    @apply flex items-center justify-center;
}
</style>
