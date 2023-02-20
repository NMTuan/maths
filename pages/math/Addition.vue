<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-14 10:59:27
 * @LastEditTime: 2023-02-20 11:22:50
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\addition.vue
-->
<template>
    <div>
        <Title>{{ title }}</Title>
        <LayoutPaper>
            <template #config>
                <div>
                    范围：{{ currentRange }}
                    <div>
                        <label v-for="range in ranges">
                            <input type="radio" v-model="currentRange" :value="range"> {{ range }}
                        </label>
                    </div>
                </div>
                <div>
                    运算数：{{ currentNumber }}
                    <div>
                        <label v-for="number in numberRange[1] - numberRange[0] + 1">
                            <input type="radio" v-model="currentNumber" :value="number + numberRange[0] - 1">
                            {{ number + numberRange[0] - 1 }}
                        </label>
                    </div>
                </div>
                <div>
                    模式：{{ type.label }}
                    <div>
                        <label v-for="(type, index) in types">
                            <input type="radio" v-model="currentTypeIndex" :value="index">
                            {{ type.label }}
                        </label>
                    </div>
                </div>
                <div>
                    其它：
                    <div>
                        <label>
                            <input type="checkbox" v-model="overflow">
                            可超出最大值 {{ overflow }}
                        </label>
                        <label>
                            <input type="checkbox" v-model="showRes">
                            显示结果 {{ showRes }}
                        </label>
                    </div>

                    可重复
                </div>
                <div>
                    题数：{{ resLength }}
                    <div>
                        <input type="range" v-model="resLength" min="1" max="50">
                    </div>
                </div>
                <div>
                    <button class="border p-4 bg-red-400" @click="submit">生成</button>
                </div>
            </template>
            <div class="flex flex-wrap">
                <MathAdditionItem v-for="(item, index) in items" :item="item" :index="index" :type="type"
                    :showRes="showRes">
                </MathAdditionItem>
            </div>
        </LayoutPaper>
    </div>
</template>
<script setup>
const ranges = [10, 20, 50, 100]    // 运算范围
const currentRange = ref(10)    // 当前运算范围

const numberRange = [2, 4]  // 参与运算数的范围
const currentNumber = ref(2)  // 当前运算数

// 类型
const types = [
    { key: 'cal', label: '运算' },
    { key: 'fill', label: '填空' },
]
const currentTypeIndex = ref(0) // 当前类型索引
const type = computed(() => {
    return types[currentTypeIndex.value]
})

const overflow = ref(false) // 可超出最大值
const showRes = ref(false)   // 显示结果

const resLength = ref(50)   // 生成数量
const items = ref([])   // 结果集

// 页面标题
const title = computed(() => {
    return `${currentRange.value} 以内${currentNumber.value === 2 ? '加法' : '连加'}（${types[currentTypeIndex.value].label}）`
})

// 生成随机数
const random = (min = 0, max = currentRange.value) => {
    return Math.round(Math.random() * (max - min)) + min
}

// 生成一条算数式

// 改一下算法
// 原来随机出来的结果总是接近最大值
// 所以这次反过来，先随机一个结果，然后拆掉。
// 最后再做两件事
// 1. 对numbers重新排序，因为大部分情况下会越拆越小
// 2. 重新计算一下结果是否正确。
const generator = () => {
    const res = {
        numbers: [],    // 运算数
        dig: -1,    // 填空：挖掉的索引
        result: 0,  // 结果
        check: false    // 验证结果
    }
    if (overflow.value) {
        // 可超出范围
        res.result = random(1, currentNumber.value * currentRange.value)
    } else {
        // 不可超出范围
        res.result = random(1)
    }
    // 循环生成运算数（除最后一位）
    while (res.numbers.length < currentNumber.value - 1) {
        const max = res.numbers.reduce((total, item) => total -= item, res.result)
        res.numbers.push(random(0, max))
    }
    // 排序
    res.numbers.sort(() => {
        return Math.random() - 0.5
    })
    // 挖空
    res.dig = random(0, res.numbers.length)

    // 最后一位运算数用结果减出
    res.numbers.push(res.numbers.reduce((total, item) => total -= item, res.result))
    // 检查一下结果
    res.check = res.numbers.reduce((total, item) => total += item, 0) === res.result

    return res
}

const submit = () => {
    items.value = []
    while (items.value.length < resLength.value) {
        items.value.push(generator())
    }
}
</script>
<script>
export default {
    page: {
        name: '加法'
    }
}
</script>
