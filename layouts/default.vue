<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-15 16:00:53
 * @LastEditTime: 2023-03-07 14:03:30
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\layouts\default.vue
-->
<template>
    <div class="h-full flex">
        <!-- menu -->
        <div class="fixed z-20 h-full overflow-hidden" print="hidden" :class="menuClass">
            <div class="w-64 h-full">
                <div class="h-14 flex items-center justify-center">
                    <Domain hump></Domain>
                </div>
                <simplebar class="simplebar h-full">
                    <LayoutMenu></LayoutMenu>
                </simplebar>
            </div>
        </div>
        <!-- main -->
        <div class="flex-1 h-full overflow-hidden" :class="mainClass">
            <simplebar class="simplebar h-full" ref="mainScroll">
                <div class="flex items-center justify-between p-4 leading-none bg-cool-gray-50/50 backdrop-blur sticky left-0 top-0 right-0 z-100"
                    print="hidden">

                    <div class="flex items-center">
                        <LayoutPin v-model:pin="pin"></LayoutPin>
                        <LayoutGuide></LayoutGuide>
                    </div>
                    <div class="mr-2">
                        <div class="i-ri-github-fill text-2xl cursor-pointer"></div>
                    </div>
                </div>
                <div class="main w-85% max-w-790px mx-auto mt-6" print="w-auto max-w-98% m-0">
                    <slot></slot>
                </div>
            </simplebar>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import simplebar from 'simplebar-vue';

const pin = useCookie('pin')

const menuClass = computed(() => {
    let classNames = []
    switch (pin.value) {
        case 1:
            classNames.push(
                'w-0 bg-cool-gray-100/90 border-r-8 border-cool-gray-300/50 transition-all duration-500'
            )
            classNames.push('hover:w-64 hover:border-r')
            break
        case 0:
        default:
            classNames.push(
                'w-0 bg-cool-gray-100/90 border-r-8 border-cool-gray-300/50 transition-all duration-500'
            )
            classNames.push('hover:w-64 hover:border-r')
            classNames.push('lg:w-64 lg:bg-cool-gray-200/50 lg:!border-none')
    }
    return classNames
})
const mainClass = computed(() => {
    const classNames = []
    switch (pin.value) {
        case 1:
            classNames.push('ml-0 transition-all duration-500')
            break
        case 0:
        default:
            classNames.push('ml-0 transition-all duration-500')
            classNames.push('lg:ml-64')
    }
    return classNames
})

</script>
