<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-14 10:59:38
 * @LastEditTime: 2023-03-24 16:50:28
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\subtraction.vue
-->
<template>
    <LayoutPaper title="减法练习题">
        <template #config>
            <div class="sm:flex items-center justify-between">
                <el-form class="flex items-center flex-wrap">
                    <el-form-item label="运算范围" class="w-40 mr-4">
                        <el-select v-model="currentRange" placeholder="请选择范围" @change="submit">
                            <el-option v-for="range in ranges" :key="range" :label="range" :value="range" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="运算数" class="w-32 mr-4">
                        <el-select v-model="currentNumber" placeholder="请选择范围" @change="submit">
                            <el-option v-for="number in numberRange[1] - numberRange[0] + 1"
                                :label="number + numberRange[0] - 1" :value="number + numberRange[0] - 1" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="模式" class="w-32 mr-4">
                        <el-select v-model="currentTypeIndex" placeholder="请选择范围">
                            <el-option v-for="(type, index) in types" :label="type.label" :value="index" />
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
            <MathSubtractionItem v-for="(item, index) in items" :item="item" :index="index" :type="type" :showRes="showRes">
            </MathSubtractionItem>
        </div>
    </LayoutPaper>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

const ranges = [10, 20, 50, 100] // 运算范围
const currentRange = useCookie('math_sub_currentRange') // 当前运算范围
currentRange.value = currentRange.value || 10

const numberRange = [2, 4] // 参与运算数的范围
const currentNumber = useCookie('math_sub_currentNumber') // 当前运算数
currentNumber.value = currentNumber.value || 2

// 类型
const types = [
    { key: 'cal', label: '运算' },
    { key: 'fill', label: '填空' }
]
const currentTypeIndex = useCookie('math_sub_currentTypeIndex') // 当前类型索引
currentTypeIndex.value = currentTypeIndex.value || 0
const type = computed(() => {
    return types[currentTypeIndex.value]
})

const showRes = useCookie('math_sub_showRes') // 显示结果
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
        numbers: [],    // 运算数
        dig: -1,    // 填空：挖掉的索引
        result: 0,  // 结果
        check: false    // 验证结果
    }
    const maxNumber = random(1)   // 最大值
    const numbers = []  // 运算数
    // 循环生成运算数（除最后一位）
    while (numbers.length < currentNumber.value - 1) {
        // 当前运算数的最大值
        const max = numbers.reduce(
            (total, item) => (total -= item),
            maxNumber
        )
        numbers.push(random(0, max))
    }
    // 最后一位运算数用结果减出
    numbers.push(
        numbers.reduce((total, item) => (total -= item), maxNumber)
    )
    // 排序
    numbers.sort(() => {
        return Math.random() - 0.5
    })

    res.result = numbers.shift()    // 吧运算数中第一个拿去当结果
    res.numbers = [maxNumber, ...numbers]   // 吧最大的数和其它运算数放在一起

    // 挖空
    res.dig = random(0, res.numbers.length)
    // 检查一下结果
    res.check =
        res.numbers.reduce((total, item, index) => {
            if (index === 0) {
                total = item
            } else {
                total -= item
            }
            return total
        }, 0) === res.result

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
        name: '减法练习题',
        sort: 200
    }
}
</script>
