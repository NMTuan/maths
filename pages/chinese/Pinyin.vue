<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2023-02-14 11:21:09
 * @LastEditTime: 2023-03-06 14:30:29
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMaths\pages\chinese\Pinyin.vue
-->
<template>
    <LayoutPaper>
        <template #config>
            <div class="sm:flex items-center justify-between">
                <el-form class="flex items-center flex-wrap">
                    <el-form-item label="尺寸" class="w-32 mr-4">
                        <el-select v-model="currentConfigIndex" placeholder="" @change="changeSize">
                            <el-option v-for="(item, index) in config" :key="item.size" :label="item.label"
                                :value="index" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="行数" class="w-28 mr-4">
                        <el-select v-model="rows" placeholder="">
                            <el-option v-for="item in currentConfig.maxRows" :key="item" :label="item" :value="item" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="列数" class="w-28 mr-4">
                        <el-select v-model="cols" placeholder="">
                            <el-option v-for="item in currentConfig.maxCols" :key="item" :label="item" :value="item" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" class="mr-4">
                        <el-checkbox v-model="trace" label="描红" />
                    </el-form-item>
                    <el-form-item label="" class="">
                        <el-checkbox v-model="loop" label="循环填充" />
                    </el-form-item>

                </el-form>
                <el-form class="flex-shrink-0 flex items-center flex-wrap">
                    <el-form-item label="" class="">
                        <el-button-group>
                            <el-button type="primary" plain @click="chooseContent">选择内容</el-button>
                            <el-button type="primary" @click="print">打印</el-button>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        <TemplatePinyinLine v-for='(item, index) in rows' :size="currentSize" :cols="cols" :trace="trace">
            {{ loop ? content[index % content.length] : content[index] }}
        </TemplatePinyinLine>
        <ChinesePinyinChooseContent v-model:content="content" v-model:show="showContentDialog"></ChinesePinyinChooseContent>
    </LayoutPaper>
</template>
<script setup>
const { $getSeoInfo } = useNuxtApp()
const seo = $getSeoInfo()
useServerSeoMeta(seo)
useHead(seo)

// 配置项
const config = [
    { label: '适中 -（行高0.96cm）', size: 'base', maxRows: 20, maxCols: 14 },
    { label: '较大 -（行高1.20cm）', size: 'lg', maxRows: 15, maxCols: 12 },
]
const currentConfigIndex = useCookie('template_pinyin_current_config')   // 当前配置项索引
currentConfigIndex.value = currentConfigIndex.value || 0
const currentConfig = computed(() => config[currentConfigIndex.value])
const currentSize = computed(() => currentConfig.value.size)   // 当前尺寸
const rows = useCookie('template_pinyin_rows') // 行数
rows.value = rows.value || currentConfig.value.maxRows
const cols = useCookie('template_pinyin_cols')    // 列数
cols.value = cols.value || currentConfig.value.maxCols

const trace = useCookie('chinese_pinyin_trace') // 描边
trace.value = trace.value || false

const loop = useCookie('chinese_pinyin_loop')   // 循环填充
loop.value = loop.value || false

const content = useCookie('chinese_pinyin_content') // 打印内容
content.value = content.value || ["a", "o", "e", "i", "u", "ü"]
const showContentDialog = ref(false)

// 选择打印内容
const chooseContent = () => {
    showContentDialog.value = true
}

// 切换尺寸时，处理一下最大值，防止超出一页纸
const changeSize = () => {
    if (rows.value > currentConfig.value.maxRows) {
        rows.value = currentConfig.value.maxRows
    }
    if (cols.value > currentConfig.value.maxCols) {
        cols.value = currentConfig.value.maxCols
    }
}

const print = () => {
    window.print()
}

</script>
<script>
export default {
    page: {
        name: '拼音字帖',
        sort: 200
    }
}
</script>
