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

                    <!-- <el-form-item label="运算数" class="w-32 mr-4">
                            <el-select v-model="currentNumber" placeholder="" @change="submit">
                                <el-option v-for="number in numberRange[1] - numberRange[0] + 1"
                                    :label="number + numberRange[0] - 1" :value="number + numberRange[0] - 1" />
                            </el-select>
                        </el-form-item> -->

                    <el-form-item label="模式" class="w-32 mr-4">
                        <el-select v-model="currentTypeIndex" placeholder="">
                            <el-option v-for="(type, index) in types" :label="type.label" :value="index" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="运算" class="w-32 mr-4">
                        <el-select v-model="currentModeIndex" placeholder="">
                            <el-option v-for="(mode, index) in modes" :label="mode.label" :value="index" />
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="" class="mr-4">
                            <el-checkbox v-model="overflow" label="结果可超出运算范围" @change="submit" />
                        </el-form-item> -->
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
            <MathCompositionItem v-for="(item, index) in items" :item="item" :index="index" :type="type" :mode="mode"
                :showRes="showRes">
            </MathCompositionItem>
        </div>
    </LayoutPaper>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig()

useServerSeoMeta({
    title: () => `数字的分解与组成 - 数学 - ${runtimeConfig.public.title}`,
    keywords: '分成,数学,打印',
    description: 'A4纸一键打印10以内至100以内分成练习题。适合幼儿园、幼小衔接、小学一年级等。'
})

const ranges = [10, 20, 50, 100] // 运算范围
const currentRange = useCookie('math_composition_currentRange') // 当前运算范围
currentRange.value = currentRange.value || 10

// 类型
const types = [
    { key: 'cal', label: '运算' },
    { key: 'fill', label: '填空' }
]
const currentTypeIndex = useCookie('math_composition_currentTypeIndex') // 当前类型索引
currentTypeIndex.value = currentTypeIndex.value || 0
const type = computed(() => {
    return types[currentTypeIndex.value]
})

// 运算
const modes = [
    { key: 'no', label: '不限制' },
    { key: 'comp', label: '仅分解' },
    { key: 'decomp', label: '仅组成' }
]
const currentModeIndex = useCookie('math_composition_currentModeIndex') // 当前类型索引
currentModeIndex.value = currentModeIndex.value || 0
const mode = computed(() => {
    return modes[currentModeIndex.value]
})


const showRes = useCookie('math_composition_showRes') // 显示结果
showRes.value = showRes.value || false

const resLength = ref(40) // 生成数量
const items = ref([]) // 结果集

// 生成随机数
const random = (min = 0, max = currentRange.value) => {
    return Math.round(Math.random() * (max - min)) + min
}

// 生成一条算数式

const generator = () => {
    const res = {
        numbers: [], // 运算数
        dig: -1, // 填空：挖掉的索引
        result: 0, // 结果
    }

    // a + b = c
    const c = random(1)
    const a = random(0, c)
    const b = c - a

    res.numbers = [a, b]
    res.result = c

    // 挖空
    res.dig = random(0, res.numbers.length - 1)

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
        sort: 500,
        name: '分解与组成（分成）',
    }
}
</script>
