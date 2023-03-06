<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-27 10:33:15
 * @LastEditTime: 2023-03-06 10:48:02
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\compare.vue
-->
<template>
    <LayoutPaper>
        <template #config>
            <div class="sm:flex items-center justify-between">
                <el-form class="flex items-center flex-wrap">
                    <el-form-item label="运算范围" class="w-40 mr-4">
                        <el-select v-model="currentRange" placeholder="" @change="submit">
                            <el-option v-for="range in ranges" :key="range" :label="range" :value="range" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="" class="">
                        <el-checkbox v-model="showRes" label="显示答案" />
                    </el-form-item>
                </el-form>

                <el-form class="flex-shrink-0 flex items-center flex-wrap">
                    <el-form-item label="" class="">
                        <el-button-group>
                            <el-button type="primary" plain @click="submit">重新生成</el-button>
                            <el-button type="primary" @click="print">打印</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <div class="flex flex-wrap">
            <MathCompareItem v-for="(item, index) in items" :item="item" :index="index" :showRes="showRes">
            </MathCompareItem>
        </div>
    </LayoutPaper>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()

useServerSeoMeta({
    title: () => `比大小 - 数学 - ${runtimeConfig.public.title}`,
    keywords: '比大小,数字启蒙,打印',
    description: 'A4纸一键打印10以内至100以内的数字大小比较。适合幼儿园3-6岁小朋友。'
})

const ranges = [10, 20, 50, 100] // 运算范围
const currentRange = useCookie('math_compare_currentRange') // 当前运算范围
currentRange.value = currentRange.value || 10

const showRes = useCookie('math_compare_showRes') // 显示结果
showRes.value = showRes.value || false

const resLength = ref(50) // 生成数量
const items = ref([]) // 结果集

// 生成随机数
const random = (min = 0, max = currentRange.value) => {
    return Math.round(Math.random() * (max - min)) + min
}

// 生成一条算数式

const generator = () => {
    const res = {
        numbers: [], // 运算数
        result: 0, // 结果
    }

    const a = random()
    const b = random()

    res.numbers = [a, b]
    if (a === b) {
        res.result = '='
    }
    if (a > b) {
        res.result = '>'
    }
    if (a < b) {
        res.result = '<'
    }

    return res
}

const submit = () => {
    items.value = []
    while (items.value.length < resLength.value) {
        items.value.push(generator())
    }
}

const print = () => {
    window.print()
}

onMounted(() => {
    submit()
})
</script>

<script>
export default {
    page: {
        sort: 600,
        name: '比大小',
    }
}
</script>
