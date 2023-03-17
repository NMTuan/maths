<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:35:30
 * @LastEditTime: 2023-03-17 16:04:05
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\index.vue
-->
<template>
    <div class="h-full">
        <simplebar class="simplebar h-full">
            <div class="sticky left-0 top-0 right-0 z-100 w-full">
                <div
                    class="flex items-center justify-between px-8 py-6 leading-none bg-cool-gray-50/50 backdrop-blur sticky left-0 top-0 right-0 z-100">
                    <Domain hump class="font-semibold text-cool-gray-500"></Domain>
                    <LayoutRightGuide></LayoutRightGuide>
                </div>
            </div>

            <div class="bg-cool-gray-200/50 py-32 overflow-hidden">
                <div class="mx-auto container overflow-hidden text-center">
                    <h1 class="text-6xl font-black text-blue-400">习题打印生成器</h1>
                    <p class="text-4xl font-bold text-cool-gray-600 leading-12 mt-16 mb-4">强大、易用的一键生成数学题、描红字帖及各种空白模板。</p>
                    <p class="text-2xl text-cool-gray-500">让眼睛回归纸张，远离屏幕设备。</p>
                    <div class="mt-10">
                        <NuxtLink :to="{ name: 'math-Addition' }"
                            class="inline-block bg-blue-400 text-white px-4 py-3 leading-none rounded cursor-pointer"
                            hover="bg-blue-500/80">
                            开始使用
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div class="py-32 overflow-hidden">
                <h2 class="text-5xl text-center font-extrabold text-cool-gray-600">
                    <span class="text-blue-400">数学</span>题，一键生成
                </h2>
                <div class="text-xl text-center text-cool-gray-400 mt-6">
                    不再为出题烦恼，点一下就是一张试题
                </div>
                <IndexRandom></IndexRandom>
            </div>

            <div class="py-32 overflow-hidden">
                <h2 class="text-5xl text-center font-extrabold text-cool-gray-600">
                    <span class="text-blue-400">语文</span>字帖，也可以
                </h2>
                <div class="text-xl text-center text-cool-gray-400 mt-6">
                    汉语拼音描红、田字格字帖、汉字笔画笔顺，同样不在话下
                </div>
                <IndexHanzi></IndexHanzi>
            </div>

            <div class="py-32 overflow-hidden">
                <h2 class="text-5xl text-center font-extrabold text-cool-gray-600">
                    但，<span class="text-blue-400">不止</span>于此
                </h2>
                <div class="text-xl text-center text-cool-gray-400 mt-6 leading-8">
                    竖式加减法、<br />认识钟表、<br />笔画笔顺、<br />控笔练习等新功能，<br />正在开发中
                </div>
                <div class="mt-10 text-center">
                    <NuxtLink :to="{ name: 'math-Addition' }"
                        class="inline-block bg-blue-400 text-white px-4 py-3 leading-none rounded cursor-pointer"
                        hover="bg-blue-500/80">
                        查看所有功能
                    </NuxtLink>
                </div>

            </div>

            <div class="text-sm text-center pt-10 pb-4 text-cool-gray-400">
                powered by
                <a href="https://www.muyi.dev/" class="text-blue-400" hover="underline" target="_blank">
                    MuYi.dev
                </a>
            </div>
        </simplebar>
    </div>
</template>
<script setup>
import simplebar from 'simplebar-vue';

definePageMeta({
    layout: "index",
});

</script>
<script>
export default {
    page: {
        name: '首页'
    }
}
</script>
