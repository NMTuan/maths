<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-25 16:14:45
 * @LastEditTime: 2023-03-29 17:17:17
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\clock.vue
-->
<template>
    <LayoutPaper title="认识钟表">
        <template #config>
            <div class="sm:flex items-center justify-between">
                <el-form class="flex items-center flex-wrap">
                    <el-form-item label="模式" class="w-39 mr-4">
                        <el-select v-model="currentTypeIndex" placeholder="请选择模式">
                            <el-option v-for="(type, index) in types" :key="'type' + type.key" :label="type.label"
                                :value="index" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="表盘" class="w-39 mr-4">
                        <el-select v-model="currentNumberTypeIndex" placeholder="请选择表盘">
                            <el-option v-for="(type, index) in numberTypes" :key="'numberType' + type.key"
                                :label="type.label" :value="index" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="分针" class="w-39 mr-4">
                        <el-select v-model="currentTimeTypeIndex" placeholder="请选择分针范围" @change="submit">
                            <el-option v-for="(type, index) in timeTypes" :key="'numberType' + type.key" :label="type.label"
                                :value="index" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="" class=" mr-4" v-if="currentTypeIndex === 1">
                        <el-checkbox v-model="h24" label="24计时法" />
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
        <div class="flex flex-wrap" v-for="index in 5">
            <MathClockItem v-for="i in 4" class="flex-1 mx-5" 
            :type="type.key"
            :time="times[(index - 1) * 4 + i-1]"
            :numberType="numberType.key"
            :showRes="showRes"
            ></MathClockItem>
        </div>
    </LayoutPaper>
</template>
<script setup>
const { $random } = useNuxtApp()
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

const times = ref([])

const types = [
    { key: 'fill', label: '认识时间' },
    { key: 'draw', label: '刻画时间' },
]
const currentTypeIndex = useCookie('math_clock_currentTypeIndex')
currentTypeIndex.value = currentTypeIndex.value || 0
const type = computed(() => {
    return types[currentTypeIndex.value] || {}
})

const numberTypes = [
    { key: 'arabic', label: '阿拉伯数字' },
    { key: 'roman', label: '罗马数字' },
    { key: 'none', label: '无' },
]
const currentNumberTypeIndex = useCookie('math_clock_currentNumberTypeIndex')
currentNumberTypeIndex.value = currentNumberTypeIndex.value || 0
const numberType = computed(() => {
    return numberTypes[currentNumberTypeIndex.value] || {}
})

const timeTypes = [
    { key: 'any', label: '任意时间' },
    { key: '5', label: '每5分钟' },
    { key: '10', label: '每10分钟' },
    { key: '15', label: '每刻钟' },
    { key: 'half', label: '每半小时' },
    { key: 'hour', label: '仅整点' }
]
const currentTimeTypeIndex = useCookie('math_clock_currentTimeTypeIndex')
currentTimeTypeIndex.value = currentTimeTypeIndex.value || 0
const timeType = computed(() => {
    return timeTypes[currentTimeTypeIndex.value] || {}
})

// 24计时法
const h24 = useCookie('math_clock_h24')
h24.value = h24.value || false

const showRes = useCookie('math_compare_showRes') // 显示结果
showRes.value = showRes.value || false


const generator = () => {
    const hour = $random(0, h24.value ? 23 : 11)
    let minute = 0
    if (timeType.value.key === 'half') {
        minute = $random(0, 1) * 30
    }
    if (timeType.value.key === '5') {
        minute = $random(0,11) * 5
    }
    if (timeType.value.key === '10') {
        minute = $random(0, 5) * 10
    }
    if (timeType.value.key === '15') {
        minute = $random(0, 3) * 15
    }
    if (timeType.value.key === 'any') {
        minute = $random(0, 59)
    }
    return `${hour}:${minute.toString().padStart(2, '0')}`
}

const submit = () => {
    times.value = []
    for (let i = 0; i < 20; i++) {
        times.value.push(generator())
    }
}
const print = () => {

    window.print()
}

onMounted(() => {
    submit()
})

watch(h24, () => {
    submit()
})

</script>

<script>
export default {
    page: {
        name: '认识钟表',
        sort: 300
    }
}
</script>
