<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-24 09:53:57
 * @LastEditTime: 2023-02-24 11:22:24
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\make_ten.vue
-->
<template>
    <div>
        <Title>{{ title }}</Title>
        <LayoutPaper>
            <template #config>
                <div class="sm:flex items-center justify-between">
                    <el-form class="flex items-center flex-wrap">
                        <el-form-item label="模式" class="w-32 mr-4">
                            <el-select v-model="currentTypeIndex" placeholder="" @change="submit">
                                <el-option v-for="(type, index) in types" :label="type.label" :value="index" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" class="mr-4">
                            <el-checkbox v-model="showTen" label="显示10" />
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
                <MathMakeTenItem v-for="(item, index) in items" :item="item" :index="index" :showTen="showTen"
                    :showRes="showRes">
                </MathMakeTenItem>
            </div>
        </LayoutPaper>
    </div>
</template>
<script setup>
// const ranges = [10, 20, 50, 100] // 运算范围
const currentRange = useCookie('math_make_ten_currentRange') // 当前运算范围
currentRange.value = currentRange.value || 20

// const numberRange = [2, 4] // 参与运算数的范围
// const currentNumber = useCookie('math_add_sub_currentNumber') // 当前运算数
// currentNumber.value = currentNumber.value || 2

// 类型
const types = [
    { key: 'no', label: '不限制' },
    { key: 'min', label: '拆小数' },
    { key: 'max', label: '拆大数' }
]
const currentTypeIndex = useCookie('math_make_ten_currentTypeIndex') // 当前类型索引
currentTypeIndex.value = currentTypeIndex.value || 0
const type = computed(() => {
    return types[currentTypeIndex.value]
})

const showTen = useCookie('math_make_ten_showTen')  // 显示下面那个10
showTen.value = showTen.value || true

const showRes = useCookie('math_make_ten_showRes') // 显示结果
showRes.value = showRes.value || false

const resLength = ref(20) // 生成数量
const items = ref([]) // 结果集

// 页面标题
const title = computed(() => {
    return `凑十法`
})

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

    // a + b = c
    // 先生成一个 >11 <18 的 c
    // 然后确定 a 的范围。c - 10 + 1 ~ 9
    // 然后 c - a 得到 b

    const c = random(11, 18)
    const a = random(c - 10 + 1, 9)
    const b = c - a

    res.numbers = [a, b]
    res.result = c

    if (type.value.key === 'min') {
        res.numbers.sort((a, b) => {
            return b - a
        })
    }
    if (type.value.key === 'max') {
        res.numbers.sort((a, b) => {
            return a - b
        })
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
        name: '凑十法',
        sort: 400
    }
}
</script>
