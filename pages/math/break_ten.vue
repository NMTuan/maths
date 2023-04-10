<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-24 09:53:57
 * @LastEditTime: 2023-04-10 21:03:28
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\math\break_ten.vue
-->
<template>
    <LayoutPaper title="破十法练习题">
        <template #config>
            <div class="sm:flex items-center justify-between">
                <el-form class="flex items-center flex-wrap">
                    <el-form-item label="" class="mr-4">
                        <el-checkbox v-model="showTpl" label="过程模版" />
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
                            <el-button type="primary" plain @click="submit"
                                >重新生成</el-button
                            >
                            <el-button type="primary" @click="print"
                                >打印</el-button
                            >
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <div class="flex flex-wrap">
            <MathBreakTenItem
                v-for="(item, index) in items"
                :item="item"
                :index="index"
                :showTpl="showTpl"
                :showTen="showTen"
                :showRes="showRes"
            >
            </MathBreakTenItem>
        </div>
    </LayoutPaper>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

// const ranges = [10, 20, 50, 100] // 运算范围
const currentRange = useCookie('math_break_ten_currentRange') // 当前运算范围
currentRange.value = currentRange.value || 20

const showTpl = useCookie('math_borek_ten_showTpl') // 显示模版
showTpl.value = showTpl.value || true

const showTen = useCookie('math_break_ten_showTen') // 显示下面那个10
showTen.value = showTen.value || true

const showRes = useCookie('math_break_ten_showRes') // 显示结果
showRes.value = showRes.value || false

const resLength = ref(20) // 生成数量
const items = ref([]) // 结果集

// 生成随机数
const random = (min = 0, max = currentRange.value) => {
    return Math.round(Math.random() * (max - min)) + min
}

// 生成一条算数式
const generator = () => {
    const res = {
        numbers: [], // 运算数
        result: 0 // 结果
    }

    // c 2~9
    // a 11~10+c-1
    // b = a-c

    const c = random(2, 9)
    const a = random(11, 10 + c - 1)
    const b = a - c

    res.numbers = [a, b]
    res.result = c

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
        name: '破十法练习题',
        sort: 450
    }
}
</script>
