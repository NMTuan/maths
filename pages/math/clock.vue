<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-03-25 16:14:45
 * @LastEditTime: 2023-03-28 17:27:38
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\clock.vue
-->
<template>
    <LayoutPaper title="认识钟表">
        <template #config>
            <div class="sm:flex items-center justify-between">
                <el-form class="flex items-center flex-wrap">
                    <el-form-item label="模式" class="w-36 mr-4">
                        <el-select v-model="currentTypeIndex" placeholder="请选择模式" @change="submit">
                            <el-option v-for="(type, index) in types" :key="'type' + type.key" :label="type.label"
                                :value="index" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="表盘" class="w-38 mr-4">
                        <el-select v-model="currentNumberTypeIndex" placeholder="请选择表盘" @change="submit">
                            <el-option v-for="(type, index) in numberTypes" :key="'numberType' + type.key"
                                :label="type.label" :value="index" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="范围" class="w-36 mr-4">
                        <el-select v-model="currentTimeTypeIndex" placeholder="请选择题目范围" @change="submit">
                            <el-option v-for="(type, index) in timeTypes" :key="'numberType' + type.key" :label="type.label"
                                :value="index" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="" class="" v-if="currentTypeIndex === 1">
                        <el-checkbox v-model="h24" label="24计时法" />
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
        {{ times }}
        <div class="flex flex-wrap" v-for="index in 5">
            <div v-for="i in 4">【{{ (index - 1) * index }} + {{ i }} = {{ (index - 1) * index + i }}】</div>
            <!-- <MathClockItem v-for="i in 4" class="flex-1 mx-5" :time="times[(index - 1) * i]"></MathClockItem> -->
        </div>
    </LayoutPaper>
</template>
<script setup>
const { $random } = useNuxtApp()
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

const times = ref([
    '12:00',
    '8:45',
    '14:23',
    '3:30'
])

const types = [
    { key: 'fill', label: '认识时间' },
    { key: 'draw', label: '刻画时间' },
]
const currentTypeIndex = useCookie('math_clock_currentTypeIndex')
currentTypeIndex.value = currentTypeIndex.value || 0
const type = computed(() => {
    return types[currentTypeIndex.value]
})

const numberTypes = [
    { key: 'arabic', label: '阿拉伯数字' },
    { key: 'roman', label: '罗马数字' },
    { key: 'none', label: '无' },
]
const currentNumberTypeIndex = useCookie('math_clock_currentNumberTypeIndex')
currentNumberTypeIndex.value = currentNumberTypeIndex.value || 0
const numberType = computed(() => {
    return numberType[currentNumberTypeIndex.value]
})

const timeTypes = [
    { key: 'hour', label: '仅整点' },
    { key: 'half', label: '整点半点' },
    { key: 'any', label: '任意时间' }
]
const currentTimeTypeIndex = useCookie('math_clock_currentTimeTypeIndex')
currentTimeTypeIndex.value = currentTimeTypeIndex.value || 2
const timeType = computed(() => {
    return timeType[currentNumberTypeIndex.value]
})

// 24计时法
const h24 = useCookie('math_clock_h24')
h24.value = h24.value || false

const generator = () => {
    const hour = $random(0, h24.value ? 23 : 11)
    let minute = 0
    if (currentTimeTypeIndex.value === 1) {
        minute = $random(0, 1) ? 0 : 30
    }
    if (currentTimeTypeIndex.value === 2) {
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

</script>

<script>
export default {
    page: {
        name: '认识钟表',
        sort: 300
    }
}
</script>
