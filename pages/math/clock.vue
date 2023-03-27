<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-25 16:14:45
 * @LastEditTime: 2023-03-27 17:10:00
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\clock.vue
-->
<template>
    <LayoutPaper title="认识钟表">
        <div class="flex flex-wrap">
            <MathClockItem v-for="time in times" class="flex-1 m-4"
            :time="time"
            ></MathClockItem>
        </div>
        <div class="flex flex-wrap">
            <MathClockItem v-for="time in times" class="flex-1 m-4"
            :time="time"
            ></MathClockItem>
        </div>
        <div class="flex flex-wrap">
            <MathClockItem v-for="time in times" class="flex-1 m-4"
            :time="time"
            ></MathClockItem>
        </div>
        <div class="flex flex-wrap">
            <MathClockItem v-for="time in times" class="flex-1 m-4"
            :time="time"
            ></MathClockItem>
        </div>
    </LayoutPaper>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

const times = [
    '12:00',
    '8:45',
    '18:00',
    '3:30'
]
</script>

<script>
export default {
    page: {
        name: '认识钟表',
        sort: 300
    }
}
</script>
