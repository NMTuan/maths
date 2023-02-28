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
    --at-apply: relative text-3xl leading-none;
    --at-apply: h-12 flex items-center justify-center;
    --at-apply: px-2 mb-4;
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
        --at-apply: border-dashed border-cool-gray-400 top-4 h-4;
    }
}

.content {
    --at-apply: -mt-1;
}
</style>
