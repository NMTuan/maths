<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-14 15:54:27
 * @LastEditTime: 2023-03-15 17:11:49
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\components\index\random.vue
-->
<template>
    <div class="select-none">
        <div class="bg-white p-8 pt-6 mt-12 mx-auto max-w-790px shadow-lg">
            <div class="flex flex-wrap">
                <MathAdditionItem v-for="(item, index) in items" :item="item" :index="index" :type="{ key: 'cal' }">
                </MathAdditionItem>
            </div>
        </div>
        <div class="text-center mt-6">
            <button class="border border-blue-400 bg-white text-blue-400 px-4 py-2 leading-none rounded cursor-pointer"
                hover="bg-blue-500/80 text-white" @click="random">
                随机生成
            </button>
        </div>
    </div>
</template>
<script setup>
const { $random } = useNuxtApp()
const items = ref([])



const random = () => {
    items.value = []
    for (let i = 0; i < 10; i++) {
        const item = { numbers: [], result: 0 }

        item.numbers.push($random(1, 9))
        item.numbers.push($random(1, 9))

        items.value.push(item)
    }
}

onMounted(() => {
    random()
})

</script>
