<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-28 14:30:19
 * @LastEditTime: 2023-02-28 16:51:24
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\template\pinyin\item.vue
-->
<template>
    <div class="bg">
        <div class="content">
            <slot />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@font-face {
    font-family: 'py';
    src: url('~/assets/font/py.woff') format('woff');
}

.bg {
    font-family: 'py';
    --at-apply: relative text-2xl leading-none;
    --at-apply: h-9 flex items-center justify-center;
    --at-apply: px-2 mb-3;
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
        --at-apply: border-dashed border-cool-gray-400 top-3 h-3;
    }
}

.content {
    --at-apply: -mt-1 relative z-1;
}
</style>
